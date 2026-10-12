import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { useColors } from '../theme';
import { radius, shadow, spacing } from '../tokens';
import { ScalePressable } from './pressable';

export type CardProps = ViewProps & {
  /** `elevated` floats on the canvas, `muted` is the flat grey inset, `outline` is bordered. */
  variant?: 'elevated' | 'flat' | 'muted' | 'outline';
  padding?: keyof typeof spacing | 0;
  radiusSize?: keyof typeof radius;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** White rounded surface — the basic building block of every screen. */
export function Card({
  variant = 'elevated',
  padding = 'lg',
  radiusSize = 'lg',
  onPress,
  style,
  children,
  ...rest
}: CardProps) {
  const colors = useColors();
  const base: ViewStyle = {
    backgroundColor: variant === 'muted' ? colors.surfaceMuted : colors.surface,
    borderRadius: radius[radiusSize],
    borderCurve: 'continuous',
    padding: padding === 0 ? 0 : spacing[padding],
    borderWidth: variant === 'outline' ? StyleSheet.hairlineWidth : 0,
    borderColor: colors.border,
    overflow: 'visible',
  };
  const elevation = variant === 'elevated' ? shadow.card : undefined;

  if (onPress) {
    return (
      <ScalePressable
        onPress={onPress}
        pressedScale={0.985}
        style={[base, elevation, style]}
        {...rest}>
        {children}
      </ScalePressable>
    );
  }
  return (
    <View style={[base, elevation, style]} {...rest}>
      {children}
    </View>
  );
}
