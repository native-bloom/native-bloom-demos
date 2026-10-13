/**
 * React Native Sortables · Drop indicator
 *
 * `showDropIndicator` draws a placeholder where the dragged item will land.
 * Restyle it with `dropIndicatorStyle`, or replace it with your own
 * `DropIndicatorComponent`: it receives the default `style` plus shared
 * values such as `activeAnimationProgress`, which fades this dashed slot in
 * as the item lifts.
 */
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Sortable, {
  type DropIndicatorComponentProps,
  type SortableGridRenderItem,
} from 'react-native-sortables';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const LOOKS = [
  { value: 'default', label: 'Default' },
  { value: 'custom', label: 'Dashed slot' },
] as const;

type Look = (typeof LOOKS)[number]['value'];

type Tile = { id: string; emoji: string; color: string };

const TILES: Tile[] = [
  { id: '1', emoji: '🍪', color: '#FFF1DB' },
  { id: '2', emoji: '🍵', color: '#EEF6E2' },
  { id: '3', emoji: '🧁', color: '#FFE4EC' },
  { id: '4', emoji: '🥐', color: '#FFF6E0' },
  { id: '5', emoji: '🍓', color: '#FFE1E1' },
  { id: '6', emoji: '🍩', color: '#F6E8FF' },
  { id: '7', emoji: '🥞', color: '#E8F0FF' },
  { id: '8', emoji: '☕️', color: '#F2E8DE' },
];

/** A dashed slot with a "drop here" label that fades in as the item lifts. */
function DashedSlot({ activeAnimationProgress, style }: DropIndicatorComponentProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: activeAnimationProgress.get(),
    transform: [{ scale: 0.9 + 0.1 * activeAnimationProgress.get() }],
  }));
  return (
    <Animated.View style={[style, styles.slot, animatedStyle]}>
      <Text style={styles.slotText}>Drop here</Text>
    </Animated.View>
  );
}

export function DropIndicatorDemo() {
  const [look, setLook] = useState<Look>('custom');
  const [tiles, setTiles] = useState(TILES);

  const renderItem = useCallback<SortableGridRenderItem<Tile>>(
    ({ item }) => (
      <View style={[styles.tile, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
    ),
    [],
  );

  return (
    <DemoStage>
      <Showcase padding="lg" below={<VariantBar value={look} options={LOOKS} onChange={setLook} />}>
        <Sortable.Grid
          key={look}
          data={tiles}
          renderItem={renderItem}
          columns={4}
          rowGap={10}
          columnGap={10}
          showDropIndicator
          dropIndicatorStyle={look === 'default' ? styles.defaultIndicator : undefined}
          DropIndicatorComponent={look === 'custom' ? DashedSlot : undefined}
          onDragEnd={({ data }) => setTiles(data)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  tile: {
    aspectRatio: 1,
    borderRadius: 16,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 32, lineHeight: 40 },
  defaultIndicator: { borderRadius: 16 },
  slot: {
    backgroundColor: 'rgba(52,120,246,0.08)',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#3478F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotText: { fontSize: 10, fontWeight: '700', color: '#3478F6' },
});
