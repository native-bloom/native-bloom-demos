/**
 * Segmented Control · Icon segments
 *
 * `values` also takes images (`require('./icon.png')`). On iOS they are
 * template images: only the shape is used and the system tints it, so draw
 * them black on transparent and ship @2x and @3x files. Text and images can be
 * mixed in one control.
 *
 * The bundled types only declare `values: string[]`, so image values need a
 * cast. The icons live in `assets/demos/segmented/`.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const ICONS = [
  require('@/assets/demos/segmented/list.png'),
  require('@/assets/demos/segmented/grid.png'),
  require('@/assets/demos/segmented/map.png'),
  require('@/assets/demos/segmented/heart.png'),
] as unknown as string[];

const LABELS = ['List view', 'Grid view', 'Map view', 'Favourites'];

export function IconsDemo() {
  const [index, setIndex] = useState(0);

  return (
    <DemoStage>
      <Showcase>
        <SegmentedControl
          values={ICONS}
          selectedIndex={index}
          onChange={(event) => setIndex(event.nativeEvent.selectedSegmentIndex)}
          style={styles.control}
        />
        <View style={styles.label}>
          <Text variant="heading">{LABELS[index]}</Text>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  control: { height: 40 },
  label: { alignItems: 'center', paddingTop: 20 },
});
