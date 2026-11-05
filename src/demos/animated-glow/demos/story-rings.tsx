/**
 * Animated Glow · Live story rings
 *
 * A round `AnimatedGlow` (corner radius at least half the size) around each avatar.
 * Friends who are live get a spinning gradient `borderColor` and a faint glow behind it;
 * the rest get the same ring in grey with the glow at zero opacity. The preset's
 * `backgroundColor` matches the screen, which leaves a clean gap between ring and photo.
 * Tapping "Go live" switches your own ring to the live preset, blended by the default
 * state's `transition`.
 *
 * Each ring is its own Skia canvas; a row of five or six is fine, but for long lists
 * render the glow only for live friends.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';
import Animated, { FadeIn } from 'react-native-reanimated';

import { memories, people } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Avatar, Button, Card, IconTile, Text as DSText, useTheme } from '@/design-system';

const LIVE = ['#FF3D71', '#FF9F1C', '#FF3DCB', '#FF3D71'];

function storyRing(live: boolean, dark: boolean): PresetConfig {
  const seen = dark ? '#3A3A3F' : '#D4D4D8';
  return {
    states: [
      {
        name: 'default',
        transition: 600,
        preset: {
          cornerRadius: 40,
          outlineWidth: live ? 3 : 1.5,
          borderColor: live ? LIVE : [seen, seen],
          backgroundColor: dark ? '#000000' : '#F3F3F5',
          animationSpeed: 2,
          glowLayers: [
            {
              glowPlacement: 'behind',
              colors: ['#FF3D71', '#FF9F1C'],
              glowSize: 8,
              opacity: live ? 0.45 : 0,
            },
          ],
        },
      },
    ],
  };
}

const FRIENDS = [
  { ...people[0]!, live: true },
  { ...people[1]!, live: false },
  { ...people[2]!, live: true },
  { ...people[3]!, live: false },
];

function StoryRing({ name, live }: { name: string; live: boolean }) {
  const { scheme } = useTheme();
  return (
    <View style={styles.story}>
      <AnimatedGlow preset={storyRing(live, scheme === 'dark')}>
        <View style={styles.ring}>
          <Avatar name={name} size={56} />
        </View>
      </AnimatedGlow>
      {live ? (
        <View style={[styles.liveBadge, { borderColor: scheme === 'dark' ? '#000000' : '#F3F3F5' }]}>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      ) : null}
      <DSText variant="caption" color="textSecondary" numberOfLines={1}>
        {name.split(' ')[0]}
      </DSText>
    </View>
  );
}

export function StoryRingsDemo() {
  const [live, setLive] = useState(false);

  return (
    <DemoStage
      align="top"
      footer={
        <Button
          label={live ? 'End live' : 'Go live'}
          emoji={live ? '⏹️' : '🔴'}
          variant={live ? 'soft' : 'primary'}
          size="lg"
          style={styles.cta}
          onPress={() => setLive((on) => !on)}
        />
      }>
      <View style={styles.row}>
        <StoryRing name="You" live={live} />
        {FRIENDS.map((f) => (
          <StoryRing key={f.id} name={f.name} live={f.live} />
        ))}
      </View>
      <View style={styles.feed}>
        {memories.slice(0, 3).map((m) => (
          <Animated.View key={m.id} entering={FadeIn}>
            <Card style={styles.memory}>
              <IconTile emoji={m.emoji} color={m.color} />
              <View style={styles.memoryText}>
                <DSText variant="bodyStrong" numberOfLines={1}>
                  {m.title}
                </DSText>
                <DSText variant="label" color="textSecondary">
                  {m.category} · {m.ago}
                </DSText>
              </View>
            </Card>
          </Animated.View>
        ))}
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  story: { alignItems: 'center', gap: 8, width: 66 },
  ring: { padding: 5 },
  liveBadge: {
    position: 'absolute',
    top: 56,
    backgroundColor: '#FF3D71',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
  },
  liveText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  feed: { gap: 12, marginTop: 8 },
  cta: { alignSelf: 'center' },
  memory: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  memoryText: { flex: 1, gap: 2 },
});
