/**
 * Fast Confetti · Fall physics
 *
 * The falling motion is simulated, not keyframed. `gravity` (1 by default)
 * sets how fast pieces fall, `drift` (0–1) how far they sway sideways, and
 * `wobble` how strongly the tumble pushes them around while they fall.
 * `flipIntensity` controls how far pieces turn edge-on as they flip.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContinuousConfetti, type ContinuousConfettiProps } from 'react-native-fast-confetti';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const MODES = [
  { value: 'floaty', label: 'Floaty', emoji: '🪶' },
  { value: 'default', label: 'Default', emoji: '🎉' },
  { value: 'heavy', label: 'Heavy', emoji: '🪨' },
  { value: 'tumbling', label: 'Tumbling', emoji: '🌀' },
] as const;

type Mode = (typeof MODES)[number]['value'];

const PHYSICS: Record<Mode, Partial<ContinuousConfettiProps>> = {
  floaty: { gravity: 0.35, drift: 1, wobble: { min: 0.06, max: 0.12 } },
  default: {},
  heavy: { gravity: 3, drift: 0.1, flipIntensity: 0.3 },
  tumbling: { gravity: 0.7, drift: 1, wobble: { min: 0.2, max: 0.35 }, flipIntensity: 1 },
};

export function PhysicsDemo() {
  const [mode, setMode] = useState<Mode>('default');

  return (
    <DemoStage>
      <Showcase padding={0} below={<VariantBar value={mode} options={MODES} onChange={setMode} />}>
        <View style={styles.area}>
          <ContinuousConfetti
            key={mode}
            count={120}
            {...PHYSICS[mode]}
            containerStyle={styles.confetti}>
            <ContinuousConfetti.Flake width={8} height={14} />
            <ContinuousConfetti.Flake width={10} height={16} radius={3} />
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
