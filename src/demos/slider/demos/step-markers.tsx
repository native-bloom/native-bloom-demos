/**
 * Slider · Step markers
 *
 * With a `step`, pass a `StepMarker` component to draw something at every
 * step on the track. It receives `stepMarked` (the thumb is on this step),
 * `currentValue`, `index`, `min` and `max`, so markers can light up as the
 * thumb passes. `renderStepNumber` can add numbers under the track, but their
 * color is fixed black (unreadable in dark mode), so these markers draw their
 * own number under each dot in the theme's text color.
 */
import Slider, { type MarkerProps } from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text, useColors } from '@/design-system';

const SPICE = ['Mild', 'Gentle', 'Medium', 'Hot', 'Fiery', 'Volcano'];

function Dot({ stepMarked, currentValue, index }: MarkerProps) {
  const colors = useColors();
  return (
    // Markers sit above the slider; let taps through to it.
    <View pointerEvents="none" style={styles.marker}>
      {/* Markers draw above the thumb, so leave the current step's dot out. */}
      <View
        style={[
          styles.dot,
          index < currentValue && styles.dotPassed,
          stepMarked && styles.dotHidden,
        ]}
      />
      <Text
        variant="caption"
        style={[styles.number, { color: stepMarked ? colors.text : colors.textTertiary }]}>
        {index}
      </Text>
    </View>
  );
}

export function StepMarkersDemo() {
  const [level, setLevel] = useState(2);

  return (
    <DemoStage>
      <Showcase>
        <Text variant="caption" color="textSecondary" align="center">
          🍜 RAMEN SPICE
        </Text>
        <Text variant="title" align="center">
          {'🌶️'.repeat(level + 1)} {SPICE[level]}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={level}
          onValueChange={setLevel}
          StepMarker={Dot}
          minimumTrackTintColor="#FF6B3D"
          maximumTrackTintColor="#FFE0D2"
          thumbTintColor="#FF6B3D"
          tapToSeek
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  // Default height keeps the markers centered on the track; the margin makes room for the numbers.
  slider: { height: 40, marginTop: 12, marginBottom: 24 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFD0BC' },
  dotHidden: { opacity: 0 },
  marker: { alignItems: 'center', width: 24 },
  number: { position: 'absolute', top: 22 },
  dotPassed: { backgroundColor: '#FF6B3D' },
});
