<div align="center">

<img src="https://cdn.v1ggs.lol/tcet/oscilation-logo.png" alt="Oscillation 3.0" width="200" />

# Oscillation 3.0

**Official event website for the annual hackathon by IETE Students' Forum, TCET Mumbai**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-bb4b96?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?logo=javascript&logoColor=black)](https://github.com/v1ggs-dev/oscillation-iete-tcet/search?l=javascript)
[![Netlify](https://img.shields.io/badge/Netlify-deployed-00c7b7?logo=netlify&logoColor=white)](https://oscillation-iete.netlify.app)

[**View Live → oscillation-iete.netlify.app**](https://oscillation-iete.netlify.app)

</div>

---

## Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Branch Strategy](#branch-strategy)
- [Getting Started](#getting-started)
- [Updating Content for a New Edition](#updating-content-for-a-new-edition)
- [Credits](#credits)

---

## About

Source code for the official event site for **Oscillation**, the inter-college hackathon run by the IETE Students' Forum at Thakur College of Engineering & Technology (TCET), Mumbai. The current edition is **Oscillation 3.0**, held on 4th April 2026.

The site covers the full event lifecycle: pre-event registration and information, live screening round results, and post-event archival. It runs two competition tracks — **Ideathon** (pitch-only, no code) and **Project Presentation** (working prototype) — each with its own format, themes, and prizes.

This is a **fully static frontend SPA** with no backend, no API, and no database. All content (tracks, timeline, finalists, team, sponsors) lives as JavaScript data files that are bundled at build time.

---

## Screenshots

| | |
|---|---|
| ![Hero](https://cdn.v1ggs.lol/tcet/hero.png) | ![Tracks](https://cdn.v1ggs.lol/tcet/tracks.png) |
| ![Prizes](https://cdn.v1ggs.lol/tcet/prizes.png) | ![Footer](https://cdn.v1ggs.lol/tcet/footer.png) |

---

## Features

### Animated Loading Screen

A branded page loader plays on every visit — 24 animated wave bars create an interference pattern, with the "OSCILLATION 3.0" title revealed letter-by-letter using a spring animation. The loader fades out after 2.5 seconds.

### Visual Effects

- **Aurora background** — four parallax orbs drift at different scroll speeds using Framer Motion's `useTransform`, disabled on mobile for performance
- **Scroll progress bar** — spring-physics line at the top of the viewport
- **3D tilt cards** — mouse-tracking tilt on the track cards and prizes section, with a spotlight gradient that follows the cursor
- **Back-to-top button** — appears after 400px of scroll

### Navbar

Scroll-aware: flat by default, picks up a floating glass style after 50px. Active section detection using scroll position. Animated per-letter logo. Collapsible hamburger menu on mobile.

### Hero

Character-split staggered text reveal, typewriter cycling through "Build the Future / Innovate & Create / Win Big", flip-digit countdown timer to the event date, and CTA buttons linking to Unstop registration and the About section.

### About

Animated stat counters (triggered on intersection) for tracks, prize pool, special awards, and themes. Three highlight cards (Innovation, Networking, Competition) with the IETE and TCET logos.

### Tracks

Two expandable track cards — Ideathon and Project Presentation — each with:
- Mouse-tracking 3D tilt and cursor spotlight
- Track details (team size, format, duration, submission notes)
- Finalists list for the screening round, shown inside an animated modal portal
- **Pitch deck template** (`.pptx`) downloadable directly from the card

**Ideathon themes:** Tech for Social Good, AI for Bharat, Sustainable Innovation, Smart Campus Solution, Future of Automation

**Project Presentation subtracks:** AI / ML, Web Development, Embedded Systems, Blockchain

### Timeline *(archive/2026 only)*

Alternating left/right timeline with per-item scroll-triggered slide-in. Each step has a status (`completed`, `active`, `upcoming`) that drives visual state.

### Benefits *(archive/2026 only)*

Six benefit cards (Certificates, Prizes, Industry Exposure, Networking, Skill Building, Real Problems) with staggered reveal on scroll.

### Prizes

Prize pool highlight card for the Project Presentation track (₹7.8K). Podium layout for 1st, 2nd, and 3rd place, and a special awards grid: Best UI/UX, Most Social Impact, Jury Choice, Audience Choice. Ideathon winner: Trophy + Certificates.

### Guidelines *(archive/2026 only)*

Accordion covering team rules, resource policies, general conduct, and track selection guidelines.

### Team

Core team of 8 members (Chairperson → Outreach Coordinator) with photos, roles, and LinkedIn links. Working committee grid broken into sub-teams (Sponsorship, Creative, etc.).

### Sponsors

Logo grid: Unstop (powered by), OSEN, Level Up, Vercel.

### FAQ *(archive/2026 only)*

Accordion covering team roster rules, topic changes, travel logistics, equipment, prizes, and evaluation criteria.

### Register *(archive/2026 only)*

Pre-event CTA section linking to Unstop. Switches to a "Registration Closed" state with a disabled button once registration ends.

### WhatsApp FAB *(archive/2026 only)*

Floating WhatsApp button that appears after a 3-second delay. Opens a popup with a scannable QR code for the event group.

### SEO

`index.html` includes full SEO: JSON-LD `Event` schema (start/end date, location, organizer, URL), Open Graph tags, Twitter Cards, canonical URL, and `robots: index, follow`.

### Security

Right-click (context menu) and the following keyboard shortcuts are disabled site-wide: `Ctrl+A`, `Ctrl+C`, `Ctrl+X`, `Ctrl+U`, `Ctrl+P`, `Ctrl+S`, `F12`, `Ctrl+Shift+I/J/C`.

---

## Tech Stack

This is a **frontend-only** project. There is no backend, no server-side rendering, and no database.

| | Technology | Version | Notes |
|---|---|---|---|
| ⚛️ | React | 19 | |
| ⚡ | Vite | 7 | Terser minification in prod |
| 🎬 | Framer Motion | 12 | Animations, parallax, spring physics |
| 🔣 | react-icons | 5 | HeroIcons + FontAwesome sets |
| 🎨 | Vanilla CSS | — | CSS custom properties; **no Tailwind, no CSS framework** |
| 🔤 | Inter + Space Grotesk | — | Google Fonts |
| 🌐 | Netlify | — | Auto-detected Vite build |

No router is used. The site is a single scrollable page; navigation is smooth-scroll to section `id`s.

CSS is split per component (`Navbar.css`, `Hero.css`, etc.) and loaded alongside each `.jsx` file. Global design tokens (palette, spacing, typography, transitions) live in `src/index.css` as CSS custom properties.

---

## Project Structure

```
oscillation-iete-tcet/
├── public/
│   ├── favicon.svg
│   └── og-image.png                  # Open Graph image for social sharing
├── src/
│   ├── assets/
│   │   ├── iete_logo.svg
│   │   ├── tcet_logo.svg
│   │   ├── img_Chairperson.webp       # Core team photos
│   │   ├── img_wc_*.webp              # Working committee photos
│   │   ├── sponsors/                  # Sponsor logo images
│   │   ├── unstop/                    # Unstop branding assets
│   │   ├── static/
│   │   │   └── wqr.png               # WhatsApp group QR code
│   │   └── Oscillation Pitchdeck Template.pptx   # Downloadable pitch deck
│   ├── components/                    # One .jsx + one .css per section
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── About.jsx / About.css
│   │   ├── Tracks.jsx / Tracks.css
│   │   ├── Timeline.jsx / Timeline.css      # archive/2026 branch only
│   │   ├── Benefits.jsx / Benefits.css      # archive/2026 branch only
│   │   ├── Prizes.jsx / Prizes.css
│   │   ├── Guidelines.jsx / Guidelines.css  # archive/2026 branch only
│   │   ├── Team.jsx / Team.css
│   │   ├── Sponsors.jsx / Sponsors.css
│   │   ├── FAQ.jsx / FAQ.css               # archive/2026 branch only
│   │   ├── Register.jsx / Register.css     # archive/2026 branch only
│   │   ├── Footer.jsx / Footer.css
│   │   ├── TiltCard.jsx                    # Shared 3D tilt utility component
│   │   └── WhatsAppFAB.jsx / .css          # archive/2026 branch only
│   ├── config/
│   │   └── constants.js               # REGISTRATION_URL, WHATSAPP_URL, SOCIALS
│   ├── data/
│   │   ├── tracks.jsx                 # Track definitions, themes, special awards
│   │   ├── results.js                 # Round 1 finalist team names (both tracks)
│   │   └── timeline.jsx               # Event timeline steps with status flags
│   ├── hooks/
│   │   └── useIsMobile.js             # matchMedia hook (breakpoint: 768px)
│   ├── App.jsx                        # Root — composes all sections, global utils
│   ├── index.css                      # Global CSS variables, resets, base styles
│   └── main.jsx                       # React entry point
├── index.html                         # Vite entry; all SEO meta + JSON-LD schema
├── vite.config.js                     # React plugin, pptx asset inclusion, manual chunk split
├── eslint.config.js
└── package.json
```

> **Note on `index.html`:** It lives at the repo root — this is standard for Vite. It's the HTML entry point that Vite processes at build time. Don't move it into `public/`.
>
> **Note on `vite.config.js`:** `assetsInclude: ['**/*.pptx']` is set explicitly so the pitch deck template is treated as a bundleable asset and given a hashed filename in the output.

---

## Branch Strategy

This repo uses a **rolling main + frozen archive** pattern so the same codebase can serve multiple editions:

| Branch | Purpose | Status |
|---|---|---|
| `main` | Active development — post-event or next-edition work | Always changing |
| `archive/2026` | Frozen snapshot of the 2026 event site, exactly as it was live | Read-only |

When a new edition starts, `main` gets updated with new content, new team, new sponsors, and any UI changes. When that edition's event concludes, a new `archive/YYYY` branch is cut from main at that point and left frozen.

**Sections that exist in `archive/2026` but are absent from `main`** (stripped post-event):
`Timeline`, `Benefits`, `Guidelines`, `FAQ`, `Register`, `WhatsAppFAB`

These will be added back to `main` when building the next edition.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Run locally

```bash
git clone https://github.com/v1ggs-dev/oscillation-iete-tcet.git
cd oscillation-iete-tcet
npm install
npm run dev
```

The Vite dev server starts at `http://localhost:5173`.

### Build for production

```bash
npm run build     # Outputs to dist/
npm run preview   # Serve the production build locally
```

### Deploy to Netlify

Netlify auto-detects the Vite setup. No `netlify.toml` is required. Set the following in Netlify's build settings if needed:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |

Since there is no server-side routing, Netlify's default SPA redirect handling (`/* → /index.html`) is not required here — the site has no client-side routes.

---

## Updating Content for a New Edition

All event-specific content is isolated to a small set of files. For a new edition, these are the files to update — no component logic needs to change:

**`src/config/constants.js`** — Update `REGISTRATION_URL`, `WHATSAPP_URL`, and social links.

**`src/data/tracks.jsx`** — Update track descriptions, themes/subtracks, format details, and special awards.

**`src/data/results.js`** — Replace finalist arrays with the new edition's Round 1 results.

**`src/data/timeline.jsx`** — Update event dates and step statuses (`completed` / `active` / `upcoming`).

**`src/components/Team.jsx`** — Replace `coreTeam` and `workingCommittee` arrays with the new committee's names, roles, photos, and LinkedIn URLs.

**`src/components/Sponsors.jsx`** — Swap sponsor logo imports and links.

**`src/assets/`** — Replace team member photos (`.webp`), sponsor logos, pitch deck template (`.pptx`), and WhatsApp QR code.

**`index.html`** — Update the JSON-LD `startDate`, `endDate`, edition name in `<title>` and meta tags, and the canonical URL.

---

## Credits

Built by [Vignesh Bordikar](https://v1ggs.lol) — Technical Lead, IETE Students' Forum, TCET Mumbai.

---

<div align="center">

[🌐 Website](https://oscillation-iete.netlify.app) · [📸 Instagram](https://www.instagram.com/tcet_iete) · [💼 LinkedIn](https://in.linkedin.com/company/ietetcet)

</div>
