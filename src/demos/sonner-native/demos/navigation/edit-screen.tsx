import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { toast } from 'sonner-native';

import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, IconTile, Screen, Text, fontFamily, spacing, useColors } from '@/design-system';
import { useMemories } from './memories';

export default function EditMemoryScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { memories, rename } = useMemories();
  const memory = memories.find((m) => m.id === id);
  const [title, setTitle] = useState(memory?.title ?? '');

  if (!memory) return null;

  function save() {
    rename(memory!.id, title.trim() || memory!.title);
    router.back();
    // The screen is gone by the time the toast animates in; the Toaster in the
    // layout keeps rendering it on the list screen.
    toast.success('Memory updated', { description: title.trim() || memory!.title });
  }

  return (
    <Screen header={{ title: 'Edit memory' }} scroll={false} bleed>
      <DemoStage
        align="top"
        avoidKeyboard
        footer={<Trigger tone="primary" label="Save" onPress={save} />}>
        <Card style={styles.card}>
          <IconTile emoji={memory.emoji} color={memory.color} size={64} />
          <Text variant="caption" color="textSecondary">
            {memory.category.toUpperCase()}
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            multiline
            autoFocus
            selectionColor={colors.accent}
            style={[styles.input, { color: colors.text, fontFamily: fontFamily.sans }]}
          />
        </Card>
      </DemoStage>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing['2xl'] },
  input: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
});
