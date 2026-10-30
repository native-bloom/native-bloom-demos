/**
 * Enriched Markdown · Interactive checklist
 *
 * A picnic packing list written as a GitHub task list (`- [ ]` / `- [x]`,
 * needs `flavor="github"`). Tapping a checkbox toggles it natively and fires
 * `onTaskListItemPress` with the item's 0-based index across the whole
 * document and its new `checked` state. The app keeps the list in state,
 * rebuilds the Markdown from it (so it could be saved), and drives the
 * progress header. `markdownStyle.taskList` sets the checkbox size, colors and
 * the strikethrough on finished items.
 */
import { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { EnrichedMarkdownText, type MarkdownStyle } from 'react-native-enriched-markdown';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, Text, radius, spacing, useColors } from '@/design-system';
import { darkMarkdownStyle } from '../styles';

const SECTIONS = [
  { title: '🧺 Food', items: ['Jam cookies', 'Matcha in a thermos', 'Candied nuts'] },
  { title: '🎒 Gear', items: ['Picnic blanket', 'Speaker', 'Sunscreen', 'Ferry tickets'] },
];

const ITEM_COUNT = SECTIONS.reduce((n, s) => n + s.items.length, 0);

function toMarkdown(checked: boolean[]) {
  let index = 0;
  return SECTIONS.map(
    (section) =>
      `#### ${section.title}\n\n` +
      section.items.map((item) => `- [${checked[index++] ? 'x' : ' '}] ${item}`).join('\n'),
  ).join('\n\n');
}

const taskList: MarkdownStyle['taskList'] = {
  checkboxSize: 20,
  checkboxBorderRadius: 6,
  checkedColor: '#22C55E',
  borderColor: '#C7C7CC',
  checkedTextColor: '#A3A3AA',
  checkedStrikethrough: true,
};

const lightStyle: MarkdownStyle = {
  h4: { fontSize: 15, color: '#6E6E75', marginTop: 4, marginBottom: 6 },
  list: { fontSize: 17, lineHeight: 26, itemSpacing: 6 },
  taskList,
};

const darkStyle: MarkdownStyle = {
  ...darkMarkdownStyle,
  h4: { fontSize: 15, color: '#A1A1A8', marginTop: 4, marginBottom: 6 },
  list: { ...darkMarkdownStyle.list, fontSize: 17, lineHeight: 26, itemSpacing: 6 },
  taskList: { ...taskList, borderColor: '#4B4B52', checkedTextColor: '#6A6A72' },
};

const INITIAL = [true, false, false, true, false, false, false];

export function ChecklistDemo() {
  const colors = useColors();
  const dark = useColorScheme() === 'dark';
  const [checked, setChecked] = useState(INITIAL);
  const done = checked.filter(Boolean).length;
  const allPacked = done === ITEM_COUNT;
  const progress = useSharedValue(done / ITEM_COUNT);

  useEffect(() => {
    progress.set(withSpring(done / ITEM_COUNT, { damping: 18, stiffness: 160 }));
  }, [done, progress]);

  const fill = useAnimatedStyle(() => ({ width: `${progress.get() * 100}%` }));

  return (
    <DemoStage align="top">
      <Card style={styles.header}>
        <View style={styles.headerRow}>
          <IconTile emoji="🌊" color={colors.accentSoft} size={48} />
          <View style={styles.headerText}>
            <Text variant="heading">Picnic at Pier 1</Text>
            <Text variant="label" color={allPacked ? 'success' : 'textSecondary'}>
              {allPacked ? 'All packed, have fun!' : 'Saturday · Sam, Alex and Leo'}
            </Text>
          </View>
          <Text variant="bodyStrong" color={allPacked ? 'success' : 'textSecondary'}>
            {`${done}/${ITEM_COUNT}`}
          </Text>
        </View>
        <View style={[styles.track, { backgroundColor: colors.surfaceMuted }]}>
          <Animated.View style={[styles.fill, { backgroundColor: colors.success }, fill]} />
        </View>
      </Card>

      <Card>
        <EnrichedMarkdownText
          flavor="github"
          markdown={toMarkdown(checked)}
          markdownStyle={dark ? darkStyle : lightStyle}
          onTaskListItemPress={({ index, checked: isChecked }) =>
            setChecked((list) => list.map((value, i) => (i === index ? isChecked : value)))
          }
        />
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.lg },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  headerText: { flex: 1, gap: 2 },
  track: { height: 8, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
});
