/**
 * True Sheet · Sheet-driven animation
 *
 * `ReanimatedTrueSheet` publishes the sheet's position on the UI thread.
 * `useReanimatedTrueSheet()` returns `animatedIndex`, a float that moves
 * smoothly between detent indexes while dragging (0.5 = halfway between the
 * first and second detent). Here it shrinks, rounds and fades the photo behind
 * the sheet, frame by frame with the finger.
 *
 * Wrap the screen in `ReanimatedTrueSheetProvider`; the hook only works below it.
 */
import {
  ReanimatedTrueSheet,
  ReanimatedTrueSheetProvider,
  useReanimatedTrueSheet,
} from '@lodev09/react-native-true-sheet/reanimated';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { people, photos } from '@/demos/_shared/fixtures';
import { Avatar, Text, spacing } from '@/design-system';

function Cover() {
  const insets = useSafeAreaInsets();
  const { animatedIndex } = useReanimatedTrueSheet();

  const photoStyle = useAnimatedStyle(() => {
    const progress = interpolate(animatedIndex.get(), [0, 1], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: 1 - progress * 0.5,
      borderRadius: progress * 32,
      transform: [{ scale: 1 - progress * 0.12 }, { translateY: -progress * 40 }],
    };
  });

  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.get(), [0, 0.6], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View style={styles.cover}>
      <Animated.Image source={photos.strawberries} style={[styles.photo, photoStyle]} />
      <Animated.View style={[styles.titleWrap, { top: insets.top + spacing['2xl'] }, titleStyle]}>
        <Text style={styles.coverTitle}>Strawberry picking</Text>
        <Text style={styles.coverCaption}>Saturday · Wicks Farm</Text>
      </Animated.View>
    </View>
  );
}

export function AnimatedDemo() {
  return (
    <ReanimatedTrueSheetProvider>
      <View style={styles.fill}>
        <Cover />
        <ReanimatedTrueSheet
          detents={[0.42, 0.75]}
          initialDetentIndex={0}
          dismissible={false}
          dimmed={false}>
          <View style={styles.content}>
            <Text variant="title">Strawberry picking</Text>
            <Text color="textSecondary">
              Two baskets, a lot of sun and the sweetest berries of the year. Leo made jam the
              same evening.
            </Text>
            <View style={styles.people}>
              {people.slice(0, 3).map((person) => (
                <View key={person.id} style={styles.person}>
                  <Avatar name={person.name} size={40} />
                  <Text variant="label">{person.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </ReanimatedTrueSheet>
      </View>
    </ReanimatedTrueSheetProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#000000' },
  cover: { ...StyleSheet.absoluteFill },
  photo: { width: '100%', height: '100%' },
  titleWrap: { position: 'absolute', left: spacing.xl, right: spacing.xl },
  coverTitle: {
    color: '#4A0F24',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -0.8,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowRadius: 10,
  },
  coverCaption: { color: '#8A2E4E', fontSize: 16, fontWeight: '600' },
  content: { padding: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing.lg },
  people: { gap: spacing.md },
  person: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
