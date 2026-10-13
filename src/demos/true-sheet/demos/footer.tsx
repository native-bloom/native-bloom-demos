/**
 * True Sheet · Sheet footer
 *
 * `footer` floats at the bottom of the sheet at every detent, so the main
 * action is always in reach while the content above it grows. Pass a
 * `ReactElement` (faster than a component). The sheet height already includes
 * the bottom safe area; pad the footer by the inset so its button clears the
 * home indicator.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Button, IconTile, Text, spacing } from '@/design-system';

const HOURS = [
  ['Mon – Fri', '8:00 – 19:00'],
  ['Saturday', '9:00 – 20:00'],
  ['Sunday', '9:00 – 17:00'],
];

export function FooterDemo() {
  const sheet = useRef<TrueSheet>(null);
  const insets = useSafeAreaInsets();

  const footer = (
    <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.sm }]}>
      <Button label="Reserve a table" fullWidth onPress={() => sheet.current?.dismiss()} />
    </View>
  );

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger tone="primary" emoji="🍵" label="Plentea Matcha" onPress={() => sheet.current?.present()} />
      </TriggerStack>

      <TrueSheet ref={sheet} detents={[0.5, 1]} footer={footer}>
        <View style={styles.content}>
          <View style={styles.place}>
            <IconTile emoji="🍵" color="#EEF6E2" size={52} />
            <View style={styles.flex}>
              <Text variant="heading">Plentea Matcha</Text>
              <Text variant="caption" color="textSecondary">
                Cafe · ★ 4.7 · 60 Furman St, Brooklyn
              </Text>
            </View>
          </View>
          <Text color="textSecondary">
            Ceremonial matcha, hojicha lattes and mochi donuts, five minutes from the pier.
          </Text>
          <View style={styles.hours}>
            {HOURS.map(([day, time]) => (
              <View key={day} style={styles.row}>
                <Text variant="label">{day}</Text>
                <Text variant="label" color="textSecondary">
                  {time}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing.lg },
  place: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  hours: { gap: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  footer: { paddingHorizontal: spacing['2xl'], paddingTop: spacing.sm },
});
