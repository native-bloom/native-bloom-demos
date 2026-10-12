/**
 * DateTimePicker · Minute intervals
 *
 * `minuteInterval` limits the minutes wheel to steps of 1, 5, 15 or 30 (any of
 * 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30).
 *
 * On iOS it only works with `display="spinner"`.
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const INTERVALS = [
  { value: '1', label: '1 min' },
  { value: '5', label: '5 min' },
  { value: '15', label: '15 min' },
  { value: '30', label: '30 min' },
] as const;

type Interval = (typeof INTERVALS)[number]['value'];

export function MinuteIntervalDemo() {
  const [interval, setInterval] = useState<Interval>('15');
  const [time, setTime] = useState(() => new Date());

  return (
    <DemoStage>
      <Showcase
        padding="sm"
        below={<VariantBar value={interval} options={INTERVALS} onChange={setInterval} />}>
        <Text variant="caption" color="textSecondary" align="center" style={styles.label}>
          REMIND ME AT
        </Text>
        <DateTimePicker
          key={interval}
          value={time}
          mode="time"
          display="spinner"
          minuteInterval={Number(interval) as 1 | 5 | 15 | 30}
          onValueChange={(_event, selected) => setTime(selected)}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 12 },
});
