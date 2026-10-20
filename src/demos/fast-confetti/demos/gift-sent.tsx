/**
 * Fast Confetti · Gift sent
 *
 * A success state that celebrates from its own icon. When the check mark
 * appears, its `onLayout` measures where it sits on screen and calls
 * `restart({ origins })` on a full-screen `<PIConfetti />`, so the burst
 * comes from behind the check wherever the layout puts it. The confetti is
 * rendered first with `containerStyle={{ zIndex: 0 }}` (the default is 1) so
 * the check and text stay on top.
 */
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PIConfetti, type PIConfettiMethods } from 'react-native-fast-confetti';

import { DemoStage } from '@/demos/_shared/stage';
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconTile,
  Text,
  haptic,
  spacing,
  useColors,
} from '@/design-system';

type Status = 'idle' | 'sending' | 'sent';

export function GiftSentDemo() {
  const colors = useColors();
  const confetti = useRef<PIConfettiMethods>(null);
  const overlay = useRef<View>(null);
  const check = useRef<View>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => () => clearTimeout(timer.current), []);

  function send() {
    setStatus('sending');
    timer.current = setTimeout(() => setStatus('sent'), 900);
  }

  function burstFromCheck() {
    haptic.success();
    check.current?.measureInWindow((x, y, width, height) => {
      overlay.current?.measureInWindow((ox, oy) => {
        const blastPosition = { x: x - ox + width / 2, y: y - oy + height / 2 };
        confetti.current?.restart({ origins: [{ blastPosition }] });
      });
    });
  }

  function reset() {
    clearTimeout(timer.current);
    confetti.current?.reset();
    setStatus('idle');
  }

  return (
    <View ref={overlay} style={styles.fill}>
      {/* First and at zIndex 0, so the success content draws on top of the burst. */}
      <PIConfetti ref={confetti} autoplay={false} fadeOutOnEnd containerStyle={styles.behind}>
        <PIConfetti.Origin blastPosition="center" count={180} initialSpeed={1.3}>
          <PIConfetti.Flake width={8} height={14} />
          <PIConfetti.Flake size={10} radius={5} />
        </PIConfetti.Origin>
      </PIConfetti>
      <DemoStage
        footer={
          status === 'sent' ? (
            <Button label="Done" variant="soft" fullWidth onPress={reset} />
          ) : (
            <Button
              label="Send gift"
              emoji="🎁"
              fullWidth
              loading={status === 'sending'}
              onPress={send}
            />
          )
        }>
        {status === 'sent' ? (
          <View style={styles.success}>
            <View
              ref={check}
              onLayout={burstFromCheck}
              style={[styles.checkCircle, { backgroundColor: colors.success }]}>
              <Icon name="check" size={44} tint="#FFFFFF" weight="bold" />
            </View>
            <Text variant="title" align="center">
              Gift sent to Sam Lee
            </Text>
            <Text color="textSecondary" align="center">
              It arrives tomorrow morning
            </Text>
          </View>
        ) : (
          <Card padding="xl" style={styles.gift}>
            <IconTile emoji="🎁" color="#E8F0FF" size={88} />
            <View style={styles.giftText}>
              <Text variant="heading" align="center">
                Jam cookies and candied nuts
              </Text>
              <Text color="textSecondary" align="center">
                A festive gift box
              </Text>
            </View>
            <View style={[styles.recipient, { backgroundColor: colors.surfaceMuted }]}>
              <Avatar name="Sam Lee" size={28} />
              <Text variant="label">To Sam Lee</Text>
            </View>
          </Card>
        )}
      </DemoStage>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  behind: { zIndex: 0 },
  gift: { alignItems: 'center', gap: spacing.lg },
  giftText: { gap: spacing.xs },
  recipient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.xs,
    paddingRight: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
  success: { alignItems: 'center', gap: spacing.sm },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
});
