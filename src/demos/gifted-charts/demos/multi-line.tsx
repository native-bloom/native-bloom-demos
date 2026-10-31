/**
 * Gifted Charts · Multi-line comparison
 *
 * `dataSet` draws any number of lines on one chart; each entry has its own
 * `data`, `color`, thickness and data points. Hiding a series is just leaving
 * it out of the array, so the legend chips toggle lines on and off. Keep the
 * same `maxValue` while toggling, or the y-axis rescales with every tap.
 */
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LineChart, type DataSet } from 'react-native-gifted-charts';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';
import { DAYS, weeklySteps } from '../data';
import { formatThousands, useAxisTheme } from '../theme';

const SERIES = [
  { key: 'sam', label: 'Sam', color: '#3478F6' },
  { key: 'alex', label: 'Alex', color: '#EC4899' },
  { key: 'leo', label: 'Leo', color: '#22C55E' },
] as const;

type Key = (typeof SERIES)[number]['key'];

const lines: Record<Key, DataSet> = Object.fromEntries(
  SERIES.map((s) => [
    s.key,
    {
      data: weeklySteps[s.key].map((value, i) => ({ value, label: DAYS[i]!.slice(0, 1) })),
      color: s.color,
      dataPointsColor: s.color,
      dataPointsRadius: 4,
      thickness: 3,
      curved: true,
    },
  ]),
) as Record<Key, DataSet>;

export function MultiLineDemo() {
  const colors = useColors();
  const axis = useAxisTheme();
  const [visible, setVisible] = useState<Key[]>(['sam', 'alex', 'leo']);

  function toggle(key: Key) {
    setVisible((keys) => (keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]));
  }

  const dataSet = SERIES.filter((s) => visible.includes(s.key)).map((s) => lines[s.key]);

  return (
    <DemoStage>
      <Showcase>
        <Text style={[styles.title, { color: colors.text }]}>Steps this week</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sam, Alex and Leo</Text>
        <LineChart
          key={visible.join()}
          {...axis}
          dataSet={dataSet.length > 0 ? dataSet : [{ data: [], color: 'transparent' }]}
          width={270}
          height={200}
          spacing={42}
          initialSpacing={10}
          noOfSections={4}
          maxValue={14000}
          yAxisLabelWidth={36}
          formatYLabel={formatThousands}
          xAxisLabelTexts={DAYS.map((d) => d.slice(0, 1))}
          disableScroll
        />
        <View style={styles.legend}>
          {SERIES.map((s) => {
            const on = visible.includes(s.key);
            return (
              <Pressable
                key={s.key}
                accessibilityRole="button"
                accessibilityLabel={s.label}
                accessibilityState={{ selected: on }}
                onPress={() => toggle(s.key)}
                style={[
                  styles.chip,
                  { borderColor: on ? s.color : colors.border, opacity: on ? 1 : 0.5 },
                ]}>
                <View style={[styles.dot, { backgroundColor: s.color }]} />
                <Text style={[styles.chipText, { color: colors.text }]}>{s.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 13, marginTop: 2, marginBottom: 16 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    borderWidth: 1.5,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  chipText: { fontSize: 14, fontWeight: '600' },
});
