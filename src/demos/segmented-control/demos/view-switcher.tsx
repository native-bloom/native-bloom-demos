/**
 * Segmented Control · List and grid toggle
 *
 * A small icon-only control in the corner switches a photo album between a
 * list and a grid, like the Files or Photos apps. Icon values are template
 * images (`assets/demos/segmented/`); the bundled types only declare
 * `string[]`, so they need a cast. The layout change animates with
 * Reanimated's `LinearTransition`.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { stickerArt } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage } from '@/demos/_shared/stage';
import { Text, radius, spacing, useColors } from '@/design-system';

const LAYOUT_ICONS = [
  require('@/assets/demos/segmented/list.png'),
  require('@/assets/demos/segmented/grid.png'),
] as unknown as string[];

const ITEMS = [
  { id: '1', title: 'Laptop stickers', meta: 'Saturday · 24 photos', art: stickerArt.tileCode },
  { id: '2', title: 'Surf trip', meta: 'Friday · 6 photos', art: stickerArt.tileSurf },
  { id: '3', title: 'Skate park', meta: 'Thursday · 11 photos', art: stickerArt.tileSkate },
  { id: '4', title: 'Rubber duck club', meta: 'Tuesday · 9 photos', art: stickerArt.tileDuck },
];

const layout = LinearTransition.duration(280);

export function ViewSwitcherDemo() {
  const colors = useColors();
  const [grid, setGrid] = useState(false);

  return (
    <DemoStage align="top">
      <View style={styles.header}>
        <Text variant="title">Albums</Text>
        <SegmentedControl
          values={LAYOUT_ICONS}
          selectedIndex={grid ? 1 : 0}
          onChange={(e) => setGrid(e.nativeEvent.selectedSegmentIndex === 1)}
          style={styles.toggle}
        />
      </View>

      <Animated.View layout={layout} style={grid ? styles.grid : styles.list}>
        {ITEMS.map((item) => (
          <Animated.View
            key={item.id}
            layout={layout}
            style={[grid ? styles.tile : styles.row, { backgroundColor: colors.surface }]}>
            <Animated.View layout={layout} style={grid ? styles.tilePhoto : styles.rowPhoto}>
              <Picture
                art={item.art}
                style={[styles.fill, grid ? styles.tileArt : styles.rowArt]}
              />
            </Animated.View>
            <View style={grid ? styles.tileText : styles.rowText}>
              <Text variant="bodyStrong" numberOfLines={1}>
                {item.title}
              </Text>
              <Text variant="caption" color="textSecondary">
                {item.meta}
              </Text>
            </View>
          </Animated.View>
        ))}
      </Animated.View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggle: { width: 104 },
  list: { gap: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
  },
  rowPhoto: { width: 64, height: 64, borderRadius: radius.md, overflow: 'hidden' },
  rowText: { flex: 1 },
  tile: {
    width: '47.5%',
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  tilePhoto: { width: '100%', aspectRatio: 1 },
  tileText: { padding: spacing.md },
  fill: { width: '100%', height: '100%' },
  rowArt: { borderRadius: radius.md },
  tileArt: { borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
});
