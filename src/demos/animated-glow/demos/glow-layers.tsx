/**
 * Animated Glow · Layered glow
 *
 * `glowLayers` is a list, drawn in one shader pass (up to 7 layers in v3.2). Each layer
 * has its own colors, size, opacity and `speedMultiplier`, so they drift against each
 * other. Here a wide soft haze, a tight bright rim and a quick sparkle (a short
 * `coverage` with a tapered `glowSize`) add up to one rich glow.
 *
 * The default state has a `transition`, so adding or removing layers blends the sizes
 * and opacities instead of switching abruptly.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type GlowLayerConfig, type PresetConfig } from 'react-native-animated-glow';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const HAZE: Partial<GlowLayerConfig> = {
  glowPlacement: 'behind',
  colors: ['#7C3AED', '#2563EB', '#DB2777'],
  glowSize: 36,
  opacity: 0.3,
  speedMultiplier: 0.6,
};

const RIM: Partial<GlowLayerConfig> = {
  glowPlacement: 'behind',
  colors: ['#C4B5FD', '#93C5FD', '#F9A8D4'],
  glowSize: 6,
  opacity: 0.8,
  speedMultiplier: 1.4,
};

const SPARKLE: Partial<GlowLayerConfig> = {
  glowPlacement: 'behind',
  colors: ['#E879F9', '#60A5FA'],
  glowSize: [1, 10, 10, 1],
  opacity: 0.9,
  speedMultiplier: 2.4,
  coverage: 0.35,
};

function layered(glowLayers: Partial<GlowLayerConfig>[]): PresetConfig {
  return {
    states: [
      {
        name: 'default',
        transition: 500,
        preset: {
          cornerRadius: 22,
          outlineWidth: 1.5,
          borderColor: ['#A78BFA', '#60A5FA', '#F472B6', '#A78BFA'],
          backgroundColor: '#111018',
          animationSpeed: 1,
          glowLayers,
        },
      },
    ],
  };
}

const LAYERS = {
  '1': layered([HAZE]),
  '2': layered([HAZE, RIM]),
  '3': layered([HAZE, RIM, SPARKLE]),
};

type Count = keyof typeof LAYERS;

const OPTIONS = [
  { value: '1', label: '1 layer' },
  { value: '2', label: '2 layers' },
  { value: '3', label: '3 layers' },
] as const satisfies readonly { value: Count; label: string }[];

export function GlowLayersDemo() {
  const [count, setCount] = useState<Count>('1');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={count} options={OPTIONS} onChange={setCount} />}>
        <View style={styles.stage}>
          <AnimatedGlow preset={LAYERS[count]}>
            <View style={styles.tile}>
              <Text style={styles.emoji}>💎</Text>
              <Text style={styles.title}>Bond Plus</Text>
              <Text style={styles.meta}>Unlimited memories</Text>
            </View>
          </AnimatedGlow>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stage: { paddingVertical: 52, alignItems: 'center' },
  tile: { width: 200, paddingVertical: 28, alignItems: 'center', gap: 4 },
  emoji: { fontSize: 40, marginBottom: 6 },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', letterSpacing: -0.4 },
  meta: { color: '#A9A6BD', fontSize: 14, fontWeight: '500' },
});
