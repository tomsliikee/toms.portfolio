export type Tone = 'lime' | 'pond' | 'purple' | 'orange' | 'pink' | 'slate'

export type Page = {
  slug: string
  path: string
  title: string
  label: string
  section?: string
  tone: Tone
}

// Order is the reading order: every subpage links to the next one.
export const PAGES: readonly Page[] = [
  { slug: 'home', path: '/', title: 'Thomas Haiden', label: 'start', tone: 'lime' },
  { slug: 'pulse', path: '/pulse/', title: 'Pulse', label: 'pulse', section: 'work', tone: 'purple' },
  { slug: 'tomsllama', path: '/tomsllama/', title: 'tomsllama', label: 'tomsllama', section: 'work', tone: 'lime' },
  { slug: 'gnome', path: '/gnome/', title: 'GNOME extensions', label: 'gnome', section: 'work', tone: 'orange' },
  { slug: 'design', path: '/design/', title: 'Toms Expressive Design', label: 'design', section: 'work', tone: 'pond' },
  { slug: 'knot', path: '/knot/', title: 'Knot', label: 'knot', section: 'work', tone: 'pink' },
  { slug: 'journey', path: '/journey/', title: 'Journey', label: 'journey', tone: 'purple' },
  { slug: 'systems', path: '/systems/', title: 'C, C++ and systems', label: 'systems', section: 'skills', tone: 'lime' },
]

export function pageBySlug(slug: string): Page {
  const page = PAGES.find((p) => p.slug === slug)
  if (!page) throw new Error(`Unknown page "${slug}"`)
  return page
}

export function neighbours(slug: string): { prev: Page; next: Page | null } {
  const i = PAGES.findIndex((p) => p.slug === slug)
  return { prev: PAGES[Math.max(i - 1, 0)], next: PAGES[i + 1] ?? null }
}
