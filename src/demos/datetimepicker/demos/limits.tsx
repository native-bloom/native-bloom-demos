/**
 * DateTimePicker · Date limits
 *
 * `minimumDate` and `maximumDate` grey out everything outside a range. Here a
 * booking screen only allows the next two weeks.
 *
 * On Android, limits apply to `mode="date"` only.
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { places } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, IconTile, Text, spacing } from '@/design-system';

const TODAY = new Date();
const IN_TWO_WEEKS = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 14);
const PLACE = places[0]!;

export function LimitsDemo() {
  const [date, setDate] = useState(TODAY);
  const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <DemoStage
      align="top"
      footer={<Trigger tone="primary" label={`Book for ${label}`} onPress={() => {}} />}>
      <Card padding="md" style={styles.place}>
        <IconTile emoji="🍵" color="#EEF6E2" size={48} />
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong">{PLACE.name}</Text>
          <Text variant="caption" color="textSecondary">
            {PLACE.kind} · ★ {PLACE.rating} · Booking opens 2 weeks ahead
          </Text>
        </View>
      </Card>

      <Card padding="sm">
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          minimumDate={TODAY}
          maximumDate={IN_TWO_WEEKS}
          onValueChange={(_event, selected) => setDate(selected)}
        />
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  place: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
