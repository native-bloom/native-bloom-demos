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

import { people, stickerArt } from '@/demos/_shared/fixtures';
import { Avatar, Text, spacing, useColors, useTheme } from '@/design-system';

function Cover() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { scheme } = useTheme();
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
      <Animated.Image source={stickerArt.cover[scheme]} style={[styles.photo, photoStyle]} />
      <Animated.View style={[styles.titleWrap, { top: insets.top + spacing['2xl'] }, titleStyle]}>
        <Text style={[styles.coverTitle, { color: colors.text }]}>Surf trip</Text>
        <Text style={[styles.coverCaption, { color: colors.textSecondary }]}>
          Saturday · Rockaway Beach
        </Text>
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
            <Text variant="title">Surf trip</Text>
            <Text color="textSecondary">
              Two boards, a lot of sun and the best waves of the summer. Leo stuck a new sticker on
              his board for every wave he caught.
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
  coverTitle: { fontSize: 34, lineHeight: 40, fontWeight: '800', letterSpacing: -0.8 },
  coverCaption: { fontSize: 16, fontWeight: '600' },
  content: { padding: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing.lg },
  people: { gap: spacing.md },
  person: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
