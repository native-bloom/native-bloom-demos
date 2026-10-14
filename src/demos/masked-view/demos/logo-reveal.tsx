/**
 * Masked View · Logo reveal
 *
 * The splash-screen reveal made famous by the Twitter app. The whole app is
 * the child of a MaskedView whose mask is the logo (an SVG heart), centred on
 * a brand-colored background. The logo dips, then scales up until it covers
 * the screen, opening a window onto the app; a white layer inside the mask
 * fades out at the same time so the logo starts out solid.
 *
 * Extra package: react-native-svg for the logo shape. On Android, add
 * `androidRenderingMode="software"` because the mask animates.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { Image } from 'expo-image';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { memories, photos } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, IconTile, ListRow, Text, radius, spacing, useColors } from '@/design-system';

const LOGO = 120;
const BRAND = '#FF5C7A';
const HEART =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

/** The app the logo opens onto. */
function Feed({ onReplay }: { onReplay: () => void }) {
  const colors = useColors();
  return (
    // The app paints its own background, so none of the brand color shows through.
    <View style={[styles.fill, { backgroundColor: colors.canvas }]}>
      <DemoStage align="top">
        <Text variant="display">Bond</Text>
        <Card padding={0} style={styles.hero}>
          <Image source={photos.strawberries} style={styles.heroImage} contentFit="cover" />
          <View style={styles.heroText}>
            <Text variant="heading">Strawberry picking</Text>
            <Text variant="caption" color="textSecondary">
              Sam Lee · Saturday
            </Text>
          </View>
        </Card>
        <Card padding={0}>
          {memories.slice(0, 3).map((m, i) => (
            <ListRow
              key={m.id}
              title={m.title}
              subtitle={m.ago}
              leading={<IconTile emoji={m.emoji} color={m.color} />}
              divider={i > 0}
            />
          ))}
        </Card>
        <View style={styles.replay}>
          <Trigger emoji="🔁" label="Replay" onPress={onReplay} />
        </View>
      </DemoStage>
    </View>
  );
}

export function LogoRevealDemo() {
  const scale = useSharedValue(1);
  const cover = useSharedValue(1);

  const play = useCallback(() => {
    scale.set(1);
    cover.set(1);
    scale.set(
      withDelay(
        500,
        withSequence(
          withTiming(0.8, { duration: 300, easing: Easing.out(Easing.quad) }),
          withTiming(30, { duration: 900, easing: Easing.in(Easing.cubic) }),
        ),
      ),
    );
    cover.set(withDelay(850, withTiming(0, { duration: 350 })));
  }, [scale, cover]);

  useEffect(() => {
    play();
  }, [play]);

  const logoStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));
  const coverStyle = useAnimatedStyle(() => ({ opacity: cover.get() }));

  return (
    <View style={[styles.fill, { backgroundColor: BRAND }]}>
      <MaskedView
        style={styles.fill}
        androidRenderingMode="software"
        maskElement={
          <View style={styles.maskCenter}>
            <Animated.View style={logoStyle}>
              <Svg width={LOGO} height={LOGO} viewBox="0 0 24 24">
                <Path d={HEART} fill="#000" />
              </Svg>
            </Animated.View>
          </View>
        }>
        <Feed onReplay={play} />
        {/* Solid white while the logo is small, so it reads as a logo first. */}
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.cover, coverStyle]}
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  maskCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cover: { backgroundColor: '#FFFFFF' },
  hero: { overflow: 'hidden' },
  heroImage: { width: '100%', height: 200 },
  heroText: { padding: spacing.lg, gap: 2 },
  replay: { alignItems: 'center', marginTop: spacing.sm, borderRadius: radius.pill },
});
