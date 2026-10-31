/**
 * Gifted Charts · Animated data change
 *
 * With `animateOnDataChange`, a `LineChart` morphs its line and area from the
 * old values to the new ones whenever `data` changes, instead of redrawing.
 * `onDataChangeAnimationDuration` sets the speed. Here the chart switches
 * between three friends' weeks; keep the same number of points per dataset so
 * every point has somewhere to move to.
 *
 * Only line and area charts animate on data change. `BarChart`'s `isAnimated`
 * grows the bars on mount only (remount it with a new `key` to replay).
 */
import { useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { DAYS, weeklySteps } from '../data';
import { formatThousands, useAxisTheme } from '../theme';

type Friend = keyof typeof weeklySteps;

const OPTIONS = [
  { value: 'sam', label: 'Sam Lee' },
  { value: 'alex', label: 'Alex Smith' },
  { value: 'leo', label: 'Leo Lee' },
] as const;

const datasets = Object.fromEntries(
  Object.entries(weeklySteps).map(([friend, steps]) => [
    friend,
    steps.map((value, i) => ({ value, label: DAYS[i] })),
  ]),
) as Record<Friend, { value: number; label: string }[]>;

export function AnimatedDataDemo() {
  const [friend, setFriend] = useState<Friend>('sam');
  const axis = useAxisTheme();

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={friend} options={OPTIONS} onChange={setFriend} />}>
        <LineChart
          {...axis}
          data={datasets[friend]}
          animateOnDataChange
          onDataChangeAnimationDuration={600}
          areaChart
          curved
          color="#3478F6"
          thickness={3}
          startFillColor="#3478F6"
          endFillColor="#3478F6"
          startOpacity={0.3}
          endOpacity={0.02}
          dataPointsColor="#3478F6"
          dataPointsRadius={4}
          width={270}
          height={200}
          spacing={40}
          initialSpacing={18}
          noOfSections={4}
          maxValue={14000}
          yAxisLabelWidth={36}
          formatYLabel={formatThousands}
          disableScroll
        />
      </Showcase>
    </DemoStage>
  );
}
