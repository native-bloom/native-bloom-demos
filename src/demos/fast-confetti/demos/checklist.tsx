/**
 * Fast Confetti · All done
 *
 * A reward for finishing a list: when the last task is checked, two cannons
 * fire from the bottom corners toward the top of the screen. The cannons sit
 * in a full-screen `<CannonConfetti autoplay={false} />` and fire with
 * `restart()` from the toggle handler, so unchecking and checking again
 * celebrates again.
 */
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CannonConfetti, type CannonConfettiMethods } from 'react-native-fast-confetti';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, Icon, ListRow, Text, haptic, spacing, useColors } from '@/design-system';

const TASKS = [
  { id: 'dough', title: 'Make the cookie dough', subtitle: 'With Sam Lee' },
  { id: 'bake', title: 'Bake the jam cookies', subtitle: '12 minutes at 180°' },
  { id: 'nuts', title: 'Candy the nuts', subtitle: 'Pecans and almonds' },
  { id: 'box', title: 'Pack the gift box', subtitle: 'For Alex Smith' },
];

function CheckCircle({ done }: { done: boolean }) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.check,
        done
          ? { backgroundColor: colors.success, borderColor: colors.success }
          : { borderColor: colors.textTertiary },
      ]}>
      {done ? <Icon name="check" size={14} tint="#FFFFFF" /> : null}
    </View>
  );
}

export function ChecklistDemo() {
  const confetti = useRef<CannonConfettiMethods>(null);
  const [done, setDone] = useState<string[]>(['dough', 'bake']);
  const allDone = done.length === TASKS.length;

  function toggle(id: string) {
    const next = done.includes(id) ? done.filter((d) => d !== id) : [...done, id];
    setDone(next);
    if (next.length === TASKS.length) {
      haptic.success();
      confetti.current?.restart();
    } else {
      haptic.selection();
    }
  }

  return (
    <View style={styles.fill}>
      <DemoStage align="top">
        <View style={styles.heading}>
          <Text variant="title">{allDone ? 'All done 🎉' : 'Festive treats'}</Text>
          <Text color="textSecondary">
            {allDone ? 'The gift box is ready for Alex' : `${done.length} of ${TASKS.length} done`}
          </Text>
        </View>
        <Card padding="xs">
          {TASKS.map((task, i) => (
            <ListRow
              key={task.id}
              title={task.title}
              subtitle={task.subtitle}
              leading={<CheckCircle done={done.includes(task.id)} />}
              chevron={false}
              divider={i > 0}
              onPress={() => toggle(task.id)}
            />
          ))}
        </Card>
      </DemoStage>

      <CannonConfetti ref={confetti} autoplay={false} fadeOutOnEnd>
        <CannonConfetti.Origin position="bottom-left" count={120} initialSpeed={3}>
          <CannonConfetti.Flake width={8} height={14} />
          <CannonConfetti.Flake size={12} radius={6} />
        </CannonConfetti.Origin>
        <CannonConfetti.Origin position="bottom-right" count={120} initialSpeed={3}>
          <CannonConfetti.Flake width={8} height={14} />
          <CannonConfetti.Flake size={12} radius={6} />
        </CannonConfetti.Origin>
      </CannonConfetti>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  heading: { gap: spacing.xs, paddingHorizontal: spacing.xs, paddingTop: spacing.sm },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
