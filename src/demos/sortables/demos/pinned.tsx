/**
 * React Native Sortables · Pinned items
 *
 * Wrap each item in `<Sortable.Handle>` and set `customHandle` on the
 * sortable; the handle's `mode` then decides how the item behaves:
 * `'draggable'` (default), `'non-draggable'` (can't be picked up but moves
 * aside), or `'fixed-order'` (can't be picked up and never moves). Here the
 * album cover and the add button are fixed; the photos reorder around them.
 */
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Sortable, { type SortableGridRenderItem } from 'react-native-sortables';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text as ThemedText } from '@/design-system';

type Cell = { id: string; emoji: string; color: string; pinned?: 'cover' | 'add' };

const CELLS: Cell[] = [
  { id: 'cover', emoji: '🧁', color: '#FF8FB1', pinned: 'cover' },
  { id: '1', emoji: '🍪', color: '#FFF1DB' },
  { id: '2', emoji: '🍓', color: '#FFE1E1' },
  { id: '3', emoji: '🍩', color: '#F6E8FF' },
  { id: '4', emoji: '🥞', color: '#E8F0FF' },
  { id: '5', emoji: '🍰', color: '#FFF6E0' },
  { id: '6', emoji: '🍵', color: '#EEF6E2' },
  { id: '7', emoji: '🥐', color: '#F2E8DE' },
  { id: 'add', emoji: '+', color: '#EEEEF1', pinned: 'add' },
];

export function PinnedDemo() {
  const [cells, setCells] = useState(CELLS);

  const renderItem = useCallback<SortableGridRenderItem<Cell>>(
    ({ item }) => (
      <Sortable.Handle mode={item.pinned ? 'fixed-order' : 'draggable'}>
        <View style={[styles.cell, { backgroundColor: item.color }]}>
          <Text style={item.pinned === 'add' ? styles.add : styles.emoji}>{item.emoji}</Text>
          {item.pinned === 'cover' ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>📌 Cover</Text>
            </View>
          ) : null}
        </View>
      </Sortable.Handle>
    ),
    [],
  );

  return (
    <DemoStage>
      <Showcase padding="lg">
        <View style={styles.header}>
          <ThemedText variant="heading">Festive treats</ThemedText>
          <ThemedText variant="caption" color="textSecondary">
            The cover and the add button stay put
          </ThemedText>
        </View>
        <Sortable.Grid
          data={cells}
          renderItem={renderItem}
          columns={3}
          rowGap={8}
          columnGap={8}
          customHandle
          onDragEnd={({ data }) => setCells(data)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { gap: 2, marginBottom: 14 },
  cell: {
    aspectRatio: 1,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 38, lineHeight: 46 },
  add: { fontSize: 36, lineHeight: 42, fontWeight: '300', color: '#6E6E75' },
  badge: {
    position: 'absolute',
    bottom: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#B0144A' },
});
