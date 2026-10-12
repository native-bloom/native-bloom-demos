/**
 * Sonner Native · Content variants
 *
 * What a toast can hold besides its title: a description, an action button,
 * a cancel button, a custom icon, a close button, and rich colors.
 *
 * The cancel button closes the toast. The action button only calls `onClick`,
 * so update the same toast by id (or call `toast.dismiss(id)`) inside it.
 * An update merges into the old toast: pass `action: undefined` to drop the button.
 */
import { Text } from 'react-native';
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function ContentDemo() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          emoji="📝"
          label="Description"
          onPress={() =>
            toast('Memory saved', {
              description: 'Added to Cooking · 2 photos',
            })
          }
        />
        <Trigger
          emoji="↩️"
          label="Action"
          onPress={() => {
            const id = toast('Memory deleted', {
              action: {
                label: 'Undo',
                onClick: () => toast.success('Memory restored', { id, action: undefined }),
              },
            });
          }}
        />
        <Trigger
          emoji="✋"
          label="Action and cancel"
          onPress={() => {
            const id = toast('Sam Lee wants to connect', {
              action: {
                label: 'Accept',
                onClick: () =>
                  toast.success('You are now connected', {
                    id,
                    action: undefined,
                    cancel: undefined,
                  }),
              },
              cancel: { label: 'Deny', onClick: () => {} },
            });
          }}
        />
        <Trigger
          emoji="🚀"
          label="Custom icon"
          onPress={() =>
            toast('Your story is live', {
              icon: <Text style={{ fontSize: 18 }}>🚀</Text>,
            })
          }
        />
        <Trigger
          emoji="✖️"
          label="Close button"
          onPress={() =>
            toast('Tap the cross to close me', {
              closeButton: true,
            })
          }
        />
        <Trigger
          emoji="🎨"
          label="Rich colors"
          onPress={() =>
            toast.success('Payment received', {
              description: 'Sam Lee sent you $24.00',
              richColors: true,
            })
          }
        />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}
