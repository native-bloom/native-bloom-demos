/**
 * Reanimated Color Picker · Color input
 *
 * `InputWidget` adds text fields for an exact value. The arrow button cycles
 * through HEX, RGB, HSL, HWB and HSV (`formats` limits the list,
 * `defaultFormat` picks the first). Typing moves the panel and sliders, and
 * dragging updates the fields.
 *
 * The stage keeps the picker above the keyboard with
 * react-native-keyboard-controller (`DemoStage avoidKeyboard`).
 *
 * Based on the library's `Panel2 HSL Saturation` example.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ColorPicker, {
  InputWidget,
  LuminanceSlider,
  OpacitySlider,
  Panel2,
} from 'reanimated-color-picker';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';

export function ColorInputDemo() {
  const colors = useColors();
  const [color, setColor] = useState('#3478F6');

  return (
    <DemoStage avoidKeyboard>
      <Showcase>
        <ColorPicker
          value={color}
          sliderThickness={25}
          thumbSize={30}
          thumbShape="rect"
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}
          adaptSpectrum>
          <Panel2 style={styles.panel} thumbShape="ring" verticalChannel="hsl-saturation" />
          <LuminanceSlider style={styles.slider} />
          <OpacitySlider style={styles.slider} />
          <InputWidget
            defaultFormat="HEX"
            formats={['HEX', 'RGB', 'HSL']}
            inputStyle={[styles.input, { color: colors.text, borderColor: colors.border }]}
            inputTitleStyle={[styles.inputTitle, { color: colors.textSecondary }]}
            iconColor={colors.textSecondary}
            inputProps={{ autoCapitalize: 'none' }}
          />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 18 },
  panel: { height: 170, borderRadius: 16 },
  slider: { borderRadius: 20 },
  input: { fontSize: 15, borderRadius: 10, paddingVertical: 8 },
  inputTitle: { fontSize: 12, fontWeight: '600' },
});
