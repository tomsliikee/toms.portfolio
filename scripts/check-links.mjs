// Fails when a built page points at a local file that is not in dist/.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const dist = resolve(process.argv[2] ?? 'dist')

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return pages(path)
    return name.endsWith('.html') ? [path] : []
  })
}

const missing = []
for (const page of pages(dist)) {
  const html = readFileSync(page, 'utf8')
  for (const [, url] of html.matchAll(/(?:src|href)="([^"#?]+)/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue
    const target = join(dist, url)
    const found = url.endsWith('/') ? existsSync(join(target, 'index.html')) : existsSync(target)
    if (!found) missing.push(`${page.slice(dist.length)} → ${url}`)
  }
}

if (missing.length) {
  console.error(`Missing targets:\n  ${missing.join('\n  ')}`)
  process.exit(1)
}
console.log(`All local links resolve (${pages(dist).length} pages).`)
