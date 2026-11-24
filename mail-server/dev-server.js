import { createServer } from 'node:http';
import leads from './api/leads.js';
import health from './api/health.js';
import { json } from './lib/handler.js';

const port = Number(process.env.PORT || 5000);
const server = createServer((req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === '/api/leads') return void leads(req, res);
  if (path === '/api/health') return health(req, res);
  return json(res, 404, { success: false, error: { message: 'Route not found.' } });
});
server.listen(port, '127.0.0.1', () => console.log(`Mail API listening at http://localhost:${port}`));
