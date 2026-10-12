/**
 * react-native-graph · Fixed range
 *
 * By default the graph fits its points. `range` pins either axis instead: here
 * the x-axis spans the whole year and the y-axis goes from $0 to the savings
 * goal, so the line shows how far along the year and the goal you are.
 */
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineGraph } from 'react-native-graph';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, SwitchRow, Text, spacing } from '@/design-system';
import { formatPrice, randomWalk } from '../data';

const GOAL = 5000;
const YEAR = new Date().getFullYear();
const YEAR_START = new Date(YEAR, 0, 1);
const YEAR_END = new Date(YEAR, 11, 31);
const DAY = 24 * 60 * 60 * 1000;

// Savings grow over the year so far; ~40 points ending today.
const SAVINGS = randomWalk({
  count: 40,
  start: 400,
  volatility: 0.03,
  drift: 0.05,
  stepMs: (Date.now() - YEAR_START.getTime()) / 39,
  seed: 5,
});
const SAVED = SAVINGS[SAVINGS.length - 1]!.value;
const DAYS_LEFT = Math.round((YEAR_END.getTime() - Date.now()) / DAY);

export function RangeDemo() {
  const [fullYear, setFullYear] = useState(true);
  const range = useMemo(
    () =>
      fullYear ? { x: { min: YEAR_START, max: YEAR_END }, y: { min: 0, max: GOAL } } : undefined,
    [fullYear],
  );

  return (
    <DemoStage>
      <Card padding={0}>
        <View style={styles.header}>
          <IconTile emoji="🗼" color="#FFE4EC" size={48} />
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">Trip to Tokyo</Text>
            <Text variant="label" color="textSecondary">
              {formatPrice(SAVED)} of {formatPrice(GOAL)} · {DAYS_LEFT} days left
            </Text>
          </View>
        </View>
        <LineGraph
          style={styles.graph}
          animated
          points={SAVINGS}
          range={range}
          color="#FF2D78"
          gradientFillColors={['#FF2D7840', '#FF2D7800']}
          enableIndicator
          // Room for the indicator when the fitted line ends at the top edge.
          verticalPadding={10}
        />
        <SwitchRow
          label="Whole year, up to the goal"
          divider
          value={fullYear}
          onValueChange={setFullYear}
        />
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  graph: { height: 200, marginHorizontal: spacing.lg, marginBottom: spacing.lg },
});
