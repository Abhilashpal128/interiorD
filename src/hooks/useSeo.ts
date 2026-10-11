import { useEffect } from 'react';
import { company, seo } from '../config/site';

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Sets unique title/description/canonical/OG tags per page and optional JSON-LD. */
export function useSeo({ title, description, path = '/', image, noindex, jsonLd }: SeoOptions = {}) {
  const jsonKey = jsonLd ? JSON.stringify(jsonLd) : '';
  useEffect(() => {
    const fullTitle = title ? `${title} | ${company.name}` : seo.defaultTitle;
    const desc = description ?? seo.defaultDescription;
    const url = `${company.siteUrl.replace(/\/$/, '')}${path}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', desc);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    if (image) setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    if (jsonKey) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const item of items) {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.dataset.seoJsonld = 'true';
        s.text = JSON.stringify(item);
        document.head.appendChild(s);
      }
    }
    return () => document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, noindex, jsonKey]);
}
