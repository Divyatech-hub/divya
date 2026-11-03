# learning roadmap: building div's universe

**v1 ships first** in a 2-day sprint where Claude Code builds and I steer (see `CLAUDE.md` section 10). This roadmap starts after launch: I go back through what was built, learn how each piece works, and write every upgrade myself. `NOTES.md` from the sprint is my study guide.

I'm doing this to refresh React, sharpen fundamentals and get properly good at animation. After launch, Claude Code is my pair, not my ghostwriter (see section 0 of `CLAUDE.md`).

**How each milestone works**
1. Read the concept primer (the links listed).
2. Do the warm-up: a tiny throwaway exercise in `playground/`, not the real site.
3. Build the real feature.
4. Ask Claude Code to `review`.
5. Ship it live and tick the box.

Rough pace: one milestone a week at ~6–8 hrs. Some will go faster.

Every milestone also has two extra tracks:
- **JS fundamentals:** the plain-JavaScript concepts the feature leans on.
- **Under the hood:** build a tiny version of the library or framework thing yourself in `playground/under-the-hood/`, then go read the real source and compare. Your toy will be about 30 lines; theirs will handle 100 edge cases. Seeing which edge cases they handle is the lesson.

**How to read library source**
- `node_modules/<pkg>/package.json` → `main`, `module` or `exports` tells you the entry file.
- In the browser DevTools Sources panel, set a breakpoint inside a library call and step into it.
- In the editor, "Go to definition" on any import. If you land in a `.d.ts`, that's just the types, so open the matching `.js`.
- On GitHub, start from the `src/` folder and the function name you called. Read the tests too; they're the best docs.

---

## Milestone 0: JavaScript refresher (playground only, ~1 week)
*No React yet. Plain `.html` + `.js` files in `playground/js/`, opened in the browser.*

- [ ] Variables, scope, `let` vs `const` vs `var`, hoisting
- [ ] Functions, arrow functions, closures (build a `makeCounter()`)
- [ ] `this`, `call`/`apply`/`bind`, and why arrow functions don't have their own `this`
- [ ] Objects, prototypes, classes (they're the same thing in a nicer coat)
- [ ] Arrays: `map`, `filter`, `reduce`, `find`, spread, destructuring, immutability
- [ ] The DOM: `querySelector`, `addEventListener`, event bubbling and delegation, `classList`, `dataset`
- [ ] Async: callbacks → promises → `async`/`await`, `fetch`, error handling
- [ ] The event loop: call stack, task queue, microtasks, `requestAnimationFrame` (watch Jake Archibald's "In the Loop" talk)
- [ ] ES modules: `import`/`export`, and what a bundler actually does

**Mini project:** build the "skip the story" project list in **vanilla JS** from `projects.json`: fetch it, render cards, filter with buttons. You'll rebuild it in React next week and feel exactly what React saves you.
**Read:** javascript.info (free, the best structured reference), MDN for the DOM and events.

---

## Milestone 1: React foundations, the skip-the-story page
*Build the whole site as a plain, fast list page first. It becomes the real "skip the story" mode and the SEO base, and every later chapter reads from the same data.*

- [ ] Next.js App Router project, TypeScript, Tailwind, deployed to Vercel
- [ ] `content/` loaders: site.json, projects MDX, wins.json, places.json
- [ ] Components: `ProjectCard`, `WinRow`, `BeliefList`, `Footer`
- [ ] Filters on projects (shipped / building / wins / all)

**Fundamentals:** JSX, components and props, lists and keys, `useState`, derived state vs stored state, server vs client components, file-based routing, TypeScript types for your data.
**Warm-up:** a filterable list of 5 fake fruits, with no Next.js, just React.
**Read:** react.dev → Learn (the "Describing the UI" and "Adding Interactivity" sections). Next.js docs → App Router basics.
**Quiz yourself:** why does a list need keys? What makes something a client component?
**JS fundamentals:** JSX is just function calls (`React.createElement`), plus array `map`/`filter`, object spread and closures in event handlers.
**Under the hood:** write a 40-line `mini-react.js` with `createElement` + `render` (turn objects into DOM nodes), then a fake `useState` that uses an array and an index. You'll see why hooks can't sit inside `if` statements. Then open `node_modules/react/cjs/react.development.js` and find `useState`. Compare with Rodrigo Pombo's "Build your own React" (pomb.us).

## Milestone 2: state across the app, the theme system
- [ ] Dawn / day / dusk / night tokens as CSS variables
- [ ] `ThemeProvider` with context; defaults from the visitor's local time
- [ ] Toggle in the nav, remembered in localStorage (wrapped in try/catch)
- [ ] All four themes pass 4.5:1 contrast

**Fundamentals:** Context, `useEffect` and when *not* to use it, hydration mismatches (why server and client HTML must match), CSS custom properties, accessibility of toggle buttons (`aria-pressed`).
**Warm-up:** a counter shared by two sibling components via context.
**Read:** react.dev → "Managing State" + "You Might Not Need an Effect".
**JS fundamentals:** `localStorage` + `try/catch`, `Date` and time zones, `matchMedia` for system preferences, the observer pattern.
**Under the hood:** build a tiny pub/sub store (`subscribe`, `setState`, `getState`) in vanilla JS, then wire it to React with `useSyncExternalStore`. That's basically how Zustand works; read its `vanilla.ts` (it's under 100 lines).

## Milestone 3: motion basics with CSS only
*Before any library, learn what animation actually is.*

- [ ] Nav hover states, button presses, focus rings with transitions
- [ ] Theme switch crossfades smoothly
- [ ] Reveal-on-scroll using IntersectionObserver + CSS classes
- [ ] `prefers-reduced-motion` respected everywhere

**Fundamentals:** transitions vs keyframes, easing curves (cubic-bezier and what the numbers mean), why animating `transform` and `opacity` is cheap while `width` or `top` is not (layout → paint → composite), the 12 principles of animation (timing, ease in/out, anticipation, follow-through).
**Warm-up:** recreate 3 easing curves by hand on cubic-bezier.com and feel the difference.
**Read:** Josh Comeau's blog posts on CSS transitions and keyframes; MDN on IntersectionObserver.
**JS fundamentals:** IntersectionObserver callbacks, the DevTools Performance panel (record a scroll and find layout and paint), and the Web Animations API (`element.animate()`).
**Under the hood:** write your own `tween(from, to, duration, ease, onUpdate)` with `requestAnimationFrame` and an easing function. Easing is just `t => t * t` and friends. This toy *is* the core of GSAP.

## Milestone 4: GSAP + Lenis, the scroll story skeleton
- [ ] Lenis smooth scroll wired into the ScrollTrigger ticker
- [ ] Each chapter is a pinned section with its own timeline
- [ ] SplitText line reveals on headings
- [ ] Side chapter-progress indicator (it's also navigation)
- [ ] Cleanup with `gsap.context()` / `useGSAP` so nothing leaks between pages

**Fundamentals:** refs (`useRef`) and why animation libraries need DOM nodes, the effect cleanup lifecycle, React Strict Mode double-mounting, timelines (position parameter, labels), scrub vs toggle, `requestAnimationFrame`.
**Warm-up:** a 3-box timeline where box 2 starts halfway through box 1.
**Read:** gsap.com docs → Timelines, ScrollTrigger, the React guide (`useGSAP`). Lenis README.
**JS fundamentals:** scroll events and passive listeners, `getBoundingClientRect`, throttling vs `requestAnimationFrame`, method chaining.
**Under the hood:**
- **Mini Lenis:** listen to `wheel`, keep a `target` scroll, `lerp` the `current` toward it every frame, and call `window.scrollTo`. Then read `lenis/src/` and notice what you didn't think of (touch, keyboard, nested scroll).
- **Mini ScrollTrigger:** map an element's position in the viewport to a 0–1 progress and feed it into your tween from milestone 3.
- **Read:** GSAP's source is on GitHub (greensock/GSAP). Find `Timeline.add` and see how the position parameter is parsed.

## Milestone 5: SVG, the prologue particle tracks
- [ ] Hand-trace 6–10 bubble-chamber tracks into SVG (Figma or Illustrator)
- [ ] DrawSVG intro: tracks draw themselves in
- [ ] Magnetic cursor: tracks bend toward or away from the pointer, with damping
- [ ] Touch fallback: tap ripple + device tilt

**Fundamentals:** the SVG coordinate system and `viewBox`, path commands (M, C, Q, A), linear interpolation (`lerp`) and why damping feels natural, vectors (distance, direction, normalizing), pointer events.
**Warm-up:** a dot that follows your cursor with `lerp(current, target, 0.1)`. Try 0.02 and 0.5 and notice how they feel.
**Read:** MDN SVG path tutorial; "The Nature of Code" by Daniel Shiffman, the chapters on vectors and forces (free online).
**JS fundamentals:** Pointer Events (one API for mouse, touch and pen), `DeviceOrientationEvent` and its permission prompt on iOS, writing a small `Vec2` class.
**Under the hood:** draw a line yourself before using DrawSVG: `getTotalLength()` + `stroke-dasharray` + `stroke-dashoffset`. That's the whole trick; DrawSVG adds edge cases.

## Milestone 6: canvas, the crane fold sequence
- [ ] Photograph the fold: 60–80 frames on a tripod
- [ ] Batch-convert to WebP with a script in `scripts/`
- [ ] Draw frames to `<canvas>` scrubbed by ScrollTrigger
- [ ] Progressive preload: first, last and every 8th frame first, then fill in

**Fundamentals:** the canvas 2D API, devicePixelRatio and crisp rendering, image decoding and memory, network waterfalls, promises and `Promise.all`.
**Warm-up:** a canvas that draws a circle following the mouse at 60fps.
**JS fundamentals:** `new Image()` + `decode()`, `Promise.all` vs `Promise.allSettled`, `ImageBitmap`, Node scripts with `fs` for your asset pipeline.
**Under the hood:** the WebP batch script uses `sharp`. Peek at how it calls native libvips, so you see where JS hands off to C++.

## Milestone 7: 3D basics with React Three Fiber, the painting planets
*The big jump. Take it slow.*

- [ ] One persistent `<Canvas>` behind the page
- [ ] Spheres with your painting scans as textures (placeholders first)
- [ ] Drag to rotate with inertia; hover tilt with springs
- [ ] `AdaptiveDpr`, pause when offscreen, dispose on unmount

**Fundamentals:** scene, camera, renderer, mesh = geometry + material, lights, the render loop (`useFrame`), coordinate spaces, UV mapping (how a flat image wraps a sphere), why you never `setState` every frame.
**Warm-up:** a spinning cube, then swap it for a textured sphere.
**Read:** three.js docs → "Creating a scene"; R3F docs → "Your first scene" + "Pitfalls" (important). Three.js Journey by Bruno Simon is the best paid course if you want depth.
**JS fundamentals:** classes and inheritance (everything in three.js is `Object3D`), typed arrays (`Float32Array`), memory and garbage collection (why you reuse vectors inside loops).
**Under the hood:**
- First draw one triangle in **raw WebGL**, no library. It's painful on purpose, about 60 lines, and it shows you exactly what three.js saves you.
- Then build the same scene in plain three.js, then in R3F. Three versions of one thing.
- **Read:** R3F's `reconciler` is how JSX becomes three.js objects (pmndrs/react-three-fiber → `packages/fiber/src/core/`). Skim `applyProps`. Then open three's `Mesh.js` and `Object3D.js`.

## Milestone 8: shaders, the sunset sky
- [ ] A fullscreen shader plane
- [ ] A gradient sky driven by sun height (uniform from scroll)
- [ ] Upgrade to Rayleigh + Mie scattering
- [ ] Brush-mask transition from the sky into the paintings

**Fundamentals:** GPU vs CPU, vertex vs fragment shaders, uniforms, `mix`, `smoothstep`, noise. The physics: why the sky is blue at noon and orange at sunset (shorter wavelengths scatter more, and at sunset light travels through more atmosphere).
**Warm-up:** a fragment shader that turns screen position into color.
**Read:** The Book of Shaders (free, thebookofshaders.com), chapters 1–7.
**Under the hood:** open three's `src/renderers/shaders/ShaderChunk/` to see the GLSL behind `MeshStandardMaterial`. Every material you've used is just a big shader assembled from these chunks.

## Milestone 9: the scratch-off globe
- [ ] three-globe in R3F with Natural Earth country polygons
- [ ] Foil layer with a `CanvasTexture` alpha mask
- [ ] Raycast pointer → UV → paint transparent strokes into the mask
- [ ] Pre-scratch visited countries from places.json; auto-scratch intro timeline
- [ ] Postcard popover on click; stats counter

**Fundamentals:** raycasting, lat/lng ↔ 3D position (spherical coordinates, your math minor pays off here), texture updates (`needsUpdate`), GeoJSON structure, combining canvas + WebGL.
**JS fundamentals:** working with big JSON, `fetch` + streaming, and point-in-polygon checks (write one: the ray-casting algorithm is about 15 lines).
**Under the hood:** write your own `latLngToVector3()` before using three-globe's. Then read three-globe's `src/` to see how it turns GeoJSON into meshes.

## Milestone 10: full stack, the ask-me chatbot + questions sky
- [ ] `app/api/ask/route.ts` streaming from the Claude API
- [ ] Knowledge file + system prompt in your voice
- [ ] Rate limiting + input caps
- [ ] Chat UI with streaming text and question chips
- [ ] Supabase table for questions → each one rendered as a star

**Fundamentals:** route handlers, env vars and secrets, streaming responses (ReadableStream), loading and error states, optimistic UI, basic security (never trust the client).
**JS fundamentals:** HTTP basics (methods, headers, status codes), `ReadableStream` + `TextDecoder`, server-sent events, `AbortController`.
**Under the hood:** call the Claude API once with raw `fetch` (no SDK) and read the stream chunk by chunk in the console. Then look at what the SDK wraps around it. Also open `.next/server/` after a build to see what your route actually became.

## Bonus round (after launch)
- [ ] Audio nebula (Web Audio `AnalyserNode` + particles), with your own recording
- [ ] Orbit compound-interest calculator (controlled inputs, a bit of physics + finance math)
- [ ] Theatre.js camera paths between chapters
- [ ] Sherlock cipher easter egg + secret `/observatory` page
- [ ] Constellation-connect puzzle in the observatory
- [ ] Mochi mascot in Rive

---

## habits that make this stick
- **Commit after every checkbox** with a message that says what you learned, not just what changed.
- **Keep a `NOTES.md` dev log:** 3 lines per session (what i built, what confused me, what clicked). It's free LinkedIn and Substack material later.
- **Explain it back.** After each milestone, explain the core concept to Claude Code in your own words and ask it to poke holes.
- **Post the build.** One short post per milestone with a gif. Building in public fits your brand plan perfectly.
