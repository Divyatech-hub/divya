# sprint notes: how it works

Short "how this works" notes from the launch sprint. Each one names the concept and where it lives, so you can look it up later. This becomes the study guide for `LEARNING.md`.

---

## day 1 · task 1: scaffold + content

- **content as data.** Everything you'd edit lives in `content/` (site.json, projects/*.mdx, wins.json, places.json). Components never hardcode copy. → `lib/content.ts`
- **frontmatter.** Each project file is YAML on top (data) + markdown below (the case study). `gray-matter` splits the two. → `getProjects()` in `lib/content.ts`
- **`[TODO]` never renders.** `clean()` hides any text that starts with `[TODO]`, and case-study sections that are still `[TODO]` get dropped. Fill them in and they appear. → `lib/content.ts`, `app/work/[slug]/page.tsx` (`withoutTodoSections`)
- **server components read files.** `app/page.tsx` runs at build time, reads `content/` with `fs`, and ships plain HTML. Only the interactive bits are `"use client"`.
- **static case studies.** `generateStaticParams()` pre-builds `/work/shipyard` etc. at build time. → `app/work/[slug]/page.tsx`

## day 1 · task 2: theme

- **CSS custom properties as tokens.** Four palettes (`dawn/day/dusk/night`) in `app/globals.css`; Tailwind colors like `text-ink` just point at `var(--ink)`. → `tailwind.config.js`
- **`@property` makes colors animatable.** Normal CSS variables swap instantly. Registering them with `@property { syntax: "<color>" }` lets the browser interpolate, so a theme change is a 1.2s crossfade. → top of `app/globals.css`
- **no flash of the wrong theme.** A tiny inline script in `<head>` reads localStorage (or your clock) and sets `data-theme` *before first paint*. React then syncs from it in an effect, starting from `null` so server and client HTML match. **Fundamental: hydration.** → `app/layout.tsx` (`bootScript`), `components/site/SiteState.tsx`
- **contrast is tested, not guessed.** `node scripts/check-contrast.mjs` checks every text color against 4.5:1 in all four themes. **Fundamental: relative luminance.**

## day 1 · task 3: scroll story

- **Lenis + GSAP share one loop.** Lenis smooths the scroll; we drive it from `gsap.ticker` and call `ScrollTrigger.update` on every Lenis scroll, so they never drift. → `components/story/SmoothScroll.tsx`
- **pinning with `position: sticky`.** Each chapter's visual is sticky beside the text. CSS does the pin; GSAP only does motion. Simpler and never fights Lenis. → `components/story/Chapter.tsx`
- **SplitText line reveals.** Headlines split into lines, each in a mask, rising in with `expo.out` and a 0.05s stagger. `autoSplit` re-splits when fonts load. → `components/story/Reveal.tsx`
- **`gsap.matchMedia()` for reduced motion.** Animations only register under `(prefers-reduced-motion: no-preference)`; everyone else sees static content. `useGSAP` reverts everything on unmount.
- **orbit nav.** One ScrollTrigger per chapter reports which chapter is in the middle of the screen; the planet glides between dots. → `components/story/OrbitProgress.tsx`

## day 1 · task 4: prologue hero

- **procedural tracks.** Each low-energy particle loses energy, so its curvature grows every step and the path spirals inward, like a real bubble chamber. → `makeTracks()` in `components/chapters/Prologue.tsx`
- **the "magnetic field" is a rotation.** Every point is rotated around the cursor by an angle that fades with distance (a gaussian). + and − tracks rotate opposite ways. **Fundamental: 2D rotation matrix** (`x' = x cos a − y sin a`).
- **lerp damping.** The field follows a smoothed cursor: `x += (target − x) * 0.1` every frame. That one line is why it feels like inertia instead of being glued on. **Fundamental: lerp / exponential smoothing.**
- **draw-in with `pathLength={1}`.** Normalizing every path to length 1 means `stroke-dashoffset: 1 → 0` draws it in, even while the path's shape keeps changing.
- **the loop sleeps.** The rAF loop stops when the field has settled or the hero is offscreen (IntersectionObserver). Touch: tap = a decaying burst + ripple; phones also nudge the field with tilt.

## day 1 · task 5: chapters

- **fold:** a real bird-base crease pattern (22.5° bisectors, `tan(π/8)`) drawn in by a scrubbed timeline. → `FoldVisual.tsx`
- **light:** GSAP tweens CSS variables (`--sky-top` etc.) along the scroll, so the gradient itself sets. → `LightVisual.tsx`
- **sound:** pure CSS breathing on 5 groups of dots (golden-angle spiral, no `Math.random`, so server and client match). → `SoundVisual.tsx`
- **gravity:** month-by-month compounding, `b = b × (1 + r/12) + monthly`. Radius ∝ balance, one lap per year. The dashed "just saving" spiral is the same math with r = 0. Numbers ease to new values with a tween on a plain object. → `OrbitCalculator.tsx`
- **observatory filters:** the visible list is *derived* from `(projects, filter)`, not stored in state. **Fundamental: derived state.** → `ObservatoryGrid.tsx`

## day 2 · task 6: scratch-off globe

- **three layers, one sphere.** paint (your painting, placeholder for now) → foil (printed map) → mask. The mask is a `<canvas>` used as the foil's `alphaMap`: white = foil, black = scratched. → `components/chapters/globe/GlobeScene.tsx`
- **scratching is just canvas drawing.** A raycast hit on the foil gives `e.uv` (0..1 across the texture). Multiply by the canvas size, draw a black stroke, set `maskTex.needsUpdate = true`. That's the whole trick.
- **lat/lng → 3D is spherical coordinates.** `latLngToVector3()` in `lib/geo.ts` (your "try this" for today). Textures are equirectangular, so canvas x ∝ longitude, y ∝ latitude, and they line up with the 3D pins for free.
- **the intro is a GSAP timeline over places.json.** Per place: turn the globe the shortest way round (`atan2(sin, cos)` wraps the angle), then scrub a progress value 0 → 1 that draws coin strokes nearest-first from the city, clipped to the country outline (`ctx.clip()`).
- **inertia without a library.** Drag sets a velocity, every frame it's multiplied by 0.94 (friction). The damping uses `1 - 0.0025^delta` so it feels the same at 60 and 120fps. **Fundamental: frame-rate independent smoothing.**
- **cheap by default.** three.js is a separate chunk (`next/dynamic`, `ssr: false`) that only loads 800px before the globe; the render loop is `"never"` when it's offscreen; textures are disposed on unmount.
