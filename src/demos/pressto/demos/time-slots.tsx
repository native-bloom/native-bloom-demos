/**
 * Pressto · Time slot picker
 *
 * Every pressable knows whether it was the last one pressed in its group
 * (`isSelected`). `PressablesConfig` starts a group, so the time slots inside
 * it act like radio buttons with no selection state in React: the worklet
 * animates the selected slot's background, and a child component animates the
 * label color from the `isSelected` shared value. The colors come in through
 * `metadata` so they follow light and dark mode. `onPress` stores the picked
 * time for the booking button. Full slots use `disabled`.
 *
 * Without a `PressablesConfig` (or `PressablesGroup`) around them, all
 * pressables in the app share one group, so pressing any other pressto button
 * would clear the selection.
 */
import {
  createAnimatedPressable,
  PressablesConfig,
  type PressableChildrenCallbackParams,
} from 'pressto';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { places } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Button, Card, IconTile, Text, useColors } from '@/design-system';

type SlotColors = { idle: string; selected: string; text: string; selectedText: string };

const SLOTS = [
  { time: '5:00 PM', full: false },
  { time: '5:30 PM', full: true },
  { time: '6:00 PM', full: false },
  { time: '6:30 PM', full: false },
  { time: '7:00 PM', full: true },
  { time: '7:30 PM', full: false },
  { time: '8:00 PM', full: false },
  { time: '8:30 PM', full: false },
  { time: '9:00 PM', full: false },
];

const Slot = createAnimatedPressable<SlotColors>(
  (progress, { isSelected, metadata, withAnimation }) => {
    'worklet';
    return {
      backgroundColor: withAnimation(isSelected ? metadata.selected : metadata.idle),
      transform: [{ scale: interpolate(progress, [0, 1], [1, 0.94]) }],
    };
  },
);

function SlotLabel({
  time,
  isSelected,
  withAnimation,
  colors,
}: { time: string; colors: SlotColors } & Pick<
  PressableChildrenCallbackParams,
  'isSelected' | 'withAnimation'
>) {
  const label = useAnimatedStyle(() => ({
    color: withAnimation(isSelected.get() ? colors.selectedText : colors.text),
  }));
  return <Animated.Text style={[styles.slotLabel, label]}>{time}</Animated.Text>;
}

export function TimeSlotsDemo() {
  const colors = useColors();
  const [time, setTime] = useState<string | null>(null);
  const kettl = places.find((p) => p.id === 'kettl')!;

  const slotColors: SlotColors = {
    idle: colors.surfaceMuted,
    selected: colors.inverse,
    text: colors.text,
    selectedText: colors.onInverse,
  };

  return (
    <DemoStage
      align="top"
      footer={
        <Button
          label={time ? `Book for ${time}` : 'Pick a time'}
          disabled={!time}
          size="lg"
          fullWidth
        />
      }>
      <Card style={styles.place}>
        <IconTile emoji="🫖" color="#EEF6E2" size={52} />
        <View style={styles.placeText}>
          <Text variant="heading">{kettl.name}</Text>
          <Text variant="label" color="textSecondary">
            {kettl.kind} · ★ {kettl.rating} · Greenpoint
          </Text>
        </View>
      </Card>

      <View style={styles.section}>
        <Text variant="heading">Tonight · Table for 2</Text>
        <PressablesConfig metadata={slotColors}>
          <View style={styles.grid}>
            {SLOTS.map((slot) => (
              <Slot
                key={slot.time}
                disabled={slot.full}
                accessibilityLabel={slot.time}
                onPress={() => setTime(slot.time)}
                style={[styles.slot, slot.full && styles.full]}>
                {({ isSelected, withAnimation }) => (
                  <SlotLabel
                    time={slot.time}
                    isSelected={isSelected}
                    withAnimation={withAnimation}
                    colors={slotColors}
                  />
                )}
              </Slot>
            ))}
          </View>
        </PressablesConfig>
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  place: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  placeText: { flex: 1, gap: 2 },
  section: { gap: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  slot: {
    width: '31%',
    flexGrow: 1,
    height: 50,
    borderRadius: 16,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: { opacity: 0.35 },
  slotLabel: { fontSize: 16, fontWeight: '600' },
});
