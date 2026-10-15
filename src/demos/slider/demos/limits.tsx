/**
 * Slider · Limits
 *
 * `lowerLimit` and `upperLimit` stop the thumb inside the full range while the
 * track still shows the whole scale. Useful when part of a range exists but
 * isn't allowed right now, like a group size capped by table space.
 */
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text, useColors } from '@/design-system';

const MIN = 1;
const MAX = 12;
const LOWER = 2;
const UPPER = 8;

export function LimitsDemo() {
  const colors = useColors();
  const [guests, setGuests] = useState(4);

  return (
    <DemoStage>
      <Showcase>
        <Text variant="caption" color="textSecondary" align="center">
          PLENTEA MATCHA · SATURDAY
        </Text>
        <Text variant="display" align="center">
          {guests} guests
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={MIN}
          maximumValue={MAX}
          lowerLimit={LOWER}
          upperLimit={UPPER}
          step={1}
          value={guests}
          onValueChange={setGuests}
          minimumTrackTintColor="#3478F6"
        />
        <View style={styles.scale}>
          <Text variant="caption" color="textTertiary">
            {MIN}
          </Text>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Tables for {LOWER}–{UPPER} left
          </Text>
          <Text variant="caption" color="textTertiary">
            {MAX}
          </Text>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  slider: { height: 44, marginTop: 12 },
  scale: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
});
