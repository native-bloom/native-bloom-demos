/**
 * Masked View · Animated mask
 *
 * The mask element can be animated like any other view. Here it is a circle,
 * driven by Reanimated, that grows from wherever you tap and reveals the
 * picture underneath; tap again to close it from that point. A Gesture
 * Handler tap gives the touch point relative to the card, on the UI thread.
 *
 * On Android, pass `androidRenderingMode="software"` whenever the mask
 * animates; the default hardware mode only renders the mask once.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { photos } from '@/demos/_shared/fixtures';
import { DemoStage, Showcase } from '@/demos/_shared/stage';

const HEIGHT = 360;
// Big enough to cover the card from any corner.
const RADIUS = 520;

export function SpotlightDemo() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const progress = useSharedValue(0);
  const open = useSharedValue(false);

  // Runs on the UI thread; `x` and `y` are relative to the card.
  const tap = Gesture.Tap().onEnd((event) => {
    x.set(event.x);
    y.set(event.y);
    open.set(!open.get());
    progress.set(
      withTiming(open.get() ? 1 : 0, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
    );
  });

  const circle = useAnimatedStyle(() => ({
    left: x.get() - RADIUS,
    top: y.get() - RADIUS,
    transform: [{ scale: progress.get() }],
  }));

  return (
    <DemoStage>
      <Showcase padding={0}>
        <GestureDetector gesture={tap}>
          <View style={styles.card}>
            {/* What you see where the mask hasn't reached yet. */}
            <View style={styles.cover}>
              <Text style={styles.coverEmoji}>🎁</Text>
              <Text style={styles.coverText}>Tap anywhere to open your gift</Text>
            </View>
            <MaskedView
              style={StyleSheet.absoluteFill}
              androidRenderingMode="software"
              maskElement={
                <View style={styles.fill}>
                  <Animated.View style={[styles.circle, circle]} />
                </View>
              }>
              <Image source={photos.strawberries} style={styles.fill} contentFit="cover" />
            </MaskedView>
          </View>
        </GestureDetector>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { height: HEIGHT },
  fill: { flex: 1 },
  cover: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#1B1726',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  coverEmoji: { fontSize: 56, lineHeight: 64 },
  coverText: { color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: '600' },
  circle: {
    position: 'absolute',
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    backgroundColor: '#000',
  },
});
