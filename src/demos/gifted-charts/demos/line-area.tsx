/**
 * Gifted Charts · Line and area charts
 *
 * `LineChart` takes the same `{ value, label }` items as bars. The default is a
 * straight line with data points; `curved` smooths it into a bezier, and
 * `areaChart` fills under it with a vertical gradient (`startFillColor` →
 * `endFillColor`, with `startOpacity` / `endOpacity`). `isAnimated` draws the
 * line in on mount; the `key` replays it per variant.
 */
import { useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { memoriesPerMonth } from '../data';
import { useAxisTheme } from '../theme';

type Variant = 'line' | 'curved' | 'area';

const OPTIONS = [
  { value: 'line', label: 'Line' },
  { value: 'curved', label: 'Curved' },
  { value: 'area', label: 'Area' },
] as const;

const VARIANT_PROPS = {
  line: { color: '#3478F6', dataPointsColor: '#3478F6' },
  curved: { curved: true, color: '#8B5CF6', thickness: 3, hideDataPoints: true },
  area: {
    curved: true,
    areaChart: true,
    color: '#22C55E',
    thickness: 3,
    hideDataPoints: true,
    startFillColor: '#22C55E',
    endFillColor: '#22C55E',
    startOpacity: 0.35,
    endOpacity: 0.02,
  },
};

export function LineAreaDemo() {
  const [variant, setVariant] = useState<Variant>('line');
  const axis = useAxisTheme();

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={variant} options={OPTIONS} onChange={setVariant} />}>
        <LineChart
          key={variant}
          {...axis}
          {...VARIANT_PROPS[variant]}
          data={memoriesPerMonth}
          isAnimated
          animationDuration={900}
          width={260}
          height={200}
          spacing={40}
          initialSpacing={12}
          noOfSections={4}
          maxValue={32}
          yAxisLabelWidth={28}
          disableScroll
        />
      </Showcase>
    </DemoStage>
  );
}
