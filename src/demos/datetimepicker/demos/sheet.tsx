/**
 * DateTimePicker · Picker in a sheet
 *
 * A reminder row opens a bottom sheet with date-and-time wheels and a Done
 * button, the usual pattern when a picker should not take space on screen.
 *
 * The sheet is the Expo UI `BottomSheet`; React Native content inside it is
 * wrapped in `RNHostView` so it receives touches. iOS only.
 */
import { BottomSheet, RNHostView } from '@expo/ui';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, Icon, IconTile, ListRow, Text, spacing, useTheme } from '@/design-system';

const SHEET_HEIGHT = 380;

function tomorrowAtNine() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(9, 0, 0, 0);
  return date;
}

function formatReminder(date: Date) {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function SheetDemo() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [reminder, setReminder] = useState(tomorrowAtNine);
  const [draft, setDraft] = useState(reminder);

  function openSheet() {
    setDraft(reminder);
    setOpen(true);
  }

  return (
    <DemoStage>
      <Card padding={0}>
        <ListRow
          leading={<IconTile emoji="🍪" color="#FFF1DB" size={44} />}
          title="Bake cookies for Sam"
          subtitle="Desserts and Baking"
        />
        <ListRow
          divider
          leading={<Icon name="bell" size={18} color="accent" />}
          title="Remind me"
          subtitle={formatReminder(reminder)}
          onPress={openSheet}
        />
      </Card>

      <BottomSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        snapPoints={[{ height: SHEET_HEIGHT }]}
        containerColor={colors.canvas}
        contentPadding={0}>
        <RNHostView matchContents>
          <View style={[styles.sheet, { width, height: SHEET_HEIGHT }]}>
            <Text variant="heading">Remind me</Text>
            <DateTimePicker
              value={draft}
              mode="datetime"
              display="spinner"
              minimumDate={new Date()}
              minuteInterval={5}
              onValueChange={(_event, date) => setDraft(date)}
            />
            <Trigger
              tone="primary"
              label="Done"
              onPress={() => {
                setReminder(draft);
                setOpen(false);
              }}
            />
          </View>
        </RNHostView>
      </BottomSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  sheet: { alignItems: 'center', paddingTop: spacing['2xl'], gap: spacing.md },
});
