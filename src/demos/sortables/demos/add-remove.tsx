/**
 * React Native Sortables · Add and remove items
 *
 * Changing the children (or `data`) animates: new items run `itemEntering`,
 * removed ones `itemExiting` (defaults: a pop in and out), and the rest slide
 * into place. Pass your own Reanimated layout animations to change them.
 *
 * Buttons inside a sortable item should be `Sortable.Touchable`: it
 * coordinates taps with the drag gesture, so tapping ✕ deletes the tag and a
 * long press still drags it.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ZoomIn, ZoomOut } from 'react-native-reanimated';
import Sortable from 'react-native-sortables';

import { DemoStage, Showcase, Trigger } from '@/demos/_shared/stage';
import { Text as ThemedText } from '@/design-system';

const POOL = ['🍵 Matcha', '🍪 Baking', '📷 Film', '🌿 Plants', '🎧 Lo-fi', '🍜 Ramen', '🚲 Rides', '🎨 Painting', '📚 Cookbooks', '🧁 Desserts'];

export function AddRemoveDemo() {
  const [tags, setTags] = useState(POOL.slice(0, 5));
  const next = POOL.find((tag) => !tags.includes(tag));

  return (
    <DemoStage>
      <Showcase
        below={
          <View style={styles.center}>
            <Trigger
              emoji="➕"
              label={next ? `Add ${next.split(' ').slice(1).join(' ')}` : 'All added'}
              onPress={() => next && setTags((t) => [...t, next])}
            />
          </View>
        }>
        <ThemedText variant="heading" style={styles.title}>
          Your interests
        </ThemedText>
        <Sortable.Flex
          gap={8}
          itemEntering={ZoomIn.springify()}
          itemExiting={ZoomOut}
          onDragEnd={({ order }) => setTags(order(tags))}>
          {tags.map((tag) => (
            <View key={tag} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
              <Sortable.Touchable onTap={() => setTags((t) => t.filter((x) => x !== tag))}>
                <View style={styles.remove}>
                  <Text style={styles.removeText}>✕</Text>
                </View>
              </Sortable.Touchable>
            </View>
          ))}
        </Sortable.Flex>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 14 },
  center: { alignItems: 'center' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EAF7EE',
    borderRadius: 999,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
  },
  chipText: { fontSize: 15, fontWeight: '600', color: '#1D5C35' },
  remove: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(29,92,53,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: { fontSize: 11, fontWeight: '800', color: '#1D5C35' },
});
