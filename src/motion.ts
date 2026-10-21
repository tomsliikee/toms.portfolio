// Stepped motion in the manner of Pond, kept for the moments that mean
// something: headlines uncovered tile by tile, the pixel field, a few drawings.
// Hidden start states live in style.css under html.motion, which the gate in
// <head> sets only when reduced motion is off.

const STEP_MS = 95
const MAX_STAGGER = 6

const WATCHED = '.hl, [data-progress], [data-knot], .tree, .bytes'

export function initMotion(): void {
  const root = document.documentElement
  indexChildren('.bytes', ':scope > span')
  indexChildren('[data-knot]', '.strand')
  buildPixels()
  scatterTiles()
  trackDock()

  if (!root.classList.contains('motion')) return
  buildCovers()
  root.classList.add('motion-ready')

  // Checked on scroll rather than with an IntersectionObserver: a fast scroll
  // can jump over an element entirely, and it must still end up revealed.
  let pending = [...document.querySelectorAll<HTMLElement>(WATCHED)]
  let queued = false
  const check = () => {
    queued = false
    const line = window.innerHeight * 0.92
    let rank = 0
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top > line) return true
      // Things that enter together follow one another, one step apart.
      el.style.setProperty('--delay', `${Math.min(rank++, MAX_STAGGER) * STEP_MS}ms`)
      el.classList.add('is-in')
      return false
    })
    if (pending.length > 0) return
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
  const onScroll = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(check)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  check()
}

// ---------- Headlines: covered in colour tiles that clear one by one ----------

const COVER_MS = 700

function buildCovers(): void {
  document.querySelectorAll<HTMLElement>('.hl > span').forEach((line) => {
    const cols = Math.max(1, Math.round(line.offsetWidth / 40))
    const rows = Math.max(1, Math.round(line.offsetHeight / 40))
    const cover = document.createElement('i')
    cover.className = 'cover'
    cover.setAttribute('aria-hidden', 'true')
    cover.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
    const order = shuffle([...Array(cols * rows).keys()])
    for (const n of order) {
      const cell = cover.appendChild(document.createElement('i'))
      cell.style.background = pick(PALETTE)
      cell.style.setProperty('--wait', `${Math.round((n * COVER_MS) / (cols * rows))}ms`)
    }
    line.appendChild(cover)
  })
}

// A few small tiles stay behind at the edges of each headline, as on Pond.
function scatterTiles(): void {
  document.querySelectorAll<HTMLElement>('.hl').forEach((hl) => {
    const lines = hl.querySelectorAll<HTMLElement>(':scope > span')
    for (let k = 0; k < 2; k++) {
      const line = lines[Math.floor(Math.random() * lines.length)]
      const tile = line.appendChild(document.createElement('i'))
      tile.className = 'stay'
      tile.setAttribute('aria-hidden', 'true')
      tile.style.background = pick(PALETTE)
      tile.style.left = `${10 + Math.floor(Math.random() * 80)}%`
      tile.style[k === 0 ? 'top' : 'bottom'] = '-10px'
    }
  })
}

// On the home page the phone dock marks the section in the middle of the screen.
function trackDock(): void {
  const links = document.querySelectorAll<HTMLElement>('.dock [data-dock]')
  if (document.body.dataset.page !== 'home' || links.length === 0) return
  const watch = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      links.forEach((a) => a.classList.toggle('is-on', a.dataset.dock === entry.target.id))
    }
  }, { rootMargin: '-50% 0px -50% 0px' })
  links.forEach((a) => {
    const section = document.getElementById(a.dataset.dock ?? '')
    if (section) watch.observe(section)
  })
}

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function indexChildren(parent: string, child: string): void {
  document.querySelectorAll(parent).forEach((p) => {
    p.querySelectorAll<HTMLElement>(child).forEach((el, i) => el.style.setProperty('--i', String(i)))
  })
}

// ---------- Pixel field: the hero's picture, drawn in 40px cells ----------

const COLS = 10
const ROWS = 12
const PALETTE = ['var(--lime)', 'var(--purple)', 'var(--orange)', 'var(--pond)', 'var(--pink)', 'var(--slate)']

// A "T" and an "H", plus a few loose cells. [row, col, colour]
const DRAWING: [number, number, string][] = [
  [3, 1, 'var(--purple)'], [3, 2, 'var(--purple)'], [3, 3, 'var(--purple)'],
  [4, 2, 'var(--purple)'], [5, 2, 'var(--purple)'], [6, 2, 'var(--purple)'], [7, 2, 'var(--purple)'],
  [3, 5, 'var(--lime)'], [4, 5, 'var(--lime)'], [5, 5, 'var(--lime)'], [6, 5, 'var(--lime)'], [7, 5, 'var(--lime)'],
  [5, 6, 'var(--lime)'],
  [3, 7, 'var(--lime)'], [4, 7, 'var(--lime)'], [5, 7, 'var(--lime)'], [6, 7, 'var(--lime)'], [7, 7, 'var(--lime)'],
  [0, 9, 'var(--orange)'], [10, 8, 'var(--pink)'], [11, 0, 'var(--pond)'], [9, 3, 'var(--slate)'], [1, 0, 'var(--pond)'],
]

function buildPixels(): void {
  const field = document.querySelector<HTMLElement>('[data-pixels]')
  if (!field) return

  const cells: HTMLElement[] = []
  for (let i = 0; i < COLS * ROWS; i++) cells.push(field.appendChild(document.createElement('i')))

  const drawn = new Set<number>()
  for (const [row, col, colour] of DRAWING) {
    const cell = cells[row * COLS + col]
    cell.style.background = colour
    // Drawn cells land one by one, in steps, in a shuffled order.
    cell.classList.add('is-new')
    cell.style.setProperty('--delay', `${600 + Math.floor(Math.random() * 14) * STEP_MS}ms`)
    drawn.add(row * COLS + col)
  }

  if (!document.documentElement.classList.contains('motion')) return

  // Afterwards one empty cell at a time lights up and goes out again.
  const empty = cells.filter((_, i) => !drawn.has(i))
  let visible = true
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(field)
  window.setInterval(() => {
    if (!visible || document.hidden) return
    const cell = empty[Math.floor(Math.random() * empty.length)]
    cell.style.background = pick(PALETTE)
    window.setTimeout(() => (cell.style.background = ''), 1600)
  }, 900)
}
