/**
 * True Sheet · Mini player
 *
 * The `'peek'` detent collapses the sheet to everything above the bottom edge
 * of `<TrueSheetPeek>`, so the mini player is the collapsed sheet and the full
 * player sits below it. `initialDetentIndex={0}` presents it on mount,
 * `dismissible={false}` keeps it on screen, and `dimmedDetentIndex={1}` only
 * dims the screen once it is expanded. Tapping the mini player calls
 * `resize(1)`.
 */
import { TrueSheet, TrueSheetPeek } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, Icon, IconTile, ListRow, Text, radius, spacing, useColors } from '@/design-system';

const TRACKS = [
  { id: '1', title: 'Slow morning', artist: 'Samsam', emoji: '☕️', color: '#FFF1DB' },
  { id: '2', title: 'Sunday pancakes', artist: 'Leo Lee', emoji: '🥞', color: '#FFE4EC' },
  { id: '3', title: 'Matcha in Brooklyn', artist: 'Sam Lee', emoji: '🍵', color: '#EEF6E2' },
  { id: '4', title: 'Cookie dough', artist: 'Alex Smith', emoji: '🍪', color: '#E8F0FF' },
];

export function MiniPlayerDemo() {
  const colors = useColors();
  const sheet = useRef<TrueSheet>(null);
  const [track, setTrack] = useState(TRACKS[0]!);
  const [playing, setPlaying] = useState(true);

  const playButton = (size: number) => (
    <Pressable
      hitSlop={8}
      onPress={() => setPlaying((p) => !p)}
      style={[styles.play, { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.inverse }]}>
      <Text style={{ color: colors.onInverse, fontSize: size * 0.36 }}>{playing ? '❚❚' : '▶\uFE0E'}</Text>
    </Pressable>
  );

  return (
    <DemoStage align="top">
      <Text variant="title">Kitchen playlist</Text>
      <Card padding={0}>
        {TRACKS.map((t, i) => (
          <ListRow
            key={t.id}
            title={t.title}
            subtitle={t.artist}
            leading={<IconTile emoji={t.emoji} color={t.color} />}
            trailing={t.id === track.id ? <Icon name="play" size={16} color="accent" /> : undefined}
            divider={i > 0}
            chevron={false}
            onPress={() => {
              setTrack(t);
              setPlaying(true);
            }}
          />
        ))}
      </Card>

      <TrueSheet
        ref={sheet}
        detents={['peek', 1]}
        initialDetentIndex={0}
        dismissible={false}
        dimmedDetentIndex={1}>
        <TrueSheetPeek style={styles.peek}>
          <Pressable style={styles.mini} onPress={() => sheet.current?.resize(1)}>
            <IconTile emoji={track.emoji} color={track.color} size={48} />
            <View style={styles.flex}>
              <Text variant="bodyStrong">{track.title}</Text>
              <Text variant="caption" color="textSecondary">
                {track.artist}
              </Text>
            </View>
            {playButton(40)}
          </Pressable>
        </TrueSheetPeek>

        <View style={styles.full}>
          <View style={[styles.artwork, { backgroundColor: track.color }]}>
            <Text style={styles.artworkEmoji}>{track.emoji}</Text>
          </View>
          <View style={styles.meta}>
            <Text variant="title">{track.title}</Text>
            <Text color="textSecondary">{track.artist}</Text>
          </View>
          <View style={[styles.progress, { backgroundColor: colors.surfaceMuted }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.text }]} />
          </View>
          <View style={styles.controls}>
            <Text style={[styles.skip, { color: colors.text }]}>{'◀\uFE0E◀\uFE0E'}</Text>
            {playButton(72)}
            <Text style={[styles.skip, { color: colors.text }]}>{'▶\uFE0E▶\uFE0E'}</Text>
          </View>
        </View>
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  peek: { paddingHorizontal: spacing.xl, paddingTop: spacing['2xl'], paddingBottom: spacing.md },
  mini: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  play: { alignItems: 'center', justifyContent: 'center' },
  full: { paddingHorizontal: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing['2xl'] },
  artwork: {
    aspectRatio: 1,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkEmoji: { fontSize: 120, lineHeight: 140 },
  meta: { gap: 2 },
  progress: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { width: '38%', height: '100%', borderRadius: 3 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 48 },
  skip: { fontSize: 24, letterSpacing: -6 },
});
