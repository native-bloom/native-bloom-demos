/**
 * Segmented Control · Theme setting
 *
 * A settings screen where segmented controls change the app for real: the
 * appearance row switches the whole app between light, dark and the system
 * setting, and the text size row resizes the preview. The native control
 * follows the new theme by itself.
 *
 * Here the theme comes from this app's `useTheme().setMode`; in your app,
 * call `Appearance.setColorScheme('light' | 'dark' | null)` from
 * react-native, or update your own theme store. The demo restores the
 * previous theme when it closes.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, Text, spacing, useColors, useTheme, type ThemeMode } from '@/design-system';

const MODES: { label: string; mode: ThemeMode }[] = [
  { label: 'Light', mode: 'light' },
  { label: 'Dark', mode: 'dark' },
  { label: 'Auto', mode: 'system' },
];

const SIZES = [
  { label: 'Small', fontSize: 14, lineHeight: 19 },
  { label: 'Default', fontSize: 16, lineHeight: 22 },
  { label: 'Large', fontSize: 19, lineHeight: 26 },
];

export function ThemeSettingDemo() {
  const colors = useColors();
  const { mode, setMode } = useTheme();
  const [size, setSize] = useState(1);

  // Put the app's theme back when the demo closes.
  const initialMode = useRef(mode);
  useEffect(() => () => setMode(initialMode.current), [setMode]);

  return (
    <DemoStage align="top">
      <Card padding="lg" style={styles.section}>
        <Text variant="bodyStrong">Appearance</Text>
        <SegmentedControl
          values={MODES.map((m) => m.label)}
          selectedIndex={MODES.findIndex((m) => m.mode === mode)}
          onChange={(e) => setMode(MODES[e.nativeEvent.selectedSegmentIndex]!.mode)}
        />
        <Text variant="bodyStrong" style={styles.spaced}>
          Text size
        </Text>
        <SegmentedControl
          values={SIZES.map((s) => s.label)}
          selectedIndex={size}
          onChange={(e) => setSize(e.nativeEvent.selectedSegmentIndex)}
        />
      </Card>

      <Text variant="label" color="textSecondary" style={styles.previewLabel}>
        PREVIEW
      </Text>
      <Card padding="lg" style={styles.preview}>
        <View style={styles.row}>
          <IconTile emoji="🍪" color="#FFF1DB" />
          <View style={styles.flex}>
            <Text variant="bodyStrong">Sam Lee</Text>
            <Text variant="caption" color="textSecondary">
              Cooking · 19 min ago
            </Text>
          </View>
        </View>
        <Text style={{ color: colors.text, ...SIZES[size]! }}>
          Made cookie dough for the festive treats. Jam cookies tomorrow!
        </Text>
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  spaced: { marginTop: spacing.sm },
  previewLabel: { marginBottom: -spacing.sm, paddingHorizontal: spacing.xs },
  preview: { gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
});
