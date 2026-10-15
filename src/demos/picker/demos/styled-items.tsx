/**
 * Picker · Styled items
 *
 * On iOS, `itemStyle` styles every row of the wheel (font size, weight,
 * family, color and the wheel's height), and `selectionColor` tints the
 * selection band. On Android, style the spinner with `style` instead; `itemStyle` and
 * `selectionColor` are iOS only.
 *
 * `Picker.Item` also takes a `color`, but on iOS 2.11 with the New Architecture
 * it's ignored (every row uses `itemStyle.color`), so this demo tints the
 * whole wheel instead.
 */
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const LOOKS = [
  { value: 'default', label: 'Default' },
  { value: 'bold', label: 'Big and bold' },
  { value: 'tinted', label: 'Strawberry' },
  { value: 'serif', label: 'Serif' },
] as const;

type Look = (typeof LOOKS)[number]['value'];

const FLAVORS = [
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'matcha', label: 'Matcha' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'mango', label: 'Mango' },
  { value: 'ube', label: 'Ube' },
];

const ITEM_STYLES = {
  default: undefined,
  bold: { fontSize: 30, fontWeight: '800' as const, height: 200 },
  tinted: { fontSize: 24, fontWeight: '700' as const, color: '#FF2D78' },
  serif: { fontSize: 26, fontFamily: 'Georgia', height: 180 },
};

export function StyledItemsDemo() {
  const [look, setLook] = useState<Look>('tinted');
  const [flavor, setFlavor] = useState('matcha');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={look} options={LOOKS} onChange={setLook} />}>
        <Picker
          key={look}
          selectedValue={flavor}
          onValueChange={(value) => setFlavor(value)}
          itemStyle={ITEM_STYLES[look]}
          selectionColor={look === 'tinted' ? 'rgba(255,45,120,0.12)' : undefined}
          style={styles.picker}>
          {FLAVORS.map((f) => (
            <Picker.Item key={f.value} label={f.label} value={f.value} />
          ))}
        </Picker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { width: '100%' },
});
