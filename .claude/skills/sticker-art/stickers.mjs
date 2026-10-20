/**
 * The sticker library: original dev-culture and skate/surf designs, drawn as SVG.
 *
 * Every sticker has:
 * - `w`, `h`: its own coordinate box (the renderer scales it);
 * - `silhouette`: the outer shape(s), drawn underneath as the white die-cut border;
 * - `art`: the printed design on top.
 *
 * No third-party logos or slogans: everything here is drawn for this repo.
 * Add new stickers in the same shape and check them with `render.mjs --catalog`.
 */

export const INK = '#1B1B1F';
const CREAM = '#FFF6E6';
const CORAL = '#FF6B5B';
const SUN = '#FFC93C';
const ORANGE = '#FF8C42';
const TEAL = '#2EC4B6';
const SKY = '#5AA9E6';
const NAVY = '#23395B';
const LILAC = '#A98BFF';
const PINK = '#FF9EC7';
const GREEN = '#34C77B';
const LIME = '#B8F36B';

const MONO = "font-family: Menlo, 'SF Mono', monospace; font-weight: 700";
const CONDENSED = "font-family: 'Avenir Next Condensed', 'DIN Condensed', sans-serif; font-weight: 800";
const FUTURA = "font-family: Futura, 'Avenir Next', sans-serif; font-weight: 800";
const SLAB = "font-family: Rockwell, 'American Typewriter', serif; font-weight: 700";
const BLACK = "font-family: 'Arial Black', Impact, sans-serif; font-weight: 900";

const text = (x, y, size, fill, style, value, extra = '') =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" style="${style}" text-anchor="middle" dominant-baseline="central" ${extra}>${value}</text>`;

const circle = (cx, cy, r, fill = '#fff', extra = '') =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;

const rect = (x, y, w, h, r, fill = '#fff', extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;

/** Text running around a circle (for round badges). */
const ringText = (id, cx, cy, r, size, fill, style, value) => `
  <defs><path id="${id}" d="M ${cx - r} ${cy} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0"/></defs>
  <text font-size="${size}" fill="${fill}" style="${style}">
    <textPath href="#${id}" startOffset="0" textLength="${(2 * Math.PI * r - size * 0.6).toFixed(1)}" lengthAdjust="spacing">${value}</textPath>
  </text>`;

export const STICKERS = {
  // ── Dev culture ───────────────────────────────────────────────────────────
  code: {
    w: 220,
    h: 140,
    silhouette: rect(0, 0, 220, 140, 30),
    art: rect(0, 0, 220, 140, 30, INK) + text(110, 72, 74, LIME, MONO, '&lt;/&gt;'),
  },

  braces: {
    w: 180,
    h: 180,
    silhouette: circle(90, 90, 90),
    art: circle(90, 90, 90, SUN) + text(90, 86, 84, INK, MONO, '{ }'),
  },

  lgtm: {
    w: 250,
    h: 100,
    silhouette: rect(0, 0, 250, 100, 50),
    art: rect(0, 0, 250, 100, 50, GREEN) + text(125, 52, 58, '#fff', CONDENSED, 'LGTM ✓'),
  },

  'ship-it': {
    w: 200,
    h: 200,
    silhouette: circle(100, 100, 100),
    art:
      circle(100, 100, 100, NAVY) +
      ringText('shipit-ring', 100, 100, 76, 22, CREAM, FUTURA, 'SHIP IT • SHIP IT • SHIP IT • SHIP IT •') +
      // rocket
      `<g transform="translate(100 100) rotate(35)">
        <path d="M0 -46 C 18 -30 20 4 14 26 L -14 26 C -20 4 -18 -30 0 -46 Z" fill="${CREAM}"/>
        ${circle(0, -10, 9, SKY)}
        <path d="M-14 8 L -28 30 L -12 26 Z" fill="${CORAL}"/>
        <path d="M14 8 L 28 30 L 12 26 Z" fill="${CORAL}"/>
        <path d="M-9 28 Q 0 54 9 28 Z" fill="${ORANGE}"/>
      </g>`,
  },

  duck: {
    w: 210,
    h: 180,
    silhouette:
      `<ellipse cx="100" cy="122" rx="92" ry="52" fill="#fff"/>` +
      circle(138, 62, 46) +
      `<path d="M176 58 L 208 70 L 176 82 Z" fill="#fff"/>`,
    art: `
      <ellipse cx="100" cy="122" rx="92" ry="52" fill="${SUN}"/>
      <path d="M10 110 Q 4 80 30 92 Q 20 104 22 118 Z" fill="${SUN}"/>
      ${circle(138, 62, 46, SUN)}
      <path d="M174 56 Q 206 64 206 70 Q 206 78 174 84 Q 180 70 174 56 Z" fill="${ORANGE}"/>
      ${circle(150, 52, 7, INK)}${circle(152, 50, 2.4, '#fff')}
      <path d="M60 116 Q 96 150 132 116" fill="none" stroke="#F0B020" stroke-width="7" stroke-linecap="round"/>`,
  },

  coffee: {
    w: 190,
    h: 190,
    silhouette: rect(20, 50, 120, 130, 28) + circle(146, 112, 38),
    art: `
      <circle cx="146" cy="112" r="30" fill="none" stroke="${CORAL}" stroke-width="16"/>
      ${rect(20, 50, 120, 130, 28, CORAL)}
      ${rect(20, 50, 120, 22, 11, '#E85A4A')}
      ${text(80, 124, 30, CREAM, MONO, '200')}
      ${text(80, 154, 16, CREAM, MONO, 'OK')}`,
  },

  bug: {
    w: 220,
    h: 210,
    silhouette: circle(110, 86, 82) + rect(0, 156, 220, 54, 27),
    art: `
      <g stroke="${INK}" stroke-width="7" stroke-linecap="round">
        <path d="M40 70 L 16 56 M36 100 L 10 100 M44 128 L 20 146"/>
        <path d="M180 70 L 204 56 M184 100 L 210 100 M176 128 L 200 146"/>
      </g>
      ${circle(110, 92, 70, CORAL)}
      <path d="M110 22 L 110 162" stroke="${INK}" stroke-width="6"/>
      ${circle(110, 30, 26, INK)}
      ${circle(80, 80, 12, INK)}${circle(140, 80, 12, INK)}${circle(76, 120, 10, INK)}${circle(144, 120, 10, INK)}
      ${rect(0, 156, 220, 54, 27, INK)}
      ${text(110, 183, 23, '#fff', MONO, "it's a feature")}`,
  },

  'cmd-k': {
    w: 160,
    h: 160,
    silhouette: rect(0, 0, 160, 160, 34),
    art:
      rect(0, 0, 160, 160, 34, '#D9D9DF') +
      rect(8, 6, 144, 136, 28, '#F7F7F9') +
      text(80, 74, 58, INK, "font-family: 'Helvetica Neue', Helvetica, sans-serif; font-weight: 500", '⌘K'),
  },

  'works-on-my-machine': {
    w: 210,
    h: 210,
    silhouette: circle(105, 105, 105),
    art:
      circle(105, 105, 105, CREAM) +
      circle(105, 105, 96, 'none', `stroke="${INK}" stroke-width="5"`) +
      ringText('wfm-ring', 105, 105, 72, 24, INK, FUTURA, 'WORKS ON MY MACHINE •') +
      circle(105, 105, 46, GREEN) +
      `<path d="M84 106 L 99 121 L 128 90" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`,
  },

  'git-branch': {
    w: 200,
    h: 200,
    silhouette: `<path d="M100 0 L 187 50 L 187 150 L 100 200 L 13 150 L 13 50 Z" fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round"/>`,
    art: `
      <path d="M100 0 L 187 50 L 187 150 L 100 200 L 13 150 L 13 50 Z" fill="${LILAC}" stroke="${LILAC}" stroke-width="16" stroke-linejoin="round"/>
      <g fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round">
        <path d="M76 50 L 76 150"/>
        <path d="M128 70 C 128 110 76 100 76 128"/>
      </g>
      ${circle(76, 50, 15, LILAC, 'stroke="#fff" stroke-width="10"')}
      ${circle(76, 150, 15, LILAC, 'stroke="#fff" stroke-width="10"')}
      ${circle(128, 64, 15, LILAC, 'stroke="#fff" stroke-width="10"')}`,
  },

  '404': {
    w: 220,
    h: 170,
    silhouette: rect(0, 0, 220, 136, 40) + `<path d="M50 120 L 40 170 L 100 130 Z" fill="#fff"/>`,
    art:
      rect(0, 0, 220, 136, 40, PINK) +
      `<path d="M56 128 L 46 166 L 96 132 Z" fill="${PINK}"/>` +
      text(110, 64, 78, INK, BLACK, '404'),
  },

  semicolon: {
    w: 170,
    h: 170,
    silhouette: circle(85, 85, 85),
    art: circle(85, 85, 85, INK) + text(85, 80, 130, SUN, MONO, ';'),
  },

  // ── Skate & surf ──────────────────────────────────────────────────────────
  checker: {
    w: 190,
    h: 190,
    silhouette: circle(95, 95, 95),
    art: `
      <defs>
        <pattern id="checks" width="38" height="38" patternUnits="userSpaceOnUse">
          <rect width="38" height="38" fill="${CREAM}"/>
          <rect width="19" height="19" fill="${INK}"/><rect x="19" y="19" width="19" height="19" fill="${INK}"/>
        </pattern>
        <clipPath id="checker-clip">${circle(95, 95, 95)}</clipPath>
      </defs>
      <g clip-path="url(#checker-clip)"><rect width="190" height="190" fill="url(#checks)" transform="rotate(12 95 95)"/></g>`,
  },

  skateboard: {
    w: 120,
    h: 330,
    silhouette: rect(10, 0, 100, 330, 50) + circle(8, 84, 17) + circle(112, 84, 17) + circle(8, 246, 17) + circle(112, 246, 17),
    art: `
      ${circle(8, 84, 15, TEAL)}${circle(112, 84, 15, TEAL)}${circle(8, 246, 15, TEAL)}${circle(112, 246, 15, TEAL)}
      <defs>
        <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${SUN}"/><stop offset="0.5" stop-color="${ORANGE}"/><stop offset="1" stop-color="${CORAL}"/>
        </linearGradient>
      </defs>
      ${rect(10, 0, 100, 330, 50, 'url(#deck)')}
      ${rect(26, 120, 68, 6, 3, '#ffffff99')}${rect(26, 136, 68, 6, 3, '#ffffff99')}${rect(26, 152, 68, 6, 3, '#ffffff99')}
      ${text(60, 230, 30, INK, FUTURA, 'RAD', 'transform="rotate(-90 60 230)"')}`,
  },

  wave: {
    w: 200,
    h: 200,
    silhouette: circle(100, 100, 100),
    art: `
      <defs><clipPath id="wave-clip">${circle(100, 100, 100)}</clipPath></defs>
      <g clip-path="url(#wave-clip)">
        <rect width="200" height="200" fill="${CREAM}"/>
        ${circle(150, 56, 22, CORAL)}
        <path d="M-10 150 C 20 120 40 60 96 52 C 140 46 160 84 136 104 C 122 116 104 104 112 92 C 90 92 76 116 92 140 C 110 166 160 160 210 150 L 210 210 L -10 210 Z" fill="${NAVY}"/>
        <path d="M-10 168 C 40 150 90 182 130 170 C 160 162 190 168 210 172 L 210 210 L -10 210 Z" fill="${SKY}"/>
        <path d="M96 52 C 140 46 160 84 136 104" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      </g>`,
  },

  'palm-sun': {
    w: 200,
    h: 200,
    silhouette: circle(100, 100, 100),
    art: `
      <defs><clipPath id="palm-clip">${circle(100, 100, 100)}</clipPath></defs>
      <g clip-path="url(#palm-clip)">
        <rect width="200" height="200" fill="${CREAM}"/>
        ${circle(100, 118, 62, ORANGE)}
        <rect x="0" y="80" width="200" height="8" fill="${CREAM}"/>
        <rect x="0" y="98" width="200" height="10" fill="${CREAM}"/>
        <rect x="0" y="118" width="200" height="82" fill="${TEAL}"/>
        <path d="M0 132 Q 50 124 100 132 T 200 132" fill="none" stroke="${CREAM}" stroke-width="4"/>
        <path d="M128 200 C 126 160 120 120 108 84" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
        <g fill="${INK}">
          <path d="M108 84 C 90 62 62 64 46 78 C 66 72 86 76 108 84 Z"/>
          <path d="M108 84 C 116 60 140 50 160 56 C 140 62 124 70 108 84 Z"/>
          <path d="M108 84 C 98 60 104 40 118 30 C 112 50 110 66 108 84 Z"/>
          <path d="M108 84 C 130 76 152 86 160 104 C 144 92 126 88 108 84 Z"/>
        </g>
      </g>`,
  },

  surfboard: {
    w: 110,
    h: 330,
    silhouette: `<path d="M55 0 C 110 70 110 260 55 330 C 0 260 0 70 55 0 Z" fill="#fff"/>`,
    art: `
      <path d="M55 0 C 110 70 110 260 55 330 C 0 260 0 70 55 0 Z" fill="${TEAL}"/>
      <path d="M55 0 C 70 70 70 260 55 330 C 40 260 40 70 55 0 Z" fill="${CREAM}"/>
      <path d="M55 6 L 55 324" stroke="${CORAL}" stroke-width="5"/>
      ${circle(55, 250, 12, CORAL)}`,
  },

  'skate-or-debug': {
    w: 300,
    h: 100,
    silhouette: `<path d="M0 10 L 300 10 L 280 50 L 300 90 L 0 90 L 20 50 Z" fill="#fff" stroke="#fff" stroke-width="12" stroke-linejoin="round"/>`,
    art: `
      <path d="M0 10 L 300 10 L 280 50 L 300 90 L 0 90 L 20 50 Z" fill="${CORAL}" stroke="${CORAL}" stroke-width="12" stroke-linejoin="round"/>
      ${text(150, 52, 40, '#fff', FUTURA, 'SKATE OR DEBUG', 'textLength="236" lengthAdjust="spacingAndGlyphs"')}`,
  },

  'surfs-up': {
    w: 240,
    h: 150,
    silhouette: rect(0, 0, 240, 150, 26),
    art: `
      ${rect(0, 0, 240, 150, 26, SKY)}
      ${text(124, 62, 50, INK, SLAB, "SURF'S UP", 'textLength="196" lengthAdjust="spacingAndGlyphs"')}
      ${text(120, 58, 50, CREAM, SLAB, "SURF'S UP", 'textLength="196" lengthAdjust="spacingAndGlyphs"')}
      ${text(120, 112, 17, NAVY, MONO, 'git push origin beach', 'textLength="196" lengthAdjust="spacingAndGlyphs"')}`,
  },

  smiley: {
    w: 170,
    h: 170,
    silhouette: circle(85, 85, 85),
    art: `
      ${circle(85, 85, 85, SUN)}
      <ellipse cx="60" cy="68" rx="10" ry="16" fill="${INK}"/>
      <ellipse cx="110" cy="68" rx="10" ry="16" fill="${INK}"/>
      <path d="M44 100 Q 85 146 126 100" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`,
  },
};
