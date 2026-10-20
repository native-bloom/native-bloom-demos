/**
 * Fast Confetti · Birthday card
 *
 * Confetti doesn't have to cover the screen. Inside a card with
 * `overflow: 'hidden'`, `<ContinuousConfetti />` fills just that card, and
 * `containerStyle={{ zIndex: 0 }}` (the default is 1) lets the card's text
 * and button render on top of the falling pieces.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContinuousConfetti } from 'react-native-fast-confetti';

import { people } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Avatar, Button, Card, ListRow, Text, spacing } from '@/design-system';

const UPCOMING = [
  { person: people[1], when: 'In 3 days' },
  { person: people[3], when: 'Next Tuesday' },
  { person: people[4], when: 'November 12' },
];

export function BirthdayCardDemo() {
  const [sent, setSent] = useState(false);

  return (
    <DemoStage align="top">
      <Card padding={0} style={styles.birthday}>
        <ContinuousConfetti count={90} verticalSpacing={140} containerStyle={styles.confetti}>
          <ContinuousConfetti.Flake width={7} height={12} />
          <ContinuousConfetti.Flake size={10} radius={5} />
          <ContinuousConfetti.Flake width={6} height={16} radius={3} />
        </ContinuousConfetti>

        <View style={styles.content}>
          <Avatar name="Sam Lee" size={72} />
          <View style={styles.text}>
            <Text variant="title" align="center">
              {"Sam Lee's birthday 🎂"}
            </Text>
            <Text color="textSecondary" align="center">
              Turns 28 today
            </Text>
          </View>
          <Button
            label={sent ? 'Wishes sent ✓' : 'Send wishes'}
            variant={sent ? 'soft' : 'primary'}
            onPress={() => setSent(true)}
          />
        </View>
      </Card>

      <Text variant="label" color="textSecondary" style={styles.section}>
        Coming up
      </Text>
      <Card padding="xs">
        {UPCOMING.map(({ person, when }, i) => (
          <ListRow
            key={person.id}
            title={person.name}
            subtitle={when}
            leading={<Avatar name={person.name} size={40} />}
            divider={i > 0}
          />
        ))}
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  birthday: { overflow: 'hidden', height: 300 },
  confetti: { zIndex: 0 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  text: { gap: spacing.xs },
  section: { marginBottom: -spacing.sm, paddingHorizontal: spacing.xs },
});
