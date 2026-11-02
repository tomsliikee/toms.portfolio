/* Page side of the turtle: watches size, visibility, pointer and scroll, and hands
   them to the renderer, which runs in a worker where the browser allows it. */
import plexMono from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url';
import { baseTheme, reducedMotion, scrollP } from './theme';
import { orbitState } from './orbit';
import type { TurtleInput } from './turtle';
import type { FromWorker, ToWorker } from './turtle.worker';

interface Sink {
  input(i: Partial<TurtleInput>): void;
  size(w: number, h: number, dpr: number): void;
  run(on: boolean): void;
  redraw(): void;
}

/** Worker rendering needs a transferable canvas; whether WebGL works there shows when it starts. */
const canTransfer = (): boolean => typeof OffscreenCanvas === 'function' && 'transferControlToOffscreen' in HTMLCanvasElement.prototype;

function inWorker(canvas: HTMLCanvasElement, input: TurtleInput, still: boolean, fail: (e: unknown) => void): Sink {
  const worker = new Worker(new URL('./turtle.worker.ts', import.meta.url), { type: 'module' });
  const send = (m: ToWorker, transfer: Transferable[] = []) => worker.postMessage(m, transfer);
  worker.onmessage = (e: MessageEvent<FromWorker>) => { if (e.data.type === 'error') { worker.terminate(); fail(e.data.message); } };
  worker.onerror = (e) => { worker.terminate(); fail(e.message); };
  const r = canvas.getBoundingClientRect();
  const off = canvas.transferControlToOffscreen();
  send({ type: 'init', canvas: off, input, still, font: plexMono, w: r.width, h: r.height, dpr: devicePixelRatio || 1 }, [off]);
  return {
    input: (i) => send({ type: 'input', input: i }),
    size: (w, h, dpr) => send({ type: 'size', w, h, dpr }),
    run: (on) => send({ type: 'run', on }),
    redraw: () => send({ type: 'redraw' }),
  };
}

function onPage(canvas: HTMLCanvasElement, input: TurtleInput, still: boolean, fail: (e: unknown) => void): Sink {
  let pending: [number, number, number] | null = null, on = false;
  let turtle: Awaited<ReturnType<typeof import('./turtle').createTurtle>> | null = null;
  import('./turtle')
    .then((t) => t.createTurtle(canvas, () => input, still))
    .then((t) => {
      turtle = t;
      const r = canvas.getBoundingClientRect();
      t.resize(...(pending ?? [r.width, r.height, devicePixelRatio || 1]));
      t.run(on);
      document.fonts.load('11px "IBM Plex Mono"').then(() => t.redraw(), () => {});
    })
    .catch(fail);
  return {
    input: (i) => Object.assign(input, i),
    size: (w, h, dpr) => { pending = [w, h, dpr]; turtle?.resize(w, h, dpr); },
    run: (v) => { on = v; turtle?.run(v); },
    redraw: () => turtle?.redraw(),
  };
}

export function startTurtle(canvas: HTMLCanvasElement, mode: TurtleInput['mode'], fail: (e: unknown) => void): void {
  const still = reducedMotion();
  const narrow = () => window.innerWidth < 720;
  const input: TurtleInput = { mode, p: scrollP(), theme: orbitState.active ? orbitState.theme : baseTheme(), orbit: orbitState.active, narrow: narrow(), mx: 0, my: 0 };
  let size: [number, number, number] | null = null, inView = true, sink: Sink;

  const update = (i: Partial<TurtleInput>) => { Object.assign(input, i); sink.input(i); };
  // Pause while the tab is hidden or the canvas is off screen.
  const run = () => sink.run(inView && !document.hidden);
  const ro = new ResizeObserver(([e]) => {
    size = [e.contentRect.width, e.contentRect.height, devicePixelRatio || 1];
    sink.size(...size);
    update({ narrow: narrow() });
  });
  const io = new IntersectionObserver((es) => { inView = es[es.length - 1].isIntersecting; run(); });

  function attach(c: HTMLCanvasElement, worker: boolean) {
    canvas = c;
    sink = (worker ? inWorker : onPage)(c, { ...input }, still, worker ? retryOnPage : fail);
    ro.observe(c);
    io.observe(c);
    if (size) sink.size(...size);
    if (!still) run();
  }
  // WebGL failed in the worker (older Safari has OffscreenCanvas without WebGL):
  // the transferred canvas is spent, so a fresh one takes its place on the page.
  function retryOnPage() {
    ro.unobserve(canvas);
    io.unobserve(canvas);
    const fresh = canvas.cloneNode(false) as HTMLCanvasElement;
    canvas.replaceWith(fresh);
    attach(fresh, false);
  }
  attach(canvas, canTransfer());
  // The home page reports its theme through the orbit; elsewhere (and when stacked) it is the page theme.
  window.addEventListener('themechange', () => {
    if (!orbitState.active) update({ theme: baseTheme() });
    if (still) sink.redraw();
  });
  if (still) return;

  document.addEventListener('visibilitychange', run);
  window.addEventListener('pointermove', (e) => {
    update({ mx: (e.clientX / window.innerWidth) * 2 - 1, my: (e.clientY / window.innerHeight) * 2 - 1 });
  }, { passive: true });
  if (mode === 'home') orbitState.listen = () => update({ p: orbitState.p, theme: orbitState.theme, orbit: orbitState.active });
  else window.addEventListener('scroll', () => update({ p: scrollP() }), { passive: true });
}
