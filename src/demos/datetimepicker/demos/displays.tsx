/**
 * DateTimePicker · Display styles
 *
 * `display` switches the iOS picker between its three looks: a compact pill
 * that opens a calendar, a full inline calendar, and the classic wheels.
 *
 * iOS only: Android uses `display` to choose between dialog styles instead.
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const DISPLAYS = [
  { value: 'compact', label: 'Compact' },
  { value: 'inline', label: 'Inline' },
  { value: 'spinner', label: 'Spinner' },
] as const;

type Display = (typeof DISPLAYS)[number]['value'];

export function DisplaysDemo() {
  const [display, setDisplay] = useState<Display>('inline');
  const [value, setValue] = useState(() => new Date());

  return (
    <DemoStage>
      <Showcase
        padding={display === 'compact' ? 'xl' : 'sm'}
        below={<VariantBar value={display} options={DISPLAYS} onChange={setDisplay} />}>
        <DateTimePicker
          key={display}
          value={value}
          mode="date"
          display={display}
          onValueChange={(_event, selected) => setValue(selected)}
          // The compact pill is left-aligned inside its native frame; centre it.
          style={display === 'compact' ? styles.compact : undefined}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  compact: { alignSelf: 'center' },
});
