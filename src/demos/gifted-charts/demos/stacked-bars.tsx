/**
 * Gifted Charts · Stacked bar chart
 *
 * Pass `stackData` instead of `data`: each bar is a `stacks` array of
 * `{ value, color }` sections drawn bottom to top, and the stack's `label`
 * sits under it. With `stackHighlightEnabled`, tapping a section highlights that
 * category in every bar and fades the rest; `highlightedStackIndex` sets it from
 * outside, so the legend chips below drive the same highlight.
 */
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BarChart, type stackDataItem } from 'react-native-gifted-charts';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';
import { DAYS, screenTime } from '../data';
import { useAxisTheme } from '../theme';

const CATEGORIES = [
  { key: 'social', label: 'Social', color: '#3478F6' },
  { key: 'photos', label: 'Photos', color: '#22C55E' },
  { key: 'maps', label: 'Maps', color: '#F59E0B' },
] as const;

const stackData: stackDataItem[] = screenTime.map((day, i) => ({
  label: DAYS[i]!.slice(0, 1),
  stacks: CATEGORIES.map((c) => ({ value: day[c.key], color: c.color })),
}));

export function StackedBarsDemo() {
  const colors = useColors();
  const axis = useAxisTheme();
  const [highlighted, setHighlighted] = useState(-1);

  return (
    <DemoStage>
      <Showcase>
        <Text style={[styles.title, { color: colors.text }]}>Screen time</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Minutes per day</Text>
        <BarChart
          {...axis}
          stackData={stackData}
          stackHighlightEnabled
          highlightedStackIndex={highlighted}
          isAnimated
          width={270}
          height={200}
          barWidth={24}
          spacing={15}
          initialSpacing={10}
          noOfSections={4}
          maxValue={160}
          yAxisLabelWidth={32}
          disableScroll
        />
        <View style={styles.legend}>
          {CATEGORIES.map((c, index) => {
            const active = highlighted === index;
            return (
              <Pressable
                key={c.key}
                accessibilityRole="button"
                accessibilityLabel={c.label}
                onPress={() => setHighlighted(active ? -1 : index)}
                style={[
                  styles.chip,
                  { backgroundColor: active ? colors.surfaceMuted : 'transparent' },
                ]}>
                <View style={[styles.dot, { backgroundColor: c.color }]} />
                <Text style={[styles.chipText, { color: colors.text }]}>{c.label}</Text>
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
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 16 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  chipText: { fontSize: 14, fontWeight: '600' },
});
