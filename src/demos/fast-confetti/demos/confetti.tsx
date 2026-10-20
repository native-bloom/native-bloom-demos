/**
 * Fast Confetti · Confetti
 *
 * `<Confetti />` drops pieces from above the top edge and lets them tumble to
 * the bottom. It fills its parent (absolutely positioned, `pointerEvents="none"`),
 * so put it last in a full-screen view. With `autoplay={false}` nothing shows
 * until you call `restart()` on its ref. `count` sets how many pieces fall and
 * `fadeOutOnEnd` fades them out near the bottom instead of letting them leave.
 */
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Confetti, type ConfettiMethods } from 'react-native-fast-confetti';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function ConfettiDemo() {
  const shower = useRef<ConfettiMethods>(null);
  const sprinkle = useRef<ConfettiMethods>(null);
  const fading = useRef<ConfettiMethods>(null);

  return (
    <View style={styles.fill}>
      <DemoStage>
        <TriggerStack>
          <Trigger
            tone="primary"
            emoji="🎉"
            label="Drop confetti"
            onPress={() => shower.current?.restart()}
          />
          <Trigger emoji="🧂" label="Light sprinkle" onPress={() => sprinkle.current?.restart()} />
          <Trigger
            emoji="🫧"
            label="Fade out at the end"
            onPress={() => fading.current?.restart()}
          />
        </TriggerStack>
      </DemoStage>

      <Confetti ref={shower} autoplay={false} />
      <Confetti ref={sprinkle} autoplay={false} count={50} />
      <Confetti ref={fading} autoplay={false} fadeOutOnEnd />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
