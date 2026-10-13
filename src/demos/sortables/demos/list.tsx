/**
 * React Native Sortables · Sortable list
 *
 * A one-column `Sortable.Grid` is a sortable list, and rows can have any
 * height. `useItemContext()` inside a row exposes the live order as shared
 * values (`keyToIndex`), so the rank badge updates while the row is still
 * being dragged, without a React render.
 */
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import Sortable, { useItemContext, type SortableGridRenderItem } from 'react-native-sortables';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';

type Cafe = { id: string; name: string; note: string; emoji: string };

const CAFES: Cafe[] = [
  { id: 'plentea', name: 'Plentea Matcha', note: 'Ceremonial matcha', emoji: '🍵' },
  { id: 'kettl', name: 'Kettl Greenpoint', note: 'Hojicha and mochi', emoji: '🫖' },
  { id: 'neighbors', name: 'Neighbors Café', note: 'Croissants by the pier', emoji: '🥐' },
  { id: 'blue', name: 'Blue Door Bakery', note: 'Cinnamon buns', emoji: '🥯' },
  { id: 'sunny', name: 'Sunny Side', note: 'Pancakes all day', emoji: '🥞' },
];

Animated.addWhitelistedNativeProps?.({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/** The row's live rank, read from the sortable's shared order. */
function Rank() {
  const { itemKey, keyToIndex } = useItemContext();
  const rank = useDerivedValue(() => String((keyToIndex.get()[itemKey] ?? 0) + 1));
  const animatedProps = useAnimatedProps(() => ({ text: rank.get(), defaultValue: rank.get() }));
  return (
    <View style={styles.rank}>
      <AnimatedTextInput editable={false} style={styles.rankText} animatedProps={animatedProps} />
    </View>
  );
}

export function ListDemo() {
  const colors = useColors();
  const [cafes, setCafes] = useState(CAFES);

  const renderItem = useCallback<SortableGridRenderItem<Cafe>>(
    ({ item }) => (
      <View style={[styles.row, { backgroundColor: colors.surfaceMuted }]}>
        <Rank />
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={styles.flex}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.note, { color: colors.textSecondary }]}>{item.note}</Text>
        </View>
      </View>
    ),
    [colors],
  );

  return (
    <DemoStage>
      <Showcase padding="md">
        <Sortable.Grid
          data={cafes}
          renderItem={renderItem}
          columns={1}
          rowGap={8}
          overDrag="vertical"
          onDragEnd={({ data }) => setCafes(data)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  rank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3478F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', padding: 0, textAlign: 'center' },
  emoji: { fontSize: 26, lineHeight: 32 },
  flex: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  note: { fontSize: 13 },
});
