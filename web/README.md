# Portfolio 3D — Ariel Francis Gacilo

Premium, interactive 3D developer portfolio for a Senior Frontend & Game Developer.

## Stack
- **Vite 8 + React 19** (ESM, HMR, Rolldown)
- **Tailwind CSS 3.4** — dark premium design system
- **Three.js + @react-three/fiber + @react-three/drei** — workstation 3D scene
- **Framer Motion 12** — intentional, spring-based reveals & modals
- Fonts: Inter, Space Grotesk, JetBrains Mono (Google Fonts)

## Structure
```
src/
  data.js              // curated from legacy global.js — 13 projects, 3 roles, 27 skills
  assets.js            // explicit image map (only 12 portfolio images + profile)
  assets/projects/     // optimized portfolio screenshots
  components/
    Nav.jsx            // floating glass nav, active section, mobile sheet
    Hero.jsx           // badge, stats, CTAs + lazy 3D workstation
    scene/WorkstationScene.jsx // R3F Canvas — 3 floating panels, grid, lights, mouse parallax
    About.jsx          // 4 cards + philosophy
    Skills.jsx         // 4 groups (Frontend/Game/Backend/Tooling) with level bars
    Projects.jsx       // filterable grid + tilt + case-study modal
    Experience.jsx     // timeline + devRoles
    Terminal.jsx       // typewriter interactive terminal
    Contact.jsx        // mailto form, direct links
    Reveal.jsx         // reduced-motion-aware reveal
  App.jsx, main.jsx, index.css
public/
  favicon.svg, icon.png, robots.txt, sitemap.xml
```

## Run
```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview  # preview prod at 4173
```

## Design Decisions
- **Preserved content**: all 13 legacy projects (8 casino + Keno + 2 corporate + 2 tools), 3 experiences, 27 skills — re-grouped, not invented.
- **3D**: lightweight low-poly workstation (no heavy models) — Grid + 3 Float panels + point lights. `dpr: [1,1.6]`, `prefers-reduced-motion` disables WebGL, mobile simplifies to CSS fallback.
- **Performance**: lazy `WorkstationScene` (`Suspense`), code-split vendor (857KB gz 227KB), explicit image imports (only 12 images), `will-change`, RAF-throttled mouse, `content-visibility` via Reveal.
- **A11y**: semantic headings, `aria-current`, `focus-visible`, keyboardable tilt cards & modal, `prefers-reduced-motion` disables springs & 3D.
- **SEO**: title/meta/OG/Twitter, semantic sections with ids, sitemap.xml + robots.txt.
- **Recruiter UX**: 10s scan strip, featured filters, stats, sticky CTAs.

## Performance Notes
- `npm run build`: `index 371KB gz 114KB + WorkstationScene 857KB gz 227KB + CSS 27KB`
- Legacy tech icons not bundled (saved ~600KB), profile 282KB remains — next step: convert to WebP/AVIF + lazy.
- Vite Rolldown, no `manualChunks` object (unsupported).

## TODOs
- [ ] Convert `profile.png` + portfolio JPGs to WebP/AVIF + `srcset`
- [ ] Add real `og-cover.png` (1200×630)
- [ ] Restrict & env-var Google Maps if re-adding map (removed hardcoded key)
- [ ] Add Vitest + axe audit
- [ ] Deploy to Cloudflare Pages / GitHub Pages (`homepage: "./"` handled via Vite `base`)

Legacy backup: `web-legacy/` (original CRA). Remove before publishing if desired.
