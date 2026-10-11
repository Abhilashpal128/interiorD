// Usage: SITE_URL=https://www.yourdomain.com node scripts/generate-sitemap.mjs
// Reads project slugs and service ids from src/data and writes public/sitemap.xml + updates public/robots.txt
import { readFileSync, writeFileSync } from 'node:fs';

const site = (process.env.SITE_URL ?? 'https://www.example.com').replace(/\/$/, '');
const slugs = [...readFileSync('src/data/projects.ts', 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const services = [...readFileSync('src/data/services.ts', 'utf8').matchAll(/^\s+id: '([^']+)'/gm)].map((m) => m[1]);
const paths = ['/', '/privacy', '/terms', ...services.map((s) => `/services/${s}`), ...slugs.map((s) => `/projects/${s}`)];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
  .map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`;
writeFileSync('public/sitemap.xml', xml);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`Wrote sitemap with ${paths.length} URLs for ${site}`);
