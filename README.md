# Harsh Prajapati — Portfolio

MERN-developer portfolio built with React, TypeScript, Tailwind CSS v4, and Motion (Framer Motion).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Adding screenshots and videos

Drop files into `public/projects/<project>/` — Vite serves everything in `public/` at the root, no import needed. The project cards already point at these exact paths, so matching the filename is all it takes:

```
public/projects/optivis/dashboard.png
public/projects/optivis/insights.png
public/projects/optivis/demo.mp4
public/projects/finnova/upload.png
public/projects/finnova/analysis.png
public/projects/einvite/before-after-pricing.png
public/projects/einvite/before-after-articles.png
```

Until a file exists at that path, the card shows a placeholder with the expected filename instead of a broken image — so you'll always know exactly what's missing. Videos autoplay muted and loop, so short screen recordings (5–15s) work best.

To add more images per project, or rename files, edit the `media` array for that project in `src/data/projects.ts`:

```ts
media: [
  { type: 'image', src: '/projects/optivis/dashboard.png', alt: 'Optivis dashboard view' },
  { type: 'video', src: '/projects/optivis/demo.mp4', alt: 'Optivis product walkthrough' },
]
```

If a project has more than one media item, small dots appear under the frame to switch between them.

## Before you deploy

A few things are placeholders — swap these in `src/sections/Contact.tsx` and `src/data/projects.ts`:

- `CONTACT_EMAIL`, `GITHUB_URL`, `LINKEDIN_URL` in `Contact.tsx` — currently placeholder values.
- Project descriptions in `src/data/projects.ts` are drawn from what you've told me about Optivis, Finnova, and the EInvite audit — check the wording and swap in live links once you have them.
- Timeline dates in `src/sections/About.tsx` are approximate — adjust to your actual dates.

## Structure

```
src/
  components/   FadeIn, Magnet (magnetic hover), Marquee, AnimatedText, StackCard, Navbar
  sections/     Hero, About, Services, Projects, Contact
  data/         projects.ts, services.ts — edit content here without touching components
```

## Design notes

- Palette pulls from your Optivis brand colors (`#185FA5` / `#534AB7`) so the portfolio and product share a visual thread.
- Dark "editor" aesthetic with Space Grotesk (display), Inter (body), JetBrains Mono (labels/eyebrows) — leans into the developer identity rather than a generic template look.
- Motion: staggered word reveals, magnetic CTA buttons, infinite tech-stack marquee, and scroll-linked sticky stacking cards for the project section.
- Respects `prefers-reduced-motion`.
