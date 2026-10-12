import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { useColors } from '../theme';
import { radius, spacing } from '../tokens';
import { Icon, type IconName } from './icon';
import { ScalePressable } from './pressable';
import { Text } from './text';

export type ChipProps = {
  label: string;
  emoji?: string;
  icon?: IconName;
  selected?: boolean;
  onPress?: () => void;
  /** `tonal` is the muted grey pill from the Discover screen, `outline` a bordered white pill. */
  variant?: 'tonal' | 'outline';
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
};

/** Rounded pill chip with an optional leading emoji — the "Discover" suggestion style. */
export function Chip({
  label,
  emoji,
  icon,
  selected = false,
  onPress,
  variant = 'tonal',
  size = 'md',
  style,
}: ChipProps) {
  const colors = useColors();
  const bg = selected ? colors.inverse : variant === 'tonal' ? colors.surfaceMuted : colors.surface;
  const fg = selected ? 'onInverse' : 'text';

  return (
    <ScalePressable
      onPress={onPress}
      disabled={!onPress}
      haptics={!!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      style={[
        styles.base,
        size === 'sm' ? styles.sm : styles.md,
        {
          backgroundColor: bg,
          borderColor: variant === 'outline' && !selected ? colors.border : 'transparent',
        },
        style,
      ]}>
      {emoji ? (
        <Text variant={size === 'sm' ? 'caption' : 'label'} color={fg}>
          {emoji}
        </Text>
      ) : icon ? (
        <Icon name={icon} size={size === 'sm' ? 12 : 14} color={fg} />
      ) : null}
      <Text variant={size === 'sm' ? 'caption' : 'label'} color={fg} numberOfLines={1}>
        {label}
      </Text>
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    borderRadius: radius.pill,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
  },
  md: { paddingHorizontal: spacing.md + 2, height: 36 },
  sm: { paddingHorizontal: spacing.md, height: 28 },
});
