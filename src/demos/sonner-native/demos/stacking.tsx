/**
 * Sonner Native · Stacking
 *
 * `enableStacking` piles toasts behind the newest one instead of listing them.
 * Tap the stack to expand it. Flip the switch to compare both layouts.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Toaster, toast, type ToastPosition } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Card, SwitchRow, spacing } from '@/design-system';

function sendNotifications(position: ToastPosition) {
  const notifications = [
    () => toast.success('Story published', { position }),
    () => toast('Sam Lee loved your story', { position, description: '1 min ago' }),
    () => toast.info('New suggestion for Matcha in New York', { position }),
    () => {
      const id = toast('Leo Lee wants to connect', {
        position,
        action: {
          label: 'Accept',
          onClick: () =>
            toast.success('Connected with Leo Lee', { id, position, action: undefined }),
        },
      });
    },
  ];
  notifications.forEach((show, index) => setTimeout(show, index * 350));
}

export function StackingDemo() {
  const [stacking, setStacking] = useState(true);

  return (
    <DemoStage>
      <View style={styles.switch}>
        <Card padding={0}>
          <SwitchRow
            label="Stack toasts"
            hint="Tap the stack to expand it"
            value={stacking}
            onValueChange={setStacking}
          />
        </Card>
      </View>

      <TriggerStack>
        <Trigger
          emoji="🥞"
          label="Send 4 notifications"
          onPress={() => sendNotifications('top-center')}
        />
        <Trigger
          emoji="⬇️"
          label="Send from the bottom"
          onPress={() => sendNotifications('bottom-center')}
        />
      </TriggerStack>

      <Toaster enableStacking={stacking} visibleToasts={4} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  switch: { alignSelf: 'stretch', marginHorizontal: spacing.lg },
});
