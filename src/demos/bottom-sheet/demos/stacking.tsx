/**
 * Bottom Sheet · Stacked modals
 *
 * Presenting a modal while another is open stacks it on top.
 * `stackBehavior="push"` keeps the modal below on screen, so a place opens its
 * menu, the menu opens an item, and each `dismiss()` steps back one level.
 *
 * In 5.2.14 the default `stackBehavior="switch"` (hide the modal below, bring
 * it back afterwards) doesn't bring it back: the hidden modal is unmounted, so
 * use `push`, or present the previous modal again from the top one's
 * `onDismiss`.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Button, IconTile, ListRow, Text, spacing, useColors } from '@/design-system';

type Item = { emoji: string; name: string; price: string; note: string };

const MENU: Item[] = [
  { emoji: '🍵', name: 'Ceremonial matcha', price: '$6', note: 'Whisked to order, served hot' },
  { emoji: '🧋', name: 'Hojicha latte', price: '$7', note: 'Roasted green tea with oat milk' },
  { emoji: '🍡', name: 'Mochi trio', price: '$5', note: 'Matcha, black sesame and yuzu' },
];

function Backdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />;
}

export function StackingDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const place = useRef<BottomSheetModal>(null);
  const menu = useRef<BottomSheetModal>(null);
  const item = useRef<BottomSheetModal>(null);
  const [picked, setPicked] = useState<Item>(MENU[1]!);

  const sheetProps = {
    accessible: false,
    stackBehavior: 'push' as const,
    backgroundStyle: { backgroundColor: colors.surface },
    handleIndicatorStyle: { backgroundColor: colors.textTertiary },
  };
  const bottom = { paddingBottom: insets.bottom + spacing.md };

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          tone="primary"
          emoji="🍵"
          label="Open Plentea Matcha"
          onPress={() => place.current?.present()}
        />
      </TriggerStack>

      <BottomSheetModal ref={place} backdropComponent={Backdrop} {...sheetProps}>
        <BottomSheetView style={[styles.content, bottom]}>
          <View style={styles.row}>
            <IconTile emoji="🍵" color="#EEF6E2" size={56} />
            <View style={styles.flex}>
              <Text variant="title">Plentea Matcha</Text>
              <Text color="textSecondary">Matcha bar · 60 Furman St</Text>
            </View>
          </View>
          <Text>
            The best matcha place in New York, says Sam Lee. Quiet in the mornings, with a view of
            the bridge.
          </Text>
          <Button
            label="See the menu"
            emoji="🗂️"
            fullWidth
            onPress={() => menu.current?.present()}
          />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal ref={menu} {...sheetProps}>
        <BottomSheetView style={[styles.content, bottom]}>
          <Text variant="heading">Menu</Text>
          <View>
            {MENU.map((entry) => (
              <ListRow
                key={entry.name}
                title={entry.name}
                subtitle={entry.price}
                leading={<IconTile emoji={entry.emoji} color="#EEF6E2" size={40} />}
                onPress={() => {
                  setPicked(entry);
                  item.current?.present();
                }}
              />
            ))}
          </View>
          <Button label="Back" variant="soft" fullWidth onPress={() => menu.current?.dismiss()} />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal ref={item} {...sheetProps}>
        <BottomSheetView style={[styles.item, bottom]}>
          <IconTile emoji={picked.emoji} color="#EEF6E2" size={72} />
          <Text variant="title" align="center">
            {picked.name}
          </Text>
          <Text color="textSecondary" align="center">
            {picked.note}
          </Text>
          <Button
            label={`Add to order · ${picked.price}`}
            fullWidth
            onPress={() => item.current?.dismiss()}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing['2xl'], paddingTop: spacing.md, gap: spacing.lg },
  item: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
});
