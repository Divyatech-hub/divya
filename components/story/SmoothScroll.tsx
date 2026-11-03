"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, setLenis } from "@/lib/gsap";
import { useStoryActive } from "@/components/site/SiteState";

/**
 * Lenis smooth scroll, driven by GSAP's ticker so Lenis and ScrollTrigger
 * share one requestAnimationFrame loop and never drift apart.
 */
export function SmoothScroll() {
  const active = useStoryActive();

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000); // gsap gives seconds, lenis wants ms
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [active]);

  // Fonts change line heights, so re-measure every trigger once they're in.
  useEffect(() => {
    if (!active) return;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [active]);

  return null;
}
