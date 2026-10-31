/**
 * Gifted Charts · Line chart with pointer
 *
 * `pointerConfig` turns a line or area chart into a scrubber: touch and drag
 * and a pointer dot, a vertical strip and your own `pointerLabelComponent`
 * follow the finger, snapping to the nearest point. The label receives the
 * items under the pointer, so it can show any field of the data item (here a
 * `date`). `activatePointersOnLongPress` would wait for a long press instead,
 * which plays nicer inside scroll views.
 */
import { StyleSheet, Text, View } from 'react-native';
import { LineChart, type lineDataItem } from 'react-native-gifted-charts';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';
import { monthSteps } from '../data';
import { formatThousands, useAxisTheme } from '../theme';

type StepItem = lineDataItem & { date: string };

function PointerLabel({ item }: { item: StepItem }) {
  return (
    <View style={styles.label}>
      <Text style={styles.labelDate}>{item.date}</Text>
      <Text style={styles.labelValue}>{`${(item.value ?? 0).toLocaleString('en-US')} steps`}</Text>
    </View>
  );
}

export function LinePointerDemo() {
  const colors = useColors();
  const axis = useAxisTheme();

  return (
    <DemoStage>
      <Showcase>
        <Text style={[styles.title, { color: colors.text }]}>Steps in October</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Daily steps, last 30 days
        </Text>
        <LineChart
          {...axis}
          data={monthSteps}
          areaChart
          curved
          hideDataPoints
          color="#F59E0B"
          thickness={2.5}
          startFillColor="#F59E0B"
          endFillColor="#F59E0B"
          startOpacity={0.35}
          endOpacity={0.02}
          width={270}
          height={200}
          spacing={9}
          initialSpacing={4}
          endSpacing={4}
          noOfSections={4}
          maxValue={16000}
          yAxisLabelWidth={36}
          formatYLabel={formatThousands}
          xAxisLabelTextStyle={{ ...axis.xAxisLabelTextStyle, width: 40 }}
          disableScroll
          pointerConfig={{
            pointerColor: '#F59E0B',
            radius: 6,
            pointerStripColor: '#F59E0B',
            pointerStripWidth: 2,
            pointerStripUptoDataPoint: true,
            pointerLabelWidth: 110,
            pointerLabelHeight: 52,
            shiftPointerLabelY: -8,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: StepItem[]) => <PointerLabel item={items[0]!} />,
          }}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 13, marginTop: 2, marginBottom: 16 },
  label: {
    width: 110,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#111113',
  },
  labelDate: { color: '#A1A1A8', fontSize: 11, fontWeight: '600' },
  labelValue: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginTop: 2 },
});
