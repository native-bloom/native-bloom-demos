/**
 * Pressto · Timing and spring
 *
 * `PressablesConfig` sets how every pressable inside it animates.
 * `animationType` is `'timing'` (the default, 250 ms) or `'spring'`, and
 * `animationConfig` takes Reanimated's timing or spring config. A low-damping
 * spring overshoots on release, so the buttons bounce back. `config` sets the
 * shared `minScale` for all of them. A single pressable can still override
 * these with its own `animationType` / `animationConfig` props.
 */
import { PressableScale, PressablesConfig } from 'pressto';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Easing } from 'react-native-reanimated';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { IconTile, Text, useColors } from '@/design-system';

const VARIANTS = [
  { value: 'timing', label: 'Timing', emoji: '⏱️' },
  { value: 'spring', label: 'Spring', emoji: '🌀' },
  { value: 'bouncy', label: 'Bouncy', emoji: '🪀' },
] as const;

type Variant = (typeof VARIANTS)[number]['value'];

const TIMING = { duration: 250, easing: Easing.bezier(0.25, 0.1, 0.25, 1) };
const SPRING = { mass: 1, damping: 30, stiffness: 200 };
const BOUNCY = { mass: 0.8, damping: 7, stiffness: 260 };

const INVITES = [
  { emoji: '🍵', color: '#EEF6E2', title: 'Matcha tasting', subtitle: 'Kettl · Sat 4 PM' },
  { emoji: '🧁', color: '#FFE4EC', title: 'Cookie swap', subtitle: "Samsam's place · Sun" },
];

export function TimingSpringDemo() {
  const colors = useColors();
  const [variant, setVariant] = useState<Variant>('bouncy');

  return (
    <DemoStage>
      <Showcase
        padding="lg"
        below={<VariantBar value={variant} options={VARIANTS} onChange={setVariant} />}>
        <PressablesConfig
          animationType={variant === 'timing' ? 'timing' : 'spring'}
          animationConfig={variant === 'timing' ? TIMING : variant === 'spring' ? SPRING : BOUNCY}
          config={{ minScale: 0.9 }}>
          <View style={styles.list}>
            {INVITES.map((invite) => (
              <PressableScale
                key={invite.title}
                accessibilityLabel={invite.title}
                style={[styles.invite, { backgroundColor: colors.surfaceMuted }]}>
                <IconTile emoji={invite.emoji} color={invite.color} size={48} />
                <View style={styles.inviteText}>
                  <Text variant="bodyStrong">{invite.title}</Text>
                  <Text variant="label" color="textSecondary">
                    {invite.subtitle}
                  </Text>
                </View>
              </PressableScale>
            ))}
            <View style={styles.buttons}>
              <PressableScale
                accessibilityLabel="Maybe"
                style={[styles.button, { backgroundColor: colors.surfaceMuted }]}>
                <Text variant="bodyStrong">Maybe</Text>
              </PressableScale>
              <PressableScale
                accessibilityLabel="Join both"
                style={[styles.button, { backgroundColor: colors.inverse }]}>
                <Text variant="bodyStrong" color="onInverse">
                  Join both
                </Text>
              </PressableScale>
            </View>
          </View>
        </PressablesConfig>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
  invite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 18,
    borderCurve: 'continuous',
  },
  inviteText: { flex: 1, gap: 2 },
  buttons: { flexDirection: 'row', gap: 10, marginTop: 4 },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
