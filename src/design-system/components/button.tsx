import { ActivityIndicator, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useColors } from '../theme';
import { radius, shadow, spacing, type ColorToken } from '../tokens';
import { Icon, type IconName } from './icon';
import { ScalePressable, type ScalePressableProps } from './pressable';
import { Text } from './text';

export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'accent' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<ScalePressableProps, 'children' | 'style'> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  /** Leading emoji, rendered instead of `icon` when both are given. */
  emoji?: string;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

const sizes: Record<
  ButtonSize,
  { height: number; paddingHorizontal: number; font: 'label' | 'bodyStrong' }
> = {
  sm: { height: 36, paddingHorizontal: spacing.lg, font: 'label' },
  md: { height: 46, paddingHorizontal: spacing.xl, font: 'bodyStrong' },
  lg: { height: 54, paddingHorizontal: spacing['2xl'], font: 'bodyStrong' },
};

/**
 * Pill button. `primary` is the black Bond-style CTA, `secondary` a white
 * floating pill, `soft` a muted grey pill, `accent` the blue connect button.
 */
export function Button({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  emoji,
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const colors = useColors();
  const s = sizes[size];

  const look: Record<
    ButtonVariant,
    { bg: string; fg: ColorToken; border?: string; elevated?: boolean }
  > = {
    primary: { bg: colors.inverse, fg: 'onInverse' },
    secondary: { bg: colors.surface, fg: 'text', elevated: true },
    soft: { bg: colors.surfaceMuted, fg: 'text' },
    accent: { bg: colors.accent, fg: 'onAccent' },
    ghost: { bg: 'transparent', fg: 'accent' },
    danger: { bg: colors.danger, fg: 'onAccent' },
  };
  const l = look[variant];
  const isDisabled = disabled || loading;

  return (
    <ScalePressable
      {...rest}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        styles.base,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          backgroundColor: l.bg,
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        l.elevated && shadow.card,
        style,
      ]}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={colors[l.fg]} />
        ) : emoji ? (
          <Text variant={s.font} color={l.fg}>
            {emoji}
          </Text>
        ) : icon ? (
          <Icon name={icon} size={size === 'sm' ? 14 : 16} color={l.fg} />
        ) : null}
        <Text variant={s.font} color={l.fg} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
