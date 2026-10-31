/**
 * Gifted Charts · Live data chart
 *
 * A heart-rate monitor: every second a new reading is appended and the
 * oldest one dropped, so the chart always holds the same number of points.
 * With `animateOnDataChange` the line glides from the old window to the new
 * one instead of jumping. The last reading gets a `customDataPoint` so the
 * newest beat is marked. Switching to "Running" pulls the readings toward a
 * higher target.
 *
 * The readings are simulated with a seeded random walk; in an app they would
 * come from a sensor or HealthKit subscription. The interval is cleared when
 * the screen unmounts.
 */
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { DemoStage, VariantBar } from '@/demos/_shared/stage';
import { Card, Text, spacing } from '@/design-system';
import { seeded, walk } from '../data';
import { useAxisTheme } from '../theme';

const WINDOW = 24;
const TICK_MS = 1000;
const TARGET = { resting: 72, running: 148 };

type Mode = keyof typeof TARGET;

const INITIAL = walk(WINDOW, TARGET.resting, 3, 64, 80, 3);

const OPTIONS = [
  { value: 'resting', label: 'Resting', emoji: '🧘' },
  { value: 'running', label: 'Running', emoji: '🏃' },
] as const;

function NewestBeat() {
  return <View style={styles.beat} />;
}

export function LiveHeartRateDemo() {
  const axis = useAxisTheme();
  const [mode, setMode] = useState<Mode>('resting');
  const [readings, setReadings] = useState(INITIAL);

  useEffect(() => {
    const random = seeded(mode === 'running' ? 5 : 3);
    const timer = setInterval(() => {
      setReadings((values) => {
        const last = values[values.length - 1]!;
        // Move a fifth of the way to the target, plus a little noise.
        const next = Math.round(last + (TARGET[mode] - last) * 0.2 + (random() - 0.5) * 6);
        return [...values.slice(1), next];
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [mode]);

  const bpm = readings[readings.length - 1]!;
  const data = readings.map((value, i) => ({
    value,
    ...(i === readings.length - 1 ? { customDataPoint: NewestBeat } : { hideDataPoint: true }),
  }));

  return (
    <DemoStage align="top">
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.heart}>❤️</Text>
          <View>
            <Text style={styles.bpm}>
              {bpm}
              <Text variant="bodyStrong" color="textSecondary">
                {'  bpm'}
              </Text>
            </Text>
            <Text variant="label" color="textSecondary">
              {mode === 'running' ? 'Running · zone 3' : 'Resting'}
            </Text>
          </View>
        </View>
        <LineChart
          {...axis}
          data={data}
          animateOnDataChange
          onDataChangeAnimationDuration={TICK_MS * 0.8}
          areaChart
          curved
          color="#EF4444"
          thickness={3}
          startFillColor="#EF4444"
          endFillColor="#EF4444"
          startOpacity={0.3}
          endOpacity={0.02}
          width={280}
          height={190}
          spacing={11}
          initialSpacing={0}
          endSpacing={10}
          noOfSections={4}
          // With `yAxisOffset`, `maxValue` is measured from the offset: 40 + 160 = 200.
          maxValue={160}
          yAxisOffset={40}
          yAxisLabelWidth={32}
          hideRules={false}
          xAxisLabelTexts={[]}
          disableScroll
        />
      </Card>
      <VariantBar value={mode} options={OPTIONS} onChange={setMode} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heart: { fontSize: 36, lineHeight: 44 },
  bpm: { fontSize: 40, lineHeight: 46, fontWeight: '800', letterSpacing: -1 },
  beat: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#EF4444',
  },
});
