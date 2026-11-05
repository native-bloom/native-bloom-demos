/**
 * Animated Glow · Glowing plan picker
 *
 * Each plan card is an `AnimatedGlow` that gets one of two presets: `selected` (a
 * gradient border and a violet glow behind it) or `idle` (a plain hairline border and
 * the same glow at zero opacity). The presets share their shape and have a `transition`
 * on the default state, so picking a plan fades the glow out of one card and into the
 * next.
 *
 * The idle border is still a two-color list: with glow layers, a single `borderColor`
 * isn't drawn. Colors are interpolated without alpha, so "transparent" can't be used to
 * hide a border or glow; match the card color or set the layer's opacity to 0.
 */
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';

import { DemoStage } from '@/demos/_shared/stage';
import { Button, Text as DSText, useTheme } from '@/design-system';

function planGlow(selected: boolean, dark: boolean): PresetConfig {
  const hairline = dark ? '#2A2A2E' : '#E7E7EB';
  return {
    states: [
      {
        name: 'default',
        transition: 450,
        preset: {
          cornerRadius: 22,
          outlineWidth: selected ? 2 : 1,
          borderColor: selected ? ['#8B5CF6', '#EC4899', '#8B5CF6'] : [hairline, hairline],
          backgroundColor: dark ? '#151517' : '#FFFFFF',
          animationSpeed: 1,
          glowLayers: [
            {
              glowPlacement: 'behind',
              colors: ['#8B5CF6', '#EC4899'],
              glowSize: selected ? 16 : 4,
              opacity: selected ? 0.35 : 0,
            },
          ],
        },
      },
    ],
  };
}

const PLANS = [
  { id: 'monthly', name: 'Monthly', price: '$4.99 / month', note: 'Cancel anytime' },
  { id: 'yearly', name: 'Yearly', price: '$39.99 / year', note: 'Save 33%' },
  { id: 'family', name: 'Family', price: '$59.99 / year', note: 'Up to 5 friends' },
];

export function PlanPickerDemo() {
  const { scheme } = useTheme();
  const dark = scheme === 'dark';
  const [plan, setPlan] = useState('yearly');

  return (
    <DemoStage
      align="top"
      footer={<Button label="Continue" size="lg" fullWidth onPress={() => {}} />}>
      <View style={styles.header}>
        <DSText variant="display">💎</DSText>
        <DSText variant="title" align="center">
          Keep every memory
        </DSText>
        <DSText color="textSecondary" align="center">
          Unlimited stories, albums and places
        </DSText>
      </View>
      <View style={styles.plans}>
        {PLANS.map((p) => {
          const selected = p.id === plan;
          return (
            <AnimatedGlow key={p.id} preset={planGlow(selected, dark)}>
              <Pressable
                accessibilityRole="radio"
                accessibilityLabel={p.name}
                accessibilityState={{ selected }}
                onPress={() => setPlan(p.id)}
                style={styles.plan}>
                <View style={styles.planText}>
                  <Text style={[styles.planName, { color: dark ? '#FFFFFF' : '#0B0B0D' }]}>
                    {p.name}
                  </Text>
                  <Text style={[styles.planPrice, { color: dark ? '#A1A1A8' : '#6E6E75' }]}>
                    {p.price}
                  </Text>
                </View>
                <Text style={[styles.note, { color: selected ? '#A855F7' : '#8E8E96' }]}>
                  {p.note}
                </Text>
                <View
                  style={[
                    styles.radio,
                    selected
                      ? styles.radioOn
                      : { borderColor: dark ? '#3A3A3F' : '#D4D4D8' },
                  ]}>
                  {selected ? <View style={styles.radioDot} /> : null}
                </View>
              </Pressable>
            </AnimatedGlow>
          );
        })}
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 },
  plans: { gap: 16 },
  plan: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  planText: { flex: 1, gap: 2 },
  planName: { fontSize: 17, fontWeight: '700' },
  planPrice: { fontSize: 14, fontWeight: '500' },
  note: { fontSize: 13, fontWeight: '700' },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: '#8B5CF6' },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#8B5CF6' },
});
