/**
 * Slider · Slider colors
 *
 * `minimumTrackTintColor` colors the filled part (left of the thumb),
 * `maximumTrackTintColor` the rest, and `thumbTintColor` the thumb itself.
 */
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const LOOKS = [
  { value: 'system', label: 'System' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'matcha', label: 'Matcha' },
  { value: 'night', label: 'Night' },
] as const;

type Look = (typeof LOOKS)[number]['value'];

const COLORS: Record<Look, { min?: string; max?: string; thumb?: string }> = {
  system: {},
  strawberry: { min: '#FF2D78', max: '#FFD1E0', thumb: '#FF2D78' },
  matcha: { min: '#5DA05A', max: '#DCEFD6', thumb: '#2F6B31' },
  night: { min: '#A855F7', max: '#3A3A40', thumb: '#F5F3FF' },
};

export function ColorsDemo() {
  const [look, setLook] = useState<Look>('strawberry');
  const [value, setValue] = useState(0.6);
  const c = COLORS[look];

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={look} options={LOOKS} onChange={setLook} />}>
        <Text variant="heading" align="center">
          {Math.round(value * 100)}% sweet
        </Text>
        <Slider
          key={look}
          style={styles.slider}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor={c.min}
          maximumTrackTintColor={c.max}
          thumbTintColor={c.thumb}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  slider: { height: 44, marginTop: 12 },
});
