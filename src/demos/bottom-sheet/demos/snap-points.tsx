/**
 * Bottom Sheet · Snap points
 *
 * A plain `<BottomSheet>` is always on screen, resting at the snap point given
 * by `index`. `snapPoints` take percentages of the container or point values.
 * Move it from code with `snapToIndex`, `expand` (last point), `collapse`
 * (first point) and `close`; `onChange` reports the index it settled on (-1
 * when closed). `enableDynamicSizing={false}` keeps it to these points only
 * (v5 adds a content-sized point by default).
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { IconTile, Text, spacing, useColors } from '@/design-system';

const SNAP_POINTS = ['25%', '50%', '70%'];
const LABELS = ['A quarter', 'Half', 'Most of the screen'];

export function SnapPointsDemo() {
  const colors = useColors();
  const sheet = useRef<BottomSheet>(null);
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.fill}>
      <DemoStage align="top">
        <TriggerStack>
          <Trigger
            tone="primary"
            emoji="⬆️"
            label="Expand"
            onPress={() => sheet.current?.expand()}
          />
          <Trigger emoji="↕️" label="Snap to half" onPress={() => sheet.current?.snapToIndex(1)} />
          <Trigger emoji="⬇️" label="Collapse" onPress={() => sheet.current?.collapse()} />
          <Trigger emoji="✖️" label="Close" onPress={() => sheet.current?.close()} />
        </TriggerStack>
      </DemoStage>

      <BottomSheet
        accessible={false}
        ref={sheet}
        index={0}
        snapPoints={SNAP_POINTS}
        enableDynamicSizing={false}
        style={styles.shadow}
        onChange={setIndex}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textTertiary }}>
        <BottomSheetView style={styles.content}>
          <IconTile emoji="🍵" color="#EEF6E2" size={52} />
          <View style={styles.text}>
            <Text variant="heading">Plentea Matcha</Text>
            <Text color="textSecondary">
              {index >= 0 ? `${LABELS[index]} · snap point ${index}` : 'Closed'}
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  // The sheet has no shadow of its own; this lifts its edge off the light canvas.
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  text: { flex: 1, gap: 2 },
});
