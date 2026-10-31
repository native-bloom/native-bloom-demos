/**
 * Gifted Charts · Bar chart variants
 *
 * `BarChart` takes `{ value, label }` items and draws them with react-native-svg.
 * Each look is a prop or two away: the default bars, `roundedTop` with a custom
 * `frontColor`, `showGradient` + `gradientColor`, and `isThreeD` with side and
 * top colors. `isAnimated` grows the bars in on mount; changing the `key`
 * replays it for each variant. `formatYLabel` shortens the y-axis labels.
 */
import { useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';
import { DAYS, weeklySteps } from '../data';
import { formatThousands, useAxisTheme } from '../theme';

const data = weeklySteps.sam.map((value, i) => ({ value, label: DAYS[i]!.slice(0, 1) }));

type Variant = 'default' | 'rounded' | 'gradient' | '3d';

const OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'gradient', label: 'Gradient' },
  { value: '3d', label: '3D' },
] as const;

const VARIANT_PROPS = {
  default: {},
  rounded: { frontColor: '#3478F6', roundedTop: true, roundedBottom: true, barBorderRadius: 6 },
  gradient: {
    frontColor: '#22C55E',
    gradientColor: '#A7F3D0',
    showGradient: true,
    barBorderTopLeftRadius: 8,
    barBorderTopRightRadius: 8,
  },
  '3d': {
    isThreeD: true,
    frontColor: '#F59E0B',
    sideColor: '#B45309',
    topColor: '#FCD34D',
    sideWidth: 10,
  },
};

export function BarChartDemo() {
  const [variant, setVariant] = useState<Variant>('default');
  const axis = useAxisTheme();
  const colors = useColors();

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={variant} options={OPTIONS} onChange={setVariant} />}>
        <BarChart
          key={variant}
          {...axis}
          // The default bar color is black; follow the theme so it shows in dark mode.
          frontColor={colors.inverse}
          {...VARIANT_PROPS[variant]}
          data={data}
          isAnimated
          width={270}
          height={200}
          barWidth={22}
          spacing={16}
          initialSpacing={10}
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
