#!/usr/bin/env node
/**
 * Renders sticker scenes to images with headless Chrome.
 *
 *   node .claude/skills/sticker-art/render.mjs <scene.json> [...more scenes]
 *   node .claude/skills/sticker-art/render.mjs --catalog <out.png>
 *
 * A scene (JSON, kept in .claude/skills/sticker-art/scenes/) describes one image:
 *
 *   {
 *     "out": "assets/demos/stickers-desk.jpg",   // .jpg or .png, relative to the repo root
 *     "size": [1200, 2400],                        // pixels
 *     "surface": "canvas",                         // "canvas" (light) | "dark"
 *     "seed": 7,                                   // same seed → same layout
 *     "count": 12,                                 // stickers to place (ignored with "stickers")
 *     "stickers": ["duck", "wave"],                // optional: exactly these, in this order
 *     "scale": [1, 1.4],                           // size range, 1 = natural size at 1200 px wide
 *     "rotate": 14,                                // max tilt in degrees, either way
 *     "keepClear": [[0.2, 0.45, 0.6, 0.25]],       // [x, y, w, h] (0-1) that stickers stay out of
 *     "inside": true,                              // keep every sticker whole inside the frame,
 *                                                  // or inside [x, y, w, h] (0-1) that survives cropping
 *     "place": [{ "id": "duck", "x": 0.3, "y": 0.2, "scale": 1.2, "rotate": -8 }]  // fixed stickers
 *   }
 *
 * Chrome: $CHROME, or Google Chrome in /Applications. Uses macOS fonts (Futura, Rockwell, Menlo).
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { STICKERS } from './stickers.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');
const CHROME =
  process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BORDER = 11; // die-cut white border, in sticker units

const SURFACES = {
  // Matches the design-system `canvas` (#F3F3F5) with a soft light falloff and paper-fine grain.
  canvas: { base: '#F3F3F5', light: 'rgba(255,255,255,0.75)', shade: 'rgba(20,20,40,0.05)', grain: 0.05 },
  dark: { base: '#0B0B0D', light: 'rgba(255,255,255,0.06)', shade: 'rgba(0,0,0,0.5)', grain: 0.08 },
};

/** Deterministic PRNG (mulberry32). */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Suffix every id in a sticker's markup so repeated stickers don't share defs. */
function namespace(markup, suffix) {
  const ids = [...markup.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
  let out = markup;
  for (const id of ids) {
    out = out
      .replaceAll(`id="${id}"`, `id="${id}-${suffix}"`)
      .replaceAll(`url(#${id})`, `url(#${id}-${suffix})`)
      .replaceAll(`href="#${id}"`, `href="#${id}-${suffix}"`);
  }
  return out;
}

function stickerSvg(id, px, index) {
  const s = STICKERS[id];
  if (!s) throw new Error(`Unknown sticker "${id}". Known: ${Object.keys(STICKERS).join(', ')}`);
  const k = `s${index}`;
  const vb = `${-BORDER} ${-BORDER} ${s.w + BORDER * 2} ${s.h + BORDER * 2}`;
  const height = (px * (s.h + BORDER * 2)) / (s.w + BORDER * 2);
  return {
    height,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${px}" height="${height}">
      <defs>
        <clipPath id="clip-${k}">${s.silhouette}</clipPath>
        <linearGradient id="sheen-${k}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0.38"/>
          <stop offset="0.45" stop-color="#fff" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity="0.06"/>
        </linearGradient>
      </defs>
      <g class="border">${s.silhouette}</g>
      ${namespace(s.art, k)}
      <rect x="0" y="0" width="${s.w}" height="${s.h}" fill="url(#sheen-${k})" clip-path="url(#clip-${k})"/>
    </svg>`,
  };
}

function surfaceCss(name, w, h) {
  const s = SURFACES[name] ?? SURFACES.canvas;
  const grain = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  return `
    body { margin: 0; width: ${w}px; height: ${h}px; overflow: hidden; background: ${s.base}; }
    .surface { position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 25% 15%, ${s.light}, transparent 70%),
        radial-gradient(ellipse 90% 70% at 85% 100%, ${s.shade}, transparent 70%); }
    .grain { position: absolute; inset: 0; opacity: ${s.grain}; mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml,${grain.replaceAll('"', "'").replaceAll('#', '%23').replaceAll('<', '%3C').replaceAll('>', '%3E')}"); }
    .sticker { position: absolute; transform-origin: center;
      filter: drop-shadow(0 ${Math.round(w / 300)}px ${Math.round(w / 120)}px rgba(20,20,40,0.16))
              drop-shadow(0 1px 1.5px rgba(20,20,40,0.18)); }
    .sticker svg { display: block; overflow: visible; }
    .border * { fill: #fff !important; stroke: #fff !important; stroke-width: ${BORDER * 2}px !important;
      stroke-linejoin: round !important; }
  `;
}

function layout(scene) {
  const [W, H] = scene.size;
  const rand = rng(scene.seed ?? 1);
  const unit = W / 1200;
  const [minScale, maxScale] = scene.scale ?? [1, 1.35];
  const tilt = scene.rotate ?? 14;
  const keepClear = scene.keepClear ?? [];
  // `inside`: true keeps stickers whole within the frame; [x, y, w, h] (0-1) within that region
  // (the part that survives `cover` cropping when one image serves slots of different shapes).
  const inside = scene.inside === true ? [0, 0, 1, 1] : (scene.inside ?? null);
  const placed = [];

  const radius = (id, scale) => {
    const s = STICKERS[id];
    return (Math.sqrt(s.w * s.h) / 2 + BORDER) * scale * unit;
  };

  for (const p of scene.place ?? []) {
    const scale = p.scale ?? 1.2;
    placed.push({ id: p.id, x: p.x * W, y: p.y * H, scale, rotate: p.rotate ?? 0, r: radius(p.id, scale) });
  }

  let pool = scene.stickers;
  if (!pool) {
    const ids = Object.keys(STICKERS);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    pool = ids.slice(0, scene.count ?? 12);
  }

  // Best-candidate sampling: each sticker tries many spots and takes the one with the most
  // room around it, which spreads stickers evenly instead of clumping.
  for (const id of pool) {
    let best = null;
    for (let attempt = 0; attempt < 80; attempt++) {
      const scale = minScale + rand() * (maxScale - minScale);
      const r = radius(id, scale);
      // Backgrounds let stickers run a little off the edges, like on a real lid; with
      // `inside`, every sticker stays whole (small pictures where a cut sticker reads as a mistake).
      const x = inside
        ? inside[0] * W + r + rand() * (inside[2] * W - 2 * r)
        : (-0.04 + rand() * 1.08) * W;
      const y = inside
        ? inside[1] * H + r + rand() * (inside[3] * H - 2 * r)
        : (-0.03 + rand() * 1.06) * H;
      // No part of the sticker (its bounding circle) may touch a keep-clear area.
      const inClear = keepClear.some(([cx, cy, cw, ch]) => {
        const nx = Math.max(cx * W, Math.min(x, (cx + cw) * W));
        const ny = Math.max(cy * H, Math.min(y, (cy + ch) * H));
        return Math.hypot(x - nx, y - ny) < r * 0.9;
      });
      if (inClear) continue;
      // Room left between this sticker and its nearest neighbour (negative = overlap).
      const room = Math.min(
        ...placed.map((o) => Math.hypot(o.x - x, o.y - y) - (o.r + r)),
        // Edges count as neighbours too, so the middle doesn't win every time.
        inside
          ? Math.min(
              x - r - inside[0] * W,
              (inside[0] + inside[2]) * W - x - r,
              y - r - inside[1] * H,
              (inside[1] + inside[3]) * H - y - r,
            ) * 2
          : Math.min(x + 0.5 * r, W - x + 0.5 * r, y + 0.5 * r, H - y + 0.5 * r) * 1.4,
      );
      if (!best || room > best.room) best = { id, x, y, scale, r, room };
    }
    best.rotate = (rand() * 2 - 1) * tilt;
    placed.push(best);
  }
  return placed;
}

function sceneHtml(scene) {
  const [W, H] = scene.size;
  const unit = W / 1200;
  const stickers = layout(scene)
    .map((p, i) => {
      const s = STICKERS[p.id];
      const px = (s.w + BORDER * 2) * p.scale * unit;
      const { svg, height } = stickerSvg(p.id, px, i);
      return `<div class="sticker" style="left:${p.x - px / 2}px; top:${p.y - height / 2}px; transform: rotate(${p.rotate.toFixed(1)}deg)">${svg}</div>`;
    })
    .join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${surfaceCss(scene.surface, W, H)}</style></head>
    <body><div class="surface"></div><div class="grain"></div>${stickers}</body></html>`;
}

function catalogHtml() {
  const ids = Object.keys(STICKERS);
  const cols = 5;
  const cell = 280;
  const W = cols * cell;
  const H = Math.ceil(ids.length / cols) * (cell + 30);
  const items = ids
    .map((id, i) => {
      const s = STICKERS[id];
      const px = Math.min(220, (220 * (s.w + BORDER * 2)) / (s.h + BORDER * 2));
      const { svg, height } = stickerSvg(id, px, i);
      const x = (i % cols) * cell + (cell - px) / 2;
      const y = Math.floor(i / cols) * (cell + 30) + (cell - height) / 2;
      return `<div class="sticker" style="left:${x}px; top:${y}px">${svg}</div>
        <div style="position:absolute; left:${(i % cols) * cell}px; width:${cell}px; top:${Math.floor(i / cols) * (cell + 30) + cell - 6}px; text-align:center; font: 600 16px Menlo; color:#6E6E75">${id}</div>`;
    })
    .join('\n');
  return {
    size: [W, H],
    html: `<!doctype html><html><head><meta charset="utf-8"><style>${surfaceCss('canvas', W, H)}</style></head>
      <body><div class="surface"></div>${items}</body></html>`,
  };
}

function shoot(html, [W, H], out) {
  const dir = mkdtempSync(join(tmpdir(), 'stickers-'));
  const page = join(dir, 'scene.html');
  const png = join(dir, 'scene.png');
  writeFileSync(page, html);
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${W},${H}`,
    `--screenshot=${png}`,
    `file://${page}`,
  ], { stdio: 'ignore' });
  if (!existsSync(png)) throw new Error('Chrome did not write a screenshot');
  mkdirSync(dirname(out), { recursive: true });
  if (extname(out).toLowerCase() === '.png') {
    writeFileSync(out, readFileSync(png));
  } else {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', out], {
      stdio: 'ignore',
    });
  }
  console.log(`wrote ${out}`);
}

const args = process.argv.slice(2);
if (args[0] === '--catalog') {
  const { size, html } = catalogHtml();
  shoot(html, size, resolve(args[1] ?? 'stickers-catalog.png'));
} else if (args.length) {
  for (const file of args) {
    const scene = JSON.parse(readFileSync(file, 'utf8'));
    shoot(sceneHtml(scene), scene.size, resolve(ROOT, scene.out));
  }
} else {
  console.error('Usage: render.mjs <scene.json>… | --catalog <out.png>');
  process.exit(1);
}
