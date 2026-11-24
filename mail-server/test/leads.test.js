import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { Readable } from 'node:stream';
import test from 'node:test';
import { createLeadHandler } from '../lib/handler.js';

const origin = 'https://frontend.example.com';
const valid = {
  name: 'Asha Verma', phone: '98765 43210', email: 'asha@example.com', city: 'Mumbai',
  propertyType: 'Apartment', propertySize: '1200', service: 'Carpentry',
  source: 'Contact section', website: '', idempotencyKey: 'test-enquiry-1234',
};

async function setup(t, options = {}) {
  const sent = [];
  const handler = createLeadHandler({
    env: { CORS_ORIGINS: `${origin}/` }, configured: () => true,
    sendMail: async (lead, leadId) => { sent.push({ lead, leadId }); },
    logger: { error() {} }, ...options,
  });
  const server = createServer(handler);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve) => {
    server.closeAllConnections();
    server.close(resolve);
  }));
  const url = `http://127.0.0.1:${server.address().port}/api/leads`;
  const post = (payload = valid, init = {}) => fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(payload), ...init,
  });
  return { sent, handler, post, url };
}

test('submits the frontend payload and returns its expected response contract', async (t) => {
  const { sent, post } = await setup(t);
  const res = await post({ ...valid, to: 'untrusted@example.com' });
  const body = await res.json();
  assert.equal(res.status, 201);
  assert.equal(res.headers.get('access-control-allow-origin'), origin);
  assert.equal(body.success, true);
  assert.match(body.data.leadId, /^SND-[A-F0-9]{8}$/);
  assert.equal(body.data.duplicate, false);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].lead.phone, '+919876543210');
  assert.equal(sent[0].lead.to, undefined);
  assert.equal(sent[0].leadId, body.data.leadId);
});

test('accepts a request with an already parsed Vercel body', async (t) => {
  const { handler, sent } = await setup(t);
  const req = Readable.from([]);
  Object.assign(req, { method: 'POST', headers: { 'content-type': 'application/json' }, body: valid });
  let result;
  const res = { setHeader() {}, end(value) { result = JSON.parse(value); } };
  await handler(req, res);
  assert.equal(res.statusCode, 201);
  assert.equal(result.success, true);
  assert.equal(sent.length, 1);
});

test('handles preflight and blocks unlisted browser origins before sending', async (t) => {
  const { url, sent, post } = await setup(t);
  const preflight = await fetch(url, { method: 'OPTIONS', headers: { Origin: origin } });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-headers'), 'Content-Type');
  const blocked = await post(valid, { headers: { 'Content-Type': 'application/json', Origin: 'https://untrusted.example' } });
  assert.equal(blocked.status, 403);
  assert.equal(blocked.headers.get('access-control-allow-origin'), null);
  assert.equal(sent.length, 0);
});

test('rejects invalid fields and honeypot submissions without sending mail', async (t) => {
  const { post, sent } = await setup(t);
  const invalid = await post({ ...valid, phone: '123', email: 'bad', preferredStartDate: '2027-02-30' });
  assert.equal(invalid.status, 400);
  const body = await invalid.json();
  assert.ok(body.error.fields.phone);
  assert.ok(body.error.fields.email);
  assert.ok(body.error.fields.preferredStartDate);
  assert.equal((await post({ ...valid, website: 'bot.example' })).status, 400);
  assert.equal(sent.length, 0);
});

test('rejects unsupported methods, malformed JSON, non-JSON and oversized requests', async (t) => {
  const { url, post, sent } = await setup(t);
  assert.equal((await fetch(url)).status, 405);
  assert.equal((await post(valid, { body: '{broken' })).status, 400);
  assert.equal((await post(valid, { headers: { 'Content-Type': 'text/plain' } })).status, 415);
  assert.equal((await post({ ...valid, message: 'x'.repeat(17000) })).status, 413);
  assert.equal(sent.length, 0);
});

test('does not report success when Gmail credentials are missing', async (t) => {
  const { post, sent } = await setup(t, { configured: () => false });
  const response = await post();
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
  assert.equal(sent.length, 0);
});

test('deduplicates retries and rejects reuse of a key for different details', async (t) => {
  const { post, sent } = await setup(t);
  const first = await (await post()).json();
  const duplicate = await (await post()).json();
  assert.equal(duplicate.data.leadId, first.data.leadId);
  assert.equal(duplicate.data.duplicate, true);
  assert.equal((await post({ ...valid, message: 'Changed details' })).status, 409);
  assert.equal(sent.length, 1);
});

test('concurrent duplicate requests wait for the same email', async (t) => {
  let release;
  let notifyStarted;
  let calls = 0;
  const started = new Promise((resolve) => { notifyStarted = resolve; });
  const delivery = new Promise((resolve) => { release = resolve; });
  const { post } = await setup(t, { sendMail: async () => { calls += 1; notifyStarted(); await delivery; } });
  const first = post();
  await started;
  const second = post();
  release();
  const responses = await Promise.all([first, second]);
  const [one, two] = await Promise.all(responses.map((response) => response.json()));
  assert.equal(calls, 1);
  assert.equal(one.data.leadId, two.data.leadId);
});

test('SMTP failure returns an error and allows retrying the same key', async (t) => {
  let attempts = 0;
  const { post } = await setup(t, {
    sendMail: async () => { if (++attempts === 1) throw new Error('private SMTP diagnostic'); },
  });
  const failed = await post();
  assert.equal(failed.status, 502);
  const body = await failed.json();
  assert.equal(body.success, false);
  assert.ok(!JSON.stringify(body).includes('private SMTP diagnostic'));
  assert.equal((await post()).status, 201);
  assert.equal(attempts, 2);
});

test('limits repeated new enquiries from one IP', async (t) => {
  const { post, sent } = await setup(t);
  for (let i = 0; i < 5; i += 1) {
    assert.equal((await post({ ...valid, idempotencyKey: `unique-enquiry-${i}` })).status, 201);
  }
  const limited = await post({ ...valid, idempotencyKey: 'unique-enquiry-6' });
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
  assert.equal(sent.length, 5);
});
