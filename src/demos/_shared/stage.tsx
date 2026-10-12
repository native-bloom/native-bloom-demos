/**
 * Layout primitives every demo is built from. They keep demos visually
 * identical and free of noise so each one can be recorded as a clean video.
 * DESIGN.md › Stages explains when to use which.
 *
 * - `DemoStage`    — fills the screen under the header and centres its content.
 * - `TriggerStack` — centred column of triggers (isolated demos).
 * - `Trigger`      — the tonal emoji pill (Bond "Discover" suggestion style).
 * - `Showcase`     — one component in focus on a white card (showcase demos).
 * - `VariantBar`   — centred chip row that switches a showcase between variants.
 * - `StageHint`    — one short grey line, for the rare demo that needs it.
 */
import { createContext, useContext, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { DemoChrome } from '@/demos/types';
import { Card, ScalePressable, Segmented, Text, radius, spacing, useColors } from '@/design-system';

/** Set by the demo route so stages know whether a header sits above them. */
export const DemoChromeContext = createContext<DemoChrome>('header');

export type DemoStageProps = {
  children: ReactNode;
  /** Pinned to the bottom, above the home indicator (primary actions, toolbars). */
  footer?: ReactNode;
  /** `center` (default) for isolated and showcase demos, `top` for scenario screens. */
  align?: 'center' | 'top';
  /** Drop the horizontal padding for full-bleed scenes. */
  bleed?: boolean;
  /** Scroll the content (long lists, month grids). Implies `align="top"`. */
  scroll?: boolean;
  /**
   * Keep inputs and the footer above the keyboard (text input demos), using
   * react-native-keyboard-controller.
   */
  avoidKeyboard?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function DemoStage({
  children,
  footer,
  align = 'center',
  bleed = false,
  scroll = false,
  avoidKeyboard = false,
  style,
}: DemoStageProps) {
  const insets = useSafeAreaInsets();
  const chrome = useContext(DemoChromeContext);
  const topInset = chrome === 'none' ? insets.top : 0;

  const bodyStyle = [
    styles.body,
    align === 'center' && !scroll ? styles.center : styles.top,
    !bleed && styles.padded,
    { paddingTop: topInset + (align === 'top' || scroll ? spacing.sm : 0) },
    !footer && { paddingBottom: insets.bottom + spacing.lg },
    style,
  ];

  const scrollProps = {
    style: styles.fill,
    contentContainerStyle: bodyStyle,
    keyboardShouldPersistTaps: 'handled' as const,
    keyboardDismissMode: 'interactive' as const,
    showsVerticalScrollIndicator: false,
  };

  // Keyboard handling comes from react-native-keyboard-controller (KeyboardProvider is
  // mounted in the root layout). Scrolling stages scroll the focused input into view;
  // fixed stages shrink above the keyboard. The footer sticks to the keyboard's top edge.
  const body = scroll ? (
    avoidKeyboard ? (
      <KeyboardAwareScrollView {...scrollProps} bottomOffset={spacing['2xl']}>
        {children}
      </KeyboardAwareScrollView>
    ) : (
      <ScrollView {...scrollProps}>{children}</ScrollView>
    )
  ) : (
    <View style={bodyStyle}>{children}</View>
  );

  const footerView = footer ? (
    <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>{footer}</View>
  ) : null;

  if (!avoidKeyboard) {
    return (
      <View style={styles.fill}>
        {body}
        {footerView}
      </View>
    );
  }

  return (
    <View style={styles.fill}>
      {scroll ? (
        body
      ) : (
        <KeyboardAvoidingView behavior="padding" style={styles.fill}>
          {body}
        </KeyboardAvoidingView>
      )}
      {footerView ? (
        // Sits flush on the keyboard; `opened` removes the home-indicator inset the
        // footer reserves while the keyboard is closed.
        <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
          {footerView}
        </KeyboardStickyView>
      ) : null}
    </View>
  );
}

export function TriggerStack({
  children,
  gap = spacing.md,
}: {
  children: ReactNode;
  gap?: number;
}) {
  return <View style={[styles.stack, { gap }]}>{children}</View>;
}

export type TriggerProps = {
  label: string;
  emoji?: string;
  onPress: () => void;
  /** `tonal` grey pill (default) or `primary` black pill. */
  tone?: 'tonal' | 'primary';
};

export function Trigger({ label, emoji, onPress, tone = 'tonal' }: TriggerProps) {
  const colors = useColors();
  const primary = tone === 'primary';
  return (
    <ScalePressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.trigger, { backgroundColor: primary ? colors.inverse : colors.surfaceMuted }]}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text variant="bodyStrong" color={primary ? 'onInverse' : 'text'} numberOfLines={1}>
        {label}
      </Text>
    </ScalePressable>
  );
}

export type ShowcaseProps = {
  children: ReactNode;
  /** Card padding. Use 0 for components that bring their own edges (calendars, maps). */
  padding?: 0 | keyof typeof spacing;
  /** Rendered under the card, e.g. a `VariantBar`. */
  below?: ReactNode;
};

/** One component in focus, on a white card in the middle of the stage. */
export function Showcase({ children, padding = 'xl', below }: ShowcaseProps) {
  return (
    <View style={styles.showcase}>
      <Card padding={padding} style={padding === 0 ? styles.clip : undefined}>
        {children}
      </Card>
      {below}
    </View>
  );
}

export type VariantBarProps<T extends string> = {
  value: T;
  options: readonly { value: T; label: string; emoji?: string }[];
  onChange: (value: T) => void;
};

/** Centred chip row that switches the component on stage between variants. */
export function VariantBar<T extends string>({ value, options, onChange }: VariantBarProps<T>) {
  return (
    <View style={styles.variantBar}>
      <Segmented value={value} options={options} onChange={onChange} wrap size="md" />
    </View>
  );
}

export function StageHint({ children }: { children: string }) {
  return (
    <Text variant="label" color="textTertiary" align="center">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  body: { flexGrow: 1, gap: spacing.xl },
  center: { justifyContent: 'center' },
  top: { justifyContent: 'flex-start' },
  padded: { paddingHorizontal: spacing.lg },
  footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, alignItems: 'center' },
  stack: { alignItems: 'center' },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 48,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    borderCurve: 'continuous',
  },
  emoji: { fontSize: 18, lineHeight: 22 },
  showcase: { gap: spacing.xl },
  clip: { overflow: 'hidden' },
  variantBar: { alignItems: 'center' },
});
