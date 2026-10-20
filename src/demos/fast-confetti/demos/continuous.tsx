/**
 * Fast Confetti · Continuous confetti
 *
 * `<ContinuousConfetti />` keeps falling forever without the gap a looping
 * `<Confetti infinite />` has between rounds: every piece wraps back to the
 * top on its own schedule. `count` and `verticalSpacing` (200 by default, lower
 * is denser) set how busy the stream is. It stops when it unmounts, or with
 * `pause()` / `reset()` on its ref.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContinuousConfetti } from 'react-native-fast-confetti';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const DENSITIES = [
  { value: 'light', label: 'Light', emoji: '🌤️' },
  { value: 'normal', label: 'Normal', emoji: '🎉' },
  { value: 'dense', label: 'Dense', emoji: '🎊' },
] as const;

type Density = (typeof DENSITIES)[number]['value'];

const SETTINGS: Record<Density, { count: number; verticalSpacing: number }> = {
  light: { count: 30, verticalSpacing: 300 },
  normal: { count: 100, verticalSpacing: 200 },
  dense: { count: 400, verticalSpacing: 40 },
};

export function ContinuousDemo() {
  const [density, setDensity] = useState<Density>('normal');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={density} options={DENSITIES} onChange={setDensity} />}>
        <View style={styles.area}>
          <ContinuousConfetti key={density} {...SETTINGS[density]} containerStyle={styles.confetti}>
            <ContinuousConfetti.Flake size={12} radius={6} />
            <ContinuousConfetti.Flake width={8} height={14} />
            <ContinuousConfetti.Flake width={8} height={14} radius={4} />
          </ContinuousConfetti>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  area: { height: 420 },
  confetti: { width: '100%', height: '100%' },
});
