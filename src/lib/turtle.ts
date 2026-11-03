/* ASCII sea turtle for thomas-haiden.com: a low-poly three.js turtle, read back
   at character resolution and drawn as text onto a 2D canvas. Runs in a worker
   (turtle.worker.ts) where OffscreenCanvas allows it, otherwise on the page. */
import {
  BufferAttribute,
  ConeGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderTarget,
  WebGLRenderer,
  type BufferGeometry,
} from 'three';
import { THEMES, clamp, type ThemeName } from './theme';

/** Everything the page tells the turtle; sent to the worker whenever it changes. */
export interface TurtleInput {
  mode: 'home' | 'detail';
  /** Scroll progress, 0 to 1. */
  p: number;
  theme: ThemeName;
  /** Home: the texts orbit (false when the page is stacked for reduced motion). */
  orbit: boolean;
  /** Viewport narrower than 720px. */
  narrow: boolean;
  /** Pointer position, -1 to 1. */
  mx: number;
  my: number;
}

interface TurtleState {
  yaw?: number;
  x?: number;
  y?: number;
  fill?: number;
  maxScale?: number;
  introX?: number;
  introY?: number;
  introYaw?: number;
  /** Tilt towards the camera; 0.3 is the slight look from above, about 1.2 shows the shell from above (with yaw π the head then points up). */
  pitch?: number;
}

/** Home: still in the middle, turning with the scroll. Detail: seen from above, swimming up through the tank. */
function stateFor(i: TurtleInput): TurtleState {
  if (i.mode === 'detail') return { yaw: Math.PI + Math.sin(i.p * Math.PI) * 0.4, y: 0.1 - i.p * 0.2, pitch: 1.2, fill: 1.0, maxScale: 0.95, introY: -6, introYaw: 0 };
  if (!i.orbit) return { yaw: -0.5, fill: i.narrow ? 0.95 : 0.62, maxScale: 1.15 };
  return { yaw: i.p * Math.PI * 2.5, x: i.narrow ? 0 : 0.06, y: i.narrow ? -0.22 : 0.02, fill: i.narrow ? 0.95 : 0.62, maxScale: 1.15 };
}

const RAMP = '@#%&8B$*o+=~-:,.';
const FRAME_MS = 1000 / 30;

function hash(x: number, y: number, z: number, s: number): number {
  x = Math.round(x * 1e4) / 1e4; y = Math.round(y * 1e4) / 1e4; z = Math.round(z * 1e4) / 1e4;
  const h = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + s) * 43758.5453;
  return h - Math.floor(h);
}

function jitter<T extends BufferGeometry>(geo: T, amt: number, seed: number): T {
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    pos.setXYZ(i,
      x * (1 + (hash(x, y, z, seed) - 0.5) * amt),
      y * (1 + (hash(x, y, z, seed + 1.7) - 0.5) * amt),
      z * (1 + (hash(x, y, z, seed + 3.1) - 0.5) * amt));
  }
  return geo;
}

function faceted(geo: BufferGeometry, grey: number, spread: number, seed: number): BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const n = g.attributes.position.count, cols = new Float32Array(n * 3);
  for (let f = 0; f < n; f += 3) {
    const k = clamp(grey * (1 - spread / 2 + hash(f, seed, 0.5, seed) * spread), 0, 1);
    for (let v = 0; v < 9; v++) cols[f * 3 + v] = k;
  }
  g.setAttribute('color', new BufferAttribute(cols, 3));
  g.computeVertexNormals();
  return g;
}

const mat = () => new MeshLambertMaterial({ vertexColors: true, flatShading: true });

interface Parts { head: Group; fr: Group; fl: Group; br: Group; bl: Group }

function buildTurtle(): { turtle: Group; parts: Parts } {
  const turtle = new Group(), body = new Group();
  turtle.add(body);
  const shellG = new SphereGeometry(1, 13, 7, 0, Math.PI * 2, 0, Math.PI / 2);
  shellG.scale(1.18, 0.56, 1.48);
  jitter(shellG, 0.08, 2);
  body.add(new Mesh(faceted(shellG, 0.95, 0.5, 4), mat()));
  const bellyG = new SphereGeometry(1, 13, 3, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  bellyG.scale(1.12, 0.2, 1.4);
  body.add(new Mesh(faceted(bellyG, 0.8, 0.1, 5), mat()));

  const head = new Group();
  head.position.set(0, 0.06, 1.55);
  const headG = new SphereGeometry(0.36, 9, 6);
  headG.scale(1, 0.82, 1.3);
  jitter(headG, 0.06, 7);
  const headM = new Mesh(faceted(headG, 0.62, 0.15, 8), mat());
  headM.position.z = 0.28;
  head.add(headM);
  const eyeG = new SphereGeometry(0.06, 6, 4);
  const eyeM = new MeshBasicMaterial({ color: '#000000' });
  const e1 = new Mesh(eyeG, eyeM); e1.position.set(0.21, 0.1, 0.52); head.add(e1);
  const e2 = new Mesh(eyeG, eyeM); e2.position.set(-0.21, 0.1, 0.52); head.add(e2);
  body.add(head);

  function flipper(len: number, rad: number, seed: number) {
    const g = new SphereGeometry(1, 9, 5);
    g.scale(len / 2, 0.075, rad);
    g.translate(len / 2 - 0.08, 0, 0);
    const gp = g.attributes.position;
    for (let q = 0; q < gp.count; q++) {
      const u = clamp(gp.getX(q) / len, 0, 1);
      gp.setZ(q, gp.getZ(q) * (1.15 - 0.55 * u) - u * u * rad * 0.9);
    }
    jitter(g, 0.08, seed);
    return new Mesh(faceted(g, 0.55, 0.2, seed), mat());
  }
  function limb(x: number, y: number, z: number, len: number, rad: number, sweep: number, side: number, seed: number) {
    const pivot = new Group();
    pivot.position.set(x * side, y, z);
    const inner = new Group();
    inner.rotation.y = sweep;
    inner.add(flipper(len, rad, seed));
    pivot.add(inner);
    if (side < 0) pivot.scale.x = -1;
    body.add(pivot);
    return pivot;
  }
  const fr = limb(0.95, -0.02, 0.62, 1.8, 0.4, -0.35, 1, 11);
  const fl = limb(0.95, -0.02, 0.62, 1.8, 0.4, -0.35, -1, 12);
  const br = limb(0.75, -0.05, -1.0, 0.9, 0.3, 0.6, 1, 13);
  const bl = limb(0.75, -0.05, -1.0, 0.9, 0.3, 0.6, -1, 14);
  const tailG = new ConeGeometry(0.12, 0.45, 4);
  tailG.rotateX(-Math.PI / 2);
  const tail = new Mesh(faceted(tailG, 0.55, 0.1, 15), mat());
  tail.position.set(0, -0.02, -1.62);
  body.add(tail);
  return { turtle, parts: { head, fr, fl, br, bl } };
}

export interface TurtleRenderer {
  resize(w: number, h: number, dpr: number): void;
  /** Starts or pauses the 30 fps loop; with reduced motion it draws one still frame. */
  run(on: boolean): void;
  /** Redraws now; used for the still frame after a resize or when the fonts arrive. */
  redraw(): void;
  dispose(): void;
}

type Canvas2D = HTMLCanvasElement | OffscreenCanvas;
const raf: (cb: (t: number) => void) => number =
  typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb) => setTimeout(() => cb(performance.now()), 16) as unknown as number;
const caf: (id: number) => void = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;

/** Throws when WebGL is not available; the page then falls back to plain text. */
export async function createTurtle(canvas: Canvas2D, input: () => TurtleInput, still: boolean): Promise<TurtleRenderer> {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  const glc = (typeof OffscreenCanvas === 'function' ? new OffscreenCanvas(2, 2) : document.createElement('canvas')) as HTMLCanvasElement;
  const renderer = new WebGLRenderer({ canvas: glc, antialias: false, alpha: true });
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  const rt = new WebGLRenderTarget(2, 2);
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 1.1, 9);
  camera.lookAt(0, 0, 0);
  const VIS_H = 2 * 9 * Math.tan((35 / 2) * Math.PI / 180);
  scene.add(new HemisphereLight('#ffffff', '#202020', 0.75));
  const sun = new DirectionalLight('#ffffff', 1.25);
  sun.position.set(3, 6, 4);
  scene.add(sun);
  const { turtle, parts: U } = buildTurtle();
  scene.add(turtle);
  await renderer.compileAsync(scene, camera).catch(() => {});

  let w = 0, h = 0, dpr = 1, fs = 11, cw = 7, chh = 11, cols = 2, rows = 2, buf = new Uint8Array(16);
  const bubbles: { x: number; y: number; v: number; k: number }[] = [];
  for (let b = 0; b < 46; b++) bubbles.push({ x: Math.random(), y: Math.random(), v: 0.02 + Math.random() * 0.05, k: Math.random() });

  let sx = 0, sy = 0, yawS: number | null = null;
  const start = performance.now();

  /** Draws one frame. The smoothing is scaled by dt so 30 fps eases like the original 60. */
  function draw(now: number, dt: number) {
    if (w < 2 || h < 2) return;
    const inp = input();
    const t = still ? 0 : (now - start) / 1000;
    const st = stateFor(inp);
    const intro = still ? 1 : clamp((now - start) / 1800, 0, 1);
    const ei = 1 - Math.pow(1 - intro, 3);
    const f60 = dt * 60;
    const k05 = 1 - Math.pow(0.95, f60), k08 = 1 - Math.pow(0.92, f60);

    if (!still) { sx += (inp.mx - sx) * k05; sy += (inp.my - sy) * k05; }
    const yawT = (st.yaw || 0) + sx * 0.35;
    if (yawS === null || still) yawS = yawT;
    yawS += (yawT - yawS) * k08;
    const aspect = (cols * cw) / Math.max(1, rows * chh);
    const s = clamp((VIS_H * aspect * (st.fill || 0.55)) / 5.4, 0.3, st.maxScale || 1);
    turtle.scale.setScalar(s);
    const fromX = st.introX || 0, fromY = st.introY === undefined ? -3.2 : st.introY;
    turtle.position.x = (st.x || 0) * VIS_H * aspect + fromX * (1 - ei);
    turtle.position.y = -(st.y || 0) * VIS_H + fromY * (1 - ei) + Math.sin(t * 0.9) * 0.08 * s;
    turtle.rotation.y = yawS + (st.introYaw || 0) * (1 - ei);
    turtle.rotation.x = (st.pitch ?? 0.3) + sy * 0.18 + (1 - ei) * -0.5;
    turtle.rotation.z = Math.sin(t * 0.9) * 0.05;
    const k = t * 1.9;
    U.fr.rotation.z = Math.sin(k) * 0.5; U.fr.rotation.y = Math.sin(k - 0.7) * 0.28;
    U.fl.rotation.z = Math.sin(k) * 0.5; U.fl.rotation.y = Math.sin(k - 0.7) * 0.28;
    U.br.rotation.y = Math.sin(k + 1.2) * 0.32; U.bl.rotation.y = Math.sin(k + 1.2) * 0.32;
    U.head.rotation.x = Math.sin(t * 0.9 + 1) * 0.06 + sy * 0.15;
    U.head.rotation.y = sx * 0.25;

    renderer.setRenderTarget(rt);
    renderer.render(scene, camera);
    renderer.readRenderTargetPixels(rt, 0, 0, cols, rows, buf);
    renderer.setRenderTarget(null);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = THEMES[inp.theme].accent;
    ctx.font = fs + 'px "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace';
    ctx.textBaseline = 'top';
    // One fillText per row: IBM Plex Mono advances exactly 0.6em, the same as cw,
    // so spaces put every character on its cell.
    const L = RAMP.length - 1, seed = Math.floor(t * 12);
    for (let r = 0; r < rows; r++) {
      const src = (rows - 1 - r) * cols * 4;
      let line = '', end = 0;
      for (let c = 0; c < cols; c++) {
        const i = src + c * 4;
        if (buf[i + 3] < 60) continue;
        if (intro < 1 && hash(c, r, seed, 1) > ei) continue;
        const l = (buf[i] * 0.3 + buf[i + 1] * 0.59 + buf[i + 2] * 0.11) / 255;
        line += ' '.repeat(c - end) + RAMP.charAt(Math.round(l * L));
        end = c + 1;
      }
      if (line) ctx.fillText(line, 0, r * chh);
    }
    ctx.globalAlpha = 0.55;
    for (const bb of bubbles) {
      if (!still) bb.y -= bb.v * dt;
      if (bb.y < -0.02) { bb.y = 1.02; bb.x = Math.random(); }
      const bc = Math.floor(bb.x * cols), br2 = Math.floor(bb.y * rows);
      const g = bb.k > 0.8 ? 'o' : (bb.k > 0.45 ? '°' : '.');
      ctx.fillText(g, bc * cw + Math.sin(t * 1.3 + bb.k * 9) * 3, br2 * chh);
    }
    ctx.globalAlpha = 1;
  }

  let id = 0, last = 0, lastDraw = 0;
  function frame(now: number) {
    id = raf(frame);
    if (now - lastDraw < FRAME_MS - 4) return;
    lastDraw = now;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    draw(now, dt);
  }

  return {
    resize(nw, nh, nd) {
      nw = Math.max(1, Math.round(nw)); nh = Math.max(1, Math.round(nh)); nd = Math.min(nd || 1, 2);
      if (nw === w && nh === h && nd === dpr) return;
      w = nw; h = nh; dpr = nd;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      fs = w < 560 ? 8 : (w < 1000 ? 10 : 11);
      cw = fs * 0.6; chh = fs * 1.02;
      cols = Math.max(2, Math.floor(w / cw)); rows = Math.max(2, Math.floor(h / chh));
      rt.setSize(cols, rows);
      buf = new Uint8Array(cols * rows * 4);
      camera.aspect = (cols * cw) / (rows * chh);
      camera.updateProjectionMatrix();
      if (still) draw(performance.now(), 0);
    },
    run(on) {
      if (still) return;
      if (on && !id) { last = performance.now(); id = raf(frame); }
      else if (!on && id) { caf(id); id = 0; }
    },
    redraw() { draw(performance.now(), 0); },
    dispose() { if (id) caf(id); rt.dispose(); renderer.dispose(); },
  };
}
