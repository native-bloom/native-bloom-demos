/**
 * Reanimated Color Picker · Color harmonies
 *
 * `ExtraThumb` adds read-only thumbs to the `Panel3` wheel that follow the
 * main one, offset by `hueTransform` (also `saturationTransform`,
 * `brightnessTransform` or a `colorTransform` worklet). Offsets of 180°,
 * 120° and 240°, or ±30° give complementary, triadic and analogous palettes.
 * Each extra thumb reports its color through an `onChange` worklet, which
 * paints the palette strip on the UI thread.
 *
 * Based on the library's `Panel3 Saturation` example.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, type SharedValue } from 'react-native-reanimated';
import ColorPicker, {
  BrightnessSlider,
  ExtraThumb,
  Panel3,
  type ColorFormatsObject,
} from 'reanimated-color-picker';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const HARMONIES = [
  { value: 'complementary', label: 'Complementary' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'analogous', label: 'Analogous' },
] as const;

type Harmony = (typeof HARMONIES)[number]['value'];

/** Hue offsets of the extra thumbs, in degrees. */
const OFFSETS: Record<Harmony, number[]> = {
  complementary: [180],
  triadic: [120, 240],
  analogous: [-30, 30],
};

function PaletteChip({ color }: { color: SharedValue<string> }) {
  const style = useAnimatedStyle(() => ({ backgroundColor: color.get() }));
  return <Animated.View style={[styles.chip, style]} />;
}

export function HarmoniesDemo() {
  const [harmony, setHarmony] = useState<Harmony>('triadic');
  const [color, setColor] = useState('#3478F6');

  const main = useSharedValue(color);
  const first = useSharedValue(color);
  const second = useSharedValue(color);
  const extras = [first, second];
  const offsets = OFFSETS[harmony];

  function onMainChange(result: ColorFormatsObject) {
    'worklet';
    main.set(result.hex);
  }
  function onFirstChange(result: ColorFormatsObject) {
    'worklet';
    first.set(result.hex);
  }
  function onSecondChange(result: ColorFormatsObject) {
    'worklet';
    second.set(result.hex);
  }
  const extraHandlers = [onFirstChange, onSecondChange];

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={harmony} options={HARMONIES} onChange={setHarmony} />}>
        <ColorPicker
          key={harmony}
          value={color}
          sliderThickness={25}
          thumbSize={30}
          onChange={onMainChange}
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}>
          <Panel3 style={styles.wheel} renderCenterLine adaptSpectrum>
            {offsets.map((offset, i) => (
              <ExtraThumb
                key={offset}
                thumbShape="circle"
                thumbSize={24}
                hueTransform={offset}
                renderCenterLine
                onChange={extraHandlers[i]}
              />
            ))}
          </Panel3>
          <BrightnessSlider style={styles.slider} />
        </ColorPicker>

        <View style={styles.palette}>
          <PaletteChip color={main} />
          {offsets.map((offset, i) => (
            <PaletteChip key={offset} color={extras[i]!} />
          ))}
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 20 },
  wheel: { width: '88%', alignSelf: 'center' },
  slider: { borderRadius: 20 },
  palette: { flexDirection: 'row', gap: 8, marginTop: 20 },
  chip: { flex: 1, height: 48, borderRadius: 14, borderCurve: 'continuous' },
});
