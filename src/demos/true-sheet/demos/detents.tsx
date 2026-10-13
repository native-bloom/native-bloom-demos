/**
 * True Sheet · Sheet detents
 *
 * `detents` lists up to three sizes the sheet snaps to: `'auto'` (content
 * height), a fraction of the screen (`0.6`), or `1` for full height. Sort them
 * smallest first. `present(index)` opens at a detent, `resize(index)` moves an
 * open sheet, and `onDetentChange` reports every change, including drags.
 */
import { TrueSheet, type DetentChangeEvent } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Chip, IconTile, Text, spacing } from '@/design-system';

const DETENTS = ['auto', 0.6, 1] as const;
const LABELS = ['Small', 'Medium', 'Large'];

export function DetentsDemo() {
  const sheet = useRef<TrueSheet>(null);
  const [index, setIndex] = useState(0);

  function onDetentChange(event: DetentChangeEvent) {
    setIndex(event.nativeEvent.index);
  }

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger emoji="🤏" label="Fit content" onPress={() => sheet.current?.present(0)} />
        <Trigger emoji="🌗" label="60% of the screen" onPress={() => sheet.current?.present(1)} />
        <Trigger emoji="📱" label="Full height" onPress={() => sheet.current?.present(2)} />
      </TriggerStack>

      <TrueSheet
        ref={sheet}
        detents={[...DETENTS]}
        onDidPresent={onDetentChange}
        onDetentChange={onDetentChange}>
        <View style={styles.content}>
          <View style={styles.place}>
            <IconTile emoji="🍵" color="#EEF6E2" size={52} />
            <View style={styles.flex}>
              <Text variant="heading">Plentea Matcha</Text>
              <Text variant="caption" color="textSecondary">
                Cafe · 60 Furman St, Brooklyn
              </Text>
            </View>
          </View>
          <View style={styles.chips}>
            {LABELS.map((label, i) => (
              <Chip
                key={label}
                label={label}
                selected={index === i}
                onPress={() => sheet.current?.resize(i)}
              />
            ))}
          </View>
        </View>
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing.xl },
  place: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  chips: { flexDirection: 'row', gap: spacing.sm },
});
