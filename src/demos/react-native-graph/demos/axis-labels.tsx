/**
 * react-native-graph · Axis labels
 *
 * `TopAxisLabel` and `BottomAxisLabel` render anything in a row above and below
 * the graph. Here they mark the highest and lowest price, each placed under its
 * point by offsetting it by the point's position in time. Animated graphs only.
 */
import { useState } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { LineGraph, type GraphPoint } from 'react-native-graph';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { spacing } from '@/design-system';
import { TIME_RANGES, formatPrice, priceHistory, type TimeRange } from '../data';

function extreme(points: GraphPoint[], pick: 'max' | 'min') {
  return points.reduce((best, p) =>
    (pick === 'max' ? p.value > best.value : p.value < best.value) ? p : best,
  );
}

/** Horizontal position (0–1) of a point inside the graph's time span. */
function positionOf(point: GraphPoint, points: GraphPoint[]) {
  const start = points[0]!.date.getTime();
  const end = points[points.length - 1]!.date.getTime();
  return (point.date.getTime() - start) / (end - start);
}

function AxisLabel({ point, points }: { point: GraphPoint; points: GraphPoint[] }) {
  const dark = useColorScheme() === 'dark';
  const x = positionOf(point, points);
  return (
    <View style={styles.labelRow}>
      <Text
        style={[
          styles.label,
          {
            color: dark ? '#A1A1A8' : '#6E6E75',
            left: `${x * 100}%`,
            transform: [{ translateX: x > 0.5 ? -72 : 0 }],
          },
        ]}>
        {formatPrice(point.value)}
      </Text>
    </View>
  );
}

export function AxisLabelsDemo() {
  const [range, setRange] = useState<TimeRange>('1M');
  const points = priceHistory[range];
  const max = extreme(points, 'max');
  const min = extreme(points, 'min');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={range} options={TIME_RANGES} onChange={setRange} />}>
        <LineGraph
          style={styles.graph}
          animated
          points={points}
          color="#8B5CF6"
          TopAxisLabel={() => <AxisLabel point={max} points={points} />}
          BottomAxisLabel={() => <AxisLabel point={min} points={points} />}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  graph: { height: 260, margin: spacing.lg },
  labelRow: { height: 20 },
  label: { position: 'absolute', width: 72, fontSize: 12, fontWeight: '600' },
});
