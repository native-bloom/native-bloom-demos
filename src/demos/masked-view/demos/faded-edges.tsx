/**
 * Masked View · Faded edges
 *
 * A mask doesn't have to be all or nothing: it uses the alpha channel, so a
 * gradient from transparent to opaque fades the content in. Here a vertical
 * gradient (transparent → black → black → transparent) wraps a scroll view,
 * and rows melt away at the top and bottom edges instead of being cut off,
 * over any background. The gradient is a View with
 * `experimental_backgroundImage`; a LinearGradient works too.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { ScrollView, StyleSheet, View } from 'react-native';

import { memories } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { IconTile, ListRow, Text, radius, spacing, useColors } from '@/design-system';

const FADE = 'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)';

// Two weeks of memories, so there is something to scroll.
const ROWS = [0, 1, 2].flatMap((week) =>
  memories.map((m) => ({
    ...m,
    key: `${week}-${m.id}`,
    ago: week ? `${week + 1} weeks ago` : m.ago,
  })),
);

export function FadedEdgesDemo() {
  const colors = useColors();

  return (
    <DemoStage align="top" bleed>
      <Text variant="title" style={styles.title}>
        This month
      </Text>
      <MaskedView
        style={styles.masked}
        maskElement={<View style={[styles.fill, { experimental_backgroundImage: FADE }]} />}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {ROWS.map((m) => (
            <View key={m.key} style={[styles.row, { backgroundColor: colors.surface }]}>
              <ListRow
                title={m.title}
                subtitle={`${m.category} · ${m.ago}`}
                leading={<IconTile emoji={m.emoji} color={m.color} />}
              />
            </View>
          ))}
        </ScrollView>
      </MaskedView>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { paddingHorizontal: spacing.lg },
  masked: { flex: 1 },
  fill: { flex: 1 },
  content: { paddingHorizontal: spacing.lg, paddingVertical: spacing['4xl'], gap: spacing.sm },
  row: { borderRadius: radius.lg, borderCurve: 'continuous', overflow: 'hidden' },
});
