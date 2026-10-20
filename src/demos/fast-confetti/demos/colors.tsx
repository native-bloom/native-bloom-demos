/**
 * Fast Confetti · Confetti colors
 *
 * `colors` on the root picks the palette for every piece; `colors` on a
 * `<ContinuousConfetti.Flake>` overrides it for that flake only (the gold set below
 * mixes gold strips with white circles). `flakeStyle` is `glossy` (default,
 * with a light sheen) or `solid` (flat color), on the root or per flake.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContinuousConfetti } from 'react-native-fast-confetti';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const PALETTES = [
  { value: 'party', label: 'Party', emoji: '🎉' },
  { value: 'pastel', label: 'Pastel', emoji: '🧁' },
  { value: 'gold', label: 'Gold', emoji: '✨' },
  { value: 'matcha', label: 'Matcha', emoji: '🍵' },
] as const;

type Palette = (typeof PALETTES)[number]['value'];

// Light pastels and gold need a dark backdrop to read.
const BACKDROPS: Record<Palette, string | undefined> = {
  party: undefined,
  pastel: '#2A2238',
  gold: '#121212',
  matcha: '#F6F3E8',
};

function Shower({ palette }: { palette: Palette }) {
  switch (palette) {
    case 'party':
      // The built-in palette, glossy by default.
      return (
        <ContinuousConfetti count={120} containerStyle={styles.confetti}>
          <ContinuousConfetti.Flake width={10} height={18} />
          <ContinuousConfetti.Flake size={15} radius={7.5} />
        </ContinuousConfetti>
      );
    case 'pastel':
      return (
        <ContinuousConfetti
          count={120}
          flakeStyle="solid"
          colors={['#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF', '#CDB4DB', '#FDE2A7']}
          containerStyle={styles.confetti}>
          <ContinuousConfetti.Flake width={10} height={18} radius={5} />
          <ContinuousConfetti.Flake size={15} radius={7.5} />
        </ContinuousConfetti>
      );
    case 'gold':
      return (
        <ContinuousConfetti
          count={120}
          colors={['#D4A017', '#F5C542', '#B8860B', '#FFE08A']}
          containerStyle={styles.confetti}>
          <ContinuousConfetti.Flake width={8} height={22} />
          <ContinuousConfetti.Flake size={13} radius={6.5} colors={['#FFFFFF', '#F4F1EA']} />
        </ContinuousConfetti>
      );
    case 'matcha':
      return (
        <ContinuousConfetti
          count={120}
          flakeStyle="solid"
          colors={['#5C8A3A', '#8DB45A', '#C5DB8F', '#3F6B2A', '#E9F2D0']}
          containerStyle={styles.confetti}>
          <ContinuousConfetti.Flake size={15} radius={7.5} />
          <ContinuousConfetti.Flake width={10} height={18} radius={5} />
        </ContinuousConfetti>
      );
  }
}

export function ColorsDemo() {
  const [palette, setPalette] = useState<Palette>('party');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={palette} options={PALETTES} onChange={setPalette} />}>
        <View style={[styles.area, { backgroundColor: BACKDROPS[palette] }]}>
          <Shower key={palette} palette={palette} />
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  area: { height: 420 },
  confetti: { width: '100%', height: '100%' },
});
