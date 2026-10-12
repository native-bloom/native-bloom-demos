/**
 * DateTimePicker · Event form
 *
 * Compact pickers in a real form, like the iOS Calendar "New Event" sheet:
 * separate date and time pickers per row, `minimumDate` keeps the end after
 * the start, and "All-day" switches the rows to date only.
 *
 * iOS only (compact pickers render inline on iOS; Android opens dialogs).
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, IconTile, SwitchRow, Text, spacing, useColors } from '@/design-system';

const HOUR = 60 * 60 * 1000;

function nextHour() {
  const date = new Date();
  date.setMinutes(0, 0, 0);
  return new Date(date.getTime() + HOUR);
}

type RowProps = {
  label: string;
  value: Date;
  minimumDate?: Date;
  allDay: boolean;
  onChange: (date: Date) => void;
};

function DateRow({ label, value, minimumDate, allDay, onChange }: RowProps) {
  const colors = useColors();
  return (
    <View style={[styles.row, { borderTopColor: colors.border }]}>
      <Text variant="bodyStrong">{label}</Text>
      <View style={styles.pickers}>
        <DateTimePicker
          value={value}
          mode="date"
          display="compact"
          minimumDate={minimumDate}
          onValueChange={(_event, date) => onChange(date)}
        />
        {allDay ? null : (
          <DateTimePicker
            value={value}
            mode="time"
            display="compact"
            minuteInterval={5}
            minimumDate={minimumDate}
            onValueChange={(_event, date) => onChange(date)}
          />
        )}
      </View>
    </View>
  );
}

export function EventFormDemo() {
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState(nextHour);
  const [end, setEnd] = useState(() => new Date(nextHour().getTime() + HOUR));

  function changeStart(date: Date) {
    // Keep the event length when the start moves.
    const length = end.getTime() - start.getTime();
    setStart(date);
    setEnd(new Date(date.getTime() + length));
  }

  return (
    <DemoStage align="top" footer={<Trigger tone="primary" label="Add event" onPress={() => {}} />}>
      <Card padding="md" style={styles.title}>
        <IconTile emoji="🍵" color="#EEF6E2" size={44} />
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong">Matcha with Sam</Text>
          <Text variant="caption" color="textSecondary">
            Plentea Matcha · Brooklyn
          </Text>
        </View>
      </Card>

      <Card padding={0}>
        <SwitchRow label="All-day" value={allDay} onValueChange={setAllDay} />
        <DateRow label="Starts" value={start} allDay={allDay} onChange={changeStart} />
        <DateRow label="Ends" value={end} minimumDate={start} allDay={allDay} onChange={setEnd} />
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: 56,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pickers: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});
