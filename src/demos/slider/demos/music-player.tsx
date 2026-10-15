/**
 * Slider · Music player
 *
 * A scrubber and a volume slider. The scrubber follows playback, but while
 * the finger is down (`onSlidingStart`) the playhead stops updating it, the
 * time label previews the drag position (`onValueChange`), and the track
 * only seeks when the finger lifts (`onSlidingComplete`). Playback is a timer
 * that runs while playing and is cleared on unmount.
 */
import Slider from '@react-native-community/slider';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, Text, radius, spacing, useColors } from '@/design-system';

const LENGTH = 214; // 3:34

function clock(seconds: number) {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function MusicPlayerDemo() {
  const colors = useColors();
  const [position, setPosition] = useState(48);
  const [scrub, setScrub] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const scrubbing = useRef(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (!scrubbing.current) setPosition((p) => (p >= LENGTH ? 0 : p + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const shown = scrub ?? position;

  return (
    <DemoStage align="top">
      <View style={[styles.artwork, { backgroundColor: '#FFF1DB' }]}>
        <Text style={styles.artworkEmoji}>☕️</Text>
      </View>
      <View>
        <Text variant="title">Slow morning</Text>
        <Text color="textSecondary">Samsam · Kitchen playlist</Text>
      </View>

      <View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={LENGTH}
          value={position}
          onSlidingStart={() => {
            scrubbing.current = true;
          }}
          onValueChange={setScrub}
          onSlidingComplete={(value) => {
            scrubbing.current = false;
            setPosition(value);
            setScrub(null);
          }}
          minimumTrackTintColor={colors.text}
          maximumTrackTintColor={colors.surfacePressed}
          thumbTintColor={colors.text}
          thumbSize={scrub !== null ? 22 : 14}
        />
        <View style={styles.times}>
          <Text variant="caption" color={scrub !== null ? 'accent' : 'textSecondary'}>
            {clock(shown)}
          </Text>
          <Text variant="caption" color="textSecondary">
            -{clock(LENGTH - shown)}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Text style={[styles.skip, { color: colors.text }]}>{'◀︎◀︎'}</Text>
        <Pressable
          onPress={() => setPlaying((p) => !p)}
          style={[styles.play, { backgroundColor: colors.inverse }]}>
          <Text style={{ color: colors.onInverse, fontSize: 26 }}>{playing ? '❚❚' : '▶︎'}</Text>
        </Pressable>
        <Text style={[styles.skip, { color: colors.text }]}>{'▶︎▶︎'}</Text>
      </View>

      <Card padding="md" style={styles.volume}>
        <Text>🔈</Text>
        <Slider
          style={styles.flex}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor={colors.textSecondary}
        />
        <Text>🔊</Text>
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  artwork: {
    aspectRatio: 1.4,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkEmoji: { fontSize: 96, lineHeight: 112 },
  slider: { height: 36 },
  times: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 48 },
  skip: { fontSize: 24, letterSpacing: -6 },
  play: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  volume: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  flex: { flex: 1, height: 36 },
});
