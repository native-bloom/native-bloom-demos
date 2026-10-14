/**
 * Segmented Control · Segmented control
 *
 * Pass the labels as `values` and control the choice with `selectedIndex`.
 * `onChange` gives the native event (`nativeEvent.selectedSegmentIndex`),
 * `onValueChange` the selected label. On iOS this is the system
 * UISegmentedControl, so it follows the system look and dark mode; Android and
 * web get a matching JavaScript control.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const RANGES = ['Day', 'Week', 'Month'];
const STATS = [
  { memories: 3, caption: 'memories today' },
  { memories: 18, caption: 'memories this week' },
  { memories: 64, caption: 'memories this month' },
];

export function BasicDemo() {
  const [index, setIndex] = useState(1);
  const stat = STATS[index]!;

  return (
    <DemoStage>
      <Showcase>
        <SegmentedControl
          values={RANGES}
          selectedIndex={index}
          onChange={(event) => setIndex(event.nativeEvent.selectedSegmentIndex)}
        />
        <View style={styles.stat}>
          <Text variant="display">{stat.memories}</Text>
          <Text color="textSecondary">{stat.caption}</Text>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stat: { alignItems: 'center', paddingTop: 28, paddingBottom: 8, gap: 2 },
});
