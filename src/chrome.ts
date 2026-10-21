import { neighbours, pageBySlug, type Page } from './pages'

// The header, footer and shared <head> of every page. Rendered into the HTML
// at build time by the plugin in vite.config.ts, so navigation works without
// JavaScript.

export type Chrome = { head: string; header: string; footer: string }

const FONTS = ['onest.woff2', 'instrument-serif-italic.woff2']

// Hidden start states only apply under html.motion. If the motion module never
// reports in, the class is dropped again so nothing stays hidden.
const MOTION_GATE = `<script>(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},2500)})()</script>`

function head(page: Page): string {
  const title = page.slug === 'home' ? 'Thomas Haiden' : `${page.title} – Thomas Haiden`
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="Thomas Haiden, C and C++ developer and computer science student in Austria. Apps, GNOME extensions and a design language of his own." />`,
    `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`,
    ...FONTS.map((f) => `<link rel="preload" href="/fonts/${f}" as="font" type="font/woff2" crossorigin />`),
    MOTION_GATE,
  ].join('\n    ')
}

function tile(text: string, cls: string, href?: string): string {
  return href
    ? `<a class="tile ${cls}" href="${href}"><span>${text}</span></a>`
    : `<span class="tile ${cls}"><span>${text}</span></span>`
}

function homeHeader(): string {
  return `<header class="top wrap">
  <a class="mark" href="#start" aria-label="Thomas Haiden, back to the top"><span>T</span><span>o</span><span>m</span><span>s</span></a>
  <nav class="row top-nav" aria-label="Main">
    ${tile('work', 'is-outline w3', '#work')}
    ${tile('journey', 'is-outline w3', '#journey')}
    ${tile('skills', 'is-outline w3', '#skills')}
    ${tile('contact', 'is-lime w3', '#contact')}
  </nav>
</header>`
}

function subHeader(page: Page): string {
  const { next } = neighbours(page.slug)
  const crumbs = [
    tile('← start', 'is-lime w3', '/'),
    page.section ? tile(page.section, 'is-outline') : '',
    tile(page.label, `is-${page.tone}`),
  ].join('')
  const forward = next ? tile(`next: ${next.label} →`, 'is-outline', next.path) : tile('back to start ↵', 'is-outline', '/')
  return `<header class="top wrap">
  <nav class="row" aria-label="Breadcrumb">${crumbs}</nav>
  <div class="row top-nav">${forward}</div>
</header>`
}

const SECTIONS = ['work', 'journey', 'skills', 'contact']

// The floating bar at the bottom on phones. On the home page it jumps between
// sections; elsewhere it leads back to them, with the neighbouring pages at the ends.
function dock(page: Page): string {
  const home = page.slug === 'home'
  const links = SECTIONS.map((s) => `<a href="${home ? '' : '/'}#${s}" data-dock="${s}">${s}</a>`)
  if (!home) {
    const { prev, next } = neighbours(page.slug)
    links.unshift(`<a class="step" href="${prev.path}" aria-label="Previous: ${prev.title}">‹</a>`)
    links.push(`<a class="step" href="${next ? next.path : '/'}" aria-label="Next: ${next ? next.title : 'start'}">›</a>`)
  }
  return `<nav class="dock" aria-label="Sections">${links.join('')}</nav>`
}

const FOOTLINE = `<footer class="foot wrap">
  <span>© 2026 Thomas Haiden</span>
  <span>thomas-haiden.com</span>
</footer>`

function subFooter(page: Page): string {
  const { prev, next } = neighbours(page.slug)
  const prevLink = tile(prev.slug === 'home' ? 'start' : `← ${prev.label}`, 'is-outline w4', prev.path)
  const line = next ? `Continue to ${next.title}` : 'Back to the start'
  const nextLink = next ? tile('next →', 'is-lime w5', next.path) : tile('start ↵', 'is-lime w5', '/')
  return `<div class="night">
  <section class="wrap outro">
    <p class="outro-line">${line}</p>
    <div class="row">${prevLink}${nextLink}</div>
  </section>
  ${FOOTLINE}
</div>`
}

export function renderChrome(slug: string): Chrome {
  const page = pageBySlug(slug)
  const home = page.slug === 'home'
  return {
    head: head(page),
    header: (home ? homeHeader() : subHeader(page)) + '\n' + dock(page),
    // The home page ends inside its own night band, so it only needs the line.
    footer: home ? FOOTLINE : subFooter(page),
  }
}
