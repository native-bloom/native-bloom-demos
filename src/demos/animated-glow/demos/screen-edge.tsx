/**
 * Animated Glow · Screen edge glow
 *
 * The whole screen sits inside one `AnimatedGlow` (`style` and `wrapperStyle` both
 * `flex: 1`), with `inside` glow layers and a corner radius close to the phone's own
 * corners. When the assistant starts listening, the screen switches to the listening
 * preset: the glow rises from zero opacity, grows and speeds up; when it's done, the
 * glow fades back out. Both presets have the same layers and a `transition` on their
 * default state, which is what makes it blend.
 *
 * The preset has no `backgroundColor`, so the glow is drawn over the screen's own
 * background and shows in light and dark mode. Keep `inside` colors saturated: white and
 * pastels render as a dark band on iOS (v3.2 with Skia 2.6).
 *
 * The transcript and answer are canned; in an app they'd come from speech recognition
 * and your assistant.
 */
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

import { places } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Button, Card, IconTile, Text } from '@/design-system';

const EDGE_COLORS = ['#A855F7', '#EC4899', '#6366F1', '#F43F5E', '#F59E0B', '#8B5CF6'];

function edgeGlow(listening: boolean): PresetConfig {
  return {
    states: [
      {
        name: 'default',
        transition: 700,
        preset: {
          cornerRadius: 56,
          outlineWidth: 0,
          animationSpeed: listening ? 1.6 : 0.6,
          glowLayers: [
            {
              glowPlacement: 'inside',
              colors: EDGE_COLORS,
              glowSize: listening ? 34 : 12,
              opacity: listening ? 0.55 : 0,
            },
            {
              glowPlacement: 'inside',
              colors: EDGE_COLORS,
              glowSize: listening ? 6 : 2,
              opacity: listening ? 0.9 : 0,
              speedMultiplier: 1.5,
            },
          ],
        },
      },
    ],
  };
}

const TRANSCRIPT = 'Find a quiet tea place for Friday night'.split(' ');

export function ScreenEdgeDemo() {
  const [listening, setListening] = useState(false);
  const [words, setWords] = useState(0);
  const [answered, setAnswered] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const kettl = places.find((p) => p.id === 'kettl')!;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function listen() {
    timers.current.forEach(clearTimeout);
    setAnswered(false);
    setWords(0);
    setListening(true);
    timers.current = TRANSCRIPT.map((_, i) => setTimeout(() => setWords(i + 1), 700 + i * 320));
    timers.current.push(
      setTimeout(
        () => {
          setListening(false);
          setAnswered(true);
        },
        700 + TRANSCRIPT.length * 320 + 900,
      ),
    );
  }

  return (
    <AnimatedGlow preset={edgeGlow(listening)} style={styles.fill} wrapperStyle={styles.fill}>
      <DemoStage
        footer={
          <Button
            label={listening ? 'Listening…' : 'Ask Bond'}
            emoji="🎙️"
            size="lg"
            disabled={listening}
            style={styles.cta}
            onPress={listen}
          />
        }>
        <View style={styles.center}>
          {answered ? (
            <Animated.View entering={FadeInDown.duration(400)} style={styles.answer}>
              <Text variant="title" align="center">
                Kettl is quiet on Friday night
              </Text>
              <Card style={styles.place}>
                <IconTile emoji="🍵" color="#EEF6E2" />
                <View style={styles.placeText}>
                  <Text variant="bodyStrong">{kettl.name}</Text>
                  <Text variant="label" color="textSecondary">
                    {kettl.kind} · ★ {kettl.rating} · {kettl.address}
                  </Text>
                </View>
              </Card>
            </Animated.View>
          ) : listening ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Text variant="display" align="center">
                {words === 0 ? 'Listening…' : TRANSCRIPT.slice(0, words).join(' ')}
              </Text>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn} style={styles.idle}>
              <Text style={styles.wave}>👋</Text>
              <Text variant="display" align="center">
                Hi Sam, what are you planning?
              </Text>
            </Animated.View>
          )}
        </View>
      </DemoStage>
    </AnimatedGlow>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  cta: { alignSelf: 'center' },
  center: { flex: 1, justifyContent: 'center', paddingHorizontal: 12 },
  idle: { alignItems: 'center', gap: 12 },
  wave: { fontSize: 48 },
  answer: { gap: 20 },
  place: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  placeText: { flex: 1, gap: 2 },
});
