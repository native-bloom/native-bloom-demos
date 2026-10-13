/**
 * React Native Sortables · Drag handle
 *
 * With `customHandle` on the sortable, rows no longer drag from anywhere:
 * only the part wrapped in `<Sortable.Handle>` starts a drag, and it starts
 * immediately (`dragActivationDelay={0}`) because there is nothing else to
 * confuse it with. The rest of the row stays an ordinary tappable view, here
 * a checkbox.
 */
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Sortable, { type SortableGridRenderItem } from 'react-native-sortables';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text as ThemedText, useColors } from '@/design-system';

type Item = { id: string; label: string; emoji: string };

const ITEMS: Item[] = [
  { id: 'blanket', label: 'Picnic blanket', emoji: '🧺' },
  { id: 'berries', label: 'Strawberries', emoji: '🍓' },
  { id: 'matcha', label: 'Iced matcha', emoji: '🍵' },
  { id: 'cookies', label: 'Jam cookies', emoji: '🍪' },
  { id: 'camera', label: 'Film camera', emoji: '📷' },
];

/** Three short bars, the usual "grip" glyph. */
function Grip({ color }: { color: string }) {
  return (
    <View style={styles.grip}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[styles.gripBar, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

export function HandleDemo() {
  const colors = useColors();
  const [items, setItems] = useState(ITEMS);
  const [packed, setPacked] = useState<Record<string, boolean>>({ berries: true });

  const renderItem = useCallback<SortableGridRenderItem<Item>>(
    ({ item }) => {
      const done = !!packed[item.id];
      return (
        <View style={[styles.row, { backgroundColor: colors.surfaceMuted }]}>
          <Pressable
            hitSlop={8}
            onPress={() => setPacked((p) => ({ ...p, [item.id]: !p[item.id] }))}
            style={[styles.check, { borderColor: done ? '#22C55E' : colors.textTertiary }, done && styles.checked]}>
            {done ? <Text style={styles.checkMark}>✓</Text> : null}
          </Pressable>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text
            style={[
              styles.label,
              { color: done ? colors.textTertiary : colors.text },
              done && styles.labelDone,
            ]}>
            {item.label}
          </Text>
          <Sortable.Handle>
            <Grip color={colors.textTertiary} />
          </Sortable.Handle>
        </View>
      );
    },
    [colors, packed],
  );

  return (
    <DemoStage>
      <Showcase padding="md">
        <ThemedText variant="heading" style={styles.title}>
          Packing list
        </ThemedText>
        <Sortable.Grid
          data={items}
          renderItem={renderItem}
          columns={1}
          rowGap={8}
          customHandle
          dragActivationDelay={0}
          overDrag="vertical"
          onDragEnd={({ data }) => setItems(data)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { paddingHorizontal: 4, paddingBottom: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingLeft: 14,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: '#22C55E' },
  checkMark: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  emoji: { fontSize: 22, lineHeight: 28 },
  label: { flex: 1, fontSize: 16, fontWeight: '500' },
  labelDone: { textDecorationLine: 'line-through' },
  grip: { gap: 4, paddingHorizontal: 16, paddingVertical: 10 },
  gripBar: { width: 20, height: 2.5, borderRadius: 2 },
});
