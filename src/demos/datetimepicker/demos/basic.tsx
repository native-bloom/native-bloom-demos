/**
 * DateTimePicker · Date picker
 *
 * The default date picker: pick a date, read it back from `onValueChange`.
 *
 * iOS renders the picker inline (here the compact style: a pill that opens a
 * calendar). Android shows a dialog instead, opened imperatively with
 * `DateTimePickerAndroid.open()`, which is the approach the library recommends.
 */
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text as ThemedText } from '@/design-system';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function BasicDemo() {
  const [date, setDate] = useState(() => new Date());

  function openAndroidPicker() {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      onValueChange: (_event, selected) => setDate(selected),
    });
  }

  return (
    <DemoStage>
      <Showcase>
        <View style={styles.content}>
          <ThemedText variant="caption" color="textSecondary">
            MEMORY DATE
          </ThemedText>
          <ThemedText variant="title" align="center">
            {formatDate(date)}
          </ThemedText>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              value={date}
              mode="date"
              onValueChange={(_event, selected) => setDate(selected)}
            />
          ) : (
            <Pressable style={styles.androidButton} onPress={openAndroidPicker}>
              <Text style={styles.androidButtonText}>Change date</Text>
            </Pressable>
          )}
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', gap: 12 },
  androidButton: {
    backgroundColor: '#111113',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  androidButtonText: { color: '#FFFFFF', fontWeight: '600' },
});
