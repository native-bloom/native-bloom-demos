/**
 * Animated Glow · Animated gradient border
 *
 * Give `borderColor` a list of colors and the outline becomes a gradient that travels
 * around the view, with no glow layers at all. `outlineWidth` sets the thickness and
 * `animationSpeed` (times `borderSpeedMultiplier`) sets how fast it moves. Repeat the
 * first color at the end for a seamless loop.
 *
 * The border is drawn centered on the edge, under your content: keep the content
 * transparent (the card color comes from `backgroundColor`) and leave padding around it.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type GlowConfig } from 'react-native-animated-glow';

import { DemoStage, VariantBar } from '@/demos/_shared/stage';
import { useTheme } from '@/design-system';

type Style = 'rainbow' | 'duotone' | 'mono';

const BORDERS: Record<Style, GlowConfig> = {
  rainbow: {
    outlineWidth: 2,
    animationSpeed: 1.2,
    borderColor: ['#FF4D4D', '#FFB020', '#3BD16F', '#3B82F6', '#A855F7', '#FF4D4D'],
  },
  duotone: {
    outlineWidth: 6,
    animationSpeed: 0.8,
    borderColor: ['#FF6A3D', '#FFD23F', '#FF6A3D'],
  },
  mono: {
    outlineWidth: 3,
    animationSpeed: 0.5,
    borderColor: ['#3478F6', '#BFD6FF', '#3478F6'],
  },
};

const OPTIONS = [
  { value: 'rainbow', label: 'Rainbow', emoji: '🌈' },
  { value: 'duotone', label: 'Thick duotone', emoji: '🍊' },
  { value: 'mono', label: 'Slow mono', emoji: '💧' },
] as const satisfies readonly { value: Style; label: string; emoji: string }[];

export function GradientBorderDemo() {
  const { scheme } = useTheme();
  const dark = scheme === 'dark';
  const [style, setStyle] = useState<Style>('rainbow');

  return (
    <DemoStage>
      <View style={styles.stage}>
        <AnimatedGlow
          key={style}
          preset={{
            states: [
              {
                name: 'default',
                preset: {
                  cornerRadius: 26,
                  backgroundColor: dark ? '#151517' : '#FFFFFF',
                  ...BORDERS[style],
                },
              },
            ],
          }}>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.emoji}>🎟️</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Members only</Text>
              </View>
            </View>
            <Text style={[styles.title, { color: dark ? '#FFFFFF' : '#0B0B0D' }]}>
              Festive treats tasting
            </Text>
            <Text style={[styles.meta, { color: dark ? '#A1A1A8' : '#6E6E75' }]}>
              Kettl Greenpoint · Fri, 7:30 PM
            </Text>
          </View>
        </AnimatedGlow>
      </View>
      <VariantBar value={style} options={OPTIONS} onChange={setStyle} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stage: { paddingVertical: 24, paddingHorizontal: 8 },
  card: { padding: 24, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  emoji: { fontSize: 34 },
  badge: {
    backgroundColor: 'rgba(127, 127, 127, 0.16)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: { color: '#8E8E96', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: -0.4, marginTop: 10 },
  meta: { fontSize: 14, fontWeight: '500' },
});
