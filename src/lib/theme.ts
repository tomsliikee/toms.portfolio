export interface Theme {
  bg: string;
  fg: string;
  muted: string;
  line: string;
  accent: string;
  accentText: string;
}

export type ThemeName = 'light' | 'dark';

export const THEMES: Record<ThemeName, Theme> = {
  light: { bg: '#f4f7f8', fg: '#0d0f12', muted: '#4a525c', line: 'rgba(13,15,18,.16)', accent: '#0a7cc4', accentText: '#0869a6' },
  dark: { bg: '#0d0f12', fg: '#f4f7f8', muted: '#b4bcc6', line: 'rgba(244,247,248,.22)', accent: '#3aa6ec', accentText: '#5ab4ee' },
};

/** The page theme from the toggle or the system, set on <html> before paint. */
export const baseTheme = (): ThemeName => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

/** Sets a theme on one element only; the page theme itself lives in global.css. */
export function setTheme(el: HTMLElement, name: ThemeName): Theme {
  const t = THEMES[name];
  el.style.setProperty('--bg', t.bg);
  el.style.setProperty('--fg', t.fg);
  el.style.setProperty('--muted', t.muted);
  el.style.setProperty('--line', t.line);
  el.style.setProperty('--accent', t.accent);
  el.style.setProperty('--accent-text', t.accentText);
  return t;
}

const THEME_VARS = ['--bg', '--fg', '--muted', '--line', '--accent', '--accent-text'];

/** Hands the element back to the page theme. */
export function clearTheme(el: HTMLElement): void {
  for (const v of THEME_VARS) el.style.removeProperty(v);
}

/** Scroll progress of the whole document, 0 to 1. */
export function scrollP(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
}

export const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Cheap check without creating a context; a context that still fails is caught when mounting. */
export const hasWebGL = (): boolean => 'WebGLRenderingContext' in window;
