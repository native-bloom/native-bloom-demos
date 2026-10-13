/**
 * Reanimated Color Picker · Profile color
 *
 * A profile card that recolors while you drag. `onChange` is a worklet: it
 * writes the banner's shared value on the UI thread, so the card follows the
 * finger without a React re-render.
 *
 * The preset chips call `setColor(color, duration)` on the picker's ref,
 * which animates every thumb to the new color. `setColor` does not fire
 * `onChange`, so the banner animates to the same color itself with
 * `withTiming`.
 */
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ColorPicker, {
  BrightnessSlider,
  HueSlider,
  SaturationSlider,
  type ColorFormatsObject,
  type ColorPickerRef,
} from 'reanimated-color-picker';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, Chip, Text, spacing, useColors } from '@/design-system';

const PRESETS = [
  { emoji: '🍵', label: 'Matcha', color: '#7DB46C' },
  { emoji: '🍓', label: 'Strawberry', color: '#FF5C7A' },
  { emoji: '🌊', label: 'Ocean', color: '#2F80ED' },
  { emoji: '🌅', label: 'Sunset', color: '#FF9F43' },
];

const INITIAL = '#A78BFA';
const PRESET_DURATION = 450;

export function ProfileColorDemo() {
  const colors = useColors();
  const pickerRef = useRef<ColorPickerRef>(null);
  const banner = useSharedValue(INITIAL);
  const [preset, setPreset] = useState<string | null>(null);

  // Runs on the UI thread for every frame of the drag.
  function onChange(result: ColorFormatsObject) {
    'worklet';
    banner.set(result.hex);
  }

  function applyPreset(label: string, color: string) {
    setPreset(label);
    pickerRef.current?.setColor(color, PRESET_DURATION);
    banner.set(withTiming(color, { duration: PRESET_DURATION }));
  }

  const bannerStyle = useAnimatedStyle(() => ({ backgroundColor: banner.get() }));

  return (
    <DemoStage align="top">
      <Card padding={0} style={styles.profile}>
        <Animated.View style={[styles.banner, bannerStyle]} />
        <View style={[styles.avatarRing, { backgroundColor: colors.surface }]}>
          <View style={[styles.avatar, { backgroundColor: colors.surfaceMuted }]}>
            <Text style={styles.avatarEmoji}>🧑‍🍳</Text>
          </View>
        </View>
        <View style={styles.identity}>
          <Text variant="title">Sam Lee</Text>
          <Text variant="caption" color="textSecondary">
            @samlee · 128 memories
          </Text>
        </View>
      </Card>

      <Card padding="lg" style={styles.pickerCard}>
        <Text variant="heading">Profile color</Text>
        <View style={styles.presets}>
          {PRESETS.map((p) => (
            <Chip
              key={p.label}
              emoji={p.emoji}
              label={p.label}
              size="sm"
              selected={preset === p.label}
              onPress={() => applyPreset(p.label, p.color)}
            />
          ))}
        </View>
        <ColorPicker
          ref={pickerRef}
          value={INITIAL}
          sliderThickness={28}
          thumbSize={28}
          thumbShape="circle"
          onChange={onChange}
          onCompleteJS={() => setPreset(null)}
          style={styles.picker}
          adaptSpectrum
          boundedThumb>
          <HueSlider style={styles.slider} />
          <SaturationSlider style={styles.slider} />
          <BrightnessSlider style={styles.slider} />
        </ColorPicker>
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  profile: { overflow: 'hidden', paddingBottom: spacing.xl },
  banner: { height: 110 },
  avatarRing: {
    alignSelf: 'center',
    marginTop: -44,
    padding: 4,
    borderRadius: 999,
  },
  avatar: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center' },
  avatarEmoji: { fontSize: 38, lineHeight: 46 },
  identity: { alignItems: 'center', gap: 2, marginTop: spacing.sm },
  pickerCard: { gap: spacing.lg },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  picker: { gap: 18 },
  slider: { borderRadius: 20 },
});
