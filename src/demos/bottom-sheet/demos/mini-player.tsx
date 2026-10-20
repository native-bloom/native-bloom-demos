/**
 * Bottom Sheet · Mini player
 *
 * A music-app mini player that is really a bottom sheet with two snap points:
 * the mini bar and the full screen. Pass your own `animatedIndex` shared value
 * and the sheet writes its live position into it (0 = mini, 1 = full, and
 * everything in between while dragging), so Reanimated styles can cross-fade
 * the mini bar into the full player with the finger. `handleComponent={null}`
 * drops the grabber; tapping the mini bar calls `expand()`.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import BottomSheet, {
  BottomSheetView,
  type BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DemoStage } from '@/demos/_shared/stage';
import { IconTile, ListRow, Text as ThemedText, spacing } from '@/design-system';

const MINI_HEIGHT = 72;

const PLAYLISTS = [
  { emoji: '🍪', title: 'Sunday baking', subtitle: '24 songs · Sam Lee', color: '#FFF1DB' },
  { emoji: '🍵', title: 'Café mornings', subtitle: '18 songs · Alex Smith', color: '#EEF6E2' },
  { emoji: '🎄', title: 'Festive treats', subtitle: '31 songs · Samsam', color: '#FFE4EC' },
  { emoji: '🌙', title: 'Late night dough', subtitle: '12 songs · Leo Lee', color: '#E8F0FF' },
];

function PlayerBackground({ style }: BottomSheetBackgroundProps) {
  return <View style={[style, styles.background]} />;
}

function PlayButton({
  playing,
  size,
  onPress,
}: {
  playing: boolean;
  size: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={playing ? 'Pause' : 'Play'}
      hitSlop={10}
      onPress={onPress}
      style={[styles.play, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ fontSize: size * 0.4, lineHeight: size * 0.5, color: '#141416' }}>
        {playing ? '❚❚' : '▶︎'}
      </Text>
    </Pressable>
  );
}

export function MiniPlayerDemo() {
  const insets = useSafeAreaInsets();
  const sheet = useRef<BottomSheet>(null);
  const animatedIndex = useSharedValue(0);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);

  const miniStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.get(), [0, 0.25], [1, 0], Extrapolation.CLAMP),
  }));
  const fullStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.get(), [0.3, 0.9], [0, 1], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(animatedIndex.get(), [0, 1], [60, 0], Extrapolation.CLAMP) },
    ],
  }));
  const artworkStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(animatedIndex.get(), [0.3, 1], [0.6, 1], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <View style={styles.fill}>
      <DemoStage align="top">
        <ThemedText variant="title" style={styles.heading}>
          Playlists
        </ThemedText>
        <View>
          {PLAYLISTS.map((p) => (
            <ListRow
              key={p.title}
              title={p.title}
              subtitle={p.subtitle}
              leading={<IconTile emoji={p.emoji} color={p.color} size={52} />}
            />
          ))}
        </View>
      </DemoStage>

      <BottomSheet
        accessible={false}
        ref={sheet}
        index={0}
        snapPoints={[MINI_HEIGHT + insets.bottom, '100%']}
        enableDynamicSizing={false}
        animatedIndex={animatedIndex}
        onChange={(index) => setExpanded(index === 1)}
        handleComponent={null}
        backgroundComponent={PlayerBackground}>
        <BottomSheetView style={styles.sheet}>
          <Animated.View
            style={[styles.mini, miniStyle]}
            pointerEvents={expanded ? 'none' : 'auto'}>
            <Pressable style={styles.miniTap} onPress={() => sheet.current?.expand()}>
              <View style={styles.miniArt}>
                <Text style={styles.miniEmoji}>🍪</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.miniTitle}>Butter and sugar</Text>
                <Text style={styles.miniArtist}>Sunday baking</Text>
              </View>
            </Pressable>
            <PlayButton playing={playing} size={40} onPress={() => setPlaying((p) => !p)} />
          </Animated.View>

          <Animated.View
            style={[styles.full, { paddingBottom: insets.bottom + 24 }, fullStyle]}
            pointerEvents={expanded ? 'auto' : 'none'}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Minimize"
              hitSlop={12}
              onPress={() => sheet.current?.collapse()}
              style={styles.chevron}>
              <View style={styles.chevronBar} />
            </Pressable>
            <Animated.View style={[styles.artwork, artworkStyle]}>
              <Text style={styles.artworkEmoji}>🍪</Text>
            </Animated.View>
            <View style={styles.meta}>
              <Text style={styles.title}>Butter and sugar</Text>
              <Text style={styles.artist}>Sunday baking · Sam Lee</Text>
            </View>
            <View style={styles.progress}>
              <View style={styles.track}>
                <View style={styles.trackFill} />
              </View>
              <View style={styles.times}>
                <Text style={styles.time}>1:24</Text>
                <Text style={styles.time}>3:41</Text>
              </View>
            </View>
            <View style={styles.controls}>
              <Text style={styles.skip}>⏮︎</Text>
              <PlayButton playing={playing} size={76} onPress={() => setPlaying((p) => !p)} />
              <Text style={styles.skip}>⏭︎</Text>
            </View>
          </Animated.View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  flex: { flex: 1 },
  heading: { paddingHorizontal: spacing.xs },
  background: {
    backgroundColor: '#141416',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderCurve: 'continuous',
  },
  sheet: { flex: 1 },
  mini: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: MINI_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  miniTap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  miniArt: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFF1DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniEmoji: { fontSize: 26, lineHeight: 32 },
  miniTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  miniArtist: { color: '#A1A1A8', fontSize: 13 },
  play: { backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  full: { flex: 1, paddingHorizontal: 28, paddingTop: 8, gap: 28 },
  chevron: { alignSelf: 'center', padding: 8, marginBottom: -12 },
  chevronBar: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#FFFFFF4D' },
  artwork: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 28,
    borderCurve: 'continuous',
    backgroundColor: '#FFF1DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkEmoji: { fontSize: 140, lineHeight: 168 },
  meta: { gap: 4 },
  title: { color: '#FFFFFF', fontSize: 26, fontWeight: '700', letterSpacing: -0.4 },
  artist: { color: '#A1A1A8', fontSize: 17 },
  progress: { gap: 8 },
  track: { height: 4, borderRadius: 2, backgroundColor: '#FFFFFF26' },
  trackFill: { width: '38%', height: 4, borderRadius: 2, backgroundColor: '#FFFFFF' },
  times: { flexDirection: 'row', justifyContent: 'space-between' },
  time: { color: '#A1A1A8', fontSize: 12, fontVariant: ['tabular-nums'] },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },
  skip: { color: '#FFFFFF', fontSize: 34, lineHeight: 40 },
});
