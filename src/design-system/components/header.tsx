import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '../theme';
import { spacing } from '../tokens';
import { Icon, type IconName } from './icon';
import { ScalePressable } from './pressable';
import { Text } from './text';

export type HeaderProps = {
  title?: string;
  /** Small grey line under the title (e.g. "5 memories"). */
  subtitle?: string;
  /** Show the round back chip. Defaults to `true` when the router can go back. */
  back?: boolean;
  /** Replace the title with custom content (e.g. the wordmark). */
  center?: ReactNode;
  right?: ReactNode;
  /** Render without the top safe-area inset (for modals). */
  inset?: boolean;
};

/** Round grey icon chip used for header actions. */
export function HeaderButton({
  icon,
  onPress,
  label,
}: {
  icon: IconName;
  onPress?: () => void;
  label: string;
}) {
  const colors = useColors();
  return (
    <ScalePressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={[styles.chip, { backgroundColor: colors.surfaceMuted }]}>
      <Icon name={icon} size={16} />
    </ScalePressable>
  );
}

/**
 * Bond-style screen header: round back chip on the left, centred title,
 * optional right action. Rendered inside the screen instead of the native bar
 * so the look stays identical on every platform.
 */
export function Header({ title, subtitle, back, center, right, inset = true }: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const showBack = back ?? router.canGoBack();

  return (
    <View style={[styles.header, { paddingTop: (inset ? insets.top : 0) + spacing.sm }]}>
      <View style={styles.side}>
        {showBack ? <HeaderButton icon="back" label="Back" onPress={() => router.back()} /> : null}
      </View>
      <View style={styles.center}>
        {center ?? (
          <>
            {title ? (
              <Text variant="heading" align="center" numberOfLines={1}>
                {title}
              </Text>
            ) : null}
            {subtitle ? (
              <Text variant="caption" color="textSecondary" align="center" numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </>
        )}
      </View>
      <View style={[styles.side, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    minHeight: 52,
  },
  side: { width: 44, justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 1 },
  chip: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
