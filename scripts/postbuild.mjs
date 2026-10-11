// Runs after `ng build`. Writes into the build output:
//  - 404.html: a copy of index.html. Static hosts such as GitHub Pages serve it
//    for unknown paths, so the Angular router handles clean URLs like /product/7
//    on a direct visit or refresh.
//  - sitemap.xml: home, pages, category types and every product, read from the
//    catalog in product.service.ts so it never goes stale.
// With --demo (GitHub Pages client demo) robots.txt blocks all crawlers so the
// demo never competes with the real domain in search results.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const SITE_URL = 'https://sweetlodge.com.tn';
const dir = 'dist/bain-et-cuisine/browser';
const isDemo = process.argv.includes('--demo');

if (!existsSync(`${dir}/index.html`)) {
  console.error(`postbuild: ${dir}/index.html not found, run the build first`);
  process.exit(1);
}

copyFileSync(`${dir}/index.html`, `${dir}/404.html`);

const catalog = readFileSync('src/app/services/product.service.ts', 'utf8');
const productIds = [...catalog.matchAll(/^\s*id:\s*(\d+),/gm)].map(m => m[1]);
const typeOrder = catalog.match(/typeOrder: string\[\] = \[([^\]]*)\]/)?.[1] ?? '';
const typeSlugs = [...typeOrder.matchAll(/'([^']+)'/g)]
  .map(m => m[1].toLowerCase().trim().replace(/\s+/g, '-'));

const paths = [
  '/',
  '/category',
  ...typeSlugs.map(slug => `/category/${encodeURIComponent(slug)}`),
  ...productIds.map(id => `/product/${id}`),
  '/about',
  '/rendezvous',
  '/contact'
];
const urls = paths.map(p => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n');
writeFileSync(
  `${dir}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

if (isDemo) {
  writeFileSync(`${dir}/robots.txt`, 'User-agent: *\nDisallow: /\n');
}

console.log(`postbuild: wrote 404.html, sitemap.xml (${paths.length} URLs)${isDemo ? ', demo robots.txt' : ''}`);
