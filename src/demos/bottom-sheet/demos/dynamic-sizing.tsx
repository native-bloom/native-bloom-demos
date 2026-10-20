/**
 * Bottom Sheet · Dynamic sizing
 *
 * With `enableDynamicSizing` (the default in v5) and no `snapPoints`, a sheet
 * measures its content and opens exactly that tall. The content must sit in a
 * `BottomSheetView` or `BottomSheetScrollView`. `maxDynamicContentSize` caps
 * the height; past it, a `BottomSheetScrollView` scrolls the rest.
 *
 * Give `BottomSheetView` a style or a two-item style array: in 5.2.14 it merges
 * arrays with `StyleSheet.compose`, which drops a third item, so the measured
 * height comes out short.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { memories } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Button, IconTile, ListRow, Text, spacing, useColors } from '@/design-system';

const ALL_MEMORIES = [...memories, ...memories, ...memories].map((m, i) => ({
  ...m,
  key: `${m.id}-${i}`,
}));

export function DynamicSizingDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const short = useRef<BottomSheetModal>(null);
  const medium = useRef<BottomSheetModal>(null);
  const long = useRef<BottomSheetModal>(null);

  const sheetProps = {
    backgroundStyle: { backgroundColor: colors.surface },
    handleIndicatorStyle: { backgroundColor: colors.textTertiary },
  };
  const bottom = { paddingBottom: insets.bottom + spacing.md };

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          tone="primary"
          emoji="📝"
          label="Short note"
          onPress={() => short.current?.present()}
        />
        <Trigger emoji="💌" label="Longer message" onPress={() => medium.current?.present()} />
        <Trigger emoji="📚" label="Capped long list" onPress={() => long.current?.present()} />
      </TriggerStack>

      <BottomSheetModal accessible={false} ref={short} {...sheetProps}>
        <BottomSheetView style={[styles.note, bottom]}>
          <Text variant="heading">Memory saved</Text>
          <Text color="textSecondary">Made cookie dough is in your Cooking album</Text>
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal accessible={false} ref={medium} {...sheetProps}>
        <BottomSheetView style={[styles.content, bottom]}>
          <View style={styles.row}>
            <IconTile emoji="🎁" color="#E8F0FF" size={52} />
            <View style={styles.flex}>
              <Text variant="heading">From Sam Lee</Text>
              <Text variant="caption" color="textSecondary">
                2 days ago
              </Text>
            </View>
          </View>
          <Text>
            Thank you for the gift box! The jam cookies were gone in a day and the candied nuts
            didn’t last much longer. Let’s bake together next weekend, I’ll bring the matcha from
            Plentea.
          </Text>
          <Button label="Reply" fullWidth onPress={() => medium.current?.dismiss()} />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        accessible={false}
        ref={long}
        maxDynamicContentSize={height * 0.6}
        {...sheetProps}>
        <BottomSheetScrollView contentContainerStyle={[styles.list, bottom]}>
          <Text variant="heading" style={styles.listTitle}>
            All memories
          </Text>
          {ALL_MEMORIES.map((memory) => (
            <ListRow
              key={memory.key}
              title={memory.title}
              subtitle={`${memory.category} · ${memory.ago}`}
              leading={<IconTile emoji={memory.emoji} color={memory.color} size={44} />}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing['2xl'], paddingTop: spacing.md, gap: spacing.lg },
  note: { paddingHorizontal: spacing['2xl'], paddingTop: spacing.md, gap: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  list: { paddingHorizontal: spacing.sm },
  listTitle: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
});
