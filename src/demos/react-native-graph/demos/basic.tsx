/**
 * react-native-graph · Line graph
 *
 * The smallest setup: `points` (dates and values, oldest first), a `color`
 * and a height. Without `animated`, the graph uses the lightweight static
 * renderer, so switching data swaps the line instantly.
 *
 * Needs @shopify/react-native-skia, react-native-reanimated and
 * react-native-gesture-handler.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineGraph } from 'react-native-graph';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text, spacing } from '@/design-system';
import { randomWalk } from '../data';

const HOUR = 60 * 60 * 1000;

const METRICS = {
  steps: {
    label: 'Steps',
    value: '8,412 today',
    color: '#3478F6',
    points: randomWalk({
      count: 48,
      start: 400,
      volatility: 0.35,
      drift: 0.02,
      stepMs: HOUR / 2,
      seed: 4,
    }),
  },
  sleep: {
    label: 'Sleep',
    value: '7 h 40 min',
    color: '#8B5CF6',
    points: randomWalk({ count: 48, start: 60, volatility: 0.12, stepMs: 10 * 60 * 1000, seed: 9 }),
  },
  mood: {
    label: 'Mood',
    value: 'Mostly great',
    color: '#F59E0B',
    points: randomWalk({
      count: 30,
      start: 6,
      volatility: 0.15,
      drift: 0.01,
      stepMs: 24 * HOUR,
      seed: 2,
    }),
  },
} as const;

type Metric = keyof typeof METRICS;

const OPTIONS = (Object.keys(METRICS) as Metric[]).map((key) => ({
  value: key,
  label: METRICS[key].label,
}));

export function BasicDemo() {
  const [metric, setMetric] = useState<Metric>('steps');
  const { label, value, color, points } = METRICS[metric];

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={metric} options={OPTIONS} onChange={setMetric} />}>
        <View style={styles.header}>
          <Text variant="caption" color="textSecondary">
            {label.toUpperCase()}
          </Text>
          <Text variant="title">{value}</Text>
        </View>
        <LineGraph style={styles.graph} points={points} color={color} />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.xl, paddingBottom: spacing.sm, gap: 2 },
  graph: { height: 180, marginHorizontal: spacing.lg, marginBottom: spacing.xl },
});
