/**
 * React Native Sortables · Reorder strategies
 *
 * `strategy` decides what happens to the other items while you drag.
 * `'insert'` (default) slides every item between the old and new position
 * along by one, like a list. `'swap'` (grid only) trades places with the item
 * under the finger and leaves the rest alone, good for boards and layouts.
 */
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Sortable, { type SortableGridRenderItem } from 'react-native-sortables';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const STRATEGIES = [
  { value: 'insert', label: 'Insert' },
  { value: 'swap', label: 'Swap' },
] as const;

type Strategy = (typeof STRATEGIES)[number]['value'];

const COLORS = ['#FF6B6B', '#FFB224', '#FFD43B', '#22C55E', '#14B8A6', '#3478F6', '#6366F1', '#A855F7', '#FF2D78', '#F97316', '#84CC16', '#06B6D4'];

const NUMBERS = COLORS.map((color, i) => ({ id: String(i + 1), color }));

type Tile = (typeof NUMBERS)[number];

export function StrategiesDemo() {
  const [strategy, setStrategy] = useState<Strategy>('insert');
  const [tiles, setTiles] = useState(NUMBERS);

  const renderItem = useCallback<SortableGridRenderItem<Tile>>(
    ({ item }) => (
      <View style={[styles.tile, { backgroundColor: item.color }]}>
        <Text style={styles.number}>{item.id}</Text>
      </View>
    ),
    [],
  );

  return (
    <DemoStage>
      <Showcase
        padding="lg"
        below={
          <VariantBar
            value={strategy}
            options={STRATEGIES}
            onChange={(value) => {
              setStrategy(value);
              setTiles(NUMBERS);
            }}
          />
        }>
        <Sortable.Grid
          key={strategy}
          data={tiles}
          renderItem={renderItem}
          columns={3}
          rowGap={10}
          columnGap={10}
          strategy={strategy}
          onDragEnd={({ data }) => setTiles(data)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  tile: {
    height: 76,
    borderRadius: 16,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
});
