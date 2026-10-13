/**
 * Reanimated Color Picker · Color wheel
 *
 * `Panel3` is a hue wheel: the angle picks the hue, the distance from the
 * centre picks a second channel set by `centerChannel` (`saturation`,
 * `hsl-saturation` or `brightness`). A slider underneath covers the channel
 * the wheel does not, so every color stays reachable.
 *
 * Based on the library's `Panel3 Saturation / HSL Saturation / Brightness`
 * examples.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ColorPicker, {
  BrightnessSlider,
  LuminanceSlider,
  OpacitySlider,
  Panel3,
  Preview,
  SaturationSlider,
} from 'reanimated-color-picker';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const CHANNELS = [
  { value: 'saturation', label: 'Saturation' },
  { value: 'hsl-saturation', label: 'HSL' },
  { value: 'brightness', label: 'Brightness' },
] as const;

type Channel = (typeof CHANNELS)[number]['value'];

export function ColorWheelDemo() {
  const [channel, setChannel] = useState<Channel>('saturation');
  const [color, setColor] = useState('#FF2D78');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={channel} options={CHANNELS} onChange={setChannel} />}>
        <ColorPicker
          key={channel}
          value={color}
          sliderThickness={25}
          thumbSize={28}
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}
          boundedThumb>
          <Preview style={styles.preview} hideInitialColor />
          <Panel3 style={styles.wheel} centerChannel={channel} />
          {/* The slider for the channel the wheel leaves out. */}
          {channel === 'brightness' ? (
            <SaturationSlider style={styles.slider} />
          ) : channel === 'hsl-saturation' ? (
            <LuminanceSlider style={styles.slider} />
          ) : (
            <BrightnessSlider style={styles.slider} />
          )}
          <OpacitySlider style={styles.slider} />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  preview: { height: 40, borderRadius: 14 },
  wheel: { width: '84%', alignSelf: 'center' },
  slider: { borderRadius: 20 },
});
