# Design System Specification: "Peras" Style
**Version:** 1.0  
**Target Audience:** AI Coding Agents, Frontend Developers, UI/UX Designers  
**Primary Goal:** Replicate the distinct editorial, warm-tech aesthetic shown in the "Peras" reference design.

---

## 1. Core Visual Philosophy
The "Peras" style is a fusion of **premium editorial layout** (warm paper-like backgrounds, elegant serif typography) and **clean, modern functional software UI** (deep navy text, crisp sans-serif interfaces, floating white content cards, and vibrant blue accents). 

**Key Principles for Agents:**
1. **Generous Whitespace:** Do not crowd elements. Use large margins and padding (40px–80px between sections) to create a calm, focused, academic yet accessible atmosphere.
2. **Editorial Contrast:** Always pair high-contrast serif headlines with highly functional sans-serif UI elements.
3. **Soft Depth:** UI elements (cards, badges) should feel like they float softly above the warm beige canvas.

---

## 2. Color Palette & Design Tokens

Use the following exact Hex values and roles across the application:

| Token Name | Hex Code | Role & Usage Rules |
| :--- | :--- | :--- |
| `bg-global` | `#F6F0EA` | **Global Page Background.** Must be used for the main body/canvas. Gives the warm, physical paper feel. |
| `text-primary` | `#0C203B` | **Primary Text & Navy.** Deep navy blue used for all primary headlines (H1/H2) and body copy. Never use pure black (`#000000`). |
| `accent-blue` | `#3B62A5` | **Primary Accent.** Royal blue used for interactive elements, CTA buttons, progress bar fills, and emphasized *italic* words in headlines. |
| `bg-card` | `#FFFFFF` | **Surface / Card Background.** Pure white used for content cards, dashboards, and floating UI containers. |
| `bg-badge` | `#EEF2F6` | **Subtle Blue / Badge Surface.** Soft ice-blue used for tag backgrounds, secondary button states, and icon containers. |
| `text-muted` | `#8C9BB0` | **Muted / Secondary Text.** Used for timestamps, metadata, captions, and inactive states. |
| `border-subtle` | `#E2E8F0` | **Borders & Dividers.** Subtle divider lines inside white cards or around UI elements. |
| `line-path` | `#B8C4D6` | **Connecting Lines.** Used specifically for dashed/dotted lines connecting learning nodes or steps. |
| `status-success`| `#429A64` | **Success Indicator.** Green used for completed states (e.g., checkmarks, "On track" text). |

---

## 3. Typography System

The interface relies on a strict dual-font system. 

### A. Display & Headlines (Serif)
* **Font Family:** `Lora`, `Playfair Display`, or `Georgia`, serif.
* **Usage:** H1, H2, hero titles, and major section headers.
* **Styling Rule:** Keep font-weight normal (`400` or `500`). 
* **The "Editorial Emphasis" Rule:** Within H1 and H2 headlines, dynamically combine normal serif text with **italicized words** (`font-style: italic;`). The italicized words must frequently be colored in `accent-blue` (`#3B62A5`) to draw the eye and add editorial flair (e.g., *"Learn anything. **Adapt** as you learn."*).

### B. UI, Body & Functional Text (Sans-Serif)
* **Font Family:** `Inter`, `SF Pro Display`, or `Helvetica Neue`, sans-serif.
* **Usage:** Body copy, buttons, navigation, badges, progress labels, card content.
* **Styling Rule:** Clean, highly legible, appropriate line-height (`1.5` to `1.6`). Colors should be `text-primary` for readable text and `text-muted` for secondary descriptions.

---

## 4. UI Components & Architectural Rules

### A. Content Cards & Floating Surfaces
When creating containers for data, learning paths, or dashboards:
* **Background:** `bg-card` (`#FFFFFF`)
* **Border Radius:** `16px` to `24px` (smooth, modern rounded corners)
* **Box Shadow:** `0px 8px 30px rgba(12, 32, 59, 0.06)` (very soft navy-tinted shadow; avoid harsh black shadows)
* **Padding:** Internal padding must be spacious (`24px` or `32px`).
* **Border:** Optional subtle border `1px solid rgba(226, 232, 240, 0.6)`.

### B. Badges & Tags
Used for category indicators (e.g., "• ADAPTED FOR YOU"):
* **Shape:** Pill shape (`border-radius: 999px`)
* **Background:** `bg-badge` (`#EEF2F6`)
* **Text Styling:** Small font size (`11px` or `12px`), **UPPERCASE**, bold/semibold (`600`), tracking/letter-spacing (`0.05em`), colored in `accent-blue` (`#3B62A5`).
* **Optional Icon/Bullet:** Include a small circle bullet or sparkle icon before the text.

### C. Progress Bars
* **Track (Background):** Height `6px` to `8px`, color `#E0E6ED`, fully rounded (`border-radius: 999px`).
* **Fill (Indicator):** Color `accent-blue` (`#3B62A5`), fully rounded.
* **Layout:** Place percentage text (e.g., "72%") in a large, clean sans-serif font above the bar, paired with a small green status dot ("• On track") below it.

### D. Connecting Paths & Node Timelines
A signature element of this design is visual progression:
* **Lines:** Connect sequential steps or cards using **dashed or dotted lines** (`border: 1.5px dashed #B8C4D6;` or SVG paths).
* **Nodes:** Steps in a path should be represented by rounded boxes or circles. Active/Current steps should be highlighted in white cards with an `accent-blue` border or small blue anchor dot (`#3B62A5`).

---

## 5. Imagery, Icons & Graphic Elements

* **3D & Topographic Graphics:** Hero images or header cards should incorporate abstract, high-end 3D graphics (e.g., topographic maps, smooth wavy terrains, or abstract geometric flows). Use color gradients mapping from deep navy (`#0C203B`) to ice blue (`#8C9BB0`) and white.
* **Iconography:** Use minimalist, linear outline icons (1.5px stroke weight). Place icons inside small rounded squares (`border-radius: 8px`) with a `bg-badge` background when listing features or metadata.
* **Background Flourishes:** On the global beige background, subtle, free-form dotted/dashed SVG guide lines with small circle endpoints can be routed between UI elements to reinforce the "learning path / connection" theme.

---

## 6. Ready-to-Use CSS Tokens (Copy into Stylesheet)

```css
:root {
  /* Colors */
  --color-bg-global: #F6F0EA;
  --color-bg-card: #FFFFFF;
  --color-bg-badge: #EEF2F6;
  
  --color-text-primary: #0C203B;
  --color-text-secondary: #5C6E8A;
  --color-text-muted: #8C9BB0;
  
  --color-accent-blue: #3B62A5;
  --color-accent-green: #429A64;
  
  --color-border: #E2E8F0;
  --color-path-line: #B8C4D6;

  /* Typography */
  --font-serif: 'Lora', 'Playfair Display', 'Georgia', serif;
  --font-sans: 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;

  /* Elevation & Radii */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;

  --shadow-soft: 0 10px 30px -5px rgba(12, 32, 59, 0.06);
  --shadow-hover: 0 20px 40px -10px rgba(12, 32, 59, 0.1);
}