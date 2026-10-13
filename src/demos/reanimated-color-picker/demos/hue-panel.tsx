/**
 * Reanimated Color Picker · Hue panel
 *
 * `Panel2` lays the hue out horizontally and a second channel vertically,
 * chosen with `verticalChannel`: `saturation`, `hsl-saturation` or
 * `brightness`. Pair it with the slider for the remaining channel.
 *
 * Based on the library's `Panel2 Saturation / HSL Saturation / Brightness`
 * examples.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ColorPicker, {
  BrightnessSlider,
  LuminanceSlider,
  OpacitySlider,
  Panel2,
  PreviewText,
  SaturationSlider,
} from 'reanimated-color-picker';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';

const CHANNELS = [
  { value: 'saturation', label: 'Saturation' },
  { value: 'hsl-saturation', label: 'HSL' },
  { value: 'brightness', label: 'Brightness' },
] as const;

type Channel = (typeof CHANNELS)[number]['value'];

export function HuePanelDemo() {
  const colors = useColors();
  const [channel, setChannel] = useState<Channel>('saturation');
  const [color, setColor] = useState('#22C55E');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={channel} options={CHANNELS} onChange={setChannel} />}>
        <ColorPicker
          key={channel}
          value={color}
          sliderThickness={25}
          thumbSize={30}
          thumbShape="rect"
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}
          adaptSpectrum>
          <Panel2 style={styles.panel} thumbShape="ring" verticalChannel={channel} />
          {channel === 'brightness' ? (
            <SaturationSlider style={styles.slider} />
          ) : channel === 'hsl-saturation' ? (
            <LuminanceSlider style={styles.slider} />
          ) : (
            <BrightnessSlider style={styles.slider} />
          )}
          <OpacitySlider style={styles.slider} />
          <PreviewText style={[styles.previewText, { color: colors.textSecondary }]} colorFormat="hsla" />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  panel: { height: 240, borderRadius: 16 },
  slider: { borderRadius: 20 },
  previewText: { fontSize: 15, fontWeight: '600' },
});
