/**
 * Reanimated Color Picker · Vertical sliders
 *
 * Every slider takes `vertical` (and `reverse`, so the high end is at the
 * top). Give a vertical slider a `height` in its style; its `sliderThickness`
 * becomes the width. Here they stand side by side like a mixing desk.
 *
 * Based on the library's `RGB / HSB / HSL Vertical` examples.
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
  Preview,
  RedSlider,
  SaturationSlider,
} from 'reanimated-color-picker';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';

const MODELS = [
  { value: 'rgb', label: 'RGB' },
  { value: 'hsb', label: 'HSB' },
  { value: 'hsl', label: 'HSL' },
] as const;

type Model = (typeof MODELS)[number]['value'];

function Column({ label, color, children }: { label: string; color: string; children: ReactNode }) {
  return (
    <View style={styles.column}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      {children}
    </View>
  );
}

export function VerticalSlidersDemo() {
  const colors = useColors();
  const [model, setModel] = useState<Model>('rgb');
  const [color, setColor] = useState('#A855F7');
  const label = colors.textSecondary;

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={model} options={MODELS} onChange={setModel} />}>
        <ColorPicker
          key={model}
          value={color}
          sliderThickness={36}
          thumbSize={32}
          thumbShape="circle"
          thumbAnimationDuration={100}
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}
          adaptSpectrum
          boundedThumb>
          <Preview style={styles.preview} textStyle={styles.previewText} colorFormat="rgba" hideInitialColor />
          <View style={styles.row}>
            {model === 'rgb' ? (
              <>
                <Column label="R" color={label}>
                  <RedSlider style={styles.slider} vertical reverse />
                </Column>
                <Column label="G" color={label}>
                  <GreenSlider style={styles.slider} vertical reverse />
                </Column>
                <Column label="B" color={label}>
                  <BlueSlider style={styles.slider} vertical reverse />
                </Column>
              </>
            ) : (
              <>
                <Column label="H" color={label}>
                  <HueSlider style={styles.slider} vertical reverse />
                </Column>
                <Column label="S" color={label}>
                  {model === 'hsb' ? (
                    <SaturationSlider style={styles.slider} vertical reverse />
                  ) : (
                    <HSLSaturationSlider style={styles.slider} vertical reverse />
                  )}
                </Column>
                <Column label={model === 'hsb' ? 'B' : 'L'} color={label}>
                  {model === 'hsb' ? (
                    <BrightnessSlider style={styles.slider} vertical reverse />
                  ) : (
                    <LuminanceSlider style={styles.slider} vertical reverse />
                  )}
                </Column>
              </>
            )}
            <Column label="A" color={label}>
              <OpacitySlider style={styles.slider} vertical reverse />
            </Column>
          </View>
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  preview: { height: 44, borderRadius: 14 },
  previewText: { fontSize: 13, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  column: { alignItems: 'center', gap: 8 },
  label: { fontSize: 13, fontWeight: '700' },
  slider: { height: 280, borderRadius: 20 },
});
