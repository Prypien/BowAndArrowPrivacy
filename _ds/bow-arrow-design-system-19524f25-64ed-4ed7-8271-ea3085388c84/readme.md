# Bow &amp; Arrow — Design System

A dark-fantasy, **pixel-art** design system for **Bow &amp; Arrow**, a retro 2D castle-defense game for iOS. One lone archer defends a keep against an endless orc horde — forge bows, cast spells, rally companions, and survive the waves. The aesthetic is heraldic: **gold-on-near-black stone**, parchment text, a rampant lion crest, and crisp pixel sprites.

This design system lets a design agent generate on-brand interfaces and marketing material for the game without re-deriving the look from scratch.

---

## Sources

Everything here was reverse-engineered from two repositories the user provided. They are **private** — store these links; the reader may have access:

- **Game (source of truth):** `https://github.com/Prypien/BowAndArrow` — a SwiftUI + SpriteKit 2D SpriteKit game. The real design system lives in `BowAndArrow/UI/DesignSystem/` (`Theme.swift`, `UIStyleSheet.swift`, `ItemRarity+Color.swift`, `RetroRPGButtonStyle.swift`, `PixelSegmentedControl.swift`, etc.). All colors, spacing, radii, the VT323 font choice, and the press/animation behavior were lifted directly from those files. All pixel-art sprites in `assets/` were imported from `BowAndArrow/Assets/`.
- **Screenshot maker:** `https://github.com/Prypien/bow-and-arrow-screen-shot-maker` — a Vite/React tool for producing App Store screenshots (gold captions on dark backgrounds). It ships generic shadcn defaults, so it informed the **marketing/website** styling direction but not the token values.

Explore those repos further to build higher-fidelity work — particularly `BowAndArrow/UI/DesignSystem/` for component behavior and `BowAndArrow/Assets/` for the full sprite library (enemies, companions, spells, weapons, world tiles).

---

## CONTENT FUNDAMENTALS

The voice is **terse, heroic, and medieval-martial** — a herald calling you to the walls.

- **Casing:** UI labels and CTAs are **ALL CAPS** (`PLAY`, `MARCH TO BATTLE`, `ATTACK SPEED`, `MAX MANA`). Headlines mix caps and title case for drama (`Defend the Keep`, `The horde marches at dusk`). Body copy is sentence case.
- **Person:** Addresses the player directly as **"you"**, often named by role — *"The keep needs you, archer."* Imperative verbs lead: *Draw your longbow. Hold the line. Crack open the loot.*
- **Length:** Short. Two to twelve words per line. Stat rows are a NAME + a level + a cost — nothing more. Marketing paragraphs cap at ~2 sentences.
- **Tone:** Grand but not pompous. Stakes are framed as a siege: *"One archer. One castle. A thousand foes."* Numbers are concrete (`WAVE 4 / 6`, `4.8 ★`, `500K+ KEEPS DEFENDED`).
- **Vocabulary:** keep, horde, siege, archer, forge, companion, bond, wave, loot, rarity, longbow, mana, wrath. Avoid modern/app jargon ("onboarding", "engagement").
- **Emoji:** **Never** real emoji. The brand uses **pixel-art sprites** as its icons, plus a few unicode glyphs as typographic ornaments only: `★` (rating/kicker), `▶` (play/CTA), `❚❚` (pause), `◈`/`✦` (currency fallbacks). Treat these as type, not emoji.
- **Examples to imitate:** `DEFEND THE KEEP` · `MARCH TO BATTLE` · `STAGE 12 — ORC PASS` · `Free to play. Endless to master.` · `Know your enemy` · `Spoils of war`.

---

## VISUAL FOUNDATIONS

**Overall vibe:** carved stone and heraldic gold, lit by torchlight. Dark, warm, and chunky — a retro RPG menu rendered at high resolution. Nothing is soft, glassy, or rounded-modern.

- **Color:** Heraldic **gold `#BF993F`** is THE brand color — it appears on the lion crest, every panel edge, and all primary CTAs, usually as the vertical gradient `#E0C266 → #BF993F → #B3852E`. Surfaces are a **bluish near-black stone** stack (`#0A0E18` app → `#14141A` panel → `#1F1F24` raised). Text is warm **parchment `#D9D1BF`**, never pure white. Accents are jewel-toned and used sparingly: **sapphire `#4D8CF2`** (the lion's banner field, info), **blood `#8C1414`** (danger/boss), plus semantic green/amber/red and a rarity ladder (bronze → silver → gold → epic purple → legendary amber). See the Colors cards.
- **Type:** **VT323** — a monospaced pixel terminal font — does almost everything, at generous sizes (pixel fonts read small; body is 22px, hero display 90px+). `Press Start 2P` is reserved for rare chunky wordmarks. Tracking is near-zero except small caps runs (+1–2px). The signature text treatment is the **1px black pixel outline** (`--text-outline`) that lifts parchment text off busy art.
- **Spacing:** A tight **4 / 8 / 16 / 24 / 32** grid. Dense, console-like layouts; rows hug each other.
- **Backgrounds:** Full-bleed **pixel-art battlefield art** (`battlefield-bg.png` — dark muddy ground edged in green grass) under a dark vignette gradient, OR flat near-black stone. A subtle `--ba-gradient-sky` (near-black → deep blue) sits behind hero/title screens. No photographic imagery, no abstract blobs.
- **Imagery vibe:** Warm, torchlit, slightly desaturated **pixel art**. Mid-resolution sprites (not 8-bit blocky — closer to detailed 16/32-bit). **Always `image-rendering: pixelated`** — never let a sprite get bilinearly smoothed.
- **Borders &amp; cards:** The hallmark is the **gold double-stroke**: a 2px gold edge with a 2px black/`#1A1208` outline just outside it, on a dark stone gradient fill, corners at 8–12px. Panels read as carved openings. Sunken wells (tracks, inputs, loot slots) use an **inset shadow** instead. Legendary surfaces add a soft gold glow.
- **Shadows:** **Hard and dark** — pixel art casts crisp shadows. Drop shadows are low-blur, offset down (`0 3px 0 rgba(0,0,0,.5)` plus a wider soft layer). Inset depth for anything sunken. The only "glow" is the restrained gold `--glow-gold` on focus/legendary, and mana-blue on spell elements.
- **Corner radii:** Modest — `4 / 6 / 8 / 12px`, plus `pill` for currency capsules. This is chiselled stone; corners are never large/soft.
- **Animation &amp; states:** Fast and **snappy**, never floaty. Easing is `cubic-bezier(.2,.8,.2,1)` over ~120–180ms.
  - **Press:** scale to **0.96** + `brightness(.94)` (the RetroRPG button). Crisp, tactile.
  - **Hover** (web): slight brighten; gold elements lighten toward `#E0C266`. No large lifts.
  - **Fills** (progress/mana) tween width over 180ms. No infinite decorative loops on UI chrome.
- **Transparency &amp; blur:** Used only for **scrims** (`--ba-overlay`, modal dimming) and the sticky web nav (slight backdrop blur). The game UI itself is opaque stone.
- **Layout rules:** Currency/resource counters pin to the **top** of game screens; primary nav (segmented control) pins to the **bottom**. The keep/hero sits center-stage; enemies enter from the right. Combat HUD keeps abilities bottom-center above a mana bar.

---

## ICONOGRAPHY

**The brand has no icon font and uses almost no vector/SVG icons.** Iconography is **pixel-art PNG sprites** drawn for the game. This is the single most important rule: **copy a real sprite from `assets/` — never hand-roll an SVG, and never substitute an emoji.**

- **Stat icons** (`stat-crit.png`, `stat-attack-speed.png`, `stat-knockback.png`, `stat-max-mana.png`) — small framed pixel emblems used in upgrade rows.
- **Currency / resource** (`league-gold.png`, `mana-drop.png`, `trophy.png`) — shown in `ResourceCounter` and `CurrencyLabel`.
- **Loot** (`bronze-chest.png`, `gold-chest.png`, `legendary-chest.png`) — rarity-tiered chests.
- **Items** (`weapon-longbow.png` — the archer hero, `spell-healing-wave.png`, `ability-frozen-wrath.png`) — gear &amp; ability art.
- **Characters** (`enemy-ork-warrior.png`, `enemy-dragon.png`, `companion-lemmrich-portrait.png`) — combatant sprites.
- **World** (`tower.png`, `platform.png`, `tree-1/2.png`, `old-wagon.png`, `waving-flag.png`, `boss-battle-sign.png`, `menu-castle-hub.png`, `battlefield-bg.png`).
- **Crest / logo** (`coat-of-arms.png` — gold lion rampant on banner, `app-icon-dark.png` — lion on near-black stone, `app-icon-light.png` — the same lion on a **sapphire-blue** field). Both app-icon faces are official; use dark on stone layouts, the sapphire one where a brighter, heraldic-banner feel is wanted.
- **Unicode glyphs** are allowed *as type only* for tiny affordances where no sprite exists: `★ ▶ ❚❚ ◈ ✦ +`. Render them in the pixel font with the gold tint and text-outline so they sit in the world.
- The full sprite library (enemy roster, companion animations, spell frames, world tiles) lives in `BowAndArrow/Assets/` in the game repo — import more as needed.

> **Substitution flag:** VT323 and Press Start 2P are loaded from **Google Fonts** (the game embeds VT323 as a SwiftUI custom font; no font binary ships in the repo). These Google-hosted versions match the in-game face. If you have the exact licensed binaries, drop them in and add `@font-face` rules to `tokens/fonts.css`.

---

## INDEX / MANIFEST

Root files:
- `styles.css` — the single entry point consumers link. `@import`s the token files only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `assets/` — pixel-art sprites, crest, app icons, battlefield background (imported from the game repo).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand) shown on the Design System tab.
- `SKILL.md` — Agent-Skill manifest for downloading this system into Claude Code.

**Components** (`window.BowArrowDesignSystem_19524f.*`):
- `components/core/` — `Button`, `Panel`, `Badge`.
- `components/game/` — `ProgressBar`, `CurrencyLabel`, `SegmentedControl`, `StatUpgradeRow`, `ResourceCounter`.

**UI kits** (full interactive recreations):
- `ui_kits/game/` — the iOS game UI: title, castle hub/map, forge, training, and combat HUD (interactive flow in `index.html`).
- `ui_kits/website/` — the marketing landing page: hero, features, enemy showcase, loot, CTA.

Each component directory has a `.d.ts` (props), a `.prompt.md` (usage), and a `@dsCard` HTML thumbnail. The compiler generates `_ds_bundle.js` / `_ds_manifest.json` automatically — do not edit those.
