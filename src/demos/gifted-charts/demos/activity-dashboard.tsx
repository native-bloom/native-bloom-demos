/**
 * Gifted Charts · Activity dashboard
 *
 * A fitness-style week view built from one `BarChart`:
 * - `onPress(item, index)` selects a day; the selected bar gets its own
 *   `frontColor` in the data, and the stats card below shows that day.
 * - `showReferenceLine1` with `referenceLine1Position` draws the daily goal as
 *   a dashed line with a label.
 * - `showLine` + `lineData` + `lineConfig` overlay a curved line (here the
 *   3-day average) on the same axes.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, Text, spacing, useColors } from '@/design-system';
import { DAYS, weeklySteps } from '../data';
import { formatThousands, useAxisTheme } from '../theme';

const GOAL = 8000;
const steps = weeklySteps.sam;

/** Average of the day and the two before it. */
const trend = steps.map((_, i) => {
  const window = steps.slice(Math.max(0, i - 2), i + 1);
  return { value: Math.round(window.reduce((a, b) => a + b, 0) / window.length) };
});

export function ActivityDashboardDemo() {
  const colors = useColors();
  const axis = useAxisTheme();
  const [day, setDay] = useState(5);

  const data = steps.map((value, i) => ({
    value,
    label: DAYS[i]!.slice(0, 1),
    frontColor: i === day ? '#3478F6' : colors.accentSoft,
  }));

  const value = steps[day]!;
  const km = (value * 0.00075).toFixed(1);
  const kcal = Math.round(value * 0.04);
  const reached = value >= GOAL;

  return (
    <DemoStage align="top">
      <Card style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text variant="label" color="textSecondary">
              {DAYS[day]}
            </Text>
            <Text style={styles.big}>{value.toLocaleString('en-US')}</Text>
            <Text variant="label" color={reached ? 'success' : 'textSecondary'}>
              {reached ? 'Goal reached' : `${(GOAL - value).toLocaleString('en-US')} to goal`}
            </Text>
          </View>
          <IconTile emoji={reached ? '🏆' : '👟'} color={colors.surfaceMuted} size={48} />
        </View>

        <BarChart
          {...axis}
          data={data}
          onPress={(_item: unknown, index: number) => setDay(index)}
          width={270}
          height={180}
          barWidth={24}
          spacing={14}
          initialSpacing={10}
          barBorderRadius={6}
          noOfSections={4}
          maxValue={14000}
          yAxisLabelWidth={36}
          formatYLabel={formatThousands}
          showReferenceLine1
          referenceLine1Position={GOAL}
          referenceLine1Config={{
            color: '#22C55E',
            dashWidth: 4,
            dashGap: 4,
            thickness: 1.5,
            labelText: 'Goal',
            labelTextStyle: { color: '#22C55E', fontSize: 11, fontWeight: '700', top: -16 },
          }}
          showLine
          lineData={trend}
          lineConfig={{
            color: '#F59E0B',
            thickness: 2.5,
            curved: true,
            hideDataPoints: true,
            shiftY: 0,
            initialSpacing: 22,
          }}
          disableScroll
        />
      </Card>

      <View style={styles.stats}>
        <Card style={styles.stat}>
          <Text style={styles.statEmoji}>📍</Text>
          <Text variant="heading">{`${km} km`}</Text>
          <Text variant="caption" color="textSecondary">
            Distance
          </Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text variant="heading">{`${kcal} kcal`}</Text>
          <Text variant="caption" color="textSecondary">
            Burned
          </Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statEmoji}>📈</Text>
          <Text variant="heading">{formatThousands(String(trend[day]!.value))}</Text>
          <Text variant="caption" color="textSecondary">
            3-day avg
          </Text>
        </Card>
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  big: { fontSize: 34, lineHeight: 40, fontWeight: '800', letterSpacing: -0.8 },
  stats: { flexDirection: 'row', gap: spacing.md },
  stat: { flex: 1, alignItems: 'center', gap: 2, paddingHorizontal: 8 },
  statEmoji: { fontSize: 20, marginBottom: 4 },
});
