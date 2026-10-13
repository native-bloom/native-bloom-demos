/**
 * Reanimated Color Picker · Slider picker
 *
 * A picker made only of sliders, one per channel, in the color model your
 * users think in: HSB (`HueSlider`, `SaturationSlider`, `BrightnessSlider`),
 * HSL (`HSLSaturationSlider`, `LuminanceSlider`) or RGB (`RedSlider`,
 * `GreenSlider`, `BlueSlider`). `adaptSpectrum` tints each track with the
 * current color.
 *
 * Based on the library's `HSB / HSL / RGB Horizontal` examples.
 */
import { useState, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColorPicker, {
  BlueSlider,
  BrightnessSlider,
  GreenSlider,
  HSLSaturationSlider,
  HueSlider,
  LuminanceSlider,
  OpacitySlider,
  PreviewText,
  RedSlider,
  SaturationSlider,
} from 'reanimated-color-picker';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';

const MODELS = [
  { value: 'hsb', label: 'HSB' },
  { value: 'hsl', label: 'HSL' },
  { value: 'rgb', label: 'RGB' },
] as const;

type Model = (typeof MODELS)[number]['value'];

function Labelled({ label, color, children }: { label: string; color: string; children: ReactNode }) {
  return (
    <View>
      <Text style={[styles.label, { color }]}>{label}</Text>
      {children}
    </View>
  );
}

export function SliderPickerDemo() {
  const colors = useColors();
  const [model, setModel] = useState<Model>('hsb');
  const [color, setColor] = useState('#FFB224');
  const label = colors.textSecondary;

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={model} options={MODELS} onChange={setModel} />}>
        <ColorPicker
          key={model}
          value={color}
          sliderThickness={25}
          thumbSize={24}
          thumbShape="circle"
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}
          adaptSpectrum
          boundedThumb>
          {model === 'rgb' ? (
            <>
              <Labelled label="Red" color={label}>
                <RedSlider style={styles.slider} />
              </Labelled>
              <Labelled label="Green" color={label}>
                <GreenSlider style={styles.slider} />
              </Labelled>
              <Labelled label="Blue" color={label}>
                <BlueSlider style={styles.slider} />
              </Labelled>
            </>
          ) : (
            <>
              <Labelled label="Hue" color={label}>
                <HueSlider style={styles.slider} />
              </Labelled>
              <Labelled label="Saturation" color={label}>
                {model === 'hsb' ? (
                  <SaturationSlider style={styles.slider} />
                ) : (
                  <HSLSaturationSlider style={styles.slider} />
                )}
              </Labelled>
              <Labelled label={model === 'hsb' ? 'Brightness' : 'Lightness'} color={label}>
                {model === 'hsb' ? (
                  <BrightnessSlider style={styles.slider} />
                ) : (
                  <LuminanceSlider style={styles.slider} />
                )}
              </Labelled>
            </>
          )}
          <Labelled label="Opacity" color={label}>
            <OpacitySlider style={styles.slider} />
          </Labelled>
          <PreviewText
            style={[styles.previewText, { color: colors.text }]}
            colorFormat={model === 'rgb' ? 'rgba' : model === 'hsl' ? 'hsla' : 'hsva'}
          />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, paddingHorizontal: 4 },
  slider: { borderRadius: 20 },
  previewText: { fontSize: 15, fontWeight: '600', marginTop: 4 },
});
