/**
 * Picker · Picker
 *
 * A controlled picker: `selectedValue` plus `onValueChange(value, index)`,
 * with one `Picker.Item` (label and value) per option. Values can be strings,
 * numbers or objects. iOS renders an inline wheel; Android renders a spinner
 * that opens a dialog (or a dropdown with `mode="dropdown"`).
 */
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const CAFES = [
  { value: 'plentea', label: '🍵  Plentea Matcha', note: 'Ceremonial matcha by the pier' },
  { value: 'kettl', label: '🫖  Kettl Greenpoint', note: 'Hojicha and mochi' },
  { value: 'neighbors', label: '🥐  Neighbors Café', note: 'Croissants, fresh at 8' },
  { value: 'blue-door', label: '🥯  Blue Door Bakery', note: 'Cinnamon buns' },
  { value: 'sunny', label: '🥞  Sunny Side', note: 'Pancakes all day' },
];

export function BasicDemo() {
  const [cafe, setCafe] = useState('kettl');
  const selected = CAFES.find((c) => c.value === cafe)!;

  return (
    <DemoStage>
      <Showcase>
        <Text variant="caption" color="textSecondary" align="center">
          MEET SAM AT
        </Text>
        <Picker selectedValue={cafe} onValueChange={(value) => setCafe(value)}>
          {CAFES.map((c) => (
            <Picker.Item key={c.value} label={c.label} value={c.value} />
          ))}
        </Picker>
        <View style={styles.note}>
          <Text color="textSecondary" align="center">
            {selected.note}
          </Text>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  note: { paddingTop: 4 },
});
