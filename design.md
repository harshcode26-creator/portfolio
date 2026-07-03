# Design System — Harsh Prajapati Portfolio

## Why change the palette

The current theme (`#0a0d14` near-black + blue `#185fa5` → purple `#534ab7` gradient) is the single most common look in dev portfolios right now — it reads as "nice Tailwind template," not as a personal identity. The other obvious swap-in, warm cream + terracotta, is just as overused in AI-generated design right now.

This system replaces both with a **signal / noise** concept: you build products that turn raw data into something readable (Optivis surfaces productivity signals, Finnova parses financial noise into insight). The palette runs on a **near-black graphite** (not blue-black) with **one bright signal-mint accent** and **one warm amber "flag" accent** used sparingly for contrast — no gradient crutch. It carries directly into a light theme using the same two accents, darkened for contrast.

---

## Color palette

### Dark theme — "Night"

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#0B0D0C` | Page background — neutral graphite-black, not blue-tinted |
| `--color-paper` | `#131615` | Card / panel background |
| `--color-paper-hi` | `#1B201E` | Elevated surface (hover, active panel headers) |
| `--color-fg` | `#ECEEEA` | Primary text |
| `--color-muted` | `#8B9289` | Secondary text, captions |
| `--color-line` | `#262B28` | Borders, dividers |
| `--color-signal` | `#2FE8B8` | Primary accent — links, CTAs, active states |
| `--color-signal-2` | `#FFB347` | Secondary accent — flags, tags, "new," highlights only |
| `--color-danger` | `#FF6B5E` | Errors / form validation only |

### Light theme — "Day"

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#F5F6F2` | Page background — soft neutral, not cream |
| `--color-paper` | `#EAEBE5` | Card / panel background |
| `--color-paper-hi` | `#E0E2DA` | Elevated surface |
| `--color-fg` | `#131613` | Primary text |
| `--color-muted` | `#585F56` | Secondary text, captions |
| `--color-line` | `#D5D7CE` | Borders, dividers |
| `--color-signal` | `#0B7A63` | Primary accent — darkened teal, AA-compliant on light bg |
| `--color-signal-2` | `#A85D08` | Secondary accent — darkened amber, AA-compliant on light bg |
| `--color-danger` | `#C4392E` | Errors / form validation only |

**Contrast checked:** both `--color-fg` on `--color-ink` and `--color-signal` on `--color-ink` clear WCAG AA (4.5:1) for body text in each theme. `--color-signal-2` is reserved for large text, icons, borders, and badges — not for small body copy — in both themes.

**Usage rule:** `signal` is the workhorse accent (CTAs, links, active nav, the one gradient-text replacement). `signal-2` (amber) is a *flag* color — used for maybe 5% of accents: a "shipped" badge, a status dot, one underline on hover. Never blend the two into a gradient; that's the exact move this palette is trying to get away from. If you want a two-tone moment, place them **side by side** (e.g. a teal tag next to an amber tag) rather than blended.

---

## Implementation — Tailwind v4 tokens

Drop this into `src/index.css`, replacing the current `@theme` block. Uses `[data-theme]` on `<html>` so you can toggle with a couple lines of JS and `localStorage`.

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-display: "Space Grotesk", ui-sans-serif, sans-serif;
  --font-body: "Inter", ui-sans-serif, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* default = dark, overridden by [data-theme="light"] below */
  --color-ink: #0B0D0C;
  --color-paper: #131615;
  --color-paper-hi: #1B201E;
  --color-fg: #ECEEEA;
  --color-muted: #8B9289;
  --color-line: #262B28;
  --color-signal: #2FE8B8;
  --color-signal-2: #FFB347;
  --color-danger: #FF6B5E;
}

[data-theme="light"] {
  --color-ink: #F5F6F2;
  --color-paper: #EAEBE5;
  --color-paper-hi: #E0E2DA;
  --color-fg: #131613;
  --color-muted: #585F56;
  --color-line: #D5D7CE;
  --color-signal: #0B7A63;
  --color-signal-2: #A85D08;
  --color-danger: #C4392E;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-ink);
  color: var(--color-fg);
  font-family: var(--font-body);
  overflow-x: clip;
  transition: background-color 0.3s ease, color 0.3s ease;
}

::selection {
  background: var(--color-signal);
  color: var(--color-ink);
}

.font-display { font-family: var(--font-display); }
.font-mono { font-family: var(--font-mono); }

/* replaces .gradient-text — one solid signal color, no gradient */
.signal-text {
  color: var(--color-signal);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Theme toggle (Navbar)

```tsx
// simple hook — put in src/hooks/useTheme.ts
import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}
```

Add a small `Sun`/`Moon` icon button (lucide-react already installed) next to the "Let's talk" CTA in `Navbar.tsx` calling `toggle()`.

---

## Typography

Keep the current trio — Space Grotesk / Inter / JetBrains Mono is a good, deliberate pairing and doesn't need replacing. Two adjustments:

- Bump the Hero `<h1>` from `font-medium` to `font-semibold` — at `text-7xl`, medium weight in Space Grotesk reads slightly thin.
- Replace every instance of `.gradient-text` with `.signal-text` (solid color, defined above). A single confident accent color reads more premium than a gradient, and it's the thing most tied to the "generic AI portfolio" look.

---

## Component patterns

**Buttons (primary CTA)**
Keep the pill shape (`rounded-full`), but give it a signal-colored ring on hover instead of just `opacity-90`:
```
hover:shadow-[0_0_0_3px_var(--color-signal)] transition-shadow
```

**Cards / panels**
Current `bg-paper border border-line` pattern is fine — keep it. Add `hover:border-[var(--color-signal)]/40` on interactive cards (Services grid, Project stack) so hover state ties back to the accent rather than just `bg-paper-hi`.

**Tags / stack pills**
Alternate `signal` and `signal-2` borders sparingly on tech-stack pills — e.g. every 3rd or 4th pill gets an amber border instead of the default neutral line — a small detail that reinforces the two-accent system without overdoing it.

**Status / "shipped" badge**
Use `signal-2` (amber) exclusively for this — e.g. a small dot + "shipped" label on completed projects — since it's the one place a flag color is semantically correct.

**Code block chrome (Hero `profile.json`, StackCard preview window)**
Add real two-color syntax highlighting instead of one muted color throughout: keys in `--color-muted`, string values in `--color-signal`, the status value in `--color-signal-2`. This alone will make the terminal motif feel intentional rather than decorative.

---

## Motion & elevation

No change needed to the animation library (Motion/Framer) or components (`FadeIn`, `AnimatedText`, `Magnet`, `Marquee`) — they're well-scoped and already respect `prefers-reduced-motion`. Just retarget colors used inside them (e.g. the active-dot indicator in `StackCard.tsx` currently reads `project.accent === 'signal' ? var(--color-signal) : var(--color-signal-2)` — that logic stays exactly the same, just inherits the new hex values automatically).

---

## Accessibility checklist

- [ ] Verify `--color-muted` against `--color-ink` in both themes with a contrast checker after final tuning (targets: 4.5:1 body text, 3:1 large text/UI).
- [ ] `--color-signal-2` (amber) is for large text/icons/borders only — never small body copy, in either theme.
- [ ] Keep visible keyboard focus rings — Tailwind's default `focus-visible` outline is currently unstyled; add `focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2` globally on interactive elements.
- [ ] Theme toggle should be keyboard-operable and announce state (`aria-pressed` on the toggle button).

---

## Quick summary

| What changes | From | To |
|---|---|---|
| Background | Blue-black `#0a0d14` | Neutral graphite `#0B0D0C` |
| Primary accent | Muted blue `#185fa5` | Signal mint `#2FE8B8` |
| Secondary accent | Purple `#534ab7` | Warm amber `#FFB347` |
| Accent usage | Blended gradient text | Two solid accents, used separately |
| Themes | Dark only | Dark + light via `[data-theme]` |
