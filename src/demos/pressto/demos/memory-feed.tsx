/**
 * Pressto · Pressable list
 *
 * Pressto is built on Gesture Handler's `BaseButton`, so inside a Gesture
 * Handler scroll view a drag cancels the press: cards don't flash their press
 * animation when you start scrolling over them. Any list that takes
 * `renderScrollComponent` works; here it is Reanimated's `Animated.FlatList`
 * (for `itemLayoutAnimation`) with Gesture Handler's `ScrollView`. Gesture
 * Handler's own `FlatList` works the same way. Tapping a card expands it.
 */
import { PressableScale } from 'pressto';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';

import { memories, stickerArt, type Memory } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage } from '@/demos/_shared/stage';
import { IconTile, Text, shadow, useColors } from '@/design-system';

const ART = [stickerArt.cardDev, stickerArt.cardSurf, stickerArt.cardSkate];

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);

  return (
    <PressableScale
      accessibilityLabel={memory.title}
      onPress={() => setExpanded((open) => !open)}
      style={[styles.card, shadow.card, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        <IconTile emoji={memory.emoji} color={memory.color} size={48} />
        <View style={styles.rowText}>
          <Text variant="bodyStrong" numberOfLines={expanded ? 2 : 1}>
            {memory.title}
          </Text>
          <Text variant="label" color="textSecondary">
            {memory.category} · {memory.ago}
          </Text>
        </View>
      </View>
      {expanded ? (
        <Animated.View entering={FadeIn.delay(80)}>
          <Picture art={ART[index % ART.length]!} style={styles.picture} />
        </Animated.View>
      ) : null}
    </PressableScale>
  );
}

export function MemoryFeedDemo() {
  return (
    <DemoStage bleed>
      <Animated.FlatList
        data={memories}
        keyExtractor={(m) => m.id}
        renderItem={({ item, index }) => <MemoryCard memory={item} index={index} />}
        renderScrollComponent={(props) => <ScrollView {...props} />}
        itemLayoutAnimation={LinearTransition}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40 },
  card: { borderRadius: 22, borderCurve: 'continuous', padding: 12, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { flex: 1, gap: 2 },
  picture: { aspectRatio: 1.6, borderRadius: 14 },
});
