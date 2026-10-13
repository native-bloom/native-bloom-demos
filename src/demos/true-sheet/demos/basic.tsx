/**
 * True Sheet · Bottom sheet
 *
 * The smallest setup: render `<TrueSheet>` anywhere, attach a ref and call
 * `present()` / `dismiss()` (both return promises). The `'auto'` detent sizes
 * the sheet to its content. With no `backgroundColor`, iOS 26 draws the
 * native Liquid Glass sheet; older iOS and Android use the system surface.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { people } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Avatar, Button, IconTile, Text, spacing } from '@/design-system';

export function BasicDemo() {
  const sheet = useRef<TrueSheet>(null);

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          tone="primary"
          emoji="🍪"
          label="Share memory"
          onPress={() => sheet.current?.present()}
        />
      </TriggerStack>

      <TrueSheet ref={sheet} detents={['auto']}>
        <View style={styles.content}>
          <View style={styles.memory}>
            <IconTile emoji="🍪" color="#FFF1DB" size={52} />
            <View style={styles.flex}>
              <Text variant="heading">Made cookie dough</Text>
              <Text variant="caption" color="textSecondary">
                Cooking · 19 min ago
              </Text>
            </View>
          </View>

          <Text color="textSecondary">Share with your close friends</Text>
          <View style={styles.people}>
            {people.slice(0, 4).map((person) => (
              <View key={person.id} style={styles.person}>
                <Avatar name={person.name} size={52} />
                <Text variant="caption">{person.name.split(' ')[0]}</Text>
              </View>
            ))}
          </View>

          <Button label="Share" fullWidth onPress={() => sheet.current?.dismiss()} />
        </View>
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing.xl },
  memory: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  people: { flexDirection: 'row', justifyContent: 'space-between' },
  person: { alignItems: 'center', gap: spacing.xs },
});
