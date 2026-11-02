import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// The geist package does not export its font files, so the variable serif is
// reached through an alias and imported with ?url in the layout.
const geistSerif = fileURLToPath(
  new URL('./node_modules/geist/dist/fonts/geist-serif/GeistSerifVF.woff2', import.meta.url),
);

export default defineConfig({
  site: 'https://thomas-haiden.com',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  vite: { resolve: { alias: [{ find: /^@geist-serif/, replacement: geistSerif }] } },
});
