/**
 * DateTimePicker · Custom colors
 *
 * `accentColor` tints the selected day and controls; `themeVariant` forces a
 * light or dark picker regardless of the system setting. (`textColor` exists
 * too, but only for `display="spinner"`.)
 *
 * iOS only.
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, VariantBar } from '@/demos/_shared/stage';
import { radius, shadow } from '@/design-system';

const LOOKS = [
  { value: 'blue', label: 'Blue' },
  { value: 'pink', label: 'Pink' },
  { value: 'green', label: 'Green' },
  { value: 'night', label: 'Night' },
] as const;

type Look = (typeof LOOKS)[number]['value'];

const ACCENTS: Record<Look, string> = {
  blue: '#3478F6',
  pink: '#FF2D78',
  green: '#22A55B',
  night: '#FFB224',
};

export function StylingDemo() {
  const [look, setLook] = useState<Look>('pink');
  const [date, setDate] = useState(() => new Date());
  const night = look === 'night';

  return (
    <DemoStage>
      <View style={[styles.card, { backgroundColor: night ? '#111113' : '#FFFFFF' }]}>
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          accentColor={ACCENTS[look]}
          themeVariant={night ? 'dark' : 'light'}
          onValueChange={(_event, selected) => setDate(selected)}
        />
      </View>
      <VariantBar value={look} options={LOOKS} onChange={setLook} />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, borderCurve: 'continuous', padding: 8, ...shadow.card },
});
