/**
 * Sonner Native · Toast after navigation
 *
 * Saving a memory pops the edit screen and the confirmation toast shows on the
 * list underneath. It works because `<Toaster />` lives in the layout, next to
 * the navigator, not inside a screen that unmounts.
 *
 * In an app this layout is your root `_layout.tsx`. The screens are
 * `list-screen.tsx` and `edit-screen.tsx`; the toast call is in `edit-screen.tsx`.
 */
import { Stack } from 'expo-router';
import { Toaster } from 'sonner-native';

import { DemoFlow } from '@/demos/_shared/flow';
import { useColors } from '@/design-system';
import { MemoriesProvider } from './memories';

export default function NavigationFlowLayout() {
  const colors = useColors();
  return (
    <DemoFlow library="sonner-native">
      <MemoriesProvider>
        <Stack
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }}
        />
        <Toaster />
      </MemoriesProvider>
    </DemoFlow>
  );
}
