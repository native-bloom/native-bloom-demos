/**
 * Fast Confetti · Play controls
 *
 * Every confetti component exposes the same ref methods: `restart()` plays
 * from the beginning, `pause()` freezes the pieces mid-air, `resume()` carries
 * on from there, and `reset()` stops and clears. A low `gravity` makes the
 * fall last long enough to pause it.
 */
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Confetti, type ConfettiMethods } from 'react-native-fast-confetti';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function ControlsDemo() {
  const confetti = useRef<ConfettiMethods>(null);

  return (
    <View style={styles.fill}>
      <DemoStage>
        <TriggerStack>
          <Trigger
            tone="primary"
            emoji="🎉"
            label="Start"
            onPress={() => confetti.current?.restart()}
          />
          <Trigger emoji="⏸️" label="Pause" onPress={() => confetti.current?.pause()} />
          <Trigger emoji="▶️" label="Resume" onPress={() => confetti.current?.resume()} />
          <Trigger emoji="🧹" label="Reset" onPress={() => confetti.current?.reset()} />
        </TriggerStack>
      </DemoStage>

      <Confetti ref={confetti} autoplay={false} gravity={0.4} count={160} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
