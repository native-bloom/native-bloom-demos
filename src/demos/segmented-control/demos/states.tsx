/**
 * Segmented Control · Momentary and disabled
 *
 * `momentary` turns the control into a row of buttons: a tap highlights the
 * segment for a moment and fires `onValueChange`, but nothing stays selected
 * (iOS only; elsewhere it behaves like a normal control). `enabled={false}`
 * greys the control out and ignores taps while keeping its selection.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

export function StatesDemo() {
  const [reactions, setReactions] = useState<Record<string, number>>({ '❤️': 12, '🔥': 4, '😋': 9 });

  return (
    <DemoStage>
      <Showcase>
        <View style={styles.block}>
          <Text variant="label" color="textSecondary">
            Momentary · react to Sam’s cookies
          </Text>
          <SegmentedControl
            values={Object.keys(reactions)}
            momentary
            onValueChange={(emoji) => setReactions((r) => ({ ...r, [emoji]: (r[emoji] ?? 0) + 1 }))}
          />
          <Text variant="caption" color="textSecondary" align="center">
            {Object.entries(reactions)
              .map(([emoji, count]) => `${emoji} ${count}`)
              .join('    ')}
          </Text>
        </View>

        <View style={[styles.block, styles.divider]}>
          <Text variant="label" color="textSecondary">
            Disabled · voting has closed
          </Text>
          <SegmentedControl values={['Plentea', 'Kettl', 'Neighbors']} selectedIndex={1} enabled={false} />
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  block: { gap: 12 },
  divider: { marginTop: 28 },
});
