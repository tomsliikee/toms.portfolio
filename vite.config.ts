import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import { renderChrome } from './src/chrome'
import { PAGES } from './src/pages'

// Fills <!--chrome:head|header|footer--> in every page from src/chrome.ts.
function chrome(): Plugin {
  return {
    name: 'chrome',
    transformIndexHtml(html) {
      const slug = /<body[^>]*data-page="([^"]+)"/.exec(html)?.[1]
      if (!slug) throw new Error('Page is missing <body data-page="…">')
      const parts = renderChrome(slug)
      return html
        .replace('<!--chrome:head-->', parts.head)
        .replace('<!--chrome:header-->', parts.header)
        .replace('<!--chrome:footer-->', parts.footer)
    },
  }
}

const input = Object.fromEntries(
  PAGES.map((p) => [p.slug, resolve(__dirname, p.slug === 'home' ? 'index.html' : `${p.slug}/index.html`)]),
)

export default defineConfig({
  plugins: [chrome()],
  build: { rollupOptions: { input } },
})
