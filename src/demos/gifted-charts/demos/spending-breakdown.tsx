/**
 * Gifted Charts · Spending breakdown
 *
 * A month's spending as a donut next to the category list. The two stay in
 * sync both ways: tapping a slice focuses it (`focusOnPress`) and `onPress`
 * reports its index to the list, and tapping a row sets `focusedPieIndex`,
 * which focuses that slice. `centerLabelComponent` receives the focused index
 * and shows the category's amount in the hole.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, ScalePressable, Text, radius, spacing, useColors } from '@/design-system';
import { spending } from '../data';

const total = spending.reduce((sum, c) => sum + c.value, 0);
const data = spending.map((c) => ({ value: c.value, color: c.color }));

export function SpendingBreakdownDemo() {
  const colors = useColors();
  const [selected, setSelected] = useState(0);

  return (
    <DemoStage align="top">
      <Card style={styles.chartCard}>
        <View>
          <Text variant="label" color="textSecondary">
            October
          </Text>
          <Text style={styles.total}>{`$${total}`}</Text>
        </View>
        <PieChart
          data={data}
          donut
          radius={74}
          innerRadius={50}
          extraRadius={8}
          innerCircleColor={colors.surface}
          focusOnPress
          focusedPieIndex={selected}
          onPress={(_item: unknown, index: number) => setSelected(index)}
          centerLabelComponent={(index: number) => {
            const category = spending[index] ?? spending[0]!;
            return (
              <View style={styles.center}>
                <Text style={styles.centerEmoji}>{category.emoji}</Text>
                <Text variant="bodyStrong">{`$${category.value}`}</Text>
              </View>
            );
          }}
        />
      </Card>

      <Card padding={0} style={styles.list}>
        {spending.map((category, index) => {
          const active = index === selected;
          return (
            <ScalePressable
              key={category.label}
              accessibilityRole="button"
              accessibilityLabel={category.label}
              accessibilityState={{ selected: active }}
              onPress={() => setSelected(index)}
              style={[styles.row, active && { backgroundColor: colors.surfaceMuted }]}>
              <IconTile emoji={category.emoji} color={colors.surfaceMuted} size={40} />
              <View style={styles.rowText}>
                <Text variant="bodyStrong">{category.label}</Text>
                <View style={[styles.track, { backgroundColor: colors.surfaceMuted }]}>
                  <View
                    style={[
                      styles.fill,
                      {
                        width: `${(category.value / total) * 100}%`,
                        backgroundColor: category.color,
                      },
                    ]}
                  />
                </View>
              </View>
              <Text variant="bodyStrong">{`$${category.value}`}</Text>
            </ScalePressable>
          );
        })}
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: { fontSize: 34, lineHeight: 40, fontWeight: '800', letterSpacing: -0.8 },
  center: { alignItems: 'center' },
  centerEmoji: { fontSize: 18 },
  list: { paddingVertical: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  rowText: { flex: 1, gap: 6 },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
});
