/**
 * DateTimePicker · Birthday picker
 *
 * An onboarding step: wheels for the birthday, `maximumDate` set to 13 years
 * ago so younger dates cannot be picked, and the age shown live.
 *
 * iOS only (the inline spinner; Android opens a dialog).
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Text, spacing } from '@/design-system';

const NOW = new Date();
const OLDEST = new Date(1920, 0, 1);
const YOUNGEST = new Date(NOW.getFullYear() - 13, NOW.getMonth(), NOW.getDate());

function ageOn(birthday: Date, today: Date) {
  const age = today.getFullYear() - birthday.getFullYear();
  const hadBirthday =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate());
  return hadBirthday ? age : age - 1;
}

export function BirthdayDemo() {
  const [birthday, setBirthday] = useState(() => new Date(1995, 1, 18));

  return (
    <DemoStage footer={<Trigger tone="primary" label="Continue" onPress={() => {}} />}>
      <View style={styles.heading}>
        <Text variant="title" align="center">
          Enter your birthday
        </Text>
        <Text variant="label" color="textSecondary" align="center">
          It won’t be visible to anyone else
        </Text>
      </View>

      <DateTimePicker
        value={birthday}
        mode="date"
        display="spinner"
        minimumDate={OLDEST}
        maximumDate={YOUNGEST}
        onValueChange={(_event, date) => setBirthday(date)}
      />

      <Text variant="heading" color="textSecondary" align="center">
        You’re {ageOn(birthday, NOW)}
      </Text>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  heading: { gap: spacing.xs },
});
