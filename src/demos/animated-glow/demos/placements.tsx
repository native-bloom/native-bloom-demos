/**
 * Animated Glow · Glow placement
 *
 * Every glow layer picks where it is drawn with `glowPlacement`:
 * - `behind` sits under the view's background, so it only shows outside the edge;
 * - `inside` is clipped to the view, a soft light along the inner edge;
 * - `over` is drawn on top of the background, on both sides of the edge.
 *
 * The shader paints the glow and the background under your content, so `inside` and
 * `over` only show if the content itself is transparent: give the card its color with the
 * preset's `backgroundColor`, not with a style on the children.
 *
 * `inside` and `over` add light on top of the background, so they need a dark one: on
 * white they disappear. Use saturated colors for them; white and pastel colors render as
 * a dark band on iOS (v3.2 with Skia 2.6).
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type GlowPlacement, type PresetConfig } from 'react-native-animated-glow';

import { DemoStage, VariantBar } from '@/demos/_shared/stage';

function cardGlow(placement: GlowPlacement): PresetConfig {
  return {
    states: [
      {
        name: 'default',
        preset: {
          cornerRadius: 24,
          outlineWidth: 0,
          backgroundColor: '#14121C',
          animationSpeed: 0.9,
          glowLayers: [
            {
              glowPlacement: placement,
              colors: ['#FF3D8B', '#9B4DFF', '#3D7BFF'],
              glowSize: 18,
              opacity: 0.7,
            },
          ],
        },
      },
    ],
  };
}

const OPTIONS = [
  { value: 'behind', label: 'Behind' },
  { value: 'inside', label: 'Inside' },
  { value: 'over', label: 'Over' },
] as const satisfies readonly { value: GlowPlacement; label: string }[];

export function PlacementsDemo() {
  const [placement, setPlacement] = useState<GlowPlacement>('behind');

  return (
    <DemoStage>
      <View style={styles.stage}>
        <AnimatedGlow key={placement} preset={cardGlow(placement)}>
          <View style={styles.card}>
            <Text style={styles.emoji}>🍵</Text>
            <Text style={styles.title}>Best matcha place in New York</Text>
            <Text style={styles.meta}>Cafes · Plentea Matcha · 3 days ago</Text>
          </View>
        </AnimatedGlow>
      </View>
      <VariantBar value={placement} options={OPTIONS} onChange={setPlacement} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stage: { paddingVertical: 40, paddingHorizontal: 12 },
  card: { padding: 24, gap: 8 },
  emoji: { fontSize: 36, marginBottom: 8 },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  meta: { color: '#A9A6BD', fontSize: 14, fontWeight: '500' },
});
