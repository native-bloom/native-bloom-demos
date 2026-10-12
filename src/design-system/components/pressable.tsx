import { type ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { haptic } from '../haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ScalePressableProps = Omit<PressableProps, 'style' | 'children'> & {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Scale applied while pressed. */
  pressedScale?: number;
  /** Fire a light haptic on press-in. Defaults to `true`. */
  haptics?: boolean;
};

/**
 * Pressable with the springy "shrink on press" feel used across the app.
 */
export function ScalePressable({
  children,
  style,
  pressedScale = 0.97,
  haptics = true,
  onPressIn,
  onPressOut,
  ...rest
}: ScalePressableProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={(e) => {
        scale.set(withSpring(pressedScale));
        if (haptics) haptic.light();
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.set(withSpring(1));
        onPressOut?.(e);
      }}
      style={[animatedStyle, style]}>
      {children}
    </AnimatedPressable>
  );
}
