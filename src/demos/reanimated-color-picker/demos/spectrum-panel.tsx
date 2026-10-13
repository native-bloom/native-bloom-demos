/**
 * Reanimated Color Picker · Spectrum panel
 *
 * `Panel4` shows every hue across, from white at the top through the pure
 * hue to black at the bottom, so one drag reaches almost any color. It cannot
 * show greys between the extremes, so start from a fully saturated color.
 *
 * Based on the library's `Panel4` example.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ColorPicker, { OpacitySlider, Panel4, Preview } from 'reanimated-color-picker';

import { DemoStage, Showcase } from '@/demos/_shared/stage';

export function SpectrumPanelDemo() {
  // A fully saturated, full-brightness color: the range `Panel4` can display.
  const [color, setColor] = useState('#FF2D78');

  return (
    <DemoStage>
      <Showcase>
        <ColorPicker
          value={color}
          sliderThickness={25}
          thumbSize={26}
          thumbShape="circle"
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}>
          <Preview style={styles.preview} textStyle={styles.previewText} colorFormat="hwba" hideInitialColor />
          <Panel4 style={styles.panel} thumbShape="ring" />
          <OpacitySlider style={styles.slider} />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  preview: { height: 44, borderRadius: 14 },
  previewText: { fontSize: 13, fontWeight: '600' },
  panel: { height: 300, borderRadius: 16 },
  slider: { borderRadius: 20 },
});
