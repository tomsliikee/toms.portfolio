# Portfolio Redesign on the Pond Template

> 2026-10-21. Approved in chat by Thomas Haiden.

## Goal

Rebuild thomas-haiden.com on the exported design template (`~/Downloads/thomas-haiden.com.html`), in English, with quiet stepped motion in the manner of butterfly.so/pond, and show every public repository worth showing.

## Decisions

| Topic | Decision |
| :--- | :--- |
| Structure | Multi-page, as in the template |
| Language | English only |
| Stack | Vite multi-page build, plain TypeScript, no new dependency, no React |
| Photo | None. Its slot becomes a field of 40px pond cells |
| Knot logo | `documents/firmendesigns/Logos Fiverr/Logo 02/Knot-01.svg` (white wordmark, indigo and lilac strands), inline on a dark surface |
| Repositories | Pulse, tomsllama, Halo, Harbor, Ledge, Tally, Ember, Torch as projects; Frodo's Dungeon under "More repos". Not shown: Gem, ExperienceMatch, toms.portfolio |
| Old design | Replaced entirely (index.html, style.css, main.ts). `design.md` and `design.png` stay until Thomas decides |
| Hosting | Local preview for now, Vercel later. Static output in `dist/` |

## Pages

| URL | Source in template | Content |
| :--- | :--- | :--- |
| `/` | Startseite | Hero, pixel field, marquee, "Code & Shape" project list, More repos, journey excerpt, skills, contact |
| `/pulse/` | Pulse | Fact sheet, road to release, screenshots from `pulse/readmestuff` |
| `/tomsllama/` | new, Pulse layout | Fact sheet from README, screenshot |
| `/gnome/` | GNOME-Erweiterungen | Shared rules, six extensions with hero screenshot and link, what comes next (file manager) |
| `/design/` | Toms Expressive Design | Origin, foundations, two languages |
| `/knot/` | Knot & OutAbout | Logo, palette from the logo (`#202a45`, `#5c6282`, `#979bc2`, `#bec0e9`), OutAbout fact sheet |
| `/journey/` | Werdegang | Progress bar, five stations |
| `/systems/` | C / C++ & Systeme | Memory layout example, skills, data and hardware, languages |

Order of the "next" chain: home, pulse, tomsllama, gnome, design, knot, journey, systems.

Left out until Thomas supplies them: team members, OutAbout screenshots, the MoodRoute description, the Toms Expressive Design palette.

## Structure

- One HTML file per page, registered as Vite build inputs.
- `src/chrome.ts` renders the header and footer of every page from one list of pages.
- `src/motion.ts` holds all motion; `src/style.css` the tokens and components taken from the template.
- Fonts (Instrument Serif, Onest, IBM Plex Mono, JetBrains Mono, all OFL) are taken from the template bundle and served from `public/fonts/`.
- Screenshots are copied from the repositories into `public/shots/<repo>/`.

## Motion

- Headline blocks stamp in cell by cell (`steps()`, 95ms a step); a few coloured cells blink over the headline once.
- Sections, chips and tiles enter in steps as they scroll into view, one after another.
- The study bar fills to 45% in steps; the marquee runs; the Knot logo assembles strand by strand.
- Hover switches tile colours hard, without glow or shadow.
- `prefers-reduced-motion: reduce` shows everything in its final state.

## Verification

- `npm run build` passes.
- Every page clicked through in a browser at desktop width and at 375px, and once with reduced motion.
