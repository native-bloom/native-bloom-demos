/**
 * Sonner Native · Basic toast
 *
 * The smallest setup: mount `<Toaster />` once, then call `toast()` from anywhere.
 *
 * In an app, render `<Toaster />` once in the root layout, inside
 * `GestureHandlerRootView` and `SafeAreaProvider`. It is mounted here so the
 * file is self-contained.
 */
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function BasicDemo() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger tone="primary" label="Show toast" onPress={() => toast('Memory saved')} />
        <Trigger
          emoji="📝"
          label="With description"
          onPress={() =>
            toast('Memory saved', {
              description: 'Added to Cooking · 2 photos',
            })
          }
        />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}
