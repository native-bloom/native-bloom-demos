/**
 * Segmented Control · Filter a feed
 *
 * The classic use: a segmented control above a list filters it in place.
 * `onValueChange` hands back the selected label, which is all the filter
 * needs. Reanimated layout animations (`FadeIn`, `FadeOut`,
 * `LinearTransition`) let rows leave and close up smoothly.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { memories } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { IconTile, ListRow, Text, radius, spacing, useColors } from '@/design-system';

const FILTERS = ['All', 'Cooking', 'Desserts', 'Cafés'];

function matches(category: string, filter: string) {
  if (filter === 'All') return true;
  if (filter === 'Desserts') return category.startsWith('Desserts');
  if (filter === 'Cafés') return category === 'Cafes';
  return category === filter;
}

export function FilterFeedDemo() {
  const colors = useColors();
  const [filter, setFilter] = useState('All');
  const visible = memories.filter((m) => matches(m.category, filter));

  return (
    <DemoStage align="top">
      <Text variant="title">Memories</Text>
      <SegmentedControl
        values={FILTERS}
        selectedIndex={FILTERS.indexOf(filter)}
        onValueChange={setFilter}
      />
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        {visible.map((memory, i) => (
          <Animated.View
            key={memory.id}
            entering={FadeIn.duration(220)}
            exiting={FadeOut.duration(160)}
            layout={LinearTransition.duration(260)}>
            <ListRow
              title={memory.title}
              subtitle={`${memory.category} · ${memory.ago}`}
              leading={<IconTile emoji={memory.emoji} color={memory.color} />}
              divider={i > 0}
            />
          </Animated.View>
        ))}
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, borderCurve: 'continuous', overflow: 'hidden', paddingVertical: spacing.xs },
});
