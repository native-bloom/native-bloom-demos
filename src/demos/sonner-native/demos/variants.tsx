/**
 * Sonner Native · Variants
 *
 * The six built-in variants. Each one has its own icon:
 * `toast`, `toast.success`, `toast.error`, `toast.warning`, `toast.info`, `toast.loading`.
 */
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function VariantsDemo() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger emoji="💬" label="Default" onPress={() => toast('Sam Lee sent you a message')} />
        <Trigger emoji="✅" label="Success" onPress={() => toast.success('Story published')} />
        <Trigger emoji="⛔️" label="Error" onPress={() => toast.error('Upload failed')} />
        <Trigger emoji="⚠️" label="Warning" onPress={() => toast.warning('Storage almost full')} />
        <Trigger emoji="💡" label="Info" onPress={() => toast.info('New suggestion for you')} />
        <Trigger emoji="⏳" label="Loading" onPress={() => toast.loading('Searching memories…')} />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}
