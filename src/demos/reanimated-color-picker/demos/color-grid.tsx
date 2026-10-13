/**
 * Reanimated Color Picker · Color grid
 *
 * `Panel5` is a fixed grid of colors, like the grid in Apple's color picker:
 * tap a cell or drag across it. Its starting value should be one of the grid
 * colors so the selection square lands on a cell. `adaptSpectrum` tints the
 * opacity track with the picked color.
 *
 * Based on the library's `Panel5 Grid` example.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ColorPicker, { OpacitySlider, Panel5, Preview } from 'reanimated-color-picker';

import { DemoStage, Showcase } from '@/demos/_shared/stage';

export function ColorGridDemo() {
  // One of the grid's own colors.
  const [color, setColor] = useState('#ad3e00');

  return (
    <DemoStage>
      <Showcase>
        <ColorPicker
          value={color}
          sliderThickness={25}
          thumbSize={24}
          thumbShape="circle"
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}>
          <Panel5 style={styles.grid} />
          <OpacitySlider style={styles.slider} adaptSpectrum />
          <Preview style={styles.preview} textStyle={styles.previewText} colorFormat="hsla" />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  grid: { borderRadius: 8 },
  slider: { borderRadius: 20 },
  preview: { height: 44, borderRadius: 14 },
  previewText: { fontSize: 13, fontWeight: '600' },
});
