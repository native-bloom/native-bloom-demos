/**
 * Animated Glow · Comet trail
 *
 * Two layer options turn a glow into a comet. `coverage` limits a layer to part of the
 * edge (0.3 = 30% of the way around), and a list in `glowSize` changes the size along
 * that part, from tail to head: `[0, 8, 22, 0]` starts at nothing, swells near the front
 * and tapers off at the tip. A second, thinner layer on the same path makes a bright core.
 * The layer's `colors` run along the comet too; keep them bright, because dark glow colors
 * draw a shadow. `relativeOffset` shifts a layer around the edge, so two comets with
 * offsets 0 and 0.5 chase each other.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';

import { DemoStage, VariantBar } from '@/demos/_shared/stage';

type Variant = 'one' | 'two' | 'long';

function comet(coverage: number, offsets: number[]): PresetConfig {
  return {
    states: [
      {
        name: 'default',
        preset: {
          cornerRadius: 28,
          outlineWidth: 1,
          borderColor: ['#2A2D3A', '#2A2D3A'],
          backgroundColor: '#0E1016',
          animationSpeed: 1.4,
          glowLayers: offsets.flatMap((relativeOffset) => [
            {
              glowPlacement: 'behind' as const,
              colors: ['#0EA5E9', '#22D3EE'],
              glowSize: [0, 8, 22, 0],
              opacity: 0.75,
              coverage,
              relativeOffset,
            },
            {
              glowPlacement: 'behind' as const,
              colors: ['#22D3EE', '#67E8F9'],
              glowSize: [0, 1, 4, 0],
              opacity: 1,
              coverage,
              relativeOffset,
            },
          ]),
        },
      },
    ],
  };
}

const COMETS: Record<Variant, PresetConfig> = {
  one: comet(0.3, [0]),
  two: comet(0.25, [0, 0.5]),
  long: comet(0.65, [0]),
};

const OPTIONS = [
  { value: 'one', label: 'One comet', emoji: '☄️' },
  { value: 'two', label: 'Two comets', emoji: '🌗' },
  { value: 'long', label: 'Long tail', emoji: '🌠' },
] as const satisfies readonly { value: Variant; label: string; emoji: string }[];

export function CometTrailDemo() {
  const [variant, setVariant] = useState<Variant>('one');

  return (
    <DemoStage>
      <View style={styles.stage}>
        <AnimatedGlow key={variant} preset={COMETS[variant]}>
          <View style={styles.card}>
            <Text style={styles.eyebrow}>LIVE NOW</Text>
            <Text style={styles.title}>Sam Lee is cooking</Text>
            <Text style={styles.meta}>Festive treats · 128 watching</Text>
          </View>
        </AnimatedGlow>
      </View>
      <VariantBar value={variant} options={OPTIONS} onChange={setVariant} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stage: { paddingVertical: 40, paddingHorizontal: 16 },
  card: { paddingVertical: 32, paddingHorizontal: 24, gap: 6 },
  eyebrow: { color: '#22D3EE', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: '#FFFFFF', fontSize: 24, lineHeight: 30, fontWeight: '700' },
  meta: { color: '#9AA3B2', fontSize: 14, fontWeight: '500' },
});
