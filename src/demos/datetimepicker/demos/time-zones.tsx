/**
 * DateTimePicker · Time zones
 *
 * `timeZoneName` shows and edits the same moment in another time zone (any
 * IANA name). The value stays a plain `Date`, so it converts back to the
 * device's time automatically.
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const ZONES = [
  { value: 'America/New_York', label: 'New York' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
] as const;

type Zone = (typeof ZONES)[number]['value'];

function formatTime(date: Date, timeZone?: string) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone });
}

export function TimeZonesDemo() {
  const [zone, setZone] = useState<Zone>('America/New_York');
  const [time, setTime] = useState(() => new Date());
  const city = ZONES.find((z) => z.value === zone)!.label;

  return (
    <DemoStage>
      <Showcase padding="sm" below={<VariantBar value={zone} options={ZONES} onChange={setZone} />}>
        <Text variant="caption" color="textSecondary" align="center" style={styles.label}>
          CALL WITH SAM · {city.toUpperCase()} TIME
        </Text>
        <DateTimePicker
          key={zone}
          value={time}
          mode="time"
          display="spinner"
          timeZoneName={zone}
          onValueChange={(_event, selected) => setTime(selected)}
        />
        <Text variant="bodyStrong" align="center" style={styles.local}>
          That’s {formatTime(time)} for you
        </Text>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 12 },
  local: { marginBottom: 12 },
});
