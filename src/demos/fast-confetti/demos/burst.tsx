/**
 * Fast Confetti · Confetti burst
 *
 * `<PIConfetti />` blasts pieces outward from each `<PIConfetti.Origin>` and
 * lets gravity and drag bring them down. `blastPosition` takes a named
 * position (`center`, `top-center`, …) or `{ x, y }` in the container's
 * points. Several origins fire together; `delay` on an origin staggers it.
 */
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { PIConfetti, type PIConfettiMethods } from 'react-native-fast-confetti';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function BurstDemo() {
  const center = useRef<PIConfettiMethods>(null);
  const top = useRef<PIConfettiMethods>(null);
  const twin = useRef<PIConfettiMethods>(null);

  return (
    <View style={styles.fill}>
      <DemoStage>
        <TriggerStack>
          <Trigger
            tone="primary"
            emoji="💥"
            label="From the center"
            onPress={() => center.current?.restart()}
          />
          <Trigger emoji="⬇️" label="From the top" onPress={() => top.current?.restart()} />
          <Trigger emoji="✨" label="Two at once" onPress={() => twin.current?.restart()} />
        </TriggerStack>
      </DemoStage>

      <PIConfetti ref={center} autoplay={false} fadeOutOnEnd>
        <PIConfetti.Origin blastPosition="center" count={200} initialSpeed={2}>
          <PIConfetti.Flake width={8} height={16} />
          <PIConfetti.Flake size={10} radius={2} />
        </PIConfetti.Origin>
      </PIConfetti>

      <PIConfetti ref={top} autoplay={false} fadeOutOnEnd>
        <PIConfetti.Origin blastPosition="top-center" count={200} initialSpeed={1.2}>
          <PIConfetti.Flake width={8} height={16} />
          <PIConfetti.Flake size={10} radius={5} />
        </PIConfetti.Origin>
      </PIConfetti>

      <PIConfetti ref={twin} autoplay={false} fadeOutOnEnd>
        <PIConfetti.Origin blastPosition={{ x: 100, y: 140 }} count={100}>
          <PIConfetti.Flake width={8} height={16} />
        </PIConfetti.Origin>
        <PIConfetti.Origin blastPosition={{ x: 290, y: 210 }} count={100} delay={250}>
          <PIConfetti.Flake size={10} radius={5} />
        </PIConfetti.Origin>
      </PIConfetti>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
