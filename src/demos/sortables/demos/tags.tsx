/**
 * React Native Sortables · Sortable tags
 *
 * `Sortable.Flex` lays out any children with flexbox (`flexWrap`, `gap`,
 * `justifyContent`…) and makes them sortable. Children can be any size; the
 * wrap reflows live while you drag. There are no required props: render the
 * children with a `key` and keep the order in state with `onDragEnd`'s
 * `order()` helper.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Sortable from 'react-native-sortables';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text as ThemedText } from '@/design-system';

const INTERESTS = [
  '🍵 Matcha',
  '🍪 Baking',
  '📷 Film photos',
  '🧁 Desserts',
  '☕️ Cafés',
  '🌿 Plants',
  '🎨 Watercolor',
  '🚲 Weekend rides',
  '🎧 Lo-fi',
  '🍜 Ramen',
  '📚 Cookbooks',
];

export function TagsDemo() {
  const [tags, setTags] = useState(INTERESTS);

  return (
    <DemoStage>
      <Showcase>
        <View style={styles.header}>
          <ThemedText variant="heading">Your interests</ThemedText>
          <ThemedText variant="caption" color="textSecondary">
            Drag to put your favourites first
          </ThemedText>
        </View>
        <Sortable.Flex gap={8} onDragEnd={({ order }) => setTags(order(tags))}>
          {tags.map((tag) => (
            <View key={tag} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
            </View>
          ))}
        </Sortable.Flex>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { gap: 2, marginBottom: 16 },
  chip: {
    backgroundColor: '#E8F0FF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipText: { fontSize: 15, fontWeight: '600', color: '#1F3B70' },
});
