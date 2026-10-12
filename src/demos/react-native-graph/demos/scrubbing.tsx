/**
 * react-native-graph · Scrub to read values
 *
 * `enablePanGesture` lets the user press and slide along the graph.
 * `onPointSelected` fires for each point under the finger, so the header shows
 * that point's value and date; `onGestureEnd` puts the latest value back.
 * `panGestureDelay={0}` starts scrubbing immediately (default: hold 300 ms).
 */
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineGraph, type GraphPoint } from 'react-native-graph';

import { DemoStage, StageHint } from '@/demos/_shared/stage';
import { Card, Text, spacing } from '@/design-system';
import { formatPrice, priceHistory } from '../data';

const POINTS = priceHistory['1W'];
const LATEST = POINTS[POINTS.length - 1]!;

function formatDate(date: Date) {
  return date.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' });
}

export function ScrubbingDemo() {
  const [selected, setSelected] = useState<GraphPoint | null>(null);
  const point = selected ?? LATEST;

  return (
    <DemoStage>
      <Card padding={0}>
        <View style={styles.header}>
          <Text variant="caption" color="textSecondary">
            BALANCE
          </Text>
          <Text variant="display">{formatPrice(point.value)}</Text>
          <Text variant="label" color="textSecondary">
            {selected ? formatDate(selected.date) : 'Now'}
          </Text>
        </View>
        <LineGraph
          style={styles.graph}
          animated
          points={POINTS}
          color="#3478F6"
          gradientFillColors={['#3478F640', '#3478F600']}
          enablePanGesture
          panGestureDelay={0}
          onGestureStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onPointSelected={(p) => {
            setSelected(p);
            Haptics.selectionAsync();
          }}
          onGestureEnd={() => setSelected(null)}
        />
      </Card>
      <StageHint>Slide your finger along the graph</StageHint>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.xl, paddingBottom: spacing.sm, gap: 2 },
  graph: { height: 220, marginHorizontal: spacing.lg, marginBottom: spacing.lg },
});
