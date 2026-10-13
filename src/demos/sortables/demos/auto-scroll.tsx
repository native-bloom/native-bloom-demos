/**
 * React Native Sortables · Auto scroll
 *
 * Put the sortable inside a scroll view and pass that scroll view's animated
 * ref as `scrollableRef`. Dragging an item near the top or bottom edge then
 * scrolls the page, faster the closer you get (`autoScrollActivationOffset`,
 * `autoScrollMaxVelocity`), so items can travel the whole list in one drag.
 */
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import Sortable, { type SortableGridRenderItem } from 'react-native-sortables';

import { DemoStage } from '@/demos/_shared/stage';
import { Text as ThemedText, spacing, useColors } from '@/design-system';

type Song = { id: string; title: string; artist: string; emoji: string; color: string };

const ART = [
  ['☕️', '#FFF1DB'],
  ['🥞', '#FFE4EC'],
  ['🍵', '#EEF6E2'],
  ['🍪', '#E8F0FF'],
  ['🍓', '#FFE1E1'],
  ['🌿', '#E6F6E9'],
] as const;

const TITLES = [
  'Slow morning', 'Sunday pancakes', 'Matcha in Brooklyn', 'Cookie dough', 'Strawberry fields',
  'Window plants', 'Rainy café', 'Late bus home', 'Golden hour', 'Kettl at noon',
  'Flour on the counter', 'Jam session', 'Pier walk', 'Lo-fi bakery', 'Fresh croissants',
  'Picnic blanket', 'Film camera', 'Night market', 'Cinnamon buns', 'Last order',
];
const ARTISTS = ['Samsam', 'Leo Lee', 'Sam Lee', 'Alex Smith', 'Ryan Lee'];

const SONGS: Song[] = TITLES.map((title, i) => ({
  id: String(i),
  title,
  artist: ARTISTS[i % ARTISTS.length]!,
  emoji: ART[i % ART.length]![0],
  color: ART[i % ART.length]![1],
}));

export function AutoScrollDemo() {
  const colors = useColors();
  const scrollableRef = useAnimatedRef<Animated.ScrollView>();
  const [songs, setSongs] = useState(SONGS);

  const renderItem = useCallback<SortableGridRenderItem<Song>>(
    ({ item }) => (
      <View style={[styles.row, { backgroundColor: colors.surface }]}>
        <View style={[styles.art, { backgroundColor: item.color }]}>
          <Text style={styles.artEmoji}>{item.emoji}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.artist, { color: colors.textSecondary }]}>{item.artist}</Text>
        </View>
      </View>
    ),
    [colors],
  );

  return (
    <DemoStage bleed>
      <Animated.ScrollView
        ref={scrollableRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ThemedText variant="title">Kitchen playlist</ThemedText>
        <ThemedText variant="caption" color="textSecondary" style={styles.subtitle}>
          {songs.length} songs · hold and drag to the edge
        </ThemedText>
        <Sortable.Grid
          data={songs}
          renderItem={renderItem}
          columns={1}
          rowGap={8}
          overDrag="vertical"
          scrollableRef={scrollableRef}
          autoScrollActivationOffset={120}
          onDragEnd={({ data }) => setSongs(data)}
        />
      </Animated.ScrollView>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing['3xl'] },
  subtitle: { marginBottom: spacing.lg },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  art: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  artEmoji: { fontSize: 24, lineHeight: 30 },
  flex: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  artist: { fontSize: 13 },
});
