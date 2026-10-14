/**
 * Masked View · Shimmer text
 *
 * The iPhone "slide to unlock" effect. The text is the mask; behind it sit a
 * dim base color and a bright gradient band that Reanimated slides across in
 * a loop, so the light only shows through the letters. The same trick, with
 * rounded blocks as the mask, makes skeleton loaders shimmer.
 *
 * The loop runs while the component is mounted and stops when it unmounts.
 * On Android, add `androidRenderingMode="software"` if the mask itself moves.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { useEffect, type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { DemoStage } from '@/demos/_shared/stage';
import { radius, spacing, useColors } from '@/design-system';

const WIDTH = 320;
const BAND_WIDTH = WIDTH * 0.45;
const BAND = 'linear-gradient(90deg, transparent 0%, #FFFFFF 40%, #FFFFFF 60%, transparent 100%)';

/** Masks a dim base plus a sliding light band with `mask`. */
function Shimmer({ mask, height, base }: { mask: ReactElement; height: number; base: string }) {
  const x = useSharedValue(-BAND_WIDTH);

  useEffect(() => {
    x.set(withRepeat(withTiming(WIDTH, { duration: 1500, easing: Easing.inOut(Easing.quad) }), -1));
    return () => cancelAnimation(x);
  }, [x]);

  const band = useAnimatedStyle(() => ({ transform: [{ translateX: x.get() }] }));

  return (
    <MaskedView style={{ width: WIDTH, height }} maskElement={mask}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: base }]} />
      <Animated.View style={[styles.band, { experimental_backgroundImage: BAND }, band]} />
    </MaskedView>
  );
}

export function ShimmerDemo() {
  const colors = useColors();

  return (
    <DemoStage>
      <View style={styles.lock}>
        <Text style={styles.time}>9:41</Text>
        <Text style={styles.date}>Saturday, Strawberry picking day</Text>
        <View style={styles.slider}>
          <Shimmer
            height={40}
            base="rgba(255,255,255,0.25)"
            mask={
              <View style={styles.center}>
                <Text style={styles.unlock}>slide to unlock ›</Text>
              </View>
            }
          />
        </View>
      </View>

      <View style={[styles.skeletonCard, { backgroundColor: colors.surface }]}>
        <Shimmer
          height={92}
          base={colors.surfacePressed}
          mask={
            <View style={styles.skeleton}>
              <View style={styles.avatar} />
              <View style={styles.lines}>
                <View style={[styles.line, { width: '70%' }]} />
                <View style={[styles.line, { width: '45%' }]} />
                <View style={[styles.line, { width: '85%' }]} />
              </View>
            </View>
          }
        />
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  lock: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    experimental_backgroundImage: 'linear-gradient(160deg, #4B3FD1 0%, #9B4FD6 55%, #F0709A 100%)',
  },
  time: { fontSize: 72, lineHeight: 80, fontWeight: '200', color: '#FFFFFF' },
  date: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  slider: { marginTop: spacing['3xl'] },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  unlock: { fontSize: 26, fontWeight: '600', color: '#000' },
  band: { position: 'absolute', top: 0, bottom: 0, width: BAND_WIDTH },
  skeletonCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
  },
  skeleton: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#000' },
  lines: { flex: 1, gap: 10 },
  line: { height: 12, borderRadius: 6, backgroundColor: '#000' },
});
