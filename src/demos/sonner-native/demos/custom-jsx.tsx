/**
 * Sonner Native · Custom JSX toasts
 *
 * `toast.custom(<Component />)` renders anything you like as a toast. Pass the
 * toast id into your component so its buttons can call `toast.dismiss(id)`.
 */
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

function MessageToast({ id }: { id: string }) {
  const dark = useColorScheme() === 'dark';
  return (
    <View style={[styles.card, { backgroundColor: dark ? '#1C1C1E' : '#FFFFFF' }]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>SL</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: dark ? '#FFFFFF' : '#0B0B0D' }]}>Sam Lee</Text>
        <Text style={styles.message} numberOfLines={1}>
          Which part was your fave?
        </Text>
      </View>
      <Pressable style={styles.reply} onPress={() => toast.dismiss(id)}>
        <Text style={styles.replyText}>Reply</Text>
      </Pressable>
    </View>
  );
}

function UploadToast({ id }: { id: string }) {
  const dark = useColorScheme() === 'dark';
  const progress = useSharedValue(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    progress.set(withTiming(1, { duration: 2400 }));
    const finish = setTimeout(() => setDone(true), 2400);
    const close = setTimeout(() => toast.dismiss(id), 3800);
    return () => {
      clearTimeout(finish);
      clearTimeout(close);
    };
  }, [id, progress]);

  const bar = useAnimatedStyle(() => ({ width: `${progress.get() * 100}%` }));

  return (
    <View style={[styles.card, styles.column, { backgroundColor: dark ? '#1C1C1E' : '#FFFFFF' }]}>
      <View style={styles.row}>
        <Text style={[styles.name, { color: dark ? '#FFFFFF' : '#0B0B0D' }]}>
          {done ? 'Story uploaded' : 'Uploading story'}
        </Text>
        <Text style={styles.message}>{done ? '✓' : '3 photos'}</Text>
      </View>
      <View style={[styles.track, { backgroundColor: dark ? '#2C2C30' : '#EEEEF1' }]}>
        <Animated.View style={[styles.fill, done && styles.fillDone, bar]} />
      </View>
    </View>
  );
}

function SuggestionPill({ id }: { id: string }) {
  return (
    <View style={styles.pillWrap}>
      <View style={styles.pill}>
        <Text style={styles.pillText}>New suggestion for Matcha</Text>
        <Pressable style={styles.pillButton} onPress={() => toast.dismiss(id)}>
          <Text style={styles.pillButtonText}>View</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function CustomJsxDemo() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          emoji="💬"
          label="Message"
          onPress={() => {
            const id = `message-${Date.now()}`;
            toast.custom(<MessageToast id={id} />, { id });
          }}
        />
        <Trigger
          emoji="📤"
          label="Upload progress"
          onPress={() => {
            const id = `upload-${Date.now()}`;
            toast.custom(<UploadToast id={id} />, { id, duration: Infinity });
          }}
        />
        <Trigger
          emoji="🌑"
          label="Dark pill"
          onPress={() => {
            const id = `pill-${Date.now()}`;
            toast.custom(<SuggestionPill id={id} />, { id, position: 'bottom-center' });
          }}
        />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}

const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 6,
} as const;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 22,
    borderCurve: 'continuous',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow,
  },
  column: { flexDirection: 'column', alignItems: 'stretch', padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#3478F6', fontWeight: '700' },
  name: { fontSize: 15, fontWeight: '700' },
  message: { fontSize: 14, color: '#6E6E75' },
  reply: {
    backgroundColor: '#3478F6',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  replyText: { color: '#FFFFFF', fontWeight: '600' },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3, backgroundColor: '#3478F6' },
  fillDone: { backgroundColor: '#22C55E' },
  pillWrap: { alignItems: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#111113',
    borderRadius: 999,
    borderCurve: 'continuous',
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
    ...shadow,
  },
  pillText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  pillButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillButtonText: { color: '#0B0B0D', fontWeight: '600' },
});
