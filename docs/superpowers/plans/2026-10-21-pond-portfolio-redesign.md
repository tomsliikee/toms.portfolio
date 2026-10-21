# Pond Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current single-page portfolio with the eight-page Pond design from the exported template, in English, with stepped motion.

**Architecture:** One static HTML file per page, built by Vite as multiple inputs. Shared header and footer come from one TypeScript module; all motion lives in a second module driven by `data-` attributes in the HTML. Styles are the template's tokens and components, rewritten as plain CSS.

**Tech Stack:** Vite 8, TypeScript 5.9, plain CSS. No new dependency.

**Spec:** `docs/superpowers/specs/2026-10-21-pond-portfolio-redesign-design.md`

## Global Constraints

- English only. No German copy left anywhere.
- No new npm dependency; no request to a third-party host at runtime (fonts and images are local).
- No photo of Thomas.
- Shown repositories: pulse, tomsllama, halo, harbor, ledge, tally, ember, torch, dungeon-frodos_adventure. Not shown: Gem, ExperienceMatch, toms.portfolio.
- Knot logo: `~/git/documents/firmendesigns/Logos Fiverr/Logo 02/Knot-01.svg`, inline, on a dark surface.
- Every claim about software status uses the README's own wording (beta, in development); nothing is called "available" that is not.
- `prefers-reduced-motion: reduce` shows every element in its final state with no animation.
- Layout works at 375px wide without horizontal scroll.

## Review Focus

- JavaScript disabled or failing: every `[data-reveal]` element must still be visible (hidden state is set only by a class the script adds to `<html>`).
- Direct load of a subpage URL (`/gnome/`) in dev and in `vite preview`: page and assets resolve (asset paths absolute from root).
- Narrow screens: the 180px display headline and the marquee must not cause horizontal scroll at 375px.
- Reduced motion: no stepped stamp, no marquee movement, progress bar shows 45% at once.
- Missing screenshot file: build must fail loudly rather than ship a broken image (checked by Task 6's link check).

---

## File Structure

| File | Responsibility |
| :--- | :--- |
| `vite.config.ts` | Registers the eight HTML inputs |
| `index.html`, `<page>/index.html` ×7 | Page content only; each loads `/src/main.ts` |
| `src/pages.ts` | Ordered list of pages: `{ slug, path, title, navLabel }` |
| `src/chrome.ts` | `renderChrome(current: string): void` fills `<header data-chrome>` and `<footer data-chrome>`, including prev/next links |
| `src/motion.ts` | `initMotion(): void` – stamp, reveal, progress, knot assembly, pixel field |
| `src/main.ts` | Imports CSS, calls `renderChrome(document.body.dataset.page!)` then `initMotion()` |
| `src/style.css` | Tokens, fonts, layout, components |
| `public/fonts/*.woff2` | Fonts from the template bundle |
| `public/shots/<repo>/*.png` | Screenshots from the repositories |
| `scripts/check-links.mjs` | Verifies every local `src`/`href` in `dist/**/*.html` exists |

Deleted: `src/assets/*`, `public/Thomas_Haiden.png`, `public/Thomas_Haiden.webp`, `public/icons.svg` (asked in chat before deleting).

---

### Task 1: Scaffold, tokens, fonts, chrome

**Files:** Create `vite.config.ts`, `src/pages.ts`, `src/chrome.ts`; rewrite `src/main.ts`, `src/style.css`, `index.html`; create empty-content shells for the seven subpages; add `public/fonts/`.

**Interfaces:**
- Produces: `PAGES: readonly Page[]` with `type Page = { slug: string; path: string; title: string; navLabel: string }`, order `home, pulse, tomsllama, gnome, design, knot, journey, systems`; `renderChrome(current: string): void`; CSS tokens copied verbatim from the template's `:root` (`--paper:#efffe1`, `--ink:#1b322d`, `--lime:#cef058`, `--purple:#cba6f7`, `--cell:40px`, `--dur-step:95ms`, `--ease-steps-4:steps(4, end)`, …).

- [ ] Extract the woff2 files referenced by the template's `@font-face` rules into `public/fonts/`, named `<family>-<weight>-<style>.woff2`; write matching `@font-face` rules with `font-display: swap`.
- [ ] Port the template's base styles, nav pill group, "Toms" logo tile, chips, display type and footer to `src/style.css`.
- [ ] Implement `PAGES` and `renderChrome`; subpages get "← start", the section label and "next: <navLabel> →"; the home page gets the work/journey/skills/contact nav.
- [ ] Verify: `npm run build` passes; `npx vite preview` shows chrome on all eight URLs with the correct next link.
- [ ] Commit `feat: scaffold multi-page pond layout`.

### Task 2: Motion module

**Files:** Create `src/motion.ts`.

**Interfaces:**
- Consumes: markup attributes `data-stamp` (headline block), `data-reveal` (stepped entry, optional `data-delay` in steps), `data-progress="45"`, `data-knot` (SVG whose `path` children assemble), `data-pixels` (container for the pixel field).
- Produces: `initMotion(): void`.

- [ ] Add class `motion` to `<html>` only when `matchMedia('(prefers-reduced-motion: reduce)')` is false; all hidden starting states are scoped under `.motion`.
- [ ] Stamp: clip-path reveal in `steps(4)` at `--dur-step` per step, plus three to five coloured 40px cells that blink once over the block.
- [ ] Reveal: one `IntersectionObserver` (threshold 0.2), adds `is-in`, unobserves; siblings offset by `data-delay` × 95ms.
- [ ] Progress: width steps from 0 to the value in 10% stairs when revealed.
- [ ] Knot: paths appear one by one, 120ms apart, in `steps(2)`.
- [ ] Pixel field: a 40px grid in the hero's former photo slot; every 600ms one random cell toggles to a palette colour; stops when off-screen.
- [ ] Verify in browser: home hero stamps in; with reduced-motion emulated, everything is static and visible; with JS disabled, everything is visible.
- [ ] Commit `feat: add stepped pond motion`.

### Task 3: Home page

**Files:** `index.html`.

- [ ] Hero: "Efficient systems. Code close to the hardware_", "Thomas Haiden" display block, chips C / C++ / systems architecture, intro, Scroll, pixel field, "Studies 45 %".
- [ ] Marquee: C, C++, SQL, Flutter, Dart, GNOME Shell 50, Material 3 Expressive, Systems architecture.
- [ ] "What I work on – Code & Shape" on the dark band: 1 Pulse, 2 tomsllama, 3 GNOME (Halo, Harbor, Ledge, Tally, Ember, Torch), 4 Toms Expressive Design, 5 Knot / OutAbout (small inline logo), each linking to its page.
- [ ] "More repos": Frodo's Dungeon (Python), link to GitHub.
- [ ] Journey excerpt (three stations, 45% bar), Skills (four tiles), Contact (email, GitHub `tomsliikee`, Austria).
- [ ] Verify at 1440px and 375px; commit `feat: build home page`.

### Task 4: Project pages – pulse, tomsllama, gnome

**Files:** `pulse/index.html`, `tomsllama/index.html`, `gnome/index.html`, `public/shots/{pulse,tomsllama,halo,harbor,ledge,tally,ember,torch}/`.

- [ ] Copy screenshots with `gh api repos/tomsliikee/<repo>/contents/readmestuff/<file> --jq .download_url` + `curl`: pulse `hero, today, sleep, heart`; tomsllama `screenshot`; each extension `hero`.
- [ ] Pulse: template page translated; screenshots replace the three placeholders with captions Today, Sleep, Heart.
- [ ] tomsllama: Pulse layout; fact sheet from README (Flutter desktop, local Ollama, SQLite, no cloud, Linux tested; Windows/macOS untested); one screenshot.
- [ ] GNOME: shared rules block; six extension cards with the README's one-line description, hero screenshot and GitHub link; "What's next": a file manager.
- [ ] Verify each page at both widths; commit `feat: add pulse, tomsllama and gnome pages`.

### Task 5: Design, knot, journey, systems pages

**Files:** `design/index.html`, `knot/index.html`, `journey/index.html`, `systems/index.html`.

- [ ] Design: translated; "In use" lists Pulse, Halo, Harbor, Ledge, Tally, Ember, Torch; drop the palette placeholder.
- [ ] Knot: inline Logo 02 SVG with `data-knot`; palette swatches `#202a45 #5c6282 #979bc2 #bec0e9`; OutAbout fact sheet; drop team and screenshot placeholders.
- [ ] Journey: translated, five stations; drop the MoodRoute block.
- [ ] Systems: translated, memory layout example kept exactly (sizeof 12).
- [ ] Verify each page at both widths; commit `feat: add design, knot, journey and systems pages`.

### Task 6: Cleanup and verification

**Files:** `scripts/check-links.mjs`, `package.json` (script `check`), `README.md`, removals listed above.

- [ ] `check-links.mjs`: walk `dist/**/*.html`, collect local `src` and `href`, exit 1 listing any that do not exist in `dist/`.
- [ ] Add `"check": "npm run build && node scripts/check-links.mjs"`; run it, expect exit 0.
- [ ] Grep built HTML for German words (`und`, `nächstes`, `Projekt`, `ansehen`): no hits.
- [ ] Ask before deleting old assets; delete on yes.
- [ ] Rewrite README to the new structure per the vault's readme rules.
- [ ] Final browser pass: all eight pages, desktop, 375px, reduced motion.
- [ ] Commit `chore: clean up old design and add link check`.
