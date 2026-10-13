/**
 * Reanimated Color Picker · Circular sliders
 *
 * `HueCircular` and `LuminanceCircular` are ring-shaped sliders that take
 * children: put a panel inside and size it with a percentage width and
 * height. The hue ring wraps the saturation square (`Panel1`); the luminance
 * ring wraps a hue wheel (`Panel3`).
 *
 * Based on the library's `Circular Hue` and `Luminance Circular` examples.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ColorPicker, {
  HueCircular,
  LuminanceCircular,
  Panel1,
  Panel3,
  PreviewText,
  Swatches,
} from 'reanimated-color-picker';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';

const RINGS = [
  { value: 'hue', label: 'Hue ring' },
  { value: 'luminance', label: 'Luminance ring' },
] as const;

type Ring = (typeof RINGS)[number]['value'];

const SWATCHES = ['#FF6B6B', '#FFB224', '#22C55E', '#3478F6', '#A855F7', '#FF2D78'];

export function CircularSlidersDemo() {
  const colors = useColors();
  const [ring, setRing] = useState<Ring>('hue');
  const [color, setColor] = useState('#3478F6');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={ring} options={RINGS} onChange={setRing} />}>
        <ColorPicker
          key={ring}
          value={color}
          sliderThickness={22}
          thumbSize={26}
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}
          adaptSpectrum
          boundedThumb>
          {ring === 'hue' ? (
            <HueCircular containerStyle={styles.ringContainer} thumbShape="pill">
              <Panel1 style={styles.square} />
            </HueCircular>
          ) : (
            <LuminanceCircular
              containerStyle={styles.ringContainer}
              thumbShape="circle"
              thumbInnerStyle={styles.thumbInner}
              thumbScaleAnimationValue={1}>
              <Panel3 style={styles.wheel} centerChannel="hsl-saturation" />
            </LuminanceCircular>
          )}
          <Swatches colors={SWATCHES} style={styles.swatches} swatchStyle={styles.swatch} />
          <PreviewText style={[styles.previewText, { color: colors.textSecondary }]} colorFormat="hsl" />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  ringContainer: { justifyContent: 'center' },
  square: { width: '66%', height: '66%', alignSelf: 'center', borderRadius: 16 },
  wheel: { width: '88%', alignSelf: 'center' },
  thumbInner: { borderWidth: 4 },
  swatches: { flexWrap: 'nowrap', justifyContent: 'space-between' },
  swatch: { width: 32, height: 32, borderRadius: 16, margin: 0, marginHorizontal: 0, marginBottom: 0 },
  previewText: { fontSize: 15, fontWeight: '600' },
});
