/**
 * Gifted Charts · Pie and donut
 *
 * `PieChart` takes `{ value, color }` items. Add `donut` for a ring and draw
 * anything in the hole with `centerLabelComponent`; `innerCircleColor` should
 * match the surface behind the chart. `showText` prints each slice's `text`,
 * and `isThreeD` with a `tiltAngle` tips the pie back for a 3D look.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';
import { memoryCategories } from '../data';

const data = memoryCategories.map((c) => ({
  value: c.value,
  color: c.color,
  text: `${c.value}%`,
}));

type Variant = 'pie' | 'donut' | '3d';

const OPTIONS = [
  { value: 'pie', label: 'Pie' },
  { value: 'donut', label: 'Donut' },
  { value: '3d', label: '3D' },
] as const;

export function PieDonutDemo() {
  const colors = useColors();
  const [variant, setVariant] = useState<Variant>('pie');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={variant} options={OPTIONS} onChange={setVariant} />}>
        <View style={styles.chart}>
          {variant === 'pie' ? (
            <PieChart
              data={data}
              radius={110}
              showText
              textColor="#FFFFFF"
              textSize={13}
              fontWeight="700"
            />
          ) : null}
          {variant === 'donut' ? (
            <PieChart
              data={data}
              donut
              radius={110}
              innerRadius={72}
              innerCircleColor={colors.surface}
              centerLabelComponent={() => (
                <View style={styles.center}>
                  <Text style={[styles.total, { color: colors.text }]}>248</Text>
                  <Text style={[styles.caption, { color: colors.textSecondary }]}>memories</Text>
                </View>
              )}
            />
          ) : null}
          {variant === '3d' ? (
            <PieChart
              data={data}
              isThreeD
              tiltAngle="55deg"
              shadow
              shadowColor="#9CA3AF"
              shadowWidth={18}
              radius={110}
              showText
              textColor="#FFFFFF"
              textSize={13}
              fontWeight="700"
            />
          ) : null}
        </View>
        <View style={styles.legend}>
          {memoryCategories.map((c) => (
            <View key={c.label} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: c.color }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>{c.label}</Text>
            </View>
          ))}
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  chart: { height: 240, alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center' },
  total: { fontSize: 30, fontWeight: '800' },
  caption: { fontSize: 13, fontWeight: '500' },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginTop: 16,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 13, fontWeight: '500' },
});
