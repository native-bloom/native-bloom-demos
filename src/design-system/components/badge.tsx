import { StyleSheet, View } from 'react-native';

import { useColors } from '../theme';
import { radius, spacing } from '../tokens';
import { Text } from './text';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'inverse';

export type BadgeProps = { label: string; tone?: BadgeTone };

/** Tiny status pill (e.g. "Accepted", "Basic", "Advanced"). */
export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const colors = useColors();
  const bg = {
    neutral: colors.surfaceMuted,
    accent: colors.accentSoft,
    success: colors.success + '22',
    warning: colors.warning + '22',
    danger: colors.danger + '22',
    inverse: colors.inverse,
  }[tone];
  const fg = {
    neutral: colors.textSecondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    inverse: colors.onInverse,
  }[tone];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text variant="caption" style={{ color: fg }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
});
