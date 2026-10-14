/**
 * Segmented Control · Segmented tabs
 *
 * A segmented control as in-page tabs. The three panes sit side by side in a
 * row three screens wide, and the selected index slides the row with
 * Reanimated (`withTiming` on `translateX`), so changing tabs feels physical
 * without a pager library.
 */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { memories, people, places } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Avatar, Card, IconTile, ListRow, Text, spacing } from '@/design-system';

const TABS = ['Memories', 'Places', 'Friends'];

export function TabsDemo() {
  const { width } = useWindowDimensions();
  const pageWidth = width - spacing.lg * 2;
  const [tab, setTab] = useState(0);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(-tab * (pageWidth + spacing.lg), { duration: 320 }) }],
  }));

  const page = { width: pageWidth };

  return (
    <DemoStage align="top">
      <View style={styles.profile}>
        <Avatar name="Sam Lee" size={56} />
        <View>
          <Text variant="title">Sam Lee</Text>
          <Text variant="caption" color="textSecondary">
            @samlee · Brooklyn
          </Text>
        </View>
      </View>

      <SegmentedControl
        values={TABS}
        selectedIndex={tab}
        onChange={(e) => setTab(e.nativeEvent.selectedSegmentIndex)}
      />

      <View style={styles.viewport}>
        <Animated.View style={[styles.row, rowStyle]}>
          <Card padding={0} style={page}>
            {memories.slice(0, 4).map((m, i) => (
              <ListRow
                key={m.id}
                title={m.title}
                subtitle={m.ago}
                leading={<IconTile emoji={m.emoji} color={m.color} />}
                divider={i > 0}
              />
            ))}
          </Card>
          <Card padding={0} style={page}>
            {places.map((p, i) => (
              <ListRow
                key={p.id}
                title={p.name}
                subtitle={`${p.kind} · ★ ${p.rating}`}
                leading={<IconTile emoji={['🍵', '🫖', '🥐'][i]} color="#EEF6E2" />}
                divider={i > 0}
              />
            ))}
          </Card>
          <Card padding={0} style={page}>
            {people.slice(1).map((p, i) => (
              <ListRow
                key={p.id}
                title={p.name}
                subtitle={p.handle}
                leading={<Avatar name={p.name} />}
                divider={i > 0}
              />
            ))}
          </Card>
        </Animated.View>
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  // Clips the neighbouring panes; the shadowless cards line up with the gutter.
  viewport: { overflow: 'hidden', marginHorizontal: -spacing.lg, paddingHorizontal: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.lg },
});
