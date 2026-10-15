/**
 * Picker · Picker in a sheet
 *
 * The usual home for a wheel on a phone: a row shows the current value, and
 * tapping it opens a bottom sheet with the picker and a Done button. The
 * sheet edits a draft copy, so swiping it away without Done leaves the
 * reminder unchanged.
 *
 * The sheet is @lodev09/react-native-true-sheet; any bottom sheet works.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Picker } from '@react-native-picker/picker';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage } from '@/demos/_shared/stage';
import { Button, Card, IconTile, ListRow, Text, spacing } from '@/design-system';

const OPTIONS = [
  { value: 0, label: 'At time of event' },
  { value: 5, label: '5 minutes before' },
  { value: 15, label: '15 minutes before' },
  { value: 30, label: '30 minutes before' },
  { value: 60, label: '1 hour before' },
  { value: 1440, label: '1 day before' },
];

const labelFor = (value: number) => OPTIONS.find((o) => o.value === value)!.label;

export function SheetDemo() {
  const sheet = useRef<TrueSheet>(null);
  const [reminder, setReminder] = useState(15);
  const [draft, setDraft] = useState(15);

  function open() {
    setDraft(reminder);
    void sheet.current?.present();
  }

  async function done() {
    setReminder(draft);
    await sheet.current?.dismiss();
  }

  return (
    <DemoStage align="top">
      <Card padding="md" style={styles.event}>
        <IconTile emoji="🍵" color="#EEF6E2" size={48} />
        <View style={styles.flex}>
          <Text variant="bodyStrong">Matcha with Sam</Text>
          <Text variant="caption" color="textSecondary">
            Saturday 10:30 · Plentea Matcha
          </Text>
        </View>
      </Card>
      <Card padding={0}>
        <ListRow
          title="Remind me"
          subtitle={labelFor(reminder)}
          leading={<IconTile icon="bell" color="#FFF1DB" />}
          onPress={open}
        />
      </Card>

      <TrueSheet ref={sheet} detents={['auto']}>
        <View style={styles.sheet}>
          <Text variant="heading" align="center">
            Remind me
          </Text>
          <Picker selectedValue={draft} onValueChange={(value) => setDraft(value)}>
            {OPTIONS.map((o) => (
              <Picker.Item key={o.value} label={o.label} value={o.value} />
            ))}
          </Picker>
          <Button label="Done" fullWidth onPress={done} />
        </View>
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  event: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  sheet: { padding: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing.sm },
});
