/**
 * react-native-graph · Animated transitions
 *
 * With `animated`, changing `points` morphs the line into the new shape on the
 * UI thread (Skia path interpolation) instead of redrawing it.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineGraph } from 'react-native-graph';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text, spacing } from '@/design-system';
import { TIME_RANGES, changeBetween, formatPrice, priceHistory, type TimeRange } from '../data';

export function AnimatedDemo() {
  const [range, setRange] = useState<TimeRange>('1W');
  const points = priceHistory[range];
  const change = changeBetween(points);
  const up = change >= 0;

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={range} options={TIME_RANGES} onChange={setRange} />}>
        <View style={styles.header}>
          <Text variant="title">{formatPrice(points[points.length - 1]!.value)}</Text>
          <Text variant="label" style={{ color: up ? '#16A34A' : '#EF4444' }}>
            {up ? '▲' : '▼'} {(Math.abs(change) * 100).toFixed(2)}% · {range}
          </Text>
        </View>
        <LineGraph
          style={styles.graph}
          animated
          points={points}
          color={up ? '#16A34A' : '#EF4444'}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.xl, paddingBottom: spacing.sm, gap: 2 },
  graph: { height: 200, marginHorizontal: spacing.lg, marginBottom: spacing.xl },
});
