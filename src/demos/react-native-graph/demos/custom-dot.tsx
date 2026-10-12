/**
 * react-native-graph · Custom selection dot
 *
 * `SelectionDot` replaces the dot that follows the finger while scrubbing. It
 * renders inside the graph's Skia canvas and receives shared values: the dot
 * position (`circleX`, `circleY`) and whether the gesture is active
 * (`isActive`). Pass `null` to hide it. Components are defined at module level
 * so their identity stays stable.
 *
 * Extra package: @shopify/react-native-skia (already a peer dependency).
 */
import { Circle, DashPathEffect, Group, Line, vec } from '@shopify/react-native-skia';
import { useState, type ComponentType } from 'react';
import { StyleSheet } from 'react-native';
import { LineGraph, type SelectionDotProps } from 'react-native-graph';
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { DemoStage, Showcase, StageHint, VariantBar } from '@/demos/_shared/stage';
import { spacing } from '@/design-system';
import { priceHistory } from '../data';

/** Animates 0 → 1 while the user is scrubbing. */
function useActiveProgress(isActive: SelectionDotProps['isActive']) {
  const progress = useSharedValue(0);
  useAnimatedReaction(
    () => isActive.get(),
    (active) => progress.set(withTiming(active ? 1 : 0, { duration: 180 })),
  );
  return progress;
}

/** A flat dot without the default ring and shadow. */
function FlatDot({ isActive, color, circleX, circleY }: SelectionDotProps) {
  const radius = useSharedValue(0);
  useAnimatedReaction(
    () => isActive.get(),
    (active) => radius.set(withSpring(active ? 6 : 0)),
  );
  return <Circle cx={circleX} cy={circleY} r={radius} color={color} />;
}

/** A soft halo around a solid dot. */
function HaloDot({ isActive, color, circleX, circleY }: SelectionDotProps) {
  const progress = useActiveProgress(isActive);
  const halo = useDerivedValue(() => progress.get() * 14);
  const core = useDerivedValue(() => progress.get() * 6);
  return (
    <Group>
      <Circle cx={circleX} cy={circleY} r={halo} color={color} opacity={0.2} />
      <Circle cx={circleX} cy={circleY} r={core} color="#FFFFFF" />
      <Circle cx={circleX} cy={circleY} r={core} color={color} style="stroke" strokeWidth={3} />
    </Group>
  );
}

/** A dashed vertical crosshair through the selected point. */
function CrosshairDot({ isActive, color, circleX, circleY }: SelectionDotProps) {
  const progress = useActiveProgress(isActive);
  const top = useDerivedValue(() => vec(circleX.get(), 0));
  const bottom = useDerivedValue(() => vec(circleX.get(), 1000));
  const radius = useDerivedValue(() => progress.get() * 5);
  return (
    <Group opacity={progress}>
      <Line p1={top} p2={bottom} color={color} strokeWidth={1.5}>
        <DashPathEffect intervals={[5, 5]} />
      </Line>
      <Circle cx={circleX} cy={circleY} r={radius} color={color} />
    </Group>
  );
}

const DOTS: Record<string, ComponentType<SelectionDotProps> | undefined> = {
  default: undefined,
  flat: FlatDot,
  halo: HaloDot,
  crosshair: CrosshairDot,
};

const OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'flat', label: 'Flat' },
  { value: 'halo', label: 'Halo' },
  { value: 'crosshair', label: 'Crosshair' },
] as const;

type Dot = (typeof OPTIONS)[number]['value'];

const POINTS = priceHistory['1W'];

export function CustomDotDemo() {
  const [dot, setDot] = useState<Dot>('crosshair');

  return (
    <DemoStage>
      <Showcase padding={0} below={<VariantBar value={dot} options={OPTIONS} onChange={setDot} />}>
        <LineGraph
          style={styles.graph}
          animated
          points={POINTS}
          color="#3478F6"
          enablePanGesture
          panGestureDelay={0}
          SelectionDot={DOTS[dot]}
        />
      </Showcase>
      <StageHint>Slide your finger along the graph</StageHint>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  graph: { height: 240, margin: spacing.xl },
});
