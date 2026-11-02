/* Home: the turtle holds still in the middle; chapters of text orbit it as you scroll. */
import { baseTheme, clamp, clearTheme, scrollP, setTheme, type ThemeName } from './theme';

/** Shared with the turtle, which turns with the scroll and takes the theme's accent. */
export const orbitState: { p: number; theme: ThemeName; active: boolean; listen?: () => void } = { p: 0, theme: 'light', active: false };

const CHAPTERS = 6;
/** Anchor ids on the home page and the chapter each one scrolls to. */
const ANCHORS: Record<string, number> = { projects: 2, path: 3, skills: 4, contact: 5 };

const num = (v: string | undefined, d: number) => (v === undefined || v === '' ? d : +v);
const ease = (u: number) => 0.5 + 4 * Math.pow(u - 0.5, 3);

function chapterTop(k: number): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return k < 0 ? 0 : k >= CHAPTERS - 1 ? max : (max * (k + 0.5)) / CHAPTERS;
}

/** Where chapter k rests: the first at the very top, the last at the bottom, the others centred. */
const restTop = (k: number) => chapterTop(k === 0 ? -1 : k);

export function startOrbit(root: HTMLElement): { stop(): void } {
  const n = CHAPTERS, flipAt = (n - 1) / n - 0.03;
  const orbs = Array.from(root.querySelectorAll<HTMLElement>('[data-orb]'));
  const cue = root.querySelector<HTMLElement>('[data-cue]');
  orbitState.active = true;
  orbitState.theme = baseTheme();

  // The last chapter is always dark; before it the home page follows the page theme.
  function applyTheme(want: ThemeName) {
    orbitState.theme = want;
    if (want === baseTheme()) clearTheme(root); else setTheme(root, want);
  }

  function place() {
    const vw = window.innerWidth, vh = window.innerHeight, narrow = vw < 720;
    const RX = narrow ? vw * 0.2 : Math.min(vw * 0.3, 480);
    const p = orbitState.p;
    for (const el of orbs) {
      const ds = el.dataset;
      const ch = num(ds.ch, 0), ph = narrow ? 0 : num(ds.ph, 0);
      const yy = narrow ? num(ds.my, num(ds.y, 0)) : num(ds.y, 0);
      const xx = narrow ? num(ds.mx, num(ds.x, 0)) : num(ds.x, 0);
      const ax = narrow ? num(ds.max, num(ds.ax, 0.5)) : num(ds.ax, 0.5);
      const t = (p - ch / n) * n;
      if (t < -0.25 || t > 1.25) { el.style.visibility = 'hidden'; el.style.opacity = '0'; continue; }
      const u = clamp(t, 0, 1);
      let off: number, vis: number;
      if (ch === 0) { off = Math.pow(u, 2) * Math.PI * 0.9; vis = t < 0 ? 1 : clamp((1 - t) * 5, 0, 1); }
      else if (ch === n - 1) { off = -Math.pow(1 - u, 2) * Math.PI * 0.9; vis = t > 1 ? 1 : clamp(t * 5, 0, 1); }
      else { off = (ease(u) - 0.5) * Math.PI * 1.8; vis = clamp(Math.min(t, 1 - t) * 6, 0, 1); }
      const a = ph + off, d = Math.cos(a);
      const x = xx * vw + Math.sin(a) * RX * num(ds.r, 1);
      const y = yy * vh - (1 - d) * vh * 0.03;
      const sc = 0.8 + 0.2 * (d + 1) / 2;
      const op = vis * (0.08 + 0.92 * clamp((d + 0.1) / 0.6, 0, 1));
      el.style.visibility = op < 0.01 ? 'hidden' : 'visible';
      el.style.opacity = op.toFixed(3);
      el.style.transform = 'translate(' + (-ax * 100) + '%,-50%) translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + sc.toFixed(3) + ')';
      el.style.transformOrigin = (ax * 100) + '% 50%';
      el.style.filter = d < 0 ? 'blur(' + (-d * 3).toFixed(2) + 'px)' : 'none';
      el.style.zIndex = d > 0.05 ? '20' : '2';
      el.style.pointerEvents = vis > 0.6 && d > 0.3 ? 'auto' : 'none';
      // Faded-out texts must not take keyboard focus either.
      el.inert = vis <= 0.6;
    }
    if (cue) cue.style.opacity = String(clamp(1 - p * 25, 0, 1));
  }

  // Snapping: when a scroll ends between chapters, it moves one chapter on in its direction and never further,
  // so a flick cannot sail past a chapter. CSS scroll snap does not fit: chapters lie a viewport apart,
  // and a single wheel notch would fall back to where it started.
  let at = 0, settle = 0;
  const nearest = (y: number) => {
    let best = 0;
    for (let k = 1; k < n; k++) if (Math.abs(y - restTop(k)) < Math.abs(y - restTop(best))) best = k;
    return best;
  };
  function snap() {
    settle = 0;
    const y = window.scrollY, k = nearest(y);
    if (Math.abs(y - restTop(k)) < 2) { at = k; return; }
    const d = y - restTop(at);
    // Counted from the target, so a second press during the glide moves on rather than back.
    at = Math.abs(d) < 40 ? at : clamp(at + Math.sign(d), 0, n - 1);
    window.scrollTo({ top: restTop(at), behavior: 'smooth' });
  }
  // Safari before 26.2 has no scrollend; a short pause in scrolling stands in for it.
  const hasEnd = 'onscrollend' in window;
  const onScroll = () => {
    schedule();
    if (!hasEnd) { clearTimeout(settle); settle = window.setTimeout(snap, 160); }
  };

  // The layout is a pure function of scroll and viewport, so it only runs when one changes.
  let raf = 0;
  function update() {
    raf = 0;
    orbitState.p = scrollP();
    const want: ThemeName = orbitState.p > flipAt ? 'dark' : baseTheme();
    if (want !== orbitState.theme) applyTheme(want);
    place();
    orbitState.listen?.();
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  function onClick(e: MouseEvent) {
    const a = (e.target as Element).closest<HTMLElement>('[data-go]');
    if (!a) return;
    e.preventDefault();
    const k = +a.dataset.go!;
    window.scrollTo({ top: chapterTop(k), behavior: 'smooth' });
    history.replaceState(null, '', k < 0 ? '/' : a.getAttribute('href'));
  }

  const onTheme = () => { applyTheme(orbitState.p > flipAt ? 'dark' : baseTheme()); orbitState.listen?.(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scrollend', snap);
  window.addEventListener('resize', schedule);
  window.addEventListener('themechange', onTheme);
  document.addEventListener('click', onClick);

  // Arriving from another page via /#projects and the like.
  const k = ANCHORS[location.hash.slice(1)];
  if (k !== undefined) window.scrollTo(0, chapterTop(k));
  at = nearest(window.scrollY);
  update();

  return {
    stop() {
      orbitState.active = false;
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', snap);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('click', onClick);
      window.removeEventListener('themechange', onTheme);
      clearTheme(root);
      for (const el of orbs) {
        for (const prop of ['visibility', 'opacity', 'transform', 'transform-origin', 'filter', 'z-index', 'pointer-events']) el.style.removeProperty(prop);
        el.inert = false;
      }
      cue?.style.removeProperty('opacity');
      orbitState.theme = baseTheme();
      orbitState.listen?.();
    },
  };
}
