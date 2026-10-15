/**
 * Picker · Expandable row
 *
 * The iOS Settings pattern: each row shows its value, and tapping it opens an
 * inline wheel right under it (closing any other). Reanimated layout
 * animations (`FadeIn`, `FadeOut`, `LinearTransition`) open the wheel and push
 * the rows below smoothly; the card itself gets `layout` too, so its edge
 * grows and shrinks with the rows instead of snapping. iOS only: on Android the picker is a spinner, so a
 * plain picker row is enough there.
 */
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { DemoStage } from '@/demos/_shared/stage';
import { Button, Text, radius, shadow, spacing, useColors } from '@/design-system';

type Field = { key: string; label: string; options: string[] };

const FIELDS: Field[] = [
  {
    key: 'guests',
    label: 'Guests',
    options: ['1 person', '2 people', '3 people', '4 people', '6 people'],
  },
  { key: 'time', label: 'Time', options: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30'] },
  { key: 'seat', label: 'Seating', options: ['Inside', 'Window', 'Patio', 'At the bar'] },
];

const layout = LinearTransition.duration(260);

export function ExpandableRowDemo() {
  const colors = useColors();
  const [open, setOpen] = useState<string | null>('time');
  const [values, setValues] = useState<Record<string, string>>({
    guests: '2 people',
    time: '10:30',
    seat: 'Window',
  });

  return (
    <DemoStage
      align="top"
      footer={<Button label="Book at Plentea Matcha" fullWidth onPress={() => setOpen(null)} />}>
      <Text variant="title">Book a table</Text>
      {/* The container animates its height too, so the card's edge follows the rows. */}
      <Animated.View layout={layout} style={[styles.card, { backgroundColor: colors.surface }]}>
        {FIELDS.map((field, i) => {
          const isOpen = open === field.key;
          return (
            <Animated.View key={field.key} layout={layout}>
              <Pressable
                onPress={() => setOpen(isOpen ? null : field.key)}
                style={[
                  styles.row,
                  i > 0 && {
                    borderTopColor: colors.border,
                    borderTopWidth: StyleSheet.hairlineWidth,
                  },
                ]}>
                <Text variant="bodyStrong">{field.label}</Text>
                <Text style={{ color: isOpen ? colors.accent : colors.textSecondary }}>
                  {values[field.key]}
                </Text>
              </Pressable>
              {isOpen ? (
                <Animated.View entering={FadeIn.duration(220)} exiting={FadeOut.duration(150)}>
                  <Picker
                    selectedValue={values[field.key]}
                    onValueChange={(value) => setValues((v) => ({ ...v, [field.key]: value }))}>
                    {field.options.map((o) => (
                      <Picker.Item key={o} label={o} value={o} />
                    ))}
                  </Picker>
                </Animated.View>
              ) : null}
            </Animated.View>
          );
        })}
      </Animated.View>
      <View style={styles.spacer} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    // Clips the closing wheel while the card shrinks.
    overflow: 'hidden',
    ...shadow.card,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    minHeight: 54,
  },
  spacer: { height: spacing.xl },
});
