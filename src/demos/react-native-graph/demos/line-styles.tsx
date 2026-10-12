/**
 * react-native-graph · Line styles
 *
 * The line itself: `lineThickness` (default 3) and `enableFadeInMask`, which
 * fades the start of the line in. Both work on the static renderer too.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LineGraph } from 'react-native-graph';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { spacing } from '@/design-system';
import { priceHistory } from '../data';

const STYLES = {
  thin: { lineThickness: 1.5, enableFadeInMask: false, color: '#0EA5E9' },
  regular: { lineThickness: 3, enableFadeInMask: false, color: '#3478F6' },
  bold: { lineThickness: 7, enableFadeInMask: false, color: '#16A34A' },
  fade: { lineThickness: 4, enableFadeInMask: true, color: '#8B5CF6' },
} as const;

type Style = keyof typeof STYLES;

const OPTIONS = [
  { value: 'thin', label: 'Thin' },
  { value: 'regular', label: 'Regular' },
  { value: 'bold', label: 'Bold' },
  { value: 'fade', label: 'Fade in' },
] as const;

const POINTS = priceHistory['1Y'];

export function LineStylesDemo() {
  const [style, setStyle] = useState<Style>('fade');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={style} options={OPTIONS} onChange={setStyle} />}>
        <LineGraph style={styles.graph} points={POINTS} {...STYLES[style]} />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  graph: { height: 240, margin: spacing.xl },
});
