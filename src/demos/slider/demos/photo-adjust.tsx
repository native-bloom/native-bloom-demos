/**
 * Slider · Photo adjustments
 *
 * Three sliders edit a picture live, like a photo editor's Adjust panel.
 * Each value sets the opacity of a color layer over the photo: white or black
 * for light, amber for warmth, grey for fade. (React Native's `filter` style
 * only supports brightness and opacity on iOS, so overlays keep it the same on
 * both platforms; a Skia or GL image filter is the next step up.) Light is
 * centered on zero so the thumb's middle means "no change", and Reset puts
 * everything back.
 */
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { photos } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Button, Card, Text, radius, spacing } from '@/design-system';

type Adjustments = { light: number; warmth: number; fade: number };
const NEUTRAL: Adjustments = { light: 0, warmth: 0, fade: 0 };

const CONTROLS: { key: keyof Adjustments; label: string; emoji: string; min: number }[] = [
  { key: 'light', label: 'Light', emoji: '☀️', min: -1 },
  { key: 'warmth', label: 'Warmth', emoji: '🌡️', min: 0 },
  { key: 'fade', label: 'Fade', emoji: '🌫️', min: 0 },
];

export function PhotoAdjustDemo() {
  const [adjust, setAdjust] = useState(NEUTRAL);

  return (
    <DemoStage align="top">
      <View style={styles.photoWrap}>
        <Image source={photos.strawberries} style={styles.photo} resizeMode="cover" />
        <View
          pointerEvents="none"
          style={[
            styles.layer,
            {
              backgroundColor: adjust.light >= 0 ? '#FFFFFF' : '#000000',
              opacity: Math.abs(adjust.light) * 0.5,
            },
          ]}
        />
        <View
          pointerEvents="none"
          style={[styles.layer, { backgroundColor: '#FF9F43', opacity: adjust.warmth * 0.35 }]}
        />
        <View
          pointerEvents="none"
          style={[styles.layer, { backgroundColor: '#C9C4BE', opacity: adjust.fade * 0.6 }]}
        />
      </View>
      <Card padding="md">
        {CONTROLS.map((c) => (
          <View key={c.key} style={styles.row}>
            <Text style={styles.label}>
              {c.emoji} {c.label}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={c.min}
              maximumValue={1}
              value={adjust[c.key]}
              onValueChange={(value) => setAdjust((a) => ({ ...a, [c.key]: value }))}
              minimumTrackTintColor="#FF2D78"
            />
            <Text variant="caption" color="textSecondary" style={styles.value}>
              {Math.round(adjust[c.key] * 100)}
            </Text>
          </View>
        ))}
      </Card>
      <Button label="Reset" variant="soft" onPress={() => setAdjust(NEUTRAL)} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  photoWrap: { borderRadius: radius.lg, borderCurve: 'continuous', overflow: 'hidden' },
  photo: { width: '100%', height: 300 },
  layer: { ...StyleSheet.absoluteFill },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { width: 96, fontSize: 15, fontWeight: '600' },
  slider: { flex: 1, height: 40 },
  value: { width: 32, textAlign: 'right' },
});
