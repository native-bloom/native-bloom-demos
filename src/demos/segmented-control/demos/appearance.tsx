/**
 * Segmented Control · Forced appearance
 *
 * By default the control follows the system light or dark mode. `appearance`
 * pins it to `'light'` or `'dark'`, which you need when the control sits on a
 * surface that doesn't change with the theme: a dark photo overlay, or a
 * light card inside a dark screen.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage } from '@/demos/_shared/stage';
import { Text, radius, shadow, spacing } from '@/design-system';

const VALUES = ['Photos', 'Videos', 'Notes'];

export function AppearanceDemo() {
  const [light, setLight] = useState(0);
  const [dark, setDark] = useState(1);

  return (
    <DemoStage>
      <View style={[styles.card, styles.lightCard]}>
        <Text style={styles.lightLabel}>Always light</Text>
        <SegmentedControl
          appearance="light"
          values={VALUES}
          selectedIndex={light}
          onChange={(e) => setLight(e.nativeEvent.selectedSegmentIndex)}
        />
      </View>
      <View style={[styles.card, styles.darkCard]}>
        <Text style={styles.darkLabel}>Always dark</Text>
        <SegmentedControl
          appearance="dark"
          values={VALUES}
          selectedIndex={dark}
          onChange={(e) => setDark(e.nativeEvent.selectedSegmentIndex)}
        />
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.xl,
    gap: spacing.md,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    ...shadow.card,
  },
  lightCard: { backgroundColor: '#FFFFFF' },
  darkCard: { backgroundColor: '#151517' },
  lightLabel: { fontSize: 13, fontWeight: '600', color: '#6E6E75' },
  darkLabel: { fontSize: 13, fontWeight: '600', color: '#A1A1A8' },
});
