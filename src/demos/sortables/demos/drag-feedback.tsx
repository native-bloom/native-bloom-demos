/**
 * React Native Sortables · Custom drag feedback
 *
 * Two layers of feedback. Props on the sortable style every item:
 * `activeItemScale`, `activeItemShadowOpacity`, `inactiveItemOpacity` and
 * `inactiveItemScale` (the tiles you are not holding shrink and fade).
 * Inside the item, `useItemContext()` exposes shared values for its own
 * state: `activationAnimationProgress` (0 → 1 while the long press lifts it)
 * drives the color, and `isActive` tilts it while held.
 */
import { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Sortable, { useItemContext, type SortableGridRenderItem } from 'react-native-sortables';

import { DemoStage, Showcase } from '@/demos/_shared/stage';

type Tile = { id: string; emoji: string; soft: string; bold: string };

const TILES: Tile[] = [
  { id: '1', emoji: '🍓', soft: '#FFE1E1', bold: '#FF5C7A' },
  { id: '2', emoji: '🍵', soft: '#EEF6E2', bold: '#5DBB63' },
  { id: '3', emoji: '🍪', soft: '#FFF1DB', bold: '#F2A541' },
  { id: '4', emoji: '🫐', soft: '#E8F0FF', bold: '#5B7CFA' },
  { id: '5', emoji: '🍩', soft: '#F6E8FF', bold: '#B26BFF' },
  { id: '6', emoji: '🥐', soft: '#FFF6E0', bold: '#E9A23B' },
];

function FeedbackTile({ item }: { item: Tile }) {
  const { activationAnimationProgress, isActive } = useItemContext();

  const style = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      activationAnimationProgress.get(),
      [0, 1],
      [item.soft, item.bold],
    ),
    transform: [{ rotate: withSpring(isActive.get() ? '-6deg' : '0deg') }],
  }));

  return (
    <Animated.View style={[styles.tile, style]}>
      <Text style={styles.emoji}>{item.emoji}</Text>
    </Animated.View>
  );
}

export function DragFeedbackDemo() {
  const [tiles, setTiles] = useState(TILES);

  const renderItem = useCallback<SortableGridRenderItem<Tile>>(
    ({ item }) => <FeedbackTile item={item} />,
    [],
  );

  return (
    <DemoStage>
      <Showcase padding="lg">
        <Sortable.Grid
          data={tiles}
          renderItem={renderItem}
          columns={2}
          rowGap={12}
          columnGap={12}
          activeItemScale={1.12}
          activeItemShadowOpacity={0.3}
          inactiveItemOpacity={0.45}
          inactiveItemScale={0.92}
          onDragEnd={({ data }) => setTiles(data)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  tile: {
    height: 110,
    borderRadius: 24,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 46, lineHeight: 54 },
});
