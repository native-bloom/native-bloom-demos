/**
 * Reanimated Color Picker · Thumb shapes
 *
 * `thumbShape` on `ColorPicker` sets the thumb of every panel and slider
 * inside it (each child can override it). Built-in shapes include `ring`,
 * `circle`, `pill`, `rect`, `line`, `plus`, `hollow` and the triangles.
 * `renderThumb` replaces the thumb with your own Reanimated view: it receives
 * a `positionStyle` to apply, plus `currentColor` and `adaptiveColor` (black
 * or white, whichever contrasts) as shared values.
 */
import { useState } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, type AnimatedStyle } from 'react-native-reanimated';
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  type RenderThumbProps,
  type ThumbShapeType,
} from 'reanimated-color-picker';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const SHAPES = [
  { value: 'ring', label: 'Ring' },
  { value: 'pill', label: 'Pill' },
  { value: 'doubleTriangle', label: 'Triangles' },
  { value: 'custom', label: 'Custom' },
] as const;

type Shape = (typeof SHAPES)[number]['value'];

/** A color bubble: filled with the picked color, outlined in the contrast color. */
function BubbleThumb({ width, height, positionStyle, adaptiveColor, currentColor }: RenderThumbProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: adaptiveColor.get(),
    backgroundColor: currentColor.get(),
  }));

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: width / 2, borderWidth: 3 },
        styles.bubbleShadow,
        animatedStyle,
        // Typed for View, Text and Image thumbs; this one is a View.
        positionStyle as StyleProp<AnimatedStyle<ViewStyle>>,
      ]}
    />
  );
}

export function ThumbShapesDemo() {
  const [shape, setShape] = useState<Shape>('ring');
  const [color, setColor] = useState('#22C55E');
  const custom = shape === 'custom';

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={shape} options={SHAPES} onChange={setShape} />}>
        <ColorPicker
          key={shape}
          value={color}
          sliderThickness={25}
          thumbSize={custom ? 34 : 28}
          thumbShape={custom ? undefined : (shape as ThumbShapeType)}
          renderThumb={custom ? BubbleThumb : undefined}
          onCompleteJS={(result) => setColor(result.hex)}
          style={styles.picker}>
          <Panel1 style={styles.panel} />
          <HueSlider style={styles.slider} />
          <OpacitySlider style={styles.slider} />
        </ColorPicker>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 24 },
  panel: { height: 240, borderRadius: 16 },
  slider: { borderRadius: 20 },
  bubbleShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
