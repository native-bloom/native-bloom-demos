/**
 * Picker · Disabled items
 *
 * Two levels of "no": a sold-out item you can see but not keep, and a locked
 * picker.
 *
 * On Android, `enabled={false}` on a `Picker.Item` or on the `Picker` does
 * this for you. On iOS (2.11, New Architecture) neither prop is wired up,
 * so the demo also does it by hand: `onValueChange` springs the wheel back to
 * the previous size when it lands on a sold-out one, and the locked picker
 * sits in a view with `pointerEvents="none"` and lower opacity.
 */
import { Picker } from '@react-native-picker/picker';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { SwitchRow, Text } from '@/design-system';

const SIZES = [
  { value: 'mini', label: 'Mini · 4 cookies', soldOut: false },
  { value: 'small', label: 'Small · 6 cookies', soldOut: false },
  { value: 'party', label: 'Party · 24 · sold out', soldOut: true },
  { value: 'box', label: 'Gift box · 12 cookies', soldOut: false },
  { value: 'tin', label: 'Holiday tin · sold out', soldOut: true },
];

export function DisabledDemo() {
  const [size, setSize] = useState('small');
  const [locked, setLocked] = useState(false);
  const lastValid = useRef('small');

  function onValueChange(value: string) {
    const item = SIZES.find((s) => s.value === value)!;
    if (!item.soldOut) {
      lastValid.current = value;
      setSize(value);
      return;
    }
    // iOS ignores Picker.Item `enabled`: let the wheel land, then spring back.
    setSize(value);
    requestAnimationFrame(() => setSize(lastValid.current));
  }

  return (
    <DemoStage>
      <Showcase padding="md">
        <View style={styles.header}>
          <Text variant="heading">Cookie order</Text>
          <Text variant="caption" color="textSecondary">
            Sold-out sizes spring back
          </Text>
        </View>
        <View pointerEvents={locked ? 'none' : 'auto'} style={locked && styles.locked}>
          <Picker selectedValue={size} onValueChange={onValueChange} enabled={!locked}>
            {SIZES.map((s) => (
              <Picker.Item key={s.value} label={s.label} value={s.value} enabled={!s.soldOut} />
            ))}
          </Picker>
        </View>
        <SwitchRow label="Order confirmed" value={locked} onValueChange={setLocked} />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { gap: 2, paddingHorizontal: 8, paddingTop: 8 },
  locked: { opacity: 0.4 },
});
