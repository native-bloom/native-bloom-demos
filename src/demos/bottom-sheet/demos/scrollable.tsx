/**
 * Bottom Sheet · Scrollable sheet
 *
 * `BottomSheetFlatList` (also `BottomSheetScrollView`, `BottomSheetSectionList`,
 * `BottomSheetFlashList`) hands gestures between list and sheet: dragging up
 * grows the sheet until its top snap point, then scrolls the list; scrolling
 * back to the top and dragging down shrinks it again. A plain `FlatList` would
 * fight the sheet's pan gesture.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

import { memories, stickerArt, type Memory } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage } from '@/demos/_shared/stage';
import { IconTile, ListRow, Text, radius, spacing, useColors } from '@/design-system';

const ITEMS: (Memory & { key: string })[] = Array.from({ length: 4 }, (_, round) =>
  memories.map((m) => ({ ...m, key: `${m.id}-${round}` })),
).flat();

export function ScrollableDemo() {
  const colors = useColors();

  return (
    <View style={styles.fill}>
      <DemoStage align="top">
        <Picture art={stickerArt.cardDev} style={styles.photo} />
        <View style={styles.heading}>
          <Text variant="title">This week</Text>
          <Text color="textSecondary">{ITEMS.length} memories with Sam Lee</Text>
        </View>
      </DemoStage>

      <BottomSheet
        accessible={false}
        index={0}
        snapPoints={['45%', '92%']}
        enableDynamicSizing={false}
        style={styles.shadow}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textTertiary }}>
        <BottomSheetFlatList
          data={ITEMS}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <Text variant="heading" style={styles.listTitle}>
              Memories
            </Text>
          }
          renderItem={({ item }) => (
            <ListRow
              title={item.title}
              subtitle={`${item.category} · ${item.ago}`}
              leading={<IconTile emoji={item.emoji} color={item.color} size={44} />}
            />
          )}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  // The sheet has no shadow of its own; this lifts its edge off the light canvas.
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
  },
  photo: { height: 220, borderRadius: radius.lg, borderCurve: 'continuous' },
  heading: { gap: spacing.xs, paddingHorizontal: spacing.xs },
  list: { paddingHorizontal: spacing.sm, paddingBottom: spacing['4xl'] },
  listTitle: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
});
