// Copies index.html to 404.html in the build output. Static hosts such as
// GitHub Pages serve 404.html for unknown paths, which lets the Angular router
// handle clean URLs like /product/7 on a direct visit or refresh.
import { copyFileSync, existsSync } from 'node:fs';

const dir = 'dist/bain-et-cuisine/browser';
if (!existsSync(`${dir}/index.html`)) {
  console.error(`spa-fallback: ${dir}/index.html not found, run the build first`);
  process.exit(1);
}
copyFileSync(`${dir}/index.html`, `${dir}/404.html`);
console.log('spa-fallback: wrote 404.html');
