import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useColors } from '../theme';
import { radius, spacing } from '../tokens';
import { Icon } from './icon';
import { ScalePressable } from './pressable';
import { Text } from './text';

export type ListRowProps = {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  /** Render a chevron on the right. Defaults to `true` when `onPress` is set. */
  chevron?: boolean;
  onPress?: () => void;
  /** Draw a hairline above the row. Used when stacking rows inside one card. */
  divider?: boolean;
};

/** A row inside a grouped card: leading visual, title / subtitle, trailing slot. */
export function ListRow({
  title,
  subtitle,
  leading,
  trailing,
  chevron,
  onPress,
  divider,
}: ListRowProps) {
  const colors = useColors();
  const showChevron = chevron ?? !!onPress;

  return (
    <ScalePressable
      onPress={onPress}
      disabled={!onPress}
      haptics={!!onPress}
      pressedScale={0.99}
      accessibilityRole={onPress ? 'button' : undefined}
      style={[
        styles.row,
        divider && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
      ]}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.text}>
        <Text variant="bodyStrong" numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="label" color="textSecondary" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      {showChevron ? <Icon name="forward" size={14} color="textTertiary" /> : null}
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  leading: { alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, gap: 2 },
  trailing: { alignItems: 'flex-end', justifyContent: 'center' },
});
