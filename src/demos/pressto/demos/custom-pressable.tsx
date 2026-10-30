/**
 * Pressto · Custom press animations
 *
 * `createAnimatedPressable` turns one worklet into a pressable component. The
 * worklet receives `progress`, animated from 0 (idle) to 1 (pressed), and
 * returns a style: interpolate it into any transform, shadow or color. The
 * `'worklet'` directive at the top of the function is required. Each tile
 * here is a different pressable made this way.
 */
import { createAnimatedPressable } from 'pressto';
import { StyleSheet, Text, View } from 'react-native';
import { interpolate } from 'react-native-reanimated';

import { DemoStage, Showcase } from '@/demos/_shared/stage';

const PressableRotate = createAnimatedPressable((progress) => {
  'worklet';
  return {
    transform: [{ rotate: `${interpolate(progress, [0, 1], [0, -12])}deg` }],
  };
});

const PressableLift = createAnimatedPressable((progress) => {
  'worklet';
  return {
    transform: [{ translateY: interpolate(progress, [0, 1], [0, -10]) }],
    boxShadow: `0px ${interpolate(progress, [0, 1], [2, 18])}px ${interpolate(progress, [0, 1], [4, 24])}px rgba(0, 0, 0, ${interpolate(progress, [0, 1], [0.06, 0.18])})`,
  };
});

const PressableTilt = createAnimatedPressable((progress) => {
  'worklet';
  return {
    transform: [
      { perspective: 400 },
      { rotateX: `${interpolate(progress, [0, 1], [0, 28])}deg` },
      { scale: interpolate(progress, [0, 1], [1, 0.96]) },
    ],
  };
});

const PressableSquish = createAnimatedPressable((progress) => {
  'worklet';
  return {
    transform: [
      { scaleX: interpolate(progress, [0, 1], [1, 1.12]) },
      { scaleY: interpolate(progress, [0, 1], [1, 0.82]) },
    ],
  };
});

const TILES = [
  { label: 'Rotate', emoji: '🛹', color: '#FFF1DB', Pressable: PressableRotate },
  { label: 'Lift', emoji: '🎈', color: '#E8F0FF', Pressable: PressableLift },
  { label: 'Tilt', emoji: '🏄', color: '#EAF7EE', Pressable: PressableTilt },
  { label: 'Squish', emoji: '🍡', color: '#FFE4EC', Pressable: PressableSquish },
];

export function CustomPressableDemo() {
  return (
    <DemoStage>
      <Showcase padding="lg">
        <View style={styles.grid}>
          {TILES.map(({ label, emoji, color, Pressable }) => (
            <Pressable
              key={label}
              accessibilityLabel={label}
              style={[styles.tile, { backgroundColor: color }]}>
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.label}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  tile: {
    width: '47%',
    flexGrow: 1,
    height: 150,
    borderRadius: 24,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emoji: { fontSize: 44, lineHeight: 52 },
  label: { fontSize: 16, fontWeight: '600', color: '#0B0B0D' },
});
