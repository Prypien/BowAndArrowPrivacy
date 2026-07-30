# Chasing Dreams Interactive — Studio-Website (GitHub Pages)

Landingpage des Indie-Studios **Chasing Dreams Interactive** plus die komplette
Website des iOS-Spiels **Bow & Arrow** als eigenständiger Unterbereich.

## Struktur

```
/
├── index.html            Studio-Landingpage (Orbit: eine Kamerafahrt um die Rüstung)
├── style.css             Styling der Landingpage
├── orbit.js              Bühne: Bildsequenz, Leitfarben, Glut
├── main.js               Regie: Scroll-Schleife, Tafeln, Kapitelleiste, Sprachen
├── tools/                Werkzeuge (Bildsequenz bauen, Kontaktbogen, Dev-Server)
├── assets/
│   ├── orbit/            Bildsequenz der Umrundung (hi/, lo/, accents.json, meta.json)
│   └── …                 Studio-Logos + fonts/ (selbst gehostet, DSGVO)
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
    ├── legal.css         Stil der drei Rechtstexte (Spiel-Optik, nicht Studio)
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

## Die Landingpage: eine Kamerafahrt

Die Startseite ist ein einziger Schwenk. In der Mitte steht eine Rüstung, fest im
Bild; das Scrollen dreht die Kamera um sie herum. Links und rechts ziehen fünf
Akte vorbei — Auftakt, Studio, Bow & Arrow, Grow into Life, Weltkarte —, jeder an
seinem Punkt der Umrundung. Der Kontakt sitzt in der Fußzeile. Die Leiste rechts
zeigt den Winkel und dient als Kapitelsprung.

Über die ganze Seite geht die Kamera **genau einmal** herum und dann nicht weiter
(`TURNS` in `orbit.js`). Das Tempo steckt allein in der Seitenlänge: fünf Akte
statt sieben heißen dieselben 360 Grad auf kürzerer Strecke — rund 90 Grad pro
Bildschirmhöhe.

**Keine fremden Bibliotheken, kein CDN.** Die Seite lädt ausschließlich eigene
Dateien; beim Aufruf geht keine IP-Adresse an Dritte. GSAP, Three.js, tsParticles
und der Spline-Slot sind entfallen.

### Bildsequenz statt Video

Der Clip liegt nicht als `<video>` auf der Seite, sondern als 120 WebP-Bilder
unter `assets/orbit/`:

- **Scrubben.** Ein Video per `currentTime` zu scrubben ruckelt auf iOS und bei
  jedem Richtungswechsel. Ein Bild pro Frame zeichnet sich sofort und exakt.
- **Laden in Stufen.** Erst jedes 24., dann jedes 12., … Die Umrundung läuft
  schon nach rund 200 KB, nur eben gröber. Zwei Größen (`hi/` 720 px, `lo/`
  440 px); `orbit.js` wählt nach Bildschirm, Pixeldichte und `saveData`.
- **Farbe.** `accents.json` hält je Frame eine Leitfarbe, ermittelt aus dem Bild
  selbst. Sie landet als `--accent` im CSS und färbt Linien, Schimmer und
  Akzente — auf der Feuerseite kräftiges Rot, auf der Rückseite kühler Stahl.

Sequenz neu bauen (braucht `ffmpeg`, `cwebp`, `python3` + Pillow):

```bash
bash tools/build-orbit.sh _quellen/orbit-quelle.mp4
```

Das Skript schneidet unten 42 Pixel weg — dort trägt das Ausgangsmaterial ein
fremdes Wasserzeichen. **Die Rechte am Clip sind nicht geklärt**; das Rohmaterial
liegt unter `_quellen/` und ist bewusst nicht Teil des Repos.

### Rückfallebenen

| Fall | Was passiert |
|------|--------------|
| Kein JavaScript | Posterbild statt Sequenz, alle Tafeln sichtbar, Leiste ausgeblendet |
| Sequenz nicht erreichbar | dito, plus Hinweis in der Konsole (`.no-orbit`) |
| `prefers-reduced-motion` | Kamera steht still, keine Glut, Tafeln ohne Einflug |
| Schmaler als 1024 px | Rüstung füllt den Hintergrund, Inhalt liegt mittig darüber |

### Werkzeuge

| Datei | Zweck |
|-------|-------|
| `tools/build-orbit.sh` | Bildsequenz, Poster, Leitfarben, Social-Preview |
| `tools/orbit_meta.py` | Leitfarbe je Frame, LQIP, `meta.json` |
| `tools/devserver.py` | lokaler Server **ohne** Browser-Cache (`python3 tools/devserver.py 8124`) |
| `tools/build-cards.sh` | Projektkarten aus `tools/karten/*.html` rendern |
| `tools/kontaktbogen.html` | zeigt die Seite an mehreren Scroll-Positionen nebeneinander |

`tools/kontaktbogen.html?w=1440&h=900&s=0.45&cols=3&acts=1&ys=0,1,2,3,4`
rendert alle fünf Akte auf einen Blick — praktisch für Bildschirmfotos, weil
Chromes `--screenshot` einen gescrollten Zustand nicht mitnimmt.

### Projektkarten

Die Kacheln von Bow & Arrow und Grow into Life sind keine Screenshots, sondern
gebaute Bilder: App-Symbol als Kachel, darunter der Name in der Schrift der
jeweiligen App. Farben und Typografie stammen aus deren eigenem Design-System
(`bow-and-arrow/_ds/…/tokens/` bzw. `grow-into-life/app.css`), nicht aus dem der
Studio-Seite — so tragen beide Karten ihre Herkunft.

```bash
python3 tools/devserver.py 8124 &     # die Vorlagen laden lokale Schriften
bash tools/build-cards.sh 8124
```

### Rechtstexte im Spiel-Gewand

`bow-and-arrow/legal.css` kleidet Impressum, Datenschutz und Terms in das
Erscheinungsbild des Spiels: VT323 auf fast schwarzem Stein, heraldisches Gold,
harte Schatten, der Goldknopf der Spiel-Navigation als aktiver Reiter. Vorher
trugen die drei Seiten je eine eigene Kopie der alten Studio-Optik im
`<style>`-Block — jetzt teilen sie eine Datei, und die Texte selbst sind
unangetastet geblieben.

Die Token-Werte sind aus `_ds/…/tokens/` **kopiert**, nicht per `@import` geholt:
der `_ds`-Ordner trägt eine UUID im Namen und wird beim Neu-Export ausgetauscht.
Ändert sich `Theme.swift`, ändert sich `legal.css` mit.

### Nichts wackelt zur Seite

Die Startseite hat keinen waagerechten Überstand — geprüft von 320 px bis
1440 px. Drei Stellen sorgen dafür:

- `html { overflow-x: hidden }` als Riegel. Bewusst nicht `clip`: das wird am
  Wurzelelement nicht an den Viewport weitergegeben, die Seite ließe sich dann
  trotzdem schieben.
- `.act { overflow: clip }` — der Akt ist genau fensterbreit und schneidet die
  weichen Schleier hinter den Tafeln (`.panel::before`) auf den Pixel genau ab.
  Diese Pseudo-Elemente waren die eigentliche Ursache; sie tauchen in keiner
  Element-Suche auf und fallen bei der Fehlersuche leicht durchs Raster.
- Das Ambient-Licht hängt über negatives `inset` an der Bühne statt über eine
  `vw`-Breite und taucht damit in keiner Overflow-Rechnung mehr auf.

Nachmessen (Chrome erzwingt mindestens 500 px Fensterbreite — schmaler nur im
Rahmen, etwa über `tools/kontaktbogen.html`).

### Schriften

Lora/Inter unter `assets/fonts/`, VT323/Press Start 2P unter
`bow-and-arrow/assets/fonts/`; kein Google-Fonts-Request (DSGVO).
Achtung: `bow-and-arrow/_ds/…/tokens/fonts.css` ist dafür handgepatcht —
nach einem Neu-Export des Design-Systems den lokalen `@import` wiederherstellen.

## Kontakt

Jen Eric Preißer — support@chasingdreamsinteractive.com
