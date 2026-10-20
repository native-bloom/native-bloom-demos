/**
 * Fast Confetti · Like burst
 *
 * One `<PIConfetti />` covers the screen, and `restart({ origins })` moves its
 * origin to wherever the like button was tapped: the touch's `pageX` / `pageY`
 * minus the overlay's own position on screen. Small `initialSpeed`, a few
 * SVG heart flakes and `fadeOutOnEnd` keep it a little pop instead of a party.
 */
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View, type GestureResponderEvent } from 'react-native';
import { Skia, type SkSVG } from '@shopify/react-native-skia';
import { PIConfetti, type PIConfettiMethods } from 'react-native-fast-confetti';

import { memories } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Card, Icon, IconTile, Text, haptic, spacing } from '@/design-system';

const heart = (fill: string) =>
  Skia.SVG.MakeFromString(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${fill}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  ) as SkSVG;

// Textured flakes keep the SVG's own colors, so each pink is its own flake.
const HEARTS = [heart('#FF4D6D'), heart('#FF8FA3'), heart('#C9184A')];

const POSTS = memories.slice(0, 4);

export function LikeBurstDemo() {
  const confetti = useRef<PIConfettiMethods>(null);
  const overlay = useRef<View>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  function toggleLike(id: string, event: GestureResponderEvent) {
    const isLiked = !liked[id];
    setLiked((prev) => ({ ...prev, [id]: isLiked }));
    if (!isLiked) return;

    haptic.success();
    const { pageX, pageY } = event.nativeEvent;
    overlay.current?.measureInWindow((x, y) => {
      confetti.current?.restart({ origins: [{ blastPosition: { x: pageX - x, y: pageY - y } }] });
    });
  }

  return (
    <View ref={overlay} style={styles.fill}>
      <DemoStage align="top">
        {POSTS.map((memory) => (
          <Card key={memory.id} padding="md" style={styles.post}>
            <IconTile emoji={memory.emoji} color={memory.color} size={52} />
            <View style={styles.text}>
              <Text variant="bodyStrong" numberOfLines={2}>
                {memory.title}
              </Text>
              <Text variant="caption" color="textSecondary">
                {memory.category} · {memory.ago}
              </Text>
            </View>
            <Pressable
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={liked[memory.id] ? 'Unlike' : 'Like'}
              onPress={(event) => toggleLike(memory.id, event)}>
              <Icon name="heart" size={24} color={liked[memory.id] ? 'danger' : 'textTertiary'} />
            </Pressable>
          </Card>
        ))}
      </DemoStage>

      <PIConfetti ref={confetti} autoplay={false} fadeOutOnEnd gravity={1.5} flipIntensity={0.3}>
        <PIConfetti.Origin blastPosition="center" count={30} initialSpeed={0.5}>
          {HEARTS.map((svg, i) => (
            <PIConfetti.Flake key={i} size={i === 1 ? 14 : 18} svg={svg} />
          ))}
        </PIConfetti.Origin>
      </PIConfetti>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  post: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  text: { flex: 1, gap: 2 },
});
