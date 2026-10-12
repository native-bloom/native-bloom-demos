import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme';
import { spacing } from '../tokens';
import { Header, type HeaderProps } from './header';

export type ScreenProps = {
  children: ReactNode;
  /** Header configuration. Pass `null` to render no header. */
  header?: HeaderProps | null;
  /** Use a plain View instead of a ScrollView (for screens that manage their own list). */
  scroll?: boolean;
  /** Extra props forwarded to the ScrollView. */
  scrollProps?: Omit<ScrollViewProps, 'children'>;
  /** Pinned content rendered above the safe-area bottom inset (e.g. a CTA). */
  footer?: ReactNode;
  /** With `scroll={false}`: render children edge to edge, without padding or gaps. */
  bleed?: boolean;
};

/**
 * Canvas + header + padded, scrollable body. Every route renders inside one.
 */
export function Screen({
  children,
  header,
  scroll = true,
  scrollProps,
  footer,
  bleed = false,
}: ScreenProps) {
  const { colors, scheme } = useTheme();
  const insets = useSafeAreaInsets();

  const body = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
      {...scrollProps}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + spacing['3xl'] + (footer ? 72 : 0) },
        scrollProps?.contentContainerStyle,
      ]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[!bleed && styles.content, { flex: 1 }]}>{children}</View>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.canvas }]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      {header === null ? null : <Header {...(header ?? {})} />}
      {body}
      {footer ? (
        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>{footer}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing['2xl'] },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});
