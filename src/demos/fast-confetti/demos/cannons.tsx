/**
 * Fast Confetti · Confetti cannons
 *
 * `<CannonConfetti />` fires each `<CannonConfetti.Origin>` from its
 * `position` toward a `target` (top center by default), in a cone set by
 * `spread`. A root `target` aims every cannon at the same point, so four
 * corners can meet in the middle. (The README's `ConfettiPresets.TwinBloom`
 * is not in the latest npm release, 2.0.2.)
 */
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { CannonConfetti, type CannonConfettiMethods } from 'react-native-fast-confetti';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function CannonsDemo() {
  const corners = useRef<CannonConfettiMethods>(null);
  const straightUp = useRef<CannonConfettiMethods>(null);
  const crossing = useRef<CannonConfettiMethods>(null);

  return (
    <View style={styles.fill}>
      <DemoStage>
        <TriggerStack>
          <Trigger
            tone="primary"
            emoji="🎊"
            label="Both corners"
            onPress={() => corners.current?.restart()}
          />
          <Trigger emoji="🚀" label="Straight up" onPress={() => straightUp.current?.restart()} />
          <Trigger
            emoji="🎯"
            label="Meet in the middle"
            onPress={() => crossing.current?.restart()}
          />
        </TriggerStack>
      </DemoStage>

      <CannonConfetti ref={corners} autoplay={false} fadeOutOnEnd>
        <CannonConfetti.Origin position="bottom-left" count={120} initialSpeed={4.5}>
          <CannonConfetti.Flake width={8} height={14} />
          <CannonConfetti.Flake size={12} radius={6} />
        </CannonConfetti.Origin>
        <CannonConfetti.Origin position="bottom-right" count={120} initialSpeed={4.5}>
          <CannonConfetti.Flake width={8} height={14} />
          <CannonConfetti.Flake size={12} radius={6} />
        </CannonConfetti.Origin>
      </CannonConfetti>

      <CannonConfetti ref={straightUp} autoplay={false} fadeOutOnEnd>
        <CannonConfetti.Origin
          position="bottom-center"
          target="top-center"
          count={160}
          initialSpeed={5.5}
          spread={Math.PI / 8}>
          <CannonConfetti.Flake width={8} height={14} />
          <CannonConfetti.Flake width={6} height={18} radius={3} />
        </CannonConfetti.Origin>
      </CannonConfetti>

      <CannonConfetti ref={crossing} autoplay={false} fadeOutOnEnd target="center">
        <CannonConfetti.Origin position="bottom-left" count={100} initialSpeed={2.6}>
          <CannonConfetti.Flake width={8} height={14} />
        </CannonConfetti.Origin>
        <CannonConfetti.Origin position="bottom-right" count={100} initialSpeed={2.6}>
          <CannonConfetti.Flake size={12} radius={6} />
        </CannonConfetti.Origin>
        <CannonConfetti.Origin position="top-left" count={100} initialSpeed={2.6}>
          <CannonConfetti.Flake size={12} radius={6} />
        </CannonConfetti.Origin>
        <CannonConfetti.Origin position="top-right" count={100} initialSpeed={2.6}>
          <CannonConfetti.Flake width={8} height={14} />
        </CannonConfetti.Origin>
      </CannonConfetti>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
