/**
 * Reanimated Color Picker · Square picker
 *
 * The classic picker, composed from parts: `ColorPicker` holds the color and
 * every child edits it. `Panel1` is the saturation and brightness square,
 * `HueSlider` and `OpacitySlider` sit under it, `Swatches` jumps to presets
 * and `PreviewText` prints the live value. `onCompleteJS` fires when the
 * finger lifts.
 *
 * Based on the library's `Panel1` example.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  PreviewText,
  Swatches,
  type ColorFormatsObject,
} from 'reanimated-color-picker';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';

const SWATCHES = ['#FF6B6B', '#FFB224', '#22C55E', '#3478F6', '#A855F7', '#FF2D78'];

export function SquarePickerDemo() {
  const colors = useColors();
  const [color, setColor] = useState('#3478F6');

  // Runs on the JS thread when the finger lifts.
  function onComplete(result: ColorFormatsObject) {
    setColor(result.hex);
  }

  return (
    <DemoStage>
      <Showcase>
        <ColorPicker
          value={color}
          sliderThickness={25}
          thumbSize={24}
          thumbShape="circle"
          onCompleteJS={onComplete}
          style={styles.picker}
          boundedThumb>
          <Panel1 style={styles.panel} />
          <HueSlider style={styles.slider} />
          <OpacitySlider style={styles.slider} />
          <Swatches colors={SWATCHES} style={styles.swatches} swatchStyle={styles.swatch} />
          <PreviewText style={[styles.previewText, { color: colors.textSecondary }]} colorFormat="hex" />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  panel: { height: 220, borderRadius: 16 },
  slider: { borderRadius: 20 },
  swatches: { flexWrap: 'nowrap', justifyContent: 'space-between' },
  swatch: { width: 32, height: 32, borderRadius: 16, margin: 0, marginHorizontal: 0, marginBottom: 0 },
  previewText: { fontSize: 15, fontWeight: '600' },
});
