import { createHash, randomUUID } from 'node:crypto';
import { leadSchema } from './schema.js';
import { mailConfigured, sendEnquiry } from './mail.js';

const BODY_LIMIT = 16 * 1024;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ENTRIES = 1000;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new HttpError(415, 'Please send the enquiry as JSON.');
  }
  if (Number(req.headers['content-length']) > BODY_LIMIT) {
    req.resume();
    throw new HttpError(413, 'The enquiry is too large. Please shorten your message.');
  }
  // Vercel may have already parsed the request. Local Node requests arrive as streams.
  let raw = req.body;
  if (raw === undefined) {
    raw = await new Promise((resolve, reject) => {
      const chunks = [];
      let size = 0;
      req.on('data', (chunk) => {
        size += chunk.length;
        if (size > BODY_LIMIT) {
          chunks.length = 0;
          reject(new HttpError(413, 'The enquiry is too large. Please shorten your message.'));
        } else chunks.push(chunk);
      });
      req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      req.on('error', reject);
      req.on('aborted', () => reject(new HttpError(400, 'The request was interrupted.')));
    });
  }
  if (Buffer.isBuffer(raw)) raw = raw.toString('utf8');
  if (Buffer.byteLength(typeof raw === 'string' ? raw : JSON.stringify(raw)) > BODY_LIMIT) {
    throw new HttpError(413, 'The enquiry is too large. Please shorten your message.');
  }
  if (typeof raw !== 'string') return raw;
  try { return JSON.parse(raw); }
  catch { throw new HttpError(400, 'The enquiry contains invalid JSON.'); }
}

function allowedOrigins(env) {
  const configured = env.CORS_ORIGINS || (env.VERCEL || env.NODE_ENV === 'production'
    ? '' : 'http://localhost:5173,http://127.0.0.1:5173');
  return configured.split(',').map((value) => {
    try {
      const url = new URL(value.trim());
      return ['http:', 'https:'].includes(url.protocol) && url.pathname === '/' && !url.search && !url.hash
        ? url.origin : null;
    } catch { return null; }
  }).filter(Boolean);
}

// These bounded caches protect one warm instance. They are not a shared database.
export function createLeadHandler({ sendMail = sendEnquiry, configured = mailConfigured, env = process.env, logger = console } = {}) {
  const requests = new Map();
  const limits = new Map();

  return async function handleLead(req, res) {
    res.setHeader('Vary', 'Origin');
    res.setHeader('Cache-Control', 'no-store');
    const origin = req.headers.origin;
    if (origin && !allowedOrigins(env).includes(origin)) {
      return json(res, 403, { success: false, error: { message: 'This website is not allowed to submit enquiries.' } });
    }
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      return res.end();
    }
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS');
      return json(res, 405, { success: false, error: { message: 'Use POST to submit an enquiry.' } });
    }

    try {
      const parsed = leadSchema.safeParse(await readJson(req));
      if (!parsed.success) {
        const fields = {};
        for (const issue of parsed.error.issues) fields[issue.path[0] || 'form'] ??= issue.message;
        return json(res, 400, { success: false, error: { message: 'Please check the enquiry details.', fields } });
      }
      if (!configured()) throw new HttpError(503, 'Email is not configured yet. Please call us to share your enquiry.');

      const now = Date.now();
      for (const cache of [requests, limits]) {
        for (const [key, value] of cache) if (value.expiresAt <= now) cache.delete(key);
      }
      const lead = parsed.data;
      const key = lead.idempotencyKey || randomUUID();
      const fingerprint = createHash('sha256').update(JSON.stringify(lead)).digest('hex');
      const previous = requests.get(key);
      if (previous) {
        if (previous.fingerprint !== fingerprint) throw new HttpError(409, 'This enquiry reference has already been used for different details. Please refresh the page.');
        await previous.delivery;
        return json(res, 200, { success: true, data: { leadId: previous.leadId, duplicate: true } });
      }

      // Only trust Vercel's forwarded IP header when running behind Vercel.
      const ip = env.VERCEL
        ? String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
        : req.socket?.remoteAddress || 'unknown';
      const bucket = limits.get(ip) || { count: 0, expiresAt: now + WINDOW_MS };
      if (bucket.count >= 5) {
        res.setHeader('Retry-After', String(Math.ceil((bucket.expiresAt - now) / 1000)));
        throw new HttpError(429, 'Too many enquiries. Please try again in 15 minutes or call us.');
      }
      if (requests.size >= MAX_ENTRIES || (!limits.has(ip) && limits.size >= MAX_ENTRIES)) {
        throw new HttpError(503, 'The enquiry service is busy. Please try again shortly.');
      }
      bucket.count += 1;
      limits.set(ip, bucket);

      const leadId = `SND-${randomUUID().slice(0, 8).toUpperCase()}`;
      const delivery = Promise.resolve().then(() => sendMail(lead, leadId));
      requests.set(key, { fingerprint, leadId, delivery, expiresAt: now + WINDOW_MS });
      try { await delivery; }
      catch (error) { requests.delete(key); throw error; }
      return json(res, 201, { success: true, data: { leadId, duplicate: false } });
    } catch (error) {
      if (error instanceof HttpError) {
        return json(res, error.status, { success: false, error: { message: error.message } });
      }
      // Avoid logging credentials, SMTP responses or customer details.
      logger.error('Enquiry email failed', { code: String(error?.code || 'MAIL_ERROR').slice(0, 40) });
      return json(res, 502, { success: false, error: { message: 'We could not send your enquiry. Please try again or call us.' } });
    }
  };
}
