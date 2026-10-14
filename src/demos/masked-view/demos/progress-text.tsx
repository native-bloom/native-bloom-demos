/**
 * Masked View · Progress fill text
 *
 * The percentage is the mask; behind it, a grey base and a colored fill that
 * rises with the upload. The text looks like it fills up like a glass, with
 * no custom text rendering. The fill height animates with Reanimated; the
 * number re-renders with the progress state.
 *
 * The upload is simulated with a timer that stops at 100% and is cleared on
 * unmount. On Android, add `androidRenderingMode="software"`: the mask changes
 * as the number updates.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, IconTile, Text as ThemedText, spacing, useColors } from '@/design-system';

const HEIGHT = 150;

export function ProgressTextDemo() {
  const colors = useColors();
  const [percent, setPercent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function upload() {
    if (timer.current) clearInterval(timer.current);
    setPercent(0);
    timer.current = setInterval(() => {
      setPercent((p) => {
        if (p >= 100) {
          if (timer.current) clearInterval(timer.current);
          return 100;
        }
        return p + 1;
      });
    }, 35);
  }

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const fill = useAnimatedStyle(() => ({
    height: withTiming((percent / 100) * HEIGHT, { duration: 120 }),
  }));

  const done = percent >= 100;

  return (
    <DemoStage
      align="top"
      footer={
        <Trigger
          tone="primary"
          emoji="☁️"
          label={percent === 0 || done ? 'Upload memory' : 'Uploading…'}
          onPress={upload}
        />
      }>
      <Card padding="lg" style={styles.memory}>
        <IconTile emoji="🍓" color="#FFE1E1" size={52} />
        <View style={styles.flex}>
          <ThemedText variant="bodyStrong">Strawberry picking</ThemedText>
          <ThemedText variant="caption" color="textSecondary">
            24 photos · 86 MB
          </ThemedText>
        </View>
      </Card>

      <View style={styles.center}>
        <MaskedView
          style={styles.masked}
          androidRenderingMode="software"
          maskElement={
            <View style={styles.maskBox}>
              <Text style={styles.percent}>{percent}%</Text>
            </View>
          }>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surfacePressed }]} />
          <Animated.View
            style={[styles.fill, { backgroundColor: done ? '#22C55E' : '#3478F6' }, fill]}
          />
        </MaskedView>
        <ThemedText color="textSecondary">
          {done ? 'Shared with Sam Lee' : 'Uploading to the album'}
        </ThemedText>
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  memory: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  center: { alignItems: 'center', marginTop: spacing['4xl'], gap: spacing.sm },
  masked: { width: 320, height: HEIGHT },
  maskBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  percent: {
    fontSize: 120,
    lineHeight: HEIGHT,
    fontWeight: '900',
    letterSpacing: -6,
    color: '#000',
  },
  fill: { position: 'absolute', left: 0, right: 0, bottom: 0 },
});
