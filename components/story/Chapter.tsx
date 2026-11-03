import { Reveal } from "./Reveal";

type Props = {
  id: string;
  number: string;
  title: string;
  headline: string;
  /** the motion piece. pinned beside the text on desktop, on top on mobile */
  visual: React.ReactNode;
  children: React.ReactNode;
  /** put the visual on the right instead of the left */
  flip?: boolean;
  /** keep the visual square. turn off for visuals with their own height, like the calculator */
  square?: boolean;
};

/**
 * Shared chapter layout. The visual is pinned with CSS `position: sticky`
 * while the words scroll past it. Sticky does the pinning, so GSAP only drives the motion.
 */
export function Chapter({ id, number, title, headline, visual, children, flip = false, square = true }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative px-5 md:px-10">
      <div className={`mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-16 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative md:sticky md:top-0 md:flex md:h-[100svh] md:items-center">
          <div className={square ? "aspect-square w-full" : "w-full"}>{visual}</div>
        </div>

        <div className="pb-24 md:py-[28svh]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft">
            chapter {number} · <span id={`${id}-title`}>{title}</span>
          </p>
          <Reveal className="mt-5 font-serif text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[0.95] tracking-[-0.01em] text-ink">
            {headline}
          </Reveal>
          <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-soft">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Small mono label that marks a stand-in for one of div's handmade assets. */
export function AssetLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-line bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] px-3 py-1 font-mono text-[10px] text-soft backdrop-blur-sm">
      {children}
    </span>
  );
}
