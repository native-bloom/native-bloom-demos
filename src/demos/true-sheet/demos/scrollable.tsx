/**
 * True Sheet · Scrollable sheet
 *
 * `scrollable` pins the `ScrollView` / `FlatList` inside the sheet to the
 * space it has, so long content scrolls instead of overflowing. `header`
 * stays fixed above the list and its height is accounted for. Scrolling to the
 * top and pulling down shrinks the sheet; scrolling at the smaller detent
 * expands it first.
 *
 * `'auto'` is not supported with `scrollable`: use fractional detents.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { memories } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { IconTile, ListRow, Text, spacing } from '@/design-system';

// Three weeks of memories, so the list is long enough to scroll.
const ITEMS = [0, 1, 2].flatMap((week) =>
  memories.map((memory) => ({
    ...memory,
    key: `${week}-${memory.id}`,
    ago: week === 0 ? memory.ago : `${week + 1} weeks ago`,
  })),
);

export function ScrollableDemo() {
  const sheet = useRef<TrueSheet>(null);

  const header = (
    <View style={styles.header}>
      <Text variant="title">Memories</Text>
      <Text variant="caption" color="textSecondary">
        {ITEMS.length} moments with Sam Lee
      </Text>
    </View>
  );

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger tone="primary" emoji="📚" label="All memories" onPress={() => sheet.current?.present()} />
      </TriggerStack>

      <TrueSheet ref={sheet} detents={[0.5, 1]} header={header} scrollable>
        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <ListRow
              title={item.title}
              subtitle={`${item.category} · ${item.ago}`}
              leading={<IconTile emoji={item.emoji} color={item.color} />}
              divider={index > 0}
            />
          )}
        />
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing['2xl'], paddingTop: spacing['3xl'], paddingBottom: spacing.md, gap: 2 },
  list: { paddingHorizontal: spacing.sm, paddingBottom: spacing['3xl'] },
});
