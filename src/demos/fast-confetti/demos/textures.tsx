/**
 * Fast Confetti · Custom textures
 *
 * Any Skia image or SVG can be a piece: pass `svg` (from `useSVG(require(…))`
 * or `Skia.SVG.MakeFromString`) or `image` (from `useImage`) on the root for
 * every flake, or on a `<ContinuousConfetti.Flake>` for that flake only. Textured pieces
 * keep their own colors, so `colors` doesn't tint them. A low `flipIntensity`
 * keeps them mostly face-on so the drawing stays readable.
 */
import { Skia, type SkSVG } from '@shopify/react-native-skia';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContinuousConfetti } from 'react-native-fast-confetti';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const ARM = '<path d="M12 12V2.5M9.2 4.6 12 7l2.8-2.4M10 9.6l2 1.6 2-1.6"/>';
const SNOWFLAKE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${[
  0, 60, 120, 180, 240, 300,
]
  .map((angle) => `<g transform="rotate(${angle} 12 12)">${ARM}</g>`)
  .join('')}</g></svg>`;

const leaf = (fill: string, vein: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${fill}" d="M20.5 3.5C12 3 5 6.5 4 14.5c-.2 1.6 0 3.2.6 4.9 1.7.6 3.3.8 4.9.6 8-1 11.5-8 11-16.5z"/><path fill="none" stroke="${vein}" stroke-width="1.2" stroke-linecap="round" d="M3 21 16 8"/></svg>`;

const petal = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${fill}" d="M12 22c-4.5-2.5-7-6.5-7-11 0-4 2.5-7.5 5-9l2 2.5L14 2c2.5 1.5 5 5 5 9 0 4.5-2.5 8.5-7 11z"/></svg>`;

const TEXTURES = [
  { value: 'snow', label: 'Snow', emoji: '❄️' },
  { value: 'leaves', label: 'Leaves', emoji: '🍁' },
  { value: 'petals', label: 'Petals', emoji: '🌸' },
] as const;

type Texture = (typeof TEXTURES)[number]['value'];

const BACKDROPS: Record<Texture, string> = {
  snow: '#1B2A4A',
  leaves: '#FFF4E3',
  petals: '#FFF0F4',
};

// Parsed once. `Skia.SVG.MakeFromString` returns null for invalid markup.
const svg = (source: string) => Skia.SVG.MakeFromString(source) as SkSVG;

const SNOWFLAKE_SVG = svg(SNOWFLAKE);
const LEAF_SVGS = [
  leaf('#E8833A', '#A34F17'),
  leaf('#D9482B', '#8E2A15'),
  leaf('#F2B33D', '#A8761A'),
].map(svg);
const PETAL_SVGS = [petal('#F48FB1'), petal('#EC6F9A'), petal('#F9B4CB')].map(svg);

export function TexturesDemo() {
  const [texture, setTexture] = useState<Texture>('snow');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={texture} options={TEXTURES} onChange={setTexture} />}>
        <View style={[styles.area, { backgroundColor: BACKDROPS[texture] }]}>
          {texture === 'snow' ? (
            // Root-level texture: every flake uses the snowflake.
            <ContinuousConfetti
              svg={SNOWFLAKE_SVG}
              count={110}
              gravity={0.3}
              drift={1}
              flipIntensity={0.2}
              containerStyle={styles.confetti}>
              <ContinuousConfetti.Flake size={22} />
              <ContinuousConfetti.Flake size={30} />
              <ContinuousConfetti.Flake size={14} />
            </ContinuousConfetti>
          ) : null}
          {texture === 'leaves' ? (
            // Flake-level textures: one flake per leaf color.
            <ContinuousConfetti
              count={50}
              gravity={0.45}
              drift={1}
              flipIntensity={0.35}
              containerStyle={styles.confetti}>
              {LEAF_SVGS.map((leafSvg, i) => (
                <ContinuousConfetti.Flake key={i} size={30} svg={leafSvg} />
              ))}
            </ContinuousConfetti>
          ) : null}
          {texture === 'petals' ? (
            <ContinuousConfetti
              count={70}
              gravity={0.35}
              drift={1}
              wobble={{ min: 0.06, max: 0.12 }}
              flipIntensity={0.5}
              containerStyle={styles.confetti}>
              {PETAL_SVGS.map((petalSvg, i) => (
                <ContinuousConfetti.Flake key={i} size={24} svg={petalSvg} />
              ))}
            </ContinuousConfetti>
          ) : null}
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  area: { height: 420 },
  confetti: { width: '100%', height: '100%' },
});
