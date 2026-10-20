---
name: sticker-art
description: Draw the images demos need (backgrounds, card pictures, photos to mask or edit) as laptop-style stickers on a subtle app-canvas surface. Use whenever a demo needs an image instead of reaching for photos or emoji art, and when adding or changing stickers.
---

# Sticker art

Demo images in this app are original stickers (dev culture plus skate and surf) stuck on a
quiet surface that matches the design-system canvas: like the lid of a developer's laptop.
They are drawn as SVG and rendered to JPG with headless Chrome, so every image is reproducible
from a small JSON scene.

```
.claude/skills/sticker-art/
  stickers.mjs        # the sticker library (SVG)
  render.mjs          # scene → image, and the catalog
  scenes/<name>.json  # one file per image in assets/demos/
```

## The look

- Surface: the light `canvas` (#F3F3F5) with a soft light falloff and fine grain, or its `dark`
  twin (#0B0B0D). Never metal, photos or patterns.
- Stickers: flat, bold color, a white die-cut border, a soft shadow and a faint vinyl sheen.
  Tilted up to ~14°, spread evenly, a few running off the edges.
- Calm beats busy: leave the parts of the image that sit behind UI empty (`keepClear`).
- Every image ships in light and dark, chosen with `useTheme().scheme`.
- Only original designs. No third-party logos, brand marks or slogans (no React atom, no
  Vans logo or "Off the wall"); evoke the culture instead (checkerboard, waves, `</>`).

## Make an image

1. Measure where it shows: a full-bleed stage, a card picture, a square, a mask. Render at about
   3× the point size, e.g. a stage under the header ≈ 1200×2250, a 16:9 card ≈ 1200×675.
2. Write `scenes/<name>.json` (and `<name>-dark.json`, same seed, `"surface": "dark"`):

   ```json
   {
     "out": "assets/demos/stickers-desk.jpg",
     "size": [1200, 2250],
     "surface": "canvas",
     "seed": 11,
     "count": 18,
     "scale": [0.95, 1.25],
     "rotate": 14,
     "keepClear": [[0.2, 0.33, 0.6, 0.29]]
   }
   ```

   - `count` / `scale`: about 18 at 0.95–1.25 for a phone-sized background; 6 at 0.8–1.0 for a
     card; about 30 at 0.5–0.65 for a fill behind a text or shape mask (letters need many small
     stickers to show color); 1–2 big ones (`place`) for a square album tile.
   - `stickers: [...]` picks exactly which ones, in order; `place: [{ id, x, y, scale, rotate }]`
     pins specific stickers (x and y are 0–1). Without them, `seed` picks and lays them out.
   - `keepClear: [[x, y, w, h]]` (0–1) keeps stickers fully out of areas covered by UI.
   - `inside: true` keeps every sticker whole in the frame; `inside: [x, y, w, h]` keeps them in the
     region that survives `cover` cropping, when one image serves slots of different shapes (the
     cards use `[0.11, 0.075, 0.78, 0.85]`, safe from about 1.2:1 to 1.85:1).
3. Render and look at the result (Read the image):

   ```bash
   node .claude/skills/sticker-art/render.mjs .claude/skills/sticker-art/scenes/<name>.json \
     .claude/skills/sticker-art/scenes/<name>-dark.json
   ```

   Re-roll `seed` or adjust `count`/`scale` until it is evenly spread and nothing important is cut.
4. Register it in `src/demos/_shared/fixtures.ts` under `stickerArt` as `{ light, dark }` and show it:
   - In a card-like slot (post picture, hero, album tile, photo to edit) use
     `<Picture art={stickerArt.<name>} style={...} />` from `@/demos/_shared/picture`. It picks the
     theme's version and adds a soft inner shadow around the edge, so the picture doesn't fade
     into the canvas (the surface is canvas-colored). Put the slot's corner radius in `style`.
   - Full-screen backgrounds and mask fills use a plain `Image` with
     `source={stickerArt.<name>[scheme]}`: there is no card edge to frame.
   Check it on the simulator in both modes. Images scale with `contentFit="cover"`, so confirm
   `keepClear` against the real UI and adjust.

No credits are needed: the stickers are drawn for this repo.

## Add or change stickers

Each entry in `stickers.mjs` has `w`/`h` (its own box), `silhouette` (outer shapes; drawn white
and stroked as the die-cut border) and `art` (the print). Use the palette constants at the top,
system fonts that ship with macOS (Futura, Rockwell, Menlo, Avenir Next Condensed, Arial Black),
and ids inside `art` freely (the renderer namespaces them). Then check every sticker:

```bash
node .claude/skills/sticker-art/render.mjs --catalog /tmp/stickers-catalog.png
```

Look for text that overflows or squeezes (use `textLength`), parts hidden by the border, and
art that only reads at large sizes. Re-render scenes that use a changed sticker.

## Requirements

macOS with Google Chrome (or `CHROME=/path/to/chrome`); `sips` converts to JPG. Rendering a
scene takes a few seconds.
