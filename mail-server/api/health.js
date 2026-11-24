import { json } from '../lib/handler.js';
import { mailConfigured } from '../lib/mail.js';

export default function health(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return json(res, 405, { success: false, error: { message: 'Use GET to check the service.' } });
  }
  const ready = mailConfigured();
  return json(res, ready ? 200 : 503, {
    success: ready,
    data: { service: 'S&D Build Solutions mail API', emailConfigured: ready },
  });
}
