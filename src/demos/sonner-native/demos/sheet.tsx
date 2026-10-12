/**
 * Sonner Native · Toasts inside a sheet
 *
 * A natively presented sheet covers the root `<Toaster />` on iOS, so the sheet
 * mounts its own Toaster channel and toasts are sent to it with `toasterId`.
 *
 * - The in-sheet Toaster needs `fullWindowOverlay={false}` to render inline.
 * - `swipeToDismissDirection="left"` avoids fighting the sheet's drag gesture.
 * - The sheet here is the Expo UI `BottomSheet`; React Native content inside it
 *   is wrapped in `RNHostView` so it receives touches.
 */
import { BottomSheet, RNHostView } from '@expo/ui';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Toaster, toast } from 'sonner-native';

import { people } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Avatar, Card, IconTile, ScalePressable, Text, spacing, useTheme } from '@/design-system';

const SHEET_TOASTER = 'share-sheet';
const FRIENDS = people.filter((person) => person.id !== 'alex').map((person) => person.name);
const SHEET_HEIGHT = 480;

export function SheetDemo() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  return (
    <DemoStage>
      <Card style={styles.card}>
        <IconTile emoji="🧁" size={96} color="#FFE4EC" />
        <View style={{ gap: 2, alignItems: 'center' }}>
          <Text variant="heading">Festive treats with friends</Text>
          <Text variant="label" color="textSecondary">
            Desserts and Baking · Story
          </Text>
        </View>
        <Trigger tone="primary" label="Share" onPress={() => setOpen(true)} />
      </Card>

      <BottomSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        snapPoints={[{ height: SHEET_HEIGHT }]}
        containerColor={colors.canvas}
        contentPadding={0}>
        <RNHostView matchContents>
          <View style={[styles.sheet, { width, height: SHEET_HEIGHT }]}>
            <Text variant="title">Share memory</Text>
            <View style={styles.friends}>
              {FRIENDS.map((name) => (
                <ScalePressable
                  key={name}
                  accessibilityRole="button"
                  accessibilityLabel={`Send to ${name}`}
                  style={styles.friend}
                  onPress={() => toast.success(`Sent to ${name}`, { toasterId: SHEET_TOASTER })}>
                  <Avatar name={name} size={56} />
                  <Text variant="caption" numberOfLines={1}>
                    {name}
                  </Text>
                </ScalePressable>
              ))}
            </View>
            <Trigger
              emoji="🔗"
              label="Copy link"
              onPress={() => toast('Link copied', { toasterId: SHEET_TOASTER })}
            />

            <Toaster
              id={SHEET_TOASTER}
              fullWindowOverlay={false}
              position="bottom-center"
              visibleToasts={2}
              swipeToDismissDirection="left"
            />
          </View>
        </RNHostView>
      </BottomSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.lg, alignItems: 'center' },
  sheet: {
    padding: spacing.xl,
    paddingTop: spacing['2xl'],
    gap: spacing.xl,
    alignItems: 'center',
  },
  friends: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg },
  friend: { alignItems: 'center', gap: spacing.xs, width: 64 },
});
