/* ============================================================
   Chasing Dreams Interactive — Orbit (Bühne)

   Der Clip liegt nicht als Video auf der Seite, sondern als
   Bildsequenz (assets/orbit/…). Das hat drei Gründe:

     · Scrubben. Ein <video> per currentTime zu scrubben ruckelt
       auf iOS und bei jedem Richtungswechsel. Ein Bild pro Frame
       zeichnet sich sofort und exakt.
     · Laden in Stufen. Erst jedes 24., dann jedes 12., … Die
       Umrundung läuft schon nach ~200 KB, nur eben gröber.
     · Farbe. Zu jedem Frame liegt eine Leitfarbe bereit
       (accents.json), mit der die ganze Seite eingefärbt wird.

   Nach außen gibt es genau eine Schnittstelle: window.CDIOrbit
   mit .ready (Promise), .render(p, dScroll) und .frames.
   Die Scroll-Schleife selbst wohnt in main.js — es gibt nur eine.
   ============================================================ */
(() => {
  "use strict";

  const BASE = "assets/orbit/";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Genau eine Umrundung über die ganze Seite — die Kamera geht
     einmal herum und dann nicht weiter. Die Geschwindigkeit steckt
     jetzt allein in der Seitenlänge: fünf Akte statt sieben heißen
     dieselben 360 Grad auf kürzerer Strecke.

     Der Clip läuft rund, deshalb wäre auch mehr als 1 möglich. Bei
     glatten Vielfachen (2, 3) landen die Akte allerdings alle auf
     denselben zwei oder drei Blickwinkeln. */
  const TURNS = 1;

  const stage = document.getElementById("stage");
  const column = document.getElementById("column");
  const cv = document.getElementById("orbit");
  const amb = document.getElementById("ambient");
  const emb = document.getElementById("embers");
  if (!cv || !column) return;

  const ctx = cv.getContext("2d", { alpha: false });
  const actx = amb.getContext("2d", { alpha: false });

  /* ---------- Zustand ---------- */
  let meta = null;
  let accents = [];          // [[r,g,b], …] je Frame
  let imgs = [];             // Image | null je Frame
  let ready = new Uint8Array(0);
  let readyCount = 0;
  let tier = "hi";
  let curFrame = -1;
  let lastDraw = -1;
  let angle = 0;             // Blickwinkel in Grad, für die Leiste
  let rt = 0;                // Zeitgeber für das verzögerte Vermessen

  /* ---------- Netz & Gerät: welche Stufe, wie viele Frames ----------

     Zwei Stellschrauben, und sie wirken verschieden:
       · die Stufe (hi/lo) bestimmt die Schärfe,
       · die Zahl der Frames bestimmt, wie flüssig die Drehung ist.

     Auf dem Telefon füllt die Rüstung den ganzen Bildschirm — da wäre
     die kleine Stufe sichtbar matschig. Also bleibt die Schärfe und
     stattdessen fällt jeder zweite Frame weg: gleiche Bildqualität,
     halbe Datenmenge, und die etwas gröbere Drehung fällt bei kurzen
     Wischbewegungen kaum auf. */
  function pickTier() {
    const c = navigator.connection || {};
    if (c.saveData) return { tier: "lo", strides: [24, 12] };
    if (/^(slow-2g|2g|3g)$/.test(c.effectiveType || "")) {
      return { tier: "lo", strides: [24, 12, 6] };
    }

    const dpr = Math.min(devicePixelRatio || 1, 2);
    const tier = Math.min(innerHeight, 900) * dpr > 820 ? "hi" : "lo";

    const narrow = innerWidth < 1024;             // dieselbe Grenze wie im CSS
    const lean = (navigator.deviceMemory || 4) < 4;
    // 24, 12 und 6 sind gerade — mit der 2 am Ende ergibt das genau
    // jeden zweiten Frame, ohne Lücken und ohne Doppelarbeit.
    if (narrow || lean) return { tier, strides: [24, 12, 6, 2] };
    return { tier, strides: [24, 12, 6, 3, 1] };
  }

  /* ---------- Bilder in Stufen nachladen ---------- */
  function src(i) {
    return BASE + tier + "/" + String(i).padStart(4, "0") + ".webp";
  }

  function load(i) {
    return new Promise((res) => {
      if (ready[i]) return res();
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        imgs[i] = im;
        ready[i] = 1;
        readyCount++;
        // Der neue Frame kann näher am gesuchten liegen als der
        // gerade gezeichnete — also einmal neu ausgeben.
        lastDraw = -1;
        res();
      };
      im.onerror = () => res();
      im.src = src(i);
    });
  }

  /* Mehrere Bilder gleichzeitig, aber nicht alle auf einmal —
     sonst verhungert der erste Frame hinter 119 anderen. */
  async function loadPool(list, size) {
    let n = 0;
    const next = async () => {
      while (n < list.length) await load(list[n++]);
    };
    await Promise.all(Array.from({ length: Math.min(size, list.length) }, next));
  }

  /* Erst wenn jemand tatsächlich scrollt (oder kurz geblieben ist),
     lohnt sich der große Rest. Wer nur den Auftakt sieht und wieder
     geht, lädt so ein paar hundert Kilobyte statt einiger Megabyte. */
  function whenWanted() {
    return new Promise((res) => {
      let done = false;
      const go = () => {
        if (done) return;
        done = true;
        removeEventListener("scroll", go);
        removeEventListener("wheel", go);
        removeEventListener("touchstart", go);
        res();
      };
      addEventListener("scroll", go, { passive: true, once: true });
      addEventListener("wheel", go, { passive: true, once: true });
      addEventListener("touchstart", go, { passive: true, once: true });
      setTimeout(go, 2500);
    });
  }

  async function loadPasses(strides) {
    for (let n = 0; n < strides.length; n++) {
      // Nach den beiden groben Durchgängen steht die Umrundung schon.
      if (n === 2) await whenWanted();
      const step = strides[n];
      const list = [];
      for (let i = 0; i < meta.frames; i += step) if (!ready[i]) list.push(i);
      // Der erste Durchgang bekommt weniger Leitungen, damit Frame 0
      // und die grobe Umrundung schnell dastehen.
      if (list.length) await loadPool(list, n === 0 ? 4 : 6);
    }
  }

  /* Der nächstgelegene bereits geladene Frame. Solange die Sequenz
     noch dünn ist, springt das Bild in groben Schritten — aber es
     steht nie still und es blitzt nichts weiß auf. */
  function nearest(i) {
    if (ready[i]) return i;
    for (let d = 1; d < meta.frames; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < meta.frames && ready[i + d]) return i + d;
    }
    return -1;
  }

  /* ---------- Zeichenfläche an das Layout anpassen ---------- */
  let box = { w: 0, h: 0 };

  function resize() {
    const r = column.getBoundingClientRect();
    if (!r.width || !r.height) {
      // Kommt vor, wenn die Seite in einem noch nicht sichtbaren
      // Fenster startet. Später noch einmal versuchen.
      clearTimeout(rt);
      rt = setTimeout(resize, 250);
      return;
    }
    const dpr = Math.min(devicePixelRatio || 1, 2);

    // Mehr als die Quellauflösung bringt nichts — hochskalieren
    // kann der Browser beim Anzeigen genauso gut und billiger.
    const maxH = meta ? meta[tier].h : 1237;
    const h = Math.min(Math.round(r.height * dpr), maxH);
    const w = Math.round(h * (r.width / r.height));

    if (cv.width !== w || cv.height !== h) {
      cv.width = w;
      cv.height = h;
      lastDraw = -1;
    }
    box = { w: r.width, h: r.height };
    resizeEmbers();
  }

  /* Achtung: canvas.width zu setzen löscht den kompletten Kontext-
     zustand. Transform und Blendmodus müssen danach neu gesetzt
     werden — sonst zeichnen die Funken einmal falsch und dann nie
     wieder richtig. */
  function resizeEmbers() {
    if (!emb) return;
    const ed = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.round(innerWidth * ed);
    const h = Math.round(innerHeight * ed);
    if (emb.width === w && emb.height === h) return;
    emb.width = w;
    emb.height = h;
    if (ectx) {
      ectx.setTransform(ed, 0, 0, ed, 0, 0);
      ectx.globalCompositeOperation = "lighter";
    }
  }

  /* Bild formatfüllend in die Fläche zeichnen (object-fit: cover). */
  function cover(c, im, W, H) {
    const s = Math.max(W / im.width, H / im.height);
    const w = im.width * s;
    const h = im.height * s;
    c.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
  }

  /* ---------- Leitfarbe ---------- */
  function hex(h) {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  const root = document.documentElement;
  let accentRGB = [233, 85, 106];

  /* --accent hängt an :root, und daran hängt fast jede Regel der
     Seite. Jede Änderung kostet also einen Stildurchlauf über alles.
     Deshalb in Stufen von 4: sichtbar ist der Unterschied nicht, die
     Zahl der Durchläufe sinkt aber auf einen Bruchteil. */
  const step4 = (v) => Math.min(255, Math.round(v / 4) * 4);

  function setAccent(pos) {
    if (!accents.length) return;
    const n = accents.length;
    const i = Math.floor(pos) % n;
    const f = pos - Math.floor(pos);
    // Über den Rundenwechsel hinweg wird zum ersten Frame zurück-
    // geblendet, nicht auf dem letzten stehen geblieben.
    const a = accents[i];
    const b = accents[(i + 1) % n];
    const r = step4(a[0] + (b[0] - a[0]) * f);
    const g = step4(a[1] + (b[1] - a[1]) * f);
    const bl = step4(a[2] + (b[2] - a[2]) * f);
    if (r === accentRGB[0] && g === accentRGB[1] && bl === accentRGB[2]) return;
    accentRGB = [r, g, bl];
    root.style.setProperty("--accent", `rgb(${r} ${g} ${bl})`);
    tintEmbers();
  }

  /* ============================================================
     Glut — feine Funken, die aufsteigen und vom Scrollen
     aufgewirbelt werden. Ein vorgezeichneter Punkt wird additiv
     kopiert; das ist um ein Vielfaches billiger als shadowBlur.
     ============================================================ */
  let ectx = null;
  let sparks = [];
  let spark = null;

  function tintEmbers() {
    if (!spark) return;
    const g = spark.getContext("2d");
    g.clearRect(0, 0, 32, 32);
    const rg = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    const [r, gr, b] = accentRGB;
    rg.addColorStop(0, `rgba(255,${Math.min(255, gr + 90)},${Math.min(255, b + 70)},1)`);
    rg.addColorStop(0.35, `rgba(${r},${gr},${b},.75)`);
    rg.addColorStop(1, `rgba(${r},${gr},${b},0)`);
    g.fillStyle = rg;
    g.fillRect(0, 0, 32, 32);
  }

  function initEmbers() {
    if (!emb || reduced) return;
    ectx = emb.getContext("2d");
    spark = document.createElement("canvas");
    spark.width = spark.height = 32;
    tintEmbers();
    emb.width = 0;          // erzwingt das Setzen von Transform + Blendmodus
    resizeEmbers();

    const n = innerWidth < 720 ? 30 : 62;
    sparks = Array.from({ length: n }, () => seed(Math.random()));
  }

  function seed(y) {
    return {
      x: Math.random(),
      y: y,
      vy: 0.00016 + Math.random() * 0.00042,
      vx: (Math.random() - 0.5) * 0.00012,
      r: 1.2 + Math.random() * 3.4,
      a: 0.18 + Math.random() * 0.5,
      w: Math.random() * 6.28,
    };
  }

  function drawEmbers(dt, drift) {
    if (!ectx) return;
    const W = innerWidth;
    const H = innerHeight;
    ectx.clearRect(0, 0, W, H);
    for (const s of sparks) {
      s.y -= s.vy * dt;
      s.w += dt * 0.0021;
      s.x += (s.vx + Math.sin(s.w) * 0.00009) * dt;
      // Scrollen wirbelt die Funken nach unten auf
      s.y += drift * 0.00028;
      if (s.y < -0.06 || s.y > 1.08) Object.assign(s, seed(s.y < 0 ? 1.05 : -0.03));

      const d = s.r * 6;
      ectx.globalAlpha = s.a * (0.35 + 0.65 * Math.sin(s.w * 0.7) ** 2);
      ectx.drawImage(spark, s.x * W - d / 2, s.y * H - d / 2, d, d);
    }
    ectx.globalAlpha = 1;
  }

  /* ============================================================
     Ausgabe
     ============================================================ */
  function render(p, dScroll, dt) {
    if (!meta) return;
    // Wer weniger Bewegung eingestellt hat, bekommt ein Standbild:
    // eine bildschirmfüllende Gestalt, die sich beim Scrollen dreht,
    // ist genau die Art großflächiger Bewegung, die damit gemeint ist.
    const t = Math.max(0, Math.min(1, p)) * TURNS;
    const pos = reduced ? 0 : (t * meta.frames) % meta.frames;
    angle = reduced ? 0 : Math.round(t * 360) % 360;
    setAccent(pos);
    drawEmbers(dt, dScroll);

    const want = Math.round(pos) % meta.frames;
    curFrame = want;
    const i = nearest(want);
    if (i < 0 || i === lastDraw) return;
    lastDraw = i;

    const im = imgs[i];
    cover(ctx, im, cv.width, cv.height);
    actx.drawImage(im, 0, 0, amb.width, amb.height);
  }

  /* ============================================================
     Start
     ============================================================ */
  const boot = (async () => {
    const cfg = pickTier();
    tier = cfg.tier;

    try {
      const [m, ac] = await Promise.all([
        fetch(BASE + "meta.json").then((r) => r.json()),
        fetch(BASE + "accents.json").then((r) => r.json()),
      ]);
      meta = m;
      accents = ac.map(hex);
    } catch (e) {
      // Ohne Sequenz bleibt das Posterbild stehen. Die Seite
      // funktioniert vollständig, nur die Kamera dreht sich nicht.
      console.warn("Orbit-Sequenz nicht erreichbar — Standbild:", e);
      document.documentElement.classList.add("no-orbit");
      stage.classList.add("is-live");
      return;
    }

    imgs = new Array(meta.frames).fill(null);
    ready = new Uint8Array(meta.frames);
    // Winziges Vorschaubild als Sofort-Hintergrund der Säule. Damit
    // steht das Bild schon, bevor der erste echte Frame da ist.
    column.style.backgroundImage = `url("${meta.lqip}")`;
    stage.classList.add("is-live");

    resize();
    initEmbers();

    // Frame 0 zuerst und allein — er steht im Auftakt im Bild.
    await load(0);
    render(0, 0, 16);
    stage.classList.add("is-drawn");

    loadPasses(cfg.strides);
  })();

  const later = () => { clearTimeout(rt); rt = setTimeout(resize, 120); };
  addEventListener("resize", later, { passive: true });
  addEventListener("orientationchange", later, { passive: true });
  // Startet die Seite in einem Hintergrund-Tab, stimmen die Maße erst,
  // wenn sie tatsächlich sichtbar wird.
  addEventListener("visibilitychange", () => {
    if (!document.hidden) { lastDraw = -1; later(); }
  });

  window.CDIOrbit = {
    ready: boot,
    render,
    turns: TURNS,
    get angle() { return angle; },
    get frames() { return meta ? meta.frames : 0; },
    get loaded() { return readyCount; },
  };
})();
