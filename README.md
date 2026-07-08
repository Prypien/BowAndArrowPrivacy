# Chasing Dreams Interactive — Studio-Website (GitHub Pages)

Landingpage des Indie-Studios **Chasing Dreams Interactive** plus die komplette
Website des iOS-Spiels **Bow & Arrow** als eigenständiger Unterbereich.

## Struktur

```
/
├── index.html            Studio-Landingpage (Stern-Intro, Partikelfeld, 3D-Kacheln)
├── style.css             Styling der Landingpage
├── main.js               Regie: GSAP-Intro, Scroll-Reveals, Kachel-Übergang, tsParticles-Fallback
├── assets/               Studio-Logos (logo.svg, favicon.svg) + fonts/ (selbst gehostet, DSGVO)
├── zweite-app/           Platzhalter für das nächste App-Projekt
├── privacy.html          Redirect-Stub → bow-and-arrow/privacy.html  (Apple-URL!)
├── impressum.html        Redirect-Stub → bow-and-arrow/impressum.html
├── terms.html            Redirect-Stub → bow-and-arrow/terms.html
├── DOMAIN-SETUP.md       Anleitung zur Aktivierung von chasingdreamsinteractive.com
├── BowAndArrowPrivacy/   NUR Legacy-Redirect-Stubs → /bow-and-arrow/ (alte iOS-App-URLs!)
└── bow-and-arrow/        Komplette Bow-&-Arrow-Website
    ├── index.html        Marketing-Site des Spiels
    ├── privacy.html      Datenschutzerklärung App + Website (App-Store-Privacy-URL)
    ├── impressum.html    Impressum
    ├── terms.html        Nutzungshinweise
    └── assets/, uploads/, _ds/, support.js
```

## Live-URLs

| Seite | URL |
|-------|-----|
| Studio | `https://chasingdreamsinteractive.com/` |
| Bow & Arrow Marketing | `https://chasingdreamsinteractive.com/bow-and-arrow/` |
| Datenschutz (bei Apple hinterlegt) | `https://prypien.github.io/BowAndArrowPrivacy/privacy.html` → Stub → `…/bow-and-arrow/privacy.html` |
| Impressum | `https://chasingdreamsinteractive.com/bow-and-arrow/impressum.html` |

**Wichtig:** Zwei Stub-Ebenen müssen erhalten bleiben, solange die alten URLs in
App Store Connect bzw. in ausgelieferten App-Versionen hinterlegt sind:
1. Die Root-Stubs (`privacy.html`, `impressum.html`, `terms.html`) — Apple-URLs.
2. Der Ordner `BowAndArrowPrivacy/` — die iOS-App verlinkt
   `chasingdreamsinteractive.com/BowAndArrowPrivacy/…` (LegalDocumentURLs.swift).

## Custom Domain

`chasingdreamsinteractive.com` ist **aktiv**: DNS zeigt auf GitHub Pages,
die `CNAME`-Datei ist committet. Sobald GitHub das TLS-Zertifikat ausgestellt
hat, in den Pages-Settings „Enforce HTTPS" aktivieren.
Ursprüngliche Anleitung: [DOMAIN-SETUP.md](DOMAIN-SETUP.md).

## Tech-Stack der Landingpage

- **Three.js + eigene GLSL-Shader** (`webgl.js`, CDN-Importmap) — GPU-Partikelsystem
  (~12k Punkte), das scroll-synchron durch vier Formen morpht:
  Nebel → Wappen-Löwe (aus dem Bow-&-Arrow-App-Icon gesampelt) →
  Blatt-Konstellation (aus dem Grow-into-Life-Logo) → Galaxien-Ring ums CTA.
  Dazu Shader-Sternenfeld mit Maus-Aufleuchten und Kamera-Parallaxe.
- **GSAP 3 + ScrollTrigger** (CDN) — Intro-Choreografie, Scroll-Reveals,
  wortweises Füllen der Statement-Sätze
- **tsParticles slim 2** (CDN) — reiner Fallback, falls WebGL nicht verfügbar ist
- **Spline-Slot** — vorbereitet in `index.html` (auskommentiert); eigene Szene per
  `data-spline-url` einhängen, `main.js` lädt den Viewer automatisch
- **Fonts selbst gehostet** — Lora/Inter unter `assets/fonts/`, VT323/Press Start 2P
  unter `bow-and-arrow/assets/fonts/`; kein Google-Fonts-Request (DSGVO).
  Achtung: `bow-and-arrow/_ds/…/tokens/fonts.css` ist dafür handgepatcht —
  nach einem Neu-Export des Design-Systems den lokalen `@import` wiederherstellen.

## Kontakt

Jen Eric Preißer — support@chasingdreamsinteractive.com
