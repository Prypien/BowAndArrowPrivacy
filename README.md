# Chasing Dreams Interactive — Studio-Website (GitHub Pages)

Landingpage des Indie-Studios **Chasing Dreams Interactive** plus die komplette
Website des iOS-Spiels **Bow & Arrow** als eigenständiger Unterbereich.

## Struktur

```
/
├── index.html            Studio-Landingpage (Stern-Intro, Partikelfeld, 3D-Kacheln)
├── style.css             Styling der Landingpage
├── main.js               Regie: Canvas-Stern, tsParticles, GSAP, Warp-Übergang
├── assets/               Studio-Logos (logo.svg, favicon.svg)
├── zweite-app/           Platzhalter für das nächste App-Projekt
├── privacy.html          Redirect-Stub → BowAndArrowPrivacy/privacy.html  (Apple-URL!)
├── impressum.html        Redirect-Stub → BowAndArrowPrivacy/impressum.html
├── terms.html            Redirect-Stub → BowAndArrowPrivacy/terms.html
├── DOMAIN-SETUP.md       Anleitung zur Aktivierung von chasingdreamsinteractive.com
└── BowAndArrowPrivacy/   Komplette Bow-&-Arrow-Website (unverändert, 1:1 umgezogen)
    ├── index.html        Marketing-Site des Spiels
    ├── privacy.html      Datenschutzerklärung (App-Store-Privacy-URL)
    ├── impressum.html    Impressum
    └── assets/, uploads/, _ds/, support.js
```

## Live-URLs

| Seite | URL |
|-------|-----|
| Studio | `https://prypien.github.io/BowAndArrowPrivacy/` |
| Bow & Arrow Marketing | `https://prypien.github.io/BowAndArrowPrivacy/BowAndArrowPrivacy/` |
| Datenschutz (bei Apple hinterlegt) | `https://prypien.github.io/BowAndArrowPrivacy/privacy.html` → Stub → `…/BowAndArrowPrivacy/privacy.html` |
| Impressum | `https://prypien.github.io/BowAndArrowPrivacy/impressum.html` → Stub |

**Wichtig:** Die alten Apple-/Deep-Link-URLs im Root (`privacy.html`, `impressum.html`,
`terms.html`) sind Redirect-Stubs und müssen erhalten bleiben, solange sie in
App Store Connect hinterlegt sind.

## Custom Domain

`chasingdreamsinteractive.com` ist vorbereitet, aber noch **nicht** aktiv —
Schritt-für-Schritt-Anleitung in [DOMAIN-SETUP.md](DOMAIN-SETUP.md).
Die `CNAME`-Datei erst hinzufügen, wenn das DNS steht (sonst brechen die Apple-Links).

## Tech-Stack der Landingpage

- **Three.js + eigene GLSL-Shader** (`webgl.js`, CDN-Importmap) — GPU-Partikelsystem
  (~12k Punkte), das scroll-synchron durch vier prozedurale Formen morpht:
  Nebel → Bogen+Pfeil (Bow & Arrow) → Signalringe (Project II) → Komet (Logo).
  Dazu Shader-Sternenfeld mit Maus-Aufleuchten und Kamera-Parallaxe.
- **GSAP 3 + ScrollTrigger** (CDN) — Intro-Choreografie, Scroll-Reveals,
  wortweises Füllen der Statement-Sätze
- **Canvas 2D** — pulsierender Stern und Urknall-Explosion im Intro
- **tsParticles slim 2** (CDN) — reiner Fallback, falls WebGL nicht verfügbar ist
- **Spline-Slot** — vorbereitet in `index.html` (auskommentiert); eigene Szene per
  `data-spline-url` einhängen, `main.js` lädt den Viewer automatisch

## Kontakt

Jen Eric Preißer — jen@preisser.de
