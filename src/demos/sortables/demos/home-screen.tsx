/**
 * React Native Sortables · Home screen icons
 *
 * The iPhone home screen edit mode, after the library's own "Apple Icon Sort"
 * demo. Long-pressing an icon starts a drag and, through `onDragStart`, turns
 * on jiggle mode. Every icon reads that flag as a shared value and wiggles;
 * the remove button is a `Sortable.Touchable` so its tap doesn't fight the
 * drag gesture. `inactiveItemOpacity={1}` keeps the other icons fully visible
 * while one is dragged, and `onDragEnd` stores the new order.
 *
 * Extra package: expo-haptics (the library also uses it automatically).
 */
import * as Haptics from 'expo-haptics';
import { memo, useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Sortable, { useItemContext, type SortableGridRenderItem } from 'react-native-sortables';

type App = { id: string; emoji: string; label: string; color: string };

const APPS: App[] = [
  { id: 'photos', emoji: '🌸', label: 'Photos', color: '#FFFFFF' },
  { id: 'camera', emoji: '📷', label: 'Camera', color: '#D9D9DE' },
  { id: 'messages', emoji: '💬', label: 'Messages', color: '#5BD46B' },
  { id: 'maps', emoji: '🗺️', label: 'Maps', color: '#CDEBC2' },
  { id: 'weather', emoji: '⛅️', label: 'Weather', color: '#5BA8F5' },
  { id: 'music', emoji: '🎵', label: 'Music', color: '#FF5C7A' },
  { id: 'notes', emoji: '📝', label: 'Notes', color: '#FFE38A' },
  { id: 'calendar', emoji: '📅', label: 'Calendar', color: '#FFFFFF' },
  { id: 'bond', emoji: '🫶', label: 'Bond', color: '#111113' },
  { id: 'recipes', emoji: '🍪', label: 'Recipes', color: '#FFD9A8' },
  { id: 'cafes', emoji: '☕️', label: 'Cafés', color: '#C8A27A' },
  { id: 'fitness', emoji: '🏃', label: 'Fitness', color: '#1C1C1E' },
  { id: 'wallet', emoji: '💳', label: 'Wallet', color: '#2C2C2E' },
  { id: 'clock', emoji: '⏰', label: 'Clock', color: '#1C1C1E' },
  { id: 'books', emoji: '📚', label: 'Books', color: '#FF9F43' },
  { id: 'settings', emoji: '⚙️', label: 'Settings', color: '#8E8E93' },
];

const SHAKE = { duration: 130, easing: Easing.inOut(Easing.ease) };

type IconProps = { app: App; editing: SharedValue<boolean>; onRemove: (id: string) => void };

const AppIcon = memo(function AppIcon({ app, editing, onRemove }: IconProps) {
  const { isActive } = useItemContext();

  // Each icon starts its wiggle at a random moment, like the real thing.
  const angle = useDerivedValue(() =>
    editing.get()
      ? withDelay(
          Math.random() * 250,
          withRepeat(withSequence(withTiming(-2.2, SHAKE), withTiming(2.2, SHAKE)), -1),
        )
      : withTiming(0, SHAKE),
  );

  const wiggle = useAnimatedStyle(() => ({ transform: [{ rotate: `${angle.get()}deg` }] }));
  const removeStyle = useAnimatedStyle(() => ({
    opacity: withTiming(editing.get() && !isActive.get() ? 1 : 0),
  }));

  return (
    <Animated.View style={[styles.app, wiggle]}>
      <View style={[styles.icon, { backgroundColor: app.color }]}>
        <Text style={styles.iconEmoji}>{app.emoji}</Text>
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {app.label}
      </Text>
      <Animated.View style={[styles.removeWrap, removeStyle]}>
        <Sortable.Touchable onTap={() => onRemove(app.id)}>
          <View style={styles.remove}>
            <Text style={styles.removeText}>−</Text>
          </View>
        </Sortable.Touchable>
      </Animated.View>
    </Animated.View>
  );
});

export function HomeScreenDemo() {
  const insets = useSafeAreaInsets();
  const [apps, setApps] = useState(APPS);
  const [editing, setEditing] = useState(false);
  const editingValue = useDerivedValue(() => editing);

  const remove = useCallback(
    (id: string) => {
      if (editing) setApps((list) => list.filter((app) => app.id !== id));
    },
    [editing],
  );

  const renderItem = useCallback<SortableGridRenderItem<App>>(
    ({ item }) => <AppIcon app={item} editing={editingValue} onRemove={remove} />,
    [editingValue, remove],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        {editing ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable style={styles.done} onPress={() => setEditing(false)}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </Animated.View>
        ) : null}
      </View>
      <Sortable.Grid
        data={apps}
        renderItem={renderItem}
        columns={4}
        rowGap={22}
        columnGap={18}
        inactiveItemOpacity={1}
        overflow="visible"
        onDragStart={() => {
          if (!editing) {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            setEditing(true);
          }
        }}
        onDragEnd={({ data }) => setApps(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    experimental_backgroundImage:
      'linear-gradient(160deg, #4B3FD1 0%, #9B4FD6 55%, #F0709A 100%)',
  },
  header: { height: 44, alignItems: 'flex-end', justifyContent: 'center', marginBottom: 16 },
  done: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  doneText: { fontSize: 16, fontWeight: '700', color: '#111113' },
  app: { alignItems: 'center', gap: 6 },
  icon: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 18,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  iconEmoji: { fontSize: 34, lineHeight: 40 },
  label: { fontSize: 12, fontWeight: '500', color: '#FFFFFF', textShadowColor: 'rgba(0,0,0,0.25)', textShadowRadius: 3 },
  removeWrap: { position: 'absolute', top: -8, left: -8 },
  remove: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(60,60,67,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: { color: '#FFFFFF', fontSize: 18, lineHeight: 20, fontWeight: '700' },
});
