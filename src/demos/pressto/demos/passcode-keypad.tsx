/**
 * Pressto · Passcode keypad
 *
 * The keys have no `onPress` of their own. `PressablesConfig globalHandlers`
 * runs one `onPress` for every pressable inside it: it plays a haptic and
 * reads the key from the pressable's `metadata` (`{ key: '7' }`). That is the
 * same setup as app-wide haptics or tap analytics. The keys themselves are a
 * custom pressable that brightens and shrinks on press; delete is a plain
 * `PressableOpacity`, handled by the same global handler. The passcode is 2468;
 * a wrong one shakes the dots.
 *
 * Extra package: expo-haptics.
 */
import * as Haptics from 'expo-haptics';
import {
  createAnimatedPressable,
  PressableOpacity,
  PressablesConfig,
  type AnimatedPressableOptions,
} from 'pressto';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { DemoStage } from '@/demos/_shared/stage';
import { Avatar, Text as ThemedText, useColors } from '@/design-system';

const PASSCODE = '2468';

type KeyMeta = { key: string };

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

const Key = createAnimatedPressable<KeyMeta>((progress) => {
  'worklet';
  return {
    backgroundColor: interpolateColor(
      progress,
      [0, 1],
      ['rgba(127, 127, 127, 0.14)', 'rgba(127, 127, 127, 0.4)'],
    ),
    transform: [{ scale: interpolate(progress, [0, 1], [1, 0.92]) }],
  };
});

export function PasscodeKeypadDemo() {
  const colors = useColors();
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const shake = useSharedValue(0);

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onKey = ({ metadata }: AnimatedPressableOptions<KeyMeta>) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const key = metadata?.key;
    if (!key || unlocked || code.length === 4) return;

    const next = key === 'delete' ? code.slice(0, -1) : code + key;
    setCode(next);
    if (next.length < 4) return;

    if (next === PASSCODE) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setUnlocked(true);
      timer.current = setTimeout(() => {
        setUnlocked(false);
        setCode('');
      }, 2200);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    shake.set(
      withSequence(
        withTiming(-12, { duration: 50 }),
        withTiming(12, { duration: 70 }),
        withTiming(-8, { duration: 70 }),
        withTiming(8, { duration: 70 }),
        withTiming(0, { duration: 50 }),
      ),
    );
    timer.current = setTimeout(() => setCode(''), 400);
  };

  const dotsStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shake.get() }] }));

  return (
    <DemoStage align="top">
      <View style={styles.top}>
        <Avatar name="Sam Lee" size={64} />
        <ThemedText variant="heading">
          {unlocked ? 'Welcome back, Sam' : 'Enter passcode'}
        </ThemedText>
        <Animated.View style={[styles.dots, dotsStyle]}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { borderColor: unlocked ? colors.success : colors.text },
                i < code.length && { backgroundColor: unlocked ? colors.success : colors.text },
              ]}
            />
          ))}
        </Animated.View>
      </View>

      <PressablesConfig globalHandlers={{ onPress: onKey }}>
        <View style={styles.pad}>
          {KEYS.map((key) =>
            key === '' ? (
              <View key="blank" style={styles.key} />
            ) : key === 'delete' ? (
              <PressableOpacity
                key={key}
                metadata={{ key }}
                accessibilityLabel="Delete"
                style={styles.key}>
                <Text style={[styles.deleteLabel, { color: colors.text }]}>Delete</Text>
              </PressableOpacity>
            ) : (
              <Key key={key} metadata={{ key }} accessibilityLabel={key} style={styles.key}>
                <Text style={[styles.digit, { color: colors.text }]}>{key}</Text>
              </Key>
            ),
          )}
        </View>
      </PressablesConfig>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'center', gap: 14, paddingTop: 24, paddingBottom: 28 },
  dots: { flexDirection: 'row', gap: 18, marginTop: 6 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5 },
  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 26,
    rowGap: 16,
    paddingHorizontal: 24,
  },
  key: { width: 78, height: 78, borderRadius: 39, alignItems: 'center', justifyContent: 'center' },
  deleteLabel: { fontSize: 17, fontWeight: '500' },
  digit: { fontSize: 32, fontWeight: '400' },
});
