/**
 * React Native Sortables · Day planner
 *
 * After the library's own "Task Planner" demo. One sortable list holds both
 * the plan and the inbox, split by a separator item. Dragging a task above the
 * separator schedules it: the card turns blue and shows its start time.
 *
 * Nothing re-renders during the drag. `onOrderChange` (called on every
 * reorder) recomputes the running durations into a shared value, and each
 * card reads its own position from `useItemContext().keyToIndex` on the UI
 * thread. Cards drag by their grip (`customHandle` + `Sortable.Handle`, no
 * activation delay), and the page auto-scrolls through `scrollableRef`.
 */
import { memo, useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, {
  LinearTransition,
  interpolateColor,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import Sortable, {
  useItemContext,
  type OrderChangeCallback,
  type SortableGridRenderItem,
} from 'react-native-sortables';

import { DemoStage } from '@/demos/_shared/stage';
import { Text as ThemedText, spacing, useColors } from '@/design-system';

type Task = { id: string; emoji: string; title: string; duration: number };

/** Marks the boundary between scheduled tasks (above) and the inbox (below). */
const SEPARATOR = '__separator__';
const START = 9 * 60; // 9:00

const DATA: (Task | typeof SEPARATOR)[] = [
  { id: 'breakfast', emoji: '🥞', title: 'Pancakes with Leo', duration: 45 },
  SEPARATOR,
  { id: 'dough', emoji: '🍪', title: 'Bake cookie dough', duration: 60 },
  { id: 'matcha', emoji: '🍵', title: 'Matcha at Plentea', duration: 30 },
  { id: 'call', emoji: '📞', title: 'Call Sam Lee', duration: 20 },
  { id: 'walk', emoji: '📷', title: 'Film photo walk', duration: 90 },
  { id: 'groceries', emoji: '🧺', title: 'Grocery run', duration: 40 },
  { id: 'plants', emoji: '🌿', title: 'Water the plants', duration: 15 },
  { id: 'journal', emoji: '📓', title: 'Write in the journal', duration: 25 },
];

const DURATIONS: Record<string, number> = Object.fromEntries(
  DATA.filter((d): d is Task => d !== SEPARATOR).map((t) => [t.id, t.duration]),
);

/** Running end time (minutes after START) of every scheduled task, by key. */
function runningTotals(order: string[]) {
  const totals: Record<string, number> = {};
  let sum = 0;
  for (const key of order) {
    if (key === SEPARATOR) break;
    sum += DURATIONS[key] ?? 0;
    totals[key] = sum;
  }
  return totals;
}

function clock(minutes: number) {
  'worklet';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
}

Animated.addWhitelistedNativeProps?.({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function LiveText({ text, style }: { text: SharedValue<string>; style: object }) {
  const props = useAnimatedProps(() => ({ text: text.get(), defaultValue: text.get() }));
  return <AnimatedTextInput editable={false} style={[styles.liveText, style]} animatedProps={props} />;
}

const TaskCard = memo(function TaskCard({
  task,
  totals,
}: {
  task: Task;
  totals: SharedValue<Record<string, number>>;
}) {
  const colors = useColors();
  const { itemKey, keyToIndex } = useItemContext();

  // 1 when the card sits above the separator (scheduled), 0 in the inbox.
  const scheduled = useDerivedValue(() =>
    withTiming((keyToIndex.get()[itemKey] ?? 0) < (keyToIndex.get()[SEPARATOR] ?? 0) ? 1 : 0),
  );

  const subtitle = useDerivedValue(() => {
    const end = totals.get()[itemKey];
    return scheduled.get() > 0.5 && end !== undefined
      ? `${clock(START + end - task.duration)} – ${clock(START + end)}`
      : `${task.duration} min`;
  });

  const cardStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(scheduled.get(), [0, 1], [colors.surface, '#3478F6']),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(scheduled.get(), [0, 1], [colors.text, '#FFFFFF']),
  }));
  const subtitleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(scheduled.get(), [0, 1], [colors.textSecondary, 'rgba(255,255,255,0.8)']),
  }));

  return (
    <Animated.View layout={LinearTransition} style={[styles.card, cardStyle]}>
      <Text style={styles.emoji}>{task.emoji}</Text>
      <View style={styles.flex}>
        <Animated.Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {task.title}
        </Animated.Text>
        <LiveText text={subtitle} style={subtitleStyle} />
      </View>
      <Sortable.Handle>
        <View style={styles.grip}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={styles.gripBar} />
          ))}
        </View>
      </Sortable.Handle>
    </Animated.View>
  );
});

function Separator() {
  const colors = useColors();
  return (
    <View style={styles.separator}>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      <Text style={[styles.separatorText, { color: colors.textSecondary }]}>Inbox</Text>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
    </View>
  );
}

export function DayPlannerDemo() {
  const [data, setData] = useState(DATA);
  const scrollableRef = useAnimatedRef<Animated.ScrollView>();
  const totals = useSharedValue(runningTotals(DATA.map((d) => (d === SEPARATOR ? d : d.id))));

  const planEnd = useDerivedValue(() => {
    const values = Object.values(totals.get());
    const end = values.length ? Math.max(...values) : 0;
    return `9:00 – ${clock(START + end)} · ${values.length} planned`;
  });

  const onOrderChange = useCallback<OrderChangeCallback>(
    ({ indexToKey }) => totals.set(runningTotals(indexToKey)),
    [totals],
  );

  const renderItem = useCallback<SortableGridRenderItem<Task | typeof SEPARATOR>>(
    ({ item }) => (item === SEPARATOR ? <Separator /> : <TaskCard task={item} totals={totals} />),
    [totals],
  );

  return (
    <DemoStage bleed>
      <Animated.ScrollView
        ref={scrollableRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ThemedText variant="title">Saturday</ThemedText>
        <LiveText text={planEnd} style={styles.summary} />
        <Sortable.Grid
          data={data}
          keyExtractor={(item) => (item === SEPARATOR ? SEPARATOR : item.id)}
          renderItem={renderItem}
          columns={1}
          rowGap={8}
          customHandle
          dragActivationDelay={0}
          overDrag="vertical"
          activeItemScale={1.03}
          scrollableRef={scrollableRef}
          onOrderChange={onOrderChange}
          onDragEnd={({ data: next }) => setData(next)}
        />
      </Animated.ScrollView>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing['3xl'] },
  summary: { fontSize: 14, fontWeight: '600', color: '#3478F6', marginBottom: spacing.lg },
  liveText: { padding: 0, fontSize: 13 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingLeft: 14,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  emoji: { fontSize: 24, lineHeight: 30 },
  flex: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  grip: { gap: 4, paddingHorizontal: 16, paddingVertical: 10 },
  gripBar: { width: 18, height: 2.5, borderRadius: 2, backgroundColor: 'rgba(140,140,150,0.6)' },
  separator: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  line: { flex: 1, height: StyleSheet.hairlineWidth },
  separatorText: { fontSize: 13, fontWeight: '600' },
});
