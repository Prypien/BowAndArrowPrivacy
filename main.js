/* ============================================================
   Chasing Dreams Interactive — Regie
   Ruhiger Auftakt, alles Weitere bewegt sich mit dem Scrollen:
   scroll-gescrubbte Reveals, wortweise füllende Statements,
   Kachel-Panels, die sich beim Scrollen aus der Mitte öffnen.
   Die WebGL-Ebene (webgl.js) übernimmt Sterne, Linien & Morph.
   ============================================================ */
(() => {
  "use strict";

  /* Fallback: ohne GSAP zeigt das CSS die fertige Seite statisch. */
  if (!window.gsap) {
    document.documentElement.classList.add("no-anim");
    return;
  }
  const hasScrollTrigger = !!window.ScrollTrigger;
  if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const head = document.getElementById("site-head");

  /* ============================================================
     1) Sternenfeld-Fallback (tsParticles) — nur wenn WebGL fehlt.
        Konfiguration im Geist der ersten Version: feine
        Konstellations-Linien, Sterne leuchten zur Maus hin auf.
     ============================================================ */
  let starfieldStarted = false;
  function startStarfieldFallback() {
    if (starfieldStarted || window.__CDI_GL_READY || !window.tsParticles) return;
    starfieldStarted = true;
    gsap.to("#starfield", { autoAlpha: 1, duration: 1.2 });
    tsParticles.load("starfield", {
      fpsLimit: 60,
      detectRetina: true,
      fullScreen: { enable: false },
      background: { color: "transparent" },
      particles: {
        number: { value: 150, density: { enable: true, area: 900 } },
        color: { value: ["#ffffff", "#edf1fa", "#c7d6ff", "#9db8ff", "#8fd8e8"] },
        size: { value: { min: 0.4, max: 1.9 } },
        opacity: { value: { min: 0.1, max: 0.7 } },
        move: { enable: !prefersReduced, speed: 0.18, random: true, outModes: { default: "out" } },
        links: { enable: true, distance: 150, color: "#9db8ff", opacity: 0.05, width: 1 },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: !prefersReduced, mode: ["grab", "bubble"] },
          resize: true,
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.22 } },
          bubble: { distance: 180, size: 2.8, duration: 2, opacity: 0.9 },
        },
      },
    }).catch((err) => console.warn("tsParticles konnte nicht starten:", err));
  }
  setTimeout(startStarfieldFallback, 1500);
  window.addEventListener("load", () => setTimeout(startStarfieldFallback, 400));

  /* ============================================================
     2) Optionaler Spline-Slot (siehe Kommentar in index.html)
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
  }

  /* ============================================================
     3) Ruhiger Auftakt: Hero und Header faden einmal kurz ein
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

  if (!prefersReduced) {
    gsap.from([head, ".hero-kicker"], { autoAlpha: 0, y: -10, duration: 0.9, ease: "power2.out", delay: 0.15 });
    gsap.from("#title .ch", { autoAlpha: 0, y: 22, duration: 0.85, stagger: 0.018, ease: "power3.out", delay: 0.25 });
    gsap.from(["#tagline", ".scroll-cue"], { autoAlpha: 0, y: 14, duration: 0.9, ease: "power2.out", delay: 0.6 });
  }

  /* ============================================================
     4) Scroll-Scrub: alles Weitere bewegt sich nur mit dem Scrollen
     ============================================================ */
  if (!prefersReduced && hasScrollTrigger) {
    /* Sektions-Elemente: sanft einfahren, rückwärts wieder raus */
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 68%", scrub: true },
        });
    });

    /* Statement-Sätze füllen sich wortweise */
    document.querySelectorAll("[data-words]").forEach((el) => {
      const text = el.textContent.trim();
      el.setAttribute("aria-label", text);
      el.textContent = "";
      text.split(/\s+/).forEach((word, i, arr) => {
        const w = document.createElement("span");
        w.className = "wd";
        w.setAttribute("aria-hidden", "true");
        w.textContent = word;
        el.appendChild(w);
        if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
      });
      gsap.fromTo(el.querySelectorAll(".wd"),
        { opacity: 0.12 },
        {
          opacity: 1, stagger: 0.06, ease: "none",
          scrollTrigger: { trigger: el, start: "top 84%", end: "top 34%", scrub: true },
        });
    });

    /* Works-Panels morphen herein: Clip öffnet sich, Artwork zoomt gegenläufig */
    gsap.utils.toArray(".work").forEach((el) => {
      const media = el.querySelector(".work-media");
      const visual = el.querySelector(".work-visual");
      gsap.fromTo(media,
        { clipPath: "inset(16% 11% 16% 11% round 30px)", scale: 0.965 },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 34%", scrub: true },
        });
      gsap.fromTo(visual,
        { scale: 1.16 },
        {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 34%", scrub: true },
        });
      const metaBits = el.querySelectorAll(".work-meta-top, .work-tags, .work-desc");
      gsap.fromTo(metaBits,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1, y: 0, stagger: 0.08, ease: "none",
          scrollTrigger: { trigger: el, start: "top 72%", end: "top 40%", scrub: true },
        });
    });

  }

  /* ============================================================
     5) Header-Zustand beim Scrollen
     ============================================================ */
  const onScroll = () => head.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============================================================
     6) Projekt öffnen: die Kachel wächst auf, füllt den ganzen
        Schirm und man "geht hinein" — dann lädt die Projektseite.
     ============================================================ */
  let opening = false;
  document.querySelectorAll(".work-link[href]").forEach((link) => {
    link.addEventListener("click", (e) => {
      /* Neue-Tab-Klicks nicht kapern; reduzierte Bewegung: direkt hin */
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (prefersReduced) return;
      e.preventDefault();
      if (opening) return;
      opening = true;

      const href = link.href;
      const media = link.querySelector(".work-media");
      const r = media.getBoundingClientRect();

      /* Klon an exakt derselben Stelle fixieren, Original verstecken */
      const clone = media.cloneNode(true);
      Object.assign(clone.style, {
        position: "fixed",
        top: r.top + "px",
        left: r.left + "px",
        width: r.width + "px",
        height: r.height + "px",
        margin: "0",
        zIndex: 80,
        aspectRatio: "auto",
        pointerEvents: "none",
      });
      document.body.appendChild(clone);
      media.style.visibility = "hidden";

      gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => { window.location.href = href; },
      })
        .to([head, "#scene"], { autoAlpha: 0, duration: 0.45 }, 0)
        .to(clone.querySelector(".work-open"), { autoAlpha: 0, duration: 0.25 }, 0)
        .to(clone, {
          top: 0, left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          duration: 0.95,
        }, 0.05);
    });
  });
})();
