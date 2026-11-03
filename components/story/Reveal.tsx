"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useStoryActive } from "@/components/site/SiteState";

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
  /** start immediately instead of waiting for the element to scroll into view */
  immediate?: boolean;
  delay?: number;
};

/** Headline that rises in line by line from behind a mask. Short text only. */
export function Reveal({ as: Tag = "h2", className, children, immediate = false, delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const active = useStoryActive();

  useGSAP(
    () => {
      if (!active || !ref.current) return;
      // Elements with .await-js start hidden (see globals.css). Same frame as the split, so no flash.
      gsap.set(ref.current, { visibility: "visible" });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(ref.current!, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true, // re-splits when fonts load or the width changes
          onSplit(self) {
            self.masks.forEach((m) => m.classList.add("split-line-mask"));
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.2,
              stagger: 0.05,
              ease: "expo.out",
              delay,
              scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 85%", once: true },
            });
          },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [active], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
