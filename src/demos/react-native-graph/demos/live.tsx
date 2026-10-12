/**
 * react-native-graph · Live heart rate
 *
 * A live feed: a new reading arrives every second, the oldest one drops off,
 * and the animated graph slides to the new shape. `enableIndicator` marks the
 * latest reading and `indicatorPulsating` makes it pulse while idle.
 * `horizontalPadding` leaves room for the pulse at the right edge.
 */
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineGraph, type GraphPoint } from 'react-native-graph';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, Text, spacing } from '@/design-system';

const WINDOW = 40;
const SECOND = 1000;

function nextBpm(previous: number) {
  const target = 78;
  const next = previous + (target - previous) * 0.15 + (Math.random() * 2 - 1) * 4;
  return Math.max(58, Math.min(124, next));
}

function initialReadings(): GraphPoint[] {
  const now = Date.now();
  let bpm = 72;
  return Array.from({ length: WINDOW }, (_, index) => {
    bpm = nextBpm(bpm);
    return { date: new Date(now - (WINDOW - 1 - index) * SECOND), value: bpm };
  });
}

export function LiveDemo() {
  const [readings, setReadings] = useState(initialReadings);
  const latest = readings[readings.length - 1]!.value;

  useEffect(() => {
    const timer = setInterval(() => {
      setReadings((current) => {
        const last = current[current.length - 1]!;
        const next = { date: new Date(last.date.getTime() + SECOND), value: nextBpm(last.value) };
        return [...current.slice(1), next];
      });
    }, SECOND);
    return () => clearInterval(timer);
  }, []);

  return (
    <DemoStage>
      <Card padding={0}>
        <View style={styles.header}>
          <Text variant="caption" color="textSecondary">
            ❤️ HEART RATE · LIVE
          </Text>
          <View style={styles.value}>
            <Text variant="display">{Math.round(latest)}</Text>
            <Text variant="bodyStrong" color="textSecondary">
              BPM
            </Text>
          </View>
        </View>
        <LineGraph
          style={styles.graph}
          animated
          points={readings}
          color="#EF4444"
          gradientFillColors={['#EF444430', '#EF444400']}
          enableIndicator
          indicatorPulsating
          horizontalPadding={16}
        />
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.xl, paddingBottom: spacing.sm, gap: 2 },
  value: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  graph: { height: 200, marginHorizontal: spacing.lg, marginBottom: spacing.lg },
});
