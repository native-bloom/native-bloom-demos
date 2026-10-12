/**
 * Sonner Native · Behavior variants
 *
 * Options that change how a toast behaves rather than how it looks:
 * `dismissible`, `duration`, `onPress` and per-toast `position`.
 */
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function BehaviorDemo() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          emoji="🔒"
          label="Can't be swiped away"
          onPress={() =>
            toast('Syncing your memories', {
              description: 'This one ignores swipes',
              dismissible: false,
            })
          }
        />
        <Trigger
          emoji="♾️"
          label="Stays until acknowledged"
          onPress={() => {
            const id = toast.warning('Storage almost full', {
              duration: Infinity,
              action: { label: 'Got it', onClick: () => toast.dismiss(id) },
            });
          }}
        />
        <Trigger
          emoji="👆"
          label="Tap to open"
          onPress={() => {
            const id = toast('Sam Lee asked you a question', {
              description: 'Tap to answer',
              onPress: () => {
                toast.dismiss(id);
                toast.success('Opening the question…');
              },
            });
          }}
        />
        <Trigger
          emoji="⚡️"
          label="Gone in a second"
          onPress={() => toast('Copied', { duration: 1000 })}
        />
        <Trigger
          emoji="⬇️"
          label="From the bottom"
          onPress={() => toast('Draft saved', { position: 'bottom-center' })}
        />
        <Trigger
          emoji="⏺️"
          label="In the center"
          onPress={() => toast.success('Connected', { position: 'center' })}
        />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}
