/* Runs the turtle off the main thread: three.js, the render and the ASCII drawing
   all happen here on the canvas the page transferred. */
import { createTurtle, type TurtleInput, type TurtleRenderer } from './turtle';

export type ToWorker =
  | { type: 'init'; canvas: OffscreenCanvas; input: TurtleInput; still: boolean; font: string; w: number; h: number; dpr: number }
  | { type: 'input'; input: Partial<TurtleInput> }
  | { type: 'size'; w: number; h: number; dpr: number }
  | { type: 'run'; on: boolean }
  | { type: 'redraw' };

export type FromWorker = { type: 'ready' } | { type: 'error'; message: string };

const post = (m: FromWorker) => postMessage(m);
let input: TurtleInput;
let turtle: TurtleRenderer | null = null;
let size: [number, number, number] = [0, 0, 1];
let running = false;

onmessage = async (e: MessageEvent<ToWorker>) => {
  const m = e.data;
  if (m.type === 'init') {
    input = m.input;
    size = [m.w, m.h, m.dpr];
    try {
      turtle = await createTurtle(m.canvas, () => input, m.still);
    } catch (err) {
      post({ type: 'error', message: String(err) });
      return;
    }
    turtle.resize(...size);
    turtle.run(running);
    post({ type: 'ready' });
    // The worker has its own font set; the still frame is redrawn once Plex Mono is in.
    const face = new FontFace('IBM Plex Mono', `url(${m.font})`);
    (self as unknown as { fonts: FontFaceSet }).fonts.add(face);
    face.load().then(() => turtle?.redraw(), () => {});
  } else if (m.type === 'input') {
    Object.assign(input, m.input);
  } else if (m.type === 'size') {
    size = [m.w, m.h, m.dpr];
    turtle?.resize(...size);
  } else if (m.type === 'run') {
    running = m.on;
    turtle?.run(m.on);
  } else if (m.type === 'redraw') {
    turtle?.redraw();
  }
};
