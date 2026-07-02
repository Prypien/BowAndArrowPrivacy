/* ============================================================
   Chasing Dreams Interactive — Regie
   Phase 1  "Der Urknall":   pulsierender Stern → Explosion ins Partikelfeld
   Phase 2  "Der Space-Flug": Kacheln docken sanft im 3D-Raum an
   Phase 3  "Das Portal":     weicher Zoom-Bloom + Pixel-Dissolve ins Projekt
   ============================================================ */
(() => {
  "use strict";

  /* Fallback: ohne GSAP zeigt das CSS die fertige Seite statisch. */
  if (!window.gsap) {
    document.documentElement.classList.add("no-anim");
    return;
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadySeen = sessionStorage.getItem("cdi_intro_seen") === "1";

  const scene = document.getElementById("scene");
  const fleet = document.getElementById("fleet");
  const cardBow = document.getElementById("card-bow");
  const cardPending = document.getElementById("card-pending");
  const skipBtn = document.getElementById("skip-intro");
  const gate = document.getElementById("pixel-gate");
  const toast = document.getElementById("glitch-toast");

  let introDone = false;
  let warping = false;
  let glitching = false;
  let introTl = null;

  /* ============================================================
     1) Stern-Canvas: Stern, Urknall-Burst, Schockwelle, Hyperraum
     ============================================================ */
  const canvas = document.getElementById("star-canvas");
  const ctx = canvas.getContext("2d");

  const fx = {
    w: 0, h: 0, dpr: 1,
    star: { alpha: 0, energy: 0.55, spin: 0 },
    burst: [],
    shock: { r: 0, alpha: 0 },
    splineActive: false,
  };

  const starCenter = () => ({ x: fx.w / 2, y: fx.h * 0.44 });

  function resizeCanvas() {
    fx.dpr = Math.min(window.devicePixelRatio || 1, 2);
    fx.w = window.innerWidth;
    fx.h = window.innerHeight;
    canvas.width = Math.round(fx.w * fx.dpr);
    canvas.height = Math.round(fx.h * fx.dpr);
    ctx.setTransform(fx.dpr, 0, 0, fx.dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  /* Ein "Spike" = stark abgeflachter radialer Verlauf → Beugungsstrahl */
  function drawSpike(cx, cy, angle, len, width, alpha) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(1, width / len);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, len);
    g.addColorStop(0, `rgba(246, 242, 232, ${alpha})`);
    g.addColorStop(0.45, `rgba(196, 181, 253, ${alpha * 0.3})`);
    g.addColorStop(1, "rgba(196, 181, 253, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, len, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawStar() {
    const s = fx.star;
    if (s.alpha <= 0.005 || fx.splineActive) return;
    const { x, y } = starCenter();
    const base = Math.min(fx.w, fx.h);
    const e = s.energy;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = s.alpha;

    /* Halo — weich, warm, ohne Sci-Fi-Neon */
    const haloR = base * 0.17 * e;
    const halo = ctx.createRadialGradient(x, y, 0, x, y, haloR);
    halo.addColorStop(0, `rgba(226, 217, 255, ${0.42 * e})`);
    halo.addColorStop(0.4, `rgba(196, 181, 253, ${0.16 * e})`);
    halo.addColorStop(0.75, `rgba(245, 200, 184, ${0.05 * e})`);
    halo.addColorStop(1, "rgba(196, 181, 253, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, haloR, 0, Math.PI * 2);
    ctx.fill();

    /* Vierstrahliger Funkel (✦) — kürzer und sanfter als ein Beugungskreuz */
    const spin = s.spin;
    drawSpike(x, y, spin, base * 0.24 * e, 2.2, 0.7 * e);
    drawSpike(x, y, spin + Math.PI / 2, base * 0.24 * e, 2.2, 0.7 * e);
    drawSpike(x, y, spin + Math.PI / 4, base * 0.1 * e, 1.5, 0.35 * e);
    drawSpike(x, y, spin - Math.PI / 4, base * 0.1 * e, 1.5, 0.35 * e);

    /* Kern */
    const coreR = Math.max(1.5, base * 0.014 * e);
    const core = ctx.createRadialGradient(x, y, 0, x, y, coreR * 2.4);
    core.addColorStop(0, "rgba(255, 255, 255, 1)");
    core.addColorStop(0.55, "rgba(224, 226, 255, .85)");
    core.addColorStop(1, "rgba(224, 226, 255, 0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(x, y, coreR * 2.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  const BURST_COLORS = [
    [255, 255, 255], [242, 239, 230], [217, 210, 255], [196, 181, 253], [167, 232, 224], [245, 200, 184],
  ];

  function spawnBurst() {
    const { x, y } = starCenter();
    const count = prefersReduced ? 0 : 320;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (2 + Math.pow(Math.random(), 2.2) * 16) * (Math.min(fx.w, fx.h) / 900);
      fx.burst.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.35 + Math.random() * 0.8,
        size: 0.6 + Math.random() * 2.1,
        color: BURST_COLORS[(Math.random() * BURST_COLORS.length) | 0],
      });
    }
    fx.shock.r = 8;
    fx.shock.alpha = 0.75;
    gsap.to(fx.shock, { r: Math.max(fx.w, fx.h) * 0.75, alpha: 0, duration: 1.5, ease: "expo.out" });
  }

  function drawBurst(dt) {
    if (!fx.burst.length && fx.shock.alpha <= 0.01) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    if (fx.shock.alpha > 0.01) {
      const { x, y } = starCenter();
      ctx.strokeStyle = `rgba(226, 217, 255, ${fx.shock.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, fx.shock.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = fx.burst.length - 1; i >= 0; i--) {
      const p = fx.burst[i];
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      p.vx *= 0.965;
      p.vy *= 0.965;
      p.life -= p.decay * dt;
      if (p.life <= 0) { fx.burst.splice(i, 1); continue; }
      const [r, g, b] = p.color;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, p.life)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (0.5 + p.life * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  let lastT = performance.now();
  (function tick(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    fx.star.spin += dt * 0.12;
    ctx.clearRect(0, 0, fx.w, fx.h);
    drawStar();
    drawBurst(dt);
    requestAnimationFrame(tick);
  })(lastT);

  /* ============================================================
     2) tsParticles — das interaktive kosmische Sternenfeld
     ============================================================ */
  if (window.tsParticles) {
    tsParticles.load("starfield", {
      fpsLimit: 60,
      detectRetina: true,
      fullScreen: { enable: false },
      background: { color: "transparent" },
      particles: {
        number: { value: 170, density: { enable: true, area: 900 } },
        color: { value: ["#ffffff", "#f2efe6", "#d9d2ff", "#c4b5fd", "#a7e8e0", "#f5c8b8"] },
        size: { value: { min: 0.4, max: 1.9 } },
        opacity: {
          value: { min: 0.08, max: 0.7 },
          animation: { enable: !prefersReduced, speed: 0.5, minimumValue: 0.06, sync: false },
        },
        move: {
          enable: !prefersReduced,
          speed: 0.22,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
        links: { enable: false },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            /* Sterne nahe der Maus leuchten auf und wachsen sanft */
            enable: !prefersReduced,
            mode: "bubble",
            parallax: { enable: !prefersReduced, force: 46, smooth: 14 },
          },
          resize: true,
        },
        modes: {
          bubble: { distance: 220, size: 3.6, duration: 1.8, opacity: 1 },
        },
      },
    }).catch((err) => console.warn("tsParticles konnte nicht starten:", err));
  }

  /* ============================================================
     3) Optionaler Spline-Slot (siehe Kommentar in index.html)
     ============================================================ */
  const splineStage = document.getElementById("spline-stage");
  if (splineStage && splineStage.dataset.splineUrl) {
    const loader = document.createElement("script");
    loader.type = "module";
    loader.src = "https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js";
    document.head.appendChild(loader);
    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", splineStage.dataset.splineUrl);
    splineStage.appendChild(viewer);
    fx.splineActive = true; /* Code-Stern aus, Spline übernimmt Phase 1 */
  }

  /* ============================================================
     4) Titel in animierbare Buchstaben zerlegen
     ============================================================ */
  const title = document.getElementById("title");
  (function splitTitle() {
    const text = title.textContent.trim();
    title.setAttribute("aria-label", text);
    title.textContent = "";
    text.split(" ").forEach((word, i, arr) => {
      const w = document.createElement("span");
      w.className = "w";
      w.setAttribute("aria-hidden", "true");
      for (const chr of word) {
        const c = document.createElement("span");
        c.className = "ch";
        c.textContent = chr;
        w.appendChild(c);
      }
      title.appendChild(w);
      if (i < arr.length - 1) title.appendChild(document.createTextNode(" "));
    });
  })();

  /* ============================================================
     5) Choreografie (GSAP)
     ============================================================ */
  const hero = document.getElementById("hero");

  gsap.set("#starfield", { autoAlpha: 0 });
  gsap.set(".hero-kicker", { autoAlpha: 0, y: 14 });
  gsap.set("#title .ch", { autoAlpha: 0, y: 36 });
  gsap.set("#tagline", { autoAlpha: 0, y: 18 });
  gsap.set(hero, { y: "16vh", scale: 1.08, transformOrigin: "50% 0%" });
  gsap.set(".fleet-label", { autoAlpha: 0 });
  gsap.set(".card", { z: -1500, y: 90, rotationX: 16, autoAlpha: 0 });
  gsap.set("#site-foot", { autoAlpha: 0 });

  function startFloats() {
    if (prefersReduced) return;
    document.querySelectorAll(".card-float").forEach((el, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      gsap.to(el, {
        y: dir * 11,
        duration: 3.8 + i * 0.9,
        yoyo: true, repeat: -1, ease: "sine.inOut",
        delay: i * 0.6,
      });
      gsap.to(el, {
        rotationZ: dir * 0.5,
        rotationX: dir * -1.1,
        duration: 5.2 + i * 1.1,
        yoyo: true, repeat: -1, ease: "sine.inOut",
      });
    });
  }

  function finishIntro() {
    if (introDone) return;
    introDone = true;
    sessionStorage.setItem("cdi_intro_seen", "1");
    skipBtn.classList.add("is-hidden");
  }

  /* Direkt zum Endzustand (Skip, erneuter Besuch, reduzierte Bewegung) */
  function finalize(fast) {
    if (introTl) { introTl.kill(); introTl = null; }
    gsap.killTweensOf([fx.star, ".hero-kicker", "#title .ch", "#tagline", hero, ".card", ".fleet-label", "#site-foot", "#starfield"]);
    fx.star.alpha = 0;
    const d = fast ? 0.8 : 0;
    gsap.to("#starfield", { autoAlpha: 1, duration: d });
    gsap.to([".hero-kicker", "#title .ch", "#tagline", ".fleet-label", "#site-foot"], { autoAlpha: 1, y: 0, duration: d });
    gsap.to(hero, { y: 0, scale: 1, duration: d });
    gsap.to(".card", { z: 0, y: 0, rotationX: 0, autoAlpha: 1, duration: d });
    startFloats();
    finishIntro();
  }

  function buildIntro() {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    /* --- Phase 1: Der Urknall --- */
    tl.to(fx.star, { alpha: 1, duration: 0.9, ease: "sine.out" }, 0.3)
      /* Herzschlag 1 */
      .to(fx.star, { energy: 1.22, duration: 0.34, ease: "sine.in" }, "+=0.2")
      .to(fx.star, { energy: 0.62, duration: 0.55, ease: "sine.out" })
      /* Herzschlag 2 */
      .to(fx.star, { energy: 1.34, duration: 0.32, ease: "sine.in" }, "+=0.12")
      .to(fx.star, { energy: 0.66, duration: 0.5, ease: "sine.out" })
      /* Kollaps … */
      .to(fx.star, { energy: 0.2, duration: 0.4, ease: "power3.in" })
      /* … und sanfte Explosion ins Partikelfeld */
      .add(() => {
        spawnBurst();
        gsap.to(fx.star, { alpha: 0, duration: 0.45, ease: "power1.out" });
        if (fx.splineActive) gsap.to("#spline-stage", { autoAlpha: 0, duration: 0.6 });
      })
      .fromTo("#warp-flash", { autoAlpha: 0 }, { autoAlpha: 0.85, duration: 0.09 }, "<")
      .to("#warp-flash", { autoAlpha: 0, duration: 0.8, ease: "power2.out" })
      .to("#starfield", { autoAlpha: 1, duration: 1.8, ease: "sine.inOut" }, "<")
      /* Der Schriftzug fadet edel ein */
      .to(".hero-kicker", { autoAlpha: 0.95, y: 0, duration: 0.7 }, "-=1.3")
      .to("#title .ch", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.028, ease: "power3.out" }, "-=0.45")
      .to("#tagline", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.4")

      /* --- Phase 2: Der Space-Flug --- */
      .to(hero, { y: 0, scale: 1, duration: 1.5, ease: "power2.inOut" }, "+=0.5")
      .to(".fleet-label", { autoAlpha: 1, duration: 0.9 }, "<+0.3")
      .to(".card", {
        z: 0, y: 0, rotationX: 0, autoAlpha: 1,
        duration: 1.8, ease: "power3.out", stagger: 0.22,
      }, "<")
      .add(startFloats, "-=0.5")
      .to("#site-foot", { autoAlpha: 1, duration: 0.9 }, "-=0.7")
      .add(finishIntro);

    return tl;
  }

  if (prefersReduced || alreadySeen) {
    finalize(true);
  } else {
    introTl = buildIntro();
  }

  /* Intro überspringen: Button oder Escape */
  skipBtn.addEventListener("click", () => finalize(true));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !introDone) finalize(true);
  });

  /* ============================================================
     6) Maus-Parallaxe: der schwebende Raum neigt sich zum Cursor
     ============================================================ */
  if (!prefersReduced) {
    const tiltX = gsap.quickTo(fleet, "rotationX", { duration: 1.1, ease: "power3.out" });
    const tiltY = gsap.quickTo(fleet, "rotationY", { duration: 1.1, ease: "power3.out" });
    window.addEventListener("pointermove", (e) => {
      if (warping) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tiltY(nx * 3.5);
      tiltX(ny * -2.6);
    });
  }

  /* ============================================================
     7) Ritter-Sprite: Idle-Animation aus den echten Spiel-Frames
     ============================================================ */
  (function animateKnight() {
    const img = cardBow.querySelector(".knight");
    if (!img || prefersReduced) return;
    const frames = Array.from({ length: 8 }, (_, i) => {
      const f = new Image();
      f.src = `BowAndArrowPrivacy/assets/captain/idle_${i}.png`;
      return f;
    });
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % frames.length;
      if (frames[i].complete) img.src = frames[i].src;
    }, 170);
  })();

  /* ============================================================
     8) Phase 3 — Das Portal: weicher Zoom-Bloom + Pixel-Dissolve
     ============================================================ */
  const GATE_TONES = ["#0a0814", "#110d1e", "#181229", "#201834", "#191326"];

  function openPixelGate() {
    const cols = 26;
    const rows = Math.max(10, Math.round(cols * (window.innerHeight / window.innerWidth)));
    gate.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gate.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    const frag = document.createDocumentFragment();
    const cells = [];
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement("div");
      cell.style.background = GATE_TONES[(Math.random() * GATE_TONES.length) | 0];
      frag.appendChild(cell);
      cells.push(cell);
    }
    gate.replaceChildren(frag);
    gate.classList.add("is-active");
    gsap.to(cells, {
      scale: 1.04,
      duration: 0.22,
      ease: "steps(2)",
      stagger: { each: 1.05 / cells.length, from: "random" },
    });
  }

  function warpTo(href) {
    if (warping) return;
    warping = true;
    finishIntro();

    const tl = gsap.timeline({
      onComplete: () => { window.location.href = href; },
    });

    if (prefersReduced) {
      tl.to("#scene", { autoAlpha: 0, duration: 0.3 });
      return;
    }

    tl.to([hero, ".fleet-label", cardPending, "#site-foot"], { autoAlpha: 0, duration: 0.35, ease: "power1.in" }, 0)
      .to(cardBow, { z: 640, y: -16, autoAlpha: 0, duration: 0.9, ease: "power2.in" }, 0)
      /* Sternenfeld zieht sanft auf den Betrachter zu — Tiefe ohne Streifen */
      .to("#starfield", { scale: 1.55, autoAlpha: 0.45, duration: 1.5, ease: "power2.in", transformOrigin: "50% 45%" }, 0)
      .fromTo("#warp-flash", { autoAlpha: 0 }, { autoAlpha: 0.5, duration: 0.18 }, 0.5)
      .to("#warp-flash", { autoAlpha: 0, duration: 0.4 }, 0.72)
      .add(openPixelGate, 0.6)
      .to({}, { duration: 1.35 }, 0.6); /* warten, bis das Pixel-Tor geschlossen ist */
  }

  cardBow.querySelector(".card-link").addEventListener("click", (e) => {
    /* Neue-Tab-Klicks (Cmd/Ctrl/Mitteltaste) nicht kapern */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    warpTo(e.currentTarget.href);
  });

  /* ============================================================
     9) Kachel 2: deaktiviert — Klick löst den Fehler-Effekt aus
     ============================================================ */
  function signalError() {
    if (glitching) return;
    glitching = true;
    cardPending.classList.add("is-erroring");

    gsap.fromTo(cardPending.querySelector(".card-frame"),
      { x: -7 },
      { x: 7, duration: 0.055, repeat: 11, yoyo: true, ease: "none", clearProps: "x" });

    gsap.timeline()
      .to(toast, { autoAlpha: 1, y: -6, duration: 0.2 })
      .to(toast, { autoAlpha: 0, y: 0, duration: 0.45, delay: 1.5 });

    setTimeout(() => {
      cardPending.classList.remove("is-erroring");
      glitching = false;
    }, 950);
  }

  cardPending.addEventListener("click", signalError);
  document.getElementById("pending-btn").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); signalError(); }
  });
})();
