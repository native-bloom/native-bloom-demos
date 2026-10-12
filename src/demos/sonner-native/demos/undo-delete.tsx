/**
 * Sonner Native · Undo delete
 *
 * A real-world pattern: delete a row right away and offer Undo in the toast's
 * action button instead of asking "Are you sure?" first. Undo updates the same
 * toast by id, so it turns into the confirmation instead of stacking a new one.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { Toaster, toast } from 'sonner-native';

import { memories, type Memory } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, Icon, IconTile, ScalePressable, Text, spacing, useColors } from '@/design-system';

const MEMORIES = memories;

export function UndoDeleteDemo() {
  const colors = useColors();
  const [list, setList] = useState(MEMORIES);

  function restore(memory: Memory) {
    // Put the memory back in its original position.
    setList((current) =>
      MEMORIES.filter((m) => m.id === memory.id || current.some((c) => c.id === m.id)),
    );
  }

  function remove(memory: Memory) {
    setList((current) => list.filter((m) => m.id !== memory.id));
    const id = toast('Memory deleted', {
      description: memory.title,
      action: {
        label: 'Undo',
        onClick: () => {
          restore(memory);
          // Same id: the toast turns into the confirmation instead of stacking a new one.
          toast.success('Memory restored', { id, description: memory.title, action: undefined });
        },
      },
    });
  }

  return (
    <DemoStage align="top">
      <View style={styles.list}>
        {list.map((memory) => (
          <Animated.View
            key={memory.id}
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(200)}
            layout={LinearTransition.springify().damping(18)}>
            <Card padding="md" style={styles.row}>
              <IconTile emoji={memory.emoji} color={memory.color} size={52} />
              <View style={styles.text}>
                <Text variant="bodyStrong" numberOfLines={2}>
                  {memory.title}
                </Text>
                <Text variant="caption" color="textSecondary">
                  {memory.category} · {memory.ago}
                </Text>
              </View>
              <ScalePressable
                accessibilityRole="button"
                accessibilityLabel={`Delete ${memory.title}`}
                hitSlop={8}
                style={[styles.delete, { backgroundColor: colors.surfaceMuted }]}
                onPress={() => remove(memory)}>
                <Icon name="trash" size={16} color="textSecondary" />
              </ScalePressable>
            </Card>
          </Animated.View>
        ))}
      </View>

      {list.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="label" color="textSecondary">
            No memories left
          </Text>
          <Trigger emoji="↩️" label="Restore all" onPress={() => setList(MEMORIES)} />
        </View>
      ) : null}

      {/* Bottom, like a snackbar, so the toast never covers the list. */}
      <Toaster position="bottom-center" />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  text: { flex: 1, gap: 2 },
  delete: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { alignItems: 'center', gap: spacing.md, paddingTop: spacing['4xl'] },
});
