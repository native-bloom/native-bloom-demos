/**
 * react-native-graph · Gradient fill
 *
 * `gradientFillColors` paints a vertical gradient under the line, from the
 * first color at the top to the last at the bottom. Use 8-digit hex colors to
 * fade the area out. Animated graphs only.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LineGraph } from 'react-native-graph';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { spacing } from '@/design-system';
import { priceHistory } from '../data';

const LOOKS = {
  blue: { color: '#3478F6', fill: ['#3478F650', '#3478F620', '#3478F600'] },
  green: { color: '#16A34A', fill: ['#16A34A55', '#16A34A00'] },
  pink: { color: '#FF2D78', fill: ['#FF2D7860', '#FF2D7815', '#FF2D7800'] },
  sunset: { color: '#F97316', fill: ['#F9731670', '#EC489940', '#8B5CF600'] },
} as const;

type Look = keyof typeof LOOKS;

const OPTIONS = [
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'pink', label: 'Pink' },
  { value: 'sunset', label: 'Sunset' },
] as const;

const POINTS = priceHistory['1M'];

export function GradientDemo() {
  const [look, setLook] = useState<Look>('blue');
  const { color, fill } = LOOKS[look];

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={look} options={OPTIONS} onChange={setLook} />}>
        <LineGraph
          style={styles.graph}
          animated
          points={POINTS}
          color={color}
          gradientFillColors={[...fill]}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  graph: { height: 240, margin: spacing.lg, marginTop: spacing.xl },
});
