/**
 * React Native Sortables · Sortable grid
 *
 * `Sortable.Grid` works like a `FlatList`: pass `data`, `renderItem` and
 * `columns`. Long-press a tile to lift it, drag, and the other tiles make room.
 * `onDragEnd` returns the reordered `data`, ready for `setState`. Wrap
 * `renderItem` in `useCallback`.
 *
 * Items are keyed by `id` (or `key`, or the item itself for strings) unless
 * you pass `keyExtractor`.
 */
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Sortable, { type SortableGridRenderItem } from 'react-native-sortables';

import { DemoStage, Showcase } from '@/demos/_shared/stage';

type Tile = { id: string; emoji: string; label: string; color: string };

const TILES: Tile[] = [
  { id: '1', emoji: '🍪', label: 'Cookies', color: '#FFF1DB' },
  { id: '2', emoji: '🍵', label: 'Matcha', color: '#EEF6E2' },
  { id: '3', emoji: '🧁', label: 'Cupcakes', color: '#FFE4EC' },
  { id: '4', emoji: '🥐', label: 'Croissant', color: '#FFF6E0' },
  { id: '5', emoji: '🍓', label: 'Berries', color: '#FFE1E1' },
  { id: '6', emoji: '🥗', label: 'Salad', color: '#E6F6E9' },
  { id: '7', emoji: '🍩', label: 'Donuts', color: '#F6E8FF' },
  { id: '8', emoji: '☕️', label: 'Coffee', color: '#F2E8DE' },
  { id: '9', emoji: '🥞', label: 'Pancakes', color: '#E8F0FF' },
];

export function GridDemo() {
  const [tiles, setTiles] = useState(TILES);

  const renderItem = useCallback<SortableGridRenderItem<Tile>>(
    ({ item }) => (
      <View style={[styles.tile, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </View>
    ),
    [],
  );

  return (
    <DemoStage>
      <Showcase padding="lg">
        <Sortable.Grid
          data={tiles}
          renderItem={renderItem}
          columns={3}
          rowGap={10}
          columnGap={10}
          onDragEnd={({ data }) => setTiles(data)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  tile: {
    height: 96,
    borderRadius: 18,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  emoji: { fontSize: 34, lineHeight: 40 },
  label: { fontSize: 13, fontWeight: '600', color: '#3A3A40' },
});
