/**
 * Picker · Light and dark wheels
 *
 * The iOS wheel follows the system appearance. When it sits on a surface that
 * doesn't change with the theme, force it with `PickerIOS` and
 * `themeVariant="light"` or `"dark"`. iOS only; on Android use the spinner's
 * `style` and `dropdownIconColor`.
 */
import { PickerIOS } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DemoStage } from '@/demos/_shared/stage';
import { radius, shadow, spacing } from '@/design-system';

const MOODS = ['☀️ Sunny brunch', '🌧️ Rainy café', '🌙 Late-night ramen', '🍓 Berry picking'];

function Wheel({
  variant,
  value,
  onChange,
}: {
  variant: 'light' | 'dark';
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <PickerIOS
      themeVariant={variant}
      selectedValue={value}
      onValueChange={(v) => onChange(String(v))}
      itemStyle={styles.item}>
      {MOODS.map((m) => (
        <PickerIOS.Item key={m} label={m} value={m} />
      ))}
    </PickerIOS>
  );
}

export function ThemeDemo() {
  const [light, setLight] = useState(MOODS[0]!);
  const [dark, setDark] = useState(MOODS[2]!);

  return (
    <DemoStage>
      <View style={[styles.card, styles.lightCard]}>
        <Text style={[styles.label, { color: '#6E6E75' }]}>Always light</Text>
        <Wheel variant="light" value={light} onChange={setLight} />
      </View>
      <View style={[styles.card, styles.darkCard]}>
        <Text style={[styles.label, { color: '#A1A1A8' }]}>Always dark</Text>
        <Wheel variant="dark" value={dark} onChange={setDark} />
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, borderRadius: radius.lg, borderCurve: 'continuous', ...shadow.card },
  lightCard: { backgroundColor: '#FFFFFF' },
  darkCard: { backgroundColor: '#151517' },
  label: { fontSize: 13, fontWeight: '600' },
  item: { height: 150, fontSize: 20 },
});
