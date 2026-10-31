/**
 * Gifted Charts · Donut focus on press
 *
 * `focusOnPress` pops the tapped slice out of the ring by `extraRadius`, and
 * `focusedPieIndex` picks the slice that starts focused. The selection lives
 * inside the chart: `centerLabelComponent` receives the focused index, so the
 * hole shows the focused category. Use `onPress(item, index)` when the app
 * needs to know about the tap too.
 */
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';
import { memoryCategories } from '../data';

const data = memoryCategories.map((c) => ({ value: c.value, color: c.color }));

export function DonutFocusDemo() {
  const colors = useColors();

  return (
    <DemoStage>
      <Showcase>
        <Text style={[styles.title, { color: colors.text }]}>Your memories</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Share by category</Text>
        <View style={styles.chart}>
          <PieChart
            data={data}
            donut
            radius={110}
            innerRadius={70}
            extraRadius={12}
            innerCircleColor={colors.surface}
            focusOnPress
            focusedPieIndex={0}
            centerLabelComponent={(index: number) => <CenterLabel index={index} />}
          />
        </View>
      </Showcase>
    </DemoStage>
  );
}

function CenterLabel({ index }: { index: number }) {
  const colors = useColors();
  const category = memoryCategories[index] ?? memoryCategories[0]!;
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={[styles.percent, { color: colors.text }]}>{`${category.value}%`}</Text>
      <Text style={[styles.caption, { color: colors.textSecondary }]}>{category.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 13, marginTop: 2 },
  chart: { alignItems: 'center', paddingVertical: 8 },
  center: { alignItems: 'center' },
  emoji: { fontSize: 22 },
  percent: { fontSize: 28, fontWeight: '800', marginTop: 2 },
  caption: { fontSize: 13, fontWeight: '600' },
});
