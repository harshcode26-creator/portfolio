# Favicon install steps

1. Copy all files from this folder (favicon.ico, favicon-16x16.png, favicon-32x32.png,
   apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png,
   site.webmanifest) into your `public/` folder — replace any existing favicon files there.

2. Add/replace these tags inside `<head>` in `index.html`:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<meta name="theme-color" content="#FFFFFF" />
```

Design: lowercase "h" (matches the actual "harsh.dev" wordmark casing) in JetBrains Mono
Bold — the same monospace font already used sitewide — with a red accent dot echoing the
"●" used in your project cards' "SHIPPED" status badges.
