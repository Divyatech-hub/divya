# assets to make

Every placeholder on the site, and what replaces it. All handmade by div. Specs in `CLAUDE.md` section 6.

| placeholder on the site | where | what div makes | spec |
|---|---|---|---|
| procedural particle tracks | prologue, `components/chapters/Prologue.tsx` | hand-traced bubble-chamber tracks | SVG, one path per track, 6 to 10 tracks |
| crease-pattern square | ch 1 fold, `FoldVisual.tsx` | photos of your hands folding a crane | 60 to 80 frames, 1600px wide, WebP, numbered, tripod + plain background |
| flat gradient planets | ch 2 light, `LightVisual.tsx` | scans of your acrylic paintings | 4096×2048 crops, WebP |
| breathing dot nebula (no audio) | ch 3 sound, `SoundVisual.tsx` | choir or guitar recording | 30 to 60s, normalized, MP3 + OGG |
| purple foil sphere | ch 5 pale blue dot, `StoryView.tsx` | painting texture for under the foil | 4096×2048 equirectangular-friendly |
| no postcard photos | ch 5 (day 2) | photos from each place | WebP, 1200px |
| no OG image | metadata, `app/layout.tsx` | share image from your own art | 1200×630 |
| hidden projects | `content/projects/mochi.mdx`, `tuned.mdx`, `gift-of-sight.mdx` | a one-line summary each, then set `hidden: false` | text |
