/**
 * Pressto · Animated children
 *
 * Pass a function as `children` and every pressable hands you its shared
 * values: `progress` (0 idle → 1 pressed), `isPressed`, `isToggled`,
 * `isSelected` and `withAnimation`. Pass them to a child component and drive
 * its parts with `useAnimatedStyle`. The card is a `PressableWithoutFeedback`
 * (no press style of its own), so only its contents move: the picture zooms,
 * a shade darkens it and the arrow slides out.
 */
import { PressableWithoutFeedback, type PressableChildrenCallbackParams } from 'pressto';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { stickerArt } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage } from '@/demos/_shared/stage';
import { Icon, Text, useColors } from '@/design-system';

function LessonCardContent({ progress }: Pick<PressableChildrenCallbackParams, 'progress'>) {
  const colors = useColors();

  const zoom = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.get(), [0, 1], [1, 1.12]) }],
  }));
  const shade = useAnimatedStyle(() => ({
    opacity: interpolate(progress.get(), [0, 1], [0, 0.18]),
  }));
  const arrow = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.get(), [0, 1], [0, 8]) }],
  }));

  return (
    <>
      <View style={styles.pictureClip}>
        <Animated.View style={[StyleSheet.absoluteFill, zoom]}>
          <Picture art={stickerArt.cardSurf} style={StyleSheet.absoluteFill} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, styles.shade, shade]} />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text variant="heading">Surf lessons with Leo</Text>
          <Text variant="label" color="textSecondary">
            Rockaway Beach · Saturday 9 AM
          </Text>
        </View>
        <Animated.View style={[styles.arrow, { backgroundColor: colors.inverse }, arrow]}>
          <Icon name="forward" size={16} color="onInverse" />
        </Animated.View>
      </View>
    </>
  );
}

export function AnimatedChildrenDemo() {
  const colors = useColors();

  return (
    <DemoStage>
      <PressableWithoutFeedback
        accessibilityLabel="Surf lessons with Leo"
        style={[styles.card, { backgroundColor: colors.surface }]}>
        {({ progress }) => <LessonCardContent progress={progress} />}
      </PressableWithoutFeedback>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    borderCurve: 'continuous',
    overflow: 'hidden',
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.06)',
  },
  pictureClip: { aspectRatio: 1.25, overflow: 'hidden' },
  shade: { backgroundColor: '#000000' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18 },
  footerText: { flex: 1, gap: 2 },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
