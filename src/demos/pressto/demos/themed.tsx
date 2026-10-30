/**
 * Pressto · Themed pressables
 *
 * `PressablesConfig metadata` passes any object (here a theme) into every
 * pressable's worklet, typed through `createAnimatedPressable<Theme>`. The
 * worklet reads colors from it, so swapping the theme restyles every button
 * at once. `withAnimation` animates the color both on press (`isPressed`) and
 * when the theme changes.
 */
import { createAnimatedPressable, PressablesConfig } from 'pressto';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { interpolate } from 'react-native-reanimated';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text as ThemedText } from '@/design-system';

type Theme = {
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  soft: string;
  softPressed: string;
  onSoft: string;
};

const THEMES: Record<'matcha' | 'berry' | 'night', Theme> = {
  matcha: {
    primary: '#4C7A34',
    primaryPressed: '#3A5F27',
    onPrimary: '#FFFFFF',
    soft: '#E4EFD8',
    softPressed: '#D2E4C0',
    onSoft: '#2F4D20',
  },
  berry: {
    primary: '#D9366E',
    primaryPressed: '#B82A5B',
    onPrimary: '#FFFFFF',
    soft: '#FDE2EC',
    softPressed: '#F9CADB',
    onSoft: '#8E1D46',
  },
  night: {
    primary: '#1C1C28',
    primaryPressed: '#34344A',
    onPrimary: '#F4F1FF',
    soft: '#E7E5F5',
    softPressed: '#D6D3EE',
    onSoft: '#2B2840',
  },
};

const VARIANTS = [
  { value: 'matcha', label: 'Matcha', emoji: '🍵' },
  { value: 'berry', label: 'Berry', emoji: '🍓' },
  { value: 'night', label: 'Night', emoji: '🌙' },
] as const;

type Variant = (typeof VARIANTS)[number]['value'];

const PrimaryButton = createAnimatedPressable<Theme>(
  (progress, { isPressed, metadata, withAnimation }) => {
    'worklet';
    return {
      backgroundColor: withAnimation(isPressed ? metadata.primaryPressed : metadata.primary),
      transform: [{ scale: interpolate(progress, [0, 1], [1, 0.96]) }],
    };
  },
);

const SoftButton = createAnimatedPressable<Theme>(
  (progress, { isPressed, metadata, withAnimation }) => {
    'worklet';
    return {
      backgroundColor: withAnimation(isPressed ? metadata.softPressed : metadata.soft),
      transform: [{ scale: interpolate(progress, [0, 1], [1, 0.96]) }],
    };
  },
);

export function ThemedDemo() {
  const [variant, setVariant] = useState<Variant>('matcha');
  const theme = THEMES[variant];

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={variant} options={VARIANTS} onChange={setVariant} />}>
        <PressablesConfig metadata={theme}>
          <View style={styles.header}>
            <Text style={styles.emoji}>🍵</Text>
            <View style={styles.headerText}>
              <ThemedText variant="heading">Ceremonial matcha</ThemedText>
              <ThemedText variant="label" color="textSecondary">
                Plentea Matcha · $6.50
              </ThemedText>
            </View>
          </View>
          <View style={styles.sizes}>
            {['Small', 'Medium', 'Large'].map((size) => (
              <SoftButton key={size} accessibilityLabel={size} style={styles.size}>
                <Text style={[styles.sizeLabel, { color: theme.onSoft }]}>{size}</Text>
              </SoftButton>
            ))}
          </View>
          <PrimaryButton accessibilityLabel="Add to order" style={styles.primary}>
            <Text style={[styles.primaryLabel, { color: theme.onPrimary }]}>Add to order</Text>
          </PrimaryButton>
        </PressablesConfig>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  emoji: { fontSize: 40, lineHeight: 48 },
  headerText: { flex: 1, gap: 2 },
  sizes: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  size: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeLabel: { fontSize: 15, fontWeight: '600' },
  primary: { height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  primaryLabel: { fontSize: 16, fontWeight: '700' },
});
