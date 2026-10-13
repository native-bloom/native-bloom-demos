/**
 * True Sheet · Sheet behaviors
 *
 * Props that change how people can interact with a sheet:
 *
 * - `dismissible={false}`: no swipe down or tap outside to close; the sheet
 *   needs its own close action (terms, required choices).
 * - `draggable={false}`: fixed size, no grabber; only `resize()` changes it.
 * - `dimmed={false}`: no dimming, and the screen behind stays interactive.
 *   `dimmedDetentIndex` starts dimming from a given detent instead.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Button, Text, spacing } from '@/design-system';

function SheetBody({ emoji, title, body, action, onAction }: {
  emoji: string;
  title: string;
  body: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <View style={styles.content}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text variant="title" align="center">
        {title}
      </Text>
      <Text color="textSecondary" align="center">
        {body}
      </Text>
      <Button label={action} fullWidth onPress={onAction} />
    </View>
  );
}

export function BehaviorsDemo() {
  const locked = useRef<TrueSheet>(null);
  const fixed = useRef<TrueSheet>(null);
  const undimmed = useRef<TrueSheet>(null);
  const [taps, setTaps] = useState(0);

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger emoji="🔒" label="Can't swipe away" onPress={() => locked.current?.present()} />
        <Trigger emoji="📌" label="Fixed size" onPress={() => fixed.current?.present()} />
        <Trigger emoji="☀️" label="No dimming" onPress={() => undimmed.current?.present()} />
        <Trigger
          emoji="❤️"
          label={taps ? `Liked ${taps} ${taps === 1 ? "time" : "times"}` : 'Like from behind the sheet'}
          onPress={() => setTaps((n) => n + 1)}
        />
      </TriggerStack>

      <TrueSheet ref={locked} detents={['auto']} dismissible={false}>
        <SheetBody
          emoji="📜"
          title="New community rules"
          body="Be kind to Sam Lee and everyone else. Accept to keep sharing memories."
          action="Accept"
          onAction={() => locked.current?.dismiss()}
        />
      </TrueSheet>

      <TrueSheet ref={fixed} detents={['auto']} draggable={false} grabber={false}>
        <SheetBody
          emoji="🎂"
          title="Leo's birthday"
          body="Saturday at Kettl Greenpoint. This sheet can't be dragged; tap outside to close."
          action="Going"
          onAction={() => fixed.current?.dismiss()}
        />
      </TrueSheet>

      <TrueSheet ref={undimmed} detents={['auto']} dimmed={false}>
        <SheetBody
          emoji="☀️"
          title="Nothing is dimmed"
          body="The like button behind this sheet still works."
          action="Done"
          onAction={() => undimmed.current?.dismiss()}
        />
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing['2xl'],
    paddingTop: spacing['3xl'],
    gap: spacing.md,
    alignItems: 'center',
  },
  emoji: { fontSize: 44, lineHeight: 52 },
});
