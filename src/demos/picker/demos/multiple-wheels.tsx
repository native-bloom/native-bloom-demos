/**
 * Picker · Multiple wheels
 *
 * Wheels side by side, like the iOS Clock timer: each `Picker` is
 * independent, so give each a `flex` width in a row and combine their values.
 * Numbers work as item values; labels are what the wheel shows.
 */
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const HOURS = Array.from({ length: 4 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

export function MultipleWheelsDemo() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const total = hours * 60 + minutes;

  return (
    <DemoStage>
      <Showcase>
        <Text variant="caption" color="textSecondary" align="center">
          🍪 BAKING TIMER
        </Text>
        <View style={styles.row}>
          <Picker
            style={styles.wheel}
            selectedValue={hours}
            onValueChange={(value) => setHours(value)}>
            {HOURS.map((h) => (
              <Picker.Item key={h} label={`${h} hr`} value={h} />
            ))}
          </Picker>
          <Picker
            style={styles.wheel}
            selectedValue={minutes}
            onValueChange={(value) => setMinutes(value)}>
            {MINUTES.map((m) => (
              <Picker.Item key={m} label={`${m} min`} value={m} />
            ))}
          </Picker>
        </View>
        <Text variant="heading" align="center">
          {total === 0 ? 'Pick a time' : `Cookies ready in ${total} minutes`}
        </Text>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  wheel: { flex: 1 },
});
