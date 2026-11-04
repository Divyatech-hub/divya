"use client";
// The scratch-off globe. Loaded lazily (next/dynamic) so three.js never touches the first paint.
//
// Three layers on (almost) the same sphere:
//   1. paint: div's painting texture underneath. [ASSET: painting texture] a flat placeholder for now.
//   2. foil:  a metallic skin printed with country outlines, like a real scratch map.
//   3. mask:  a canvas used as the foil's alphaMap. white = foil, black = scratched away.
// Scratching = drawing black strokes into the mask canvas, then telling three it changed.

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { countryBox, latLngToVector3, rotationToFace, toCanvas, traceCountry, type Country } from "@/lib/geo";
import type { Place } from "@/lib/content";

const W = 2048;
const H = 1024;

export type GlobeTool = "spin" | "scratch";

type SceneProps = {
  places: Place[]; // already in visit order
  countries: Country[];
  foil: "copper" | "dusk";
  tool: GlobeTool;
  focus: Place | null;
  introKey: number; // bump to replay the intro
  playIntro: boolean;
  reducedMotion: boolean;
  onRevealed: (count: number) => void;
  onPick: (place: Place) => void;
};

const FOIL = {
  copper: { sea: "#a8683f", land: "#c98a5c", line: "#7a4626" },
  dusk: { sea: "#4b3670", land: "#6a5296", line: "#2e2048" },
};

/** Coin strokes: back-and-forth diagonal lines covering a box, nearest-first to (cx, cy). */
function scribble(box: { x0: number; y0: number; x1: number; y1: number }, cx: number, cy: number, spacing = 7) {
  const strokes: { a: [number, number]; b: [number, number]; d: number }[] = [];
  const w = box.x1 - box.x0;
  const h = box.y1 - box.y0;
  for (let t = -h; t < w + h; t += spacing) {
    const a: [number, number] = [box.x0 + t, box.y1 + 2];
    const b: [number, number] = [box.x0 + t + h + 4, box.y0 - 2];
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    strokes.push({ a, b, d: Math.hypot(mx - cx, my - cy) });
  }
  return strokes.sort((p, q) => p.d - q.d);
}

/** One wobbly coin stroke. Never a perfect line: a hand doesn't draw those. */
function coinStroke(ctx: CanvasRenderingContext2D, a: [number, number], b: [number, number], width: number) {
  ctx.lineWidth = width * (0.8 + Math.random() * 0.4);
  ctx.beginPath();
  ctx.moveTo(a[0] + (Math.random() - 0.5) * 3, a[1] + (Math.random() - 0.5) * 3);
  const mx = (a[0] + b[0]) / 2 + (Math.random() - 0.5) * 6;
  const my = (a[1] + b[1]) / 2 + (Math.random() - 0.5) * 6;
  ctx.quadraticCurveTo(mx, my, b[0] + (Math.random() - 0.5) * 3, b[1] + (Math.random() - 0.5) * 3);
  ctx.stroke();
}

function Globe(props: SceneProps) {
  const { places, countries, foil, tool, focus, introKey, playIntro, reducedMotion, onRevealed, onPick } = props;
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const tiltGroup = useRef<THREE.Group>(null); // rotation.x (latitude)
  const spinGroup = useRef<THREE.Group>(null); // rotation.y (longitude)
  const coin = useRef<THREE.Mesh>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  /** The visitor took over: finish the intro instantly (every place scratched, callbacks fired). */
  const finishIntro = () => {
    if (intro.current?.isActive()) intro.current.progress(1, false);
    intro.current = null;
  };

  // rotation state, all plain numbers in a ref: changing them must never re-render React
  const rot = useRef({ x: 0.35, y: 0, tx: 0.35, ty: 0, vx: 0, vy: 0, dragging: false, idle: true });

  // ── textures ──────────────────────────────────────────────────────────────
  const tex = useMemo(() => {
    const make = () => {
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      return c;
    };
    const paint = make();
    const foilC = make();
    const mask = make();
    const paintTex = new THREE.CanvasTexture(paint);
    const foilTex = new THREE.CanvasTexture(foilC);
    const maskTex = new THREE.CanvasTexture(mask); // alphaMap reads raw values, so no sRGB here
    paintTex.colorSpace = THREE.SRGBColorSpace;
    foilTex.colorSpace = THREE.SRGBColorSpace;
    [paintTex, foilTex, maskTex].forEach((t) => (t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())));
    return { paint, foil: foilC, mask, paintTex, foilTex, maskTex };
  }, [gl]);

  // free GPU memory when the globe leaves the page
  useEffect(() => () => [tex.paintTex, tex.foilTex, tex.maskTex].forEach((t) => t.dispose()), [tex]);

  const byIso = useMemo(() => new Map(countries.map((c) => [c.iso, c])), [countries]);

  // paint layer: [ASSET: painting texture]. Plain paper + outlines until div's scan exists.
  useEffect(() => {
    const ctx = tex.paint.getContext("2d")!;
    ctx.fillStyle = "#e6ddcb";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#d3c4a6";
    ctx.strokeStyle = "#8d7a5a";
    ctx.lineWidth = 1.2;
    for (const c of countries) {
      ctx.beginPath();
      traceCountry(ctx, c, W, H);
      ctx.fill();
      ctx.stroke();
    }
    tex.paintTex.needsUpdate = true;
    invalidate();
  }, [countries, tex, invalidate]);

  // foil layer: printed map, like a real scratch-off poster
  useEffect(() => {
    const ctx = tex.foil.getContext("2d")!;
    const f = FOIL[foil];
    ctx.fillStyle = f.sea;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = f.land;
    ctx.strokeStyle = f.line;
    ctx.lineWidth = 1.4;
    for (const c of countries) {
      ctx.beginPath();
      traceCountry(ctx, c, W, H);
      ctx.fill();
      ctx.stroke();
    }
    // fine grain so the foil doesn't look like flat plastic
    const grain = ctx.getImageData(0, 0, W, H);
    for (let i = 0; i < grain.data.length; i += 4) {
      const n = (Math.random() - 0.5) * 14;
      grain.data[i] += n;
      grain.data[i + 1] += n;
      grain.data[i + 2] += n;
    }
    ctx.putImageData(grain, 0, 0);
    tex.foilTex.needsUpdate = true;
    invalidate();
  }, [countries, foil, tex, invalidate]);

  // ── scratching ────────────────────────────────────────────────────────────
  /** Strokes for one place: the whole country (nearest-first from the city), plus a blob at the city. */
  const strokesFor = (place: Place) => {
    const [cx, cy] = toCanvas(place.lng, place.lat, W, H);
    const country = byIso.get(place.country);
    const box = country ? countryBox(country, W, H) : { x0: cx - 14, y0: cy - 14, x1: cx + 14, y1: cy + 14 };
    return { cx, cy, country, strokes: scribble(box, cx, cy), blob: scribble({ x0: cx - 13, y0: cy - 13, x1: cx + 13, y1: cy + 13 }, cx, cy, 5) };
  };

  /** Draw country strokes [c0, c1) clipped to the country, and city-blob strokes [b0, b1). */
  const scratchPlace = (plan: ReturnType<typeof strokesFor>, c0: number, c1: number, b0: number, b1: number) => {
    const ctx = tex.mask.getContext("2d")!;
    ctx.strokeStyle = "#000";
    ctx.lineCap = "round";
    if (plan.country && c1 > c0) {
      ctx.save();
      ctx.beginPath();
      traceCountry(ctx, plan.country, W, H);
      ctx.clip();
      for (let i = c0; i < Math.min(c1, plan.strokes.length); i++) coinStroke(ctx, plan.strokes[i].a, plan.strokes[i].b, 11);
      ctx.restore();
    }
    // tiny countries (switzerland is ~20px wide here) still get a visible scratch around the city
    if (b1 > b0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(plan.cx, plan.cy, 12, 0, Math.PI * 2);
      ctx.clip();
      for (let i = b0; i < Math.min(b1, plan.blob.length); i++) coinStroke(ctx, plan.blob[i].a, plan.blob[i].b, 8);
      ctx.restore();
    }
    tex.maskTex.needsUpdate = true;
    invalidate();
  };

  // The intro: a coin visits each place in the order div went there.
  useEffect(() => {
    if (!countries.length) return;
    const ctx = tex.mask.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);
    tex.maskTex.needsUpdate = true;

    const plans = places.map(strokesFor);
    if (reducedMotion) {
      // no coin, no motion: just show the scratched map
      plans.forEach((plan) => scratchPlace(plan, 0, Infinity, 0, Infinity));
      onRevealed(places.length);
      return;
    }
    if (!playIntro) {
      // loaded early, before it's on screen: stay fully foiled until the intro starts
      onRevealed(0);
      invalidate();
      return;
    }

    onRevealed(0);
    const seen = new Set<string>();
    const tl = gsap.timeline({ delay: 0.4 });
    intro.current = tl;
    places.forEach((place, i) => {
      const plan = plans[i];
      const face = rotationToFace(place.lat, place.lng);
      // the first city in a country scratches the whole country, starting from that city.
      // later cities there (the us has four) only scratch their own small spot.
      const countryStrokes = seen.has(place.country) ? 0 : plan.strokes.length;
      seen.add(place.country);
      const progress = { n: 0 };
      let c = 0;
      let b = 0;

      tl.add(() => {
        const r = rot.current;
        // turn the shortest way round, so the globe never spins a full lap to get there
        r.tx = face.x * 0.8;
        r.ty = r.ty + Math.atan2(Math.sin(face.y - r.ty), Math.cos(face.y - r.ty));
        r.vx = r.vy = 0;
        r.idle = false;
        if (coin.current) {
          coin.current.visible = true;
          const pos = new THREE.Vector3(...latLngToVector3(place.lat, place.lng, 1.03));
          coin.current.position.copy(pos);
          coin.current.userData.base = pos.clone();
          // lay the coin flat on the surface: turn its face (+z) to point straight out from the center
          coin.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
        }
      });
      tl.to(progress, {
        n: 1,
        duration: countryStrokes ? Math.min(1.6, 0.5 + countryStrokes / 140) : 0.45,
        delay: 0.55, // let the globe arrive before the coin starts
        ease: "power1.inOut", // a hand speeds up, then slows to finish the corners
        onUpdate: () => {
          const c1 = Math.floor(progress.n * countryStrokes);
          const b1 = Math.floor(progress.n * plan.blob.length);
          scratchPlace(plan, c, c1, b, b1);
          c = c1;
          b = b1;
        },
        onComplete: () => {
          scratchPlace(plan, c, countryStrokes, b, plan.blob.length);
          onRevealed(i + 1);
        },
      });
    });
    tl.add(() => {
      rot.current.idle = true;
      if (coin.current) coin.current.visible = false;
    }, "+=0.3");
    return () => {
      tl.kill();
    };
  }, [countries, introKey, playIntro, reducedMotion]);

  // Visitor scratching with the coin tool.
  const last = useRef<[number, number] | null>(null);
  const scratchAt = (e: ThreeEvent<PointerEvent>) => {
    if (tool !== "scratch" || !e.uv) return;
    if (e.pointerType === "mouse" && e.buttons !== 1) {
      last.current = null;
      return;
    }
    e.stopPropagation();
    const p: [number, number] = [e.uv.x * W, (1 - e.uv.y) * H];
    const ctx = tex.mask.getContext("2d")!;
    ctx.strokeStyle = "#000";
    ctx.lineCap = "round";
    // a jump across the date line would draw a stroke around the whole planet: start fresh instead
    if (last.current && Math.abs(last.current[0] - p[0]) < W / 2) coinStroke(ctx, last.current, p, 16);
    else coinStroke(ctx, p, [p[0] + 1, p[1] + 1], 16);
    last.current = p;
    tex.maskTex.needsUpdate = true;
    invalidate();
  };

  // Turn to a place when the visitor picks one from the list.
  useEffect(() => {
    if (!focus) return;
    finishIntro();
    const face = rotationToFace(focus.lat, focus.lng);
    const r = rot.current;
    r.tx = face.x * 0.8;
    r.ty = r.ty + Math.atan2(Math.sin(face.y - r.ty), Math.cos(face.y - r.ty));
    r.vx = r.vy = 0;
    r.idle = false;
    invalidate();
  }, [focus, invalidate]);

  // Drag to spin, with inertia. Listeners on the canvas element, not the mesh,
  // so a drag that slides off the globe keeps working.
  useEffect(() => {
    const el = gl.domElement;
    let px = 0;
    let py = 0;
    const down = (e: PointerEvent) => {
      finishIntro();
      if (tool !== "spin") return;
      const r = rot.current;
      r.dragging = true;
      r.idle = false;
      px = e.clientX;
      py = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      const r = rot.current;
      if (!r.dragging) return;
      const dx = (e.clientX - px) * 0.006;
      const dy = (e.clientY - py) * 0.006;
      px = e.clientX;
      py = e.clientY;
      r.ty += dx;
      r.tx = Math.max(-0.9, Math.min(0.9, r.tx + dy));
      r.vy = dx;
      r.vx = dy;
      invalidate();
    };
    const up = () => {
      rot.current.dragging = false;
      last.current = null;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    // spin mode lets vertical swipes scroll the page on phones; scratch mode keeps every touch
    el.style.touchAction = tool === "scratch" ? "none" : "pan-y";
    el.style.cursor = tool === "scratch" ? "crosshair" : "grab";
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, tool, invalidate]);

  useFrame((_, delta) => {
    const r = rot.current;
    const k = 1 - Math.pow(0.0025, delta); // frame-rate independent damping (~0.1 at 60fps)
    if (!r.dragging) {
      // momentum after a flick, bleeding off with friction
      r.ty += r.vy;
      r.tx = Math.max(-0.9, Math.min(0.9, r.tx + r.vx));
      r.vy *= 0.94;
      r.vx *= 0.94;
      if (r.idle && !reducedMotion && Math.abs(r.vy) < 0.0005) r.ty += delta * 0.06; // a slow drift, like earth
    }
    r.x += (r.tx - r.x) * k;
    r.y += (r.ty - r.y) * k;
    if (tiltGroup.current) tiltGroup.current.rotation.x = r.x;
    if (spinGroup.current) spinGroup.current.rotation.y = r.y;
    const c = coin.current;
    if (c?.visible && c.userData.base) {
      // the coin scrubs back and forth a little while it scratches
      const t = performance.now() / 90;
      const base = c.userData.base as THREE.Vector3;
      c.position.set(base.x + Math.sin(t) * 0.012, base.y + Math.cos(t * 1.3) * 0.008, base.z + Math.sin(t * 0.7) * 0.01);
    }
  });

  const pins = useMemo(() => places.map((p) => ({ place: p, pos: latLngToVector3(p.lat, p.lng, 1.012) })), [places]);
  const coinGeo = useMemo(() => new THREE.CylinderGeometry(0.035, 0.035, 0.008, 32).rotateX(Math.PI / 2), []);

  return (
    <group ref={tiltGroup}>
      <group ref={spinGroup}>
        <mesh>
          <sphereGeometry args={[1, 96, 64]} />
          <meshStandardMaterial map={tex.paintTex} roughness={0.95} />
        </mesh>
        <mesh onPointerDown={scratchAt} onPointerMove={scratchAt} onPointerUp={() => (last.current = null)}>
          <sphereGeometry args={[1.004, 96, 64]} />
          <meshStandardMaterial map={tex.foilTex} alphaMap={tex.maskTex} transparent metalness={0.3} roughness={0.62} />
        </mesh>
        {pins.map(({ place, pos }) => (
          <mesh
            key={place.city}
            position={pos}
            onClick={(e) => {
              if (tool !== "spin" || e.delta > 6) return; // a drag that ends on a pin isn't a click
              e.stopPropagation();
              onPick(place);
            }}
          >
            <sphereGeometry args={[focus?.city === place.city ? 0.022 : 0.014, 16, 16]} />
            <meshBasicMaterial color={focus?.city === place.city ? "#ffd27a" : "#fff7ea"} />
          </mesh>
        ))}
        <mesh ref={coin} geometry={coinGeo} visible={false}>
          <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

export default function GlobeScene(props: SceneProps & { running: boolean }) {
  const { running, ...rest } = props;
  return (
    <Canvas
      frameloop={running ? "always" : "never"} // nothing renders while the globe is offscreen
      camera={{ position: [0, 0, 4.1], fov: 33 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <AdaptiveDpr pixelated={false} />
      {/* soft, even light: foil should look like matte foil under a desk lamp, not a cg render */}
      <ambientLight intensity={1.3} />
      <directionalLight position={[2.5, 3, 4]} intensity={1.6} />
      <Globe {...rest} />
    </Canvas>
  );
}
