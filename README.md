<div align="center">
  <img src="public/favicon.svg" width="96" height="96" alt="Toms mark" />
  <h1>thomas-haiden.com</h1>
  <p><strong>The personal site of Thomas Haiden: eight static pages in the Pond style, flat tiles on a 40px grid, italic serifs and motion in steps.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Build-Vite%208-neutral?style=flat-square" alt="Build" />
    <img src="https://img.shields.io/badge/Language-TypeScript-neutral?style=flat-square" alt="Language" />
    <img src="https://img.shields.io/badge/Framework-None-neutral?style=flat-square" alt="No Framework" />
    <img src="https://img.shields.io/badge/Hosting-Vercel%20(planned)-neutral?style=flat-square" alt="Hosting" />
  </p>
</div>

---

![The home page](docs/screenshot.jpg)

---

## Architecture

Every page is a plain HTML file. A small **Vite** plugin fills in the shared head, header and footer at build time, so the navigation works without JavaScript. One **TypeScript** module adds the motion on top.

```mermaid
flowchart TD
    Pages["Page HTML<br/><b>index.html, pulse/, gnome/, …</b>"]
    List["src/pages.ts<br/><b>Order and labels of all pages</b>"]
    Chrome["src/chrome.ts<br/><b>Head, header, footer</b>"]
    Plugin["vite.config.ts<br/><b>chrome plugin, one input per page</b>"]
    Motion["src/motion.ts<br/><b>Headline covers, pixel field, dock</b>"]
    Style["src/style.css<br/><b>Pond tokens and components</b>"]
    Dist["dist/<br/><b>Static site</b>"]

    List --> Chrome
    Chrome --> Plugin
    Pages --> Plugin
    Plugin --> Dist
    Motion --> Dist
    Style --> Dist
```

## Pages

| **Path** | **Content** |
| :--- | :--- |
| **/** | Hero with a pixel field, projects, more repos, journey as a tree, skills, contact |
| **/pulse/** | Pulse, the health app for Android |
| **/tomsllama/** | tomsllama, the desktop client for local Ollama models |
| **/gnome/** | Halo, Harbor, Ledge, Tally, Ember and Torch |
| **/design/** | Toms Expressive Design |
| **/knot/** | Knot, the company and its founders |
| **/journey/** | Five stations, from school to the BSc |
| **/systems/** | C, C++, memory layout, SQL and hardware |

A new page needs an HTML file with `<body data-page="…">` and an entry in **src/pages.ts**; the build picks it up from there.

## Motion

- **Headlines:** Each headline starts under a grid of colour tiles; when it reaches the lower edge of the window the tiles go out one by one. Two small tiles stay at its edges.
- **Everything else:** No scroll animation. Text, cards and images are simply there.
- **Drawings:** The pixel field draws a **T** and an **H**, the journey tree draws its edges, the Knot logo assembles strand by strand, the struct bytes appear one at a time.
- **Phone dock:** Below 640px a bar floats at the bottom with work, journey, skills and contact; on subpages it also leads to the previous and next page.
- **Reduced motion:** With `prefers-reduced-motion: reduce` no tiles cover anything and nothing moves.
- **Without JavaScript:** Covers are created by the script, so without it every headline is readable; hidden start states apply only under `html.motion`.

## Assets

| **Path** | **Source** |
| :--- | :--- |
| **public/fonts/** | Instrument Serif, Onest, IBM Plex Mono, JetBrains Mono (latin subsets, SIL Open Font License) |
| **public/shots/** | Screenshots from the `readmestuff/` folder of each repository |
| **public/knot.svg** | The Knot logo, Logo 02 from the Knot design files |

## Development

```bash
npm install
npm run dev
```

`npm run check` builds the site and fails if any page links to a local file that is not in `dist/`.

## Status

- **Build and link check:** *tested*, `npm run check` passes.
- **Desktop (1440px) and phone (375px):** *tested* in the browser, all eight pages, no horizontal scroll.
- **Reduced motion:** *built*, not yet checked in a browser with the setting on.
- **Vercel:** *planned*.
