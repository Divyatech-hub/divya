"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSiteState } from "@/components/site/SiteState";
import { Reveal } from "@/components/story/Reveal";
import type { Site } from "@/lib/content";

// ─────────────────────────────────────────────────────────────────────────────
// DIV: try this (day 1). Tune how the "magnetic field" feels.
//   1. FIELD_RADIUS: how far the cursor reaches, as a fraction of the screen. try 0.12 and 0.4.
//   2. MAX_TWIST: how hard tracks curl near the cursor, in radians. try 0.3 and 2.0.
//   3. POINTER_LERP: cursor follow damping. 0.02 = syrup, 0.5 = twitchy. CLAUDE.md says 0.08 to 0.15.
//   4. STRENGTH_LERP: how fast the field fades in/out when the cursor enters/leaves.
// Spec: find values where the tracks feel like they're *pulled*, not dragged.
// Bonus: make the twist fall off with 1/r instead of a gaussian (search "falloff" below).
// ─────────────────────────────────────────────────────────────────────────────
const FIELD_RADIUS = 0.22;
const MAX_TWIST = 0.9;
const POINTER_LERP = 0.1;
const STRENGTH_LERP = 0.06;
const TAP_STRENGTH = 1.5;

type Track = {
  base: Float32Array; // x0,y0,x1,y1,... in px. the resting shape
  charge: 1 | -1; // + and - particles curl opposite ways, like the real thing
  opacity: number;
  accent: boolean;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Tiny seeded random, so a resize regenerates the same "collision" for this visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Procedural bubble-chamber tracks. [ASSET: particle tracks] these get replaced by
 * div's hand-traced SVGs later; the field code works on any list of points.
 */
function makeTracks(W: number, H: number, seed: number): Track[] {
  const rand = mulberry32(seed);
  const scale = Math.min(W, H) / 800;
  const tracks: Track[] = [];
  const vertices = [
    { x: W * (0.62 + rand() * 0.1), y: H * (0.3 + rand() * 0.12), n: 7 },
    { x: W * (0.22 + rand() * 0.12), y: H * (0.22 + rand() * 0.1), n: 4 },
    { x: W * (0.82 + rand() * 0.08), y: H * (0.7 + rand() * 0.1), n: 5 },
  ];

  // Low-energy particles: they lose energy as they go, so the spiral tightens.
  for (const v of vertices) {
    for (let k = 0; k < v.n; k++) {
      const charge: 1 | -1 = rand() > 0.5 ? 1 : -1;
      const steps = 110 + Math.floor(rand() * 120);
      let x = v.x;
      let y = v.y;
      let dir = rand() * Math.PI * 2;
      let step = (5 + rand() * 4) * scale;
      let curv = (0.002 + rand() * 0.01) * charge / scale;
      const growth = 1.012 + rand() * 0.02;
      const pts = new Float32Array(steps * 2);
      for (let s = 0; s < steps; s++) {
        pts[s * 2] = x;
        pts[s * 2 + 1] = y;
        dir += curv * step;
        x += Math.cos(dir) * step;
        y += Math.sin(dir) * step;
        curv = Math.max(-0.2 / scale, Math.min(0.2 / scale, curv * growth));
        step *= 0.996;
      }
      tracks.push({ base: pts, charge, opacity: 0.22 + rand() * 0.4, accent: rand() > 0.82 });
    }
  }

  // A few high-energy particles: long, almost straight, crossing the frame.
  for (let k = 0; k < 4; k++) {
    const charge: 1 | -1 = rand() > 0.5 ? 1 : -1;
    const v = vertices[k % vertices.length];
    let dir = rand() * Math.PI * 2;
    let x = v.x;
    let y = v.y;
    const step = 9 * scale;
    const steps = Math.ceil((Math.hypot(W, H) * 0.9) / step);
    const pts = new Float32Array(steps * 2);
    for (let s = 0; s < steps; s++) {
      pts[s * 2] = x;
      pts[s * 2 + 1] = y;
      dir += 0.0006 * charge;
      x += Math.cos(dir) * step;
      y += Math.sin(dir) * step;
    }
    tracks.push({ base: pts, charge, opacity: 0.18 + rand() * 0.2, accent: k === 0 });
  }
  return tracks;
}

function toPath(pts: Float32Array) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].toFixed(1)} ${pts[1].toFixed(1)}`;
  for (let i = 2; i < pts.length; i += 2) d += `L${pts[i].toFixed(1)} ${pts[i + 1].toFixed(1)}`;
  return d;
}

export function Prologue({ site }: { site: Site }) {
  const { mode } = useSiteState();
  const active = mode === "story";
  const section = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const ripples = useRef<SVGGElement>(null);
  const pathEls = useRef<SVGPathElement[]>([]);
  const [size, setSize] = useState<{ W: number; H: number } | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const seed = useRef(Math.floor(Math.random() * 1e9)); // a new collision every visit

  // Measure the hero. Only rebuild on width changes, so the mobile url bar doesn't reshuffle tracks.
  useEffect(() => {
    if (!section.current) return;
    let lastW = 0;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return; // hidden (skip-the-story mode): keep the old tracks
      if (Math.abs(width - lastW) < 40) return;
      lastW = width;
      setSize({ W: width, H: height });
      setTracks(makeTracks(width, height, seed.current));
    });
    ro.observe(section.current);
    return () => ro.disconnect();
  }, []);

  // Intro: tracks fly out of their collision points.
  useGSAP(
    () => {
      if (!active || tracks.length === 0) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          pathEls.current.filter(Boolean),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.6, ease: "expo.out", stagger: { each: 0.035, from: "random" }, delay: 0.15 }
        );
        gsap.from(".vertex", { scale: 0, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.12, transformOrigin: "center" });
        gsap.from(".hero-fade", { opacity: 0, y: 16, duration: 1.4, ease: "expo.out", delay: 0.9, stagger: 0.12 });

        // Scrolling out = zooming out one scale of the universe.
        gsap.to(svg.current, {
          scale: 0.82,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [active, tracks], revertOnUpdate: true, scope: section }
  );

  // The magnetic field. One rAF loop, paused when the hero is offscreen or the field has settled.
  useEffect(() => {
    if (!active || !size || tracks.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = section.current!;
    const { W, H } = size;
    const sigma = Math.min(W, H) * FIELD_RADIUS;
    const twoSigma2 = 2 * sigma * sigma;
    const work = tracks.map((t) => new Float32Array(t.base.length));

    const pointer = { x: W / 2, y: H / 2, tx: W / 2, ty: H / 2 };
    let strength = 0;
    let strengthTarget = 0;
    let visible = true;
    let raf = 0;
    let wasSettled = true;

    const frame = () => {
      raf = 0;
      pointer.x = lerp(pointer.x, pointer.tx, POINTER_LERP);
      pointer.y = lerp(pointer.y, pointer.ty, POINTER_LERP);
      strength = lerp(strength, strengthTarget, STRENGTH_LERP);

      const settled = strength < 0.002 && strengthTarget === 0;
      if (settled && wasSettled) return; // nothing moving: stop the loop entirely
      wasSettled = settled;

      for (let t = 0; t < tracks.length; t++) {
        const { base, charge } = tracks[t];
        const out = work[t];
        const k = MAX_TWIST * strength * charge;
        for (let i = 0; i < base.length; i += 2) {
          const dx = base[i] - pointer.x;
          const dy = base[i + 1] - pointer.y;
          // falloff: a gaussian, strongest at the cursor, gone by ~2.5 sigma
          const a = settled ? 0 : k * Math.exp(-(dx * dx + dy * dy) / twoSigma2);
          const c = Math.cos(a);
          const s = Math.sin(a);
          // rotate each point around the cursor: tracks curl like charges in a magnetic field
          out[i] = pointer.x + dx * c - dy * s;
          out[i + 1] = pointer.y + dx * s + dy * c;
        }
        pathEls.current[t]?.setAttribute("d", toPath(out));
      }
      if (visible) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      wasSettled = false;
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const local = (e: { clientX: number; clientY: number }) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = local(e);
      pointer.tx = p.x;
      pointer.ty = p.y;
      strengthTarget = 1;
      kick();
    };
    const onLeave = () => {
      strengthTarget = 0;
      kick();
    };

    // Touch: a tap is a burst of field that decays, plus a visible ripple.
    let askedTilt = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const p = local(e);
      pointer.x = pointer.tx = p.x;
      pointer.y = pointer.ty = p.y;
      strength = TAP_STRENGTH;
      strengthTarget = 0;
      kick();
      if (ripples.current) {
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute("cx", String(p.x));
        ring.setAttribute("cy", String(p.y));
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", "var(--accent)");
        ripples.current.appendChild(ring);
        gsap.fromTo(ring, { attr: { r: 4 }, opacity: 0.7 }, { attr: { r: sigma }, opacity: 0, duration: 1.4, ease: "expo.out", onComplete: () => ring.remove() });
      }
      // iOS only allows tilt after the visitor asks for it with a gesture
      const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      if (!askedTilt && typeof DOE?.requestPermission === "function") {
        askedTilt = true;
        DOE.requestPermission().catch(() => {});
      }
    };

    // Phone tilt nudges a soft, invisible "cursor" around the middle of the screen.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      pointer.tx = W / 2 + (Math.max(-45, Math.min(45, e.gamma)) / 45) * W * 0.35;
      pointer.ty = H / 2 + (Math.max(-45, Math.min(45, e.beta - 45)) / 45) * H * 0.3;
      strengthTarget = 0.45;
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(el);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    if (coarse) window.addEventListener("deviceorientation", onTilt);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [active, size, tracks]);

  const vertexPoints = tracks.length
    ? Array.from(new Set(tracks.filter((t) => t.base.length >= 2).map((t) => `${t.base[0].toFixed(0)},${t.base[1].toFixed(0)}`))).map((s) => s.split(",").map(Number))
    : [];

  return (
    <section
      ref={section}
      id="prologue"
      aria-labelledby="hello"
      className="relative flex min-h-[100svh] select-none flex-col justify-end overflow-hidden px-5 pb-14 pt-24 md:px-10 md:pb-16"
    >
      {/* the tracks are decoration: the words below carry the meaning */}
      <svg
        ref={svg}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full origin-[62%_38%] text-ink"
        viewBox={size ? `0 0 ${size.W} ${size.H}` : "0 0 100 100"}
        preserveAspectRatio="none"
      >
        {/* wait until we know the mode, so tracks never flash in fully drawn before the intro */}
        {mode !== null && tracks.map((t, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) pathEls.current[i] = el;
            }}
            d={toPath(t.base)}
            fill="none"
            stroke={t.accent ? "var(--accent)" : "currentColor"}
            strokeOpacity={t.accent ? Math.min(1, t.opacity + 0.35) : t.opacity}
            strokeWidth={t.accent ? 1.4 : 1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1 1"
          />
        ))}
        {mode !== null && vertexPoints.map(([x, y], i) => (
          <g key={i} className="vertex" style={{ transformBox: "fill-box" }}>
            <circle cx={x} cy={y} r={3} fill="var(--accent)" />
            <circle cx={x} cy={y} r={10} fill="none" stroke="var(--accent)" strokeOpacity={0.35} />
          </g>
        ))}
        <g ref={ripples} />
      </svg>

      <div className="pointer-events-none relative z-10 max-w-5xl">
        <Reveal
          as="h1"
          immediate
          delay={0.35}
          className="await-js font-serif text-[clamp(4.2rem,15vw,12rem)] leading-[0.85] tracking-[-0.02em] text-ink"
        >
          <span id="hello">{site.hello}</span>
        </Reveal>
        <p className="hero-fade mt-5 font-mono text-sm text-soft md:text-base">
          {site.pronounce} <span className="text-accent">&lt;/div&gt;</span>
          <span aria-hidden="true" className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-accent [animation:caret_1.1s_steps(1)_infinite]" />
        </p>
        <p className="hero-fade mt-6 max-w-md text-[15px] leading-relaxed text-soft md:text-base">{site.origin}</p>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 z-10 flex flex-col items-end gap-3 font-mono text-[11px] text-soft md:bottom-8 md:right-20">
        <span className="hero-fade flex items-center gap-2">
          scroll to zoom out
          <span aria-hidden="true" className="inline-block [animation:bob_2.4s_ease-in-out_infinite]">↓</span>
        </span>
        <span className="hero-fade hidden opacity-70 md:block">fig. 0 · [ASSET: particle tracks] procedural until the hand-traced ones land</span>
      </div>
    </section>
  );
}
