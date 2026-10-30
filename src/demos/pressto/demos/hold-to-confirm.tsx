/**
 * Pressto · Hold to confirm
 *
 * A destructive button that only fires when held. The pressable gets its own
 * `animationType="timing"` and a linear 600 ms `animationConfig`, so
 * `progress` takes exactly as long to reach 1 as Gesture Handler's default
 * long-press delay (600 ms). A child component turns `progress` into the fill
 * width, and `onLongPress` deletes. Let go early and the fill drains back.
 *
 * iOS 26: on a native-stack screen, keep `fullScreenGestureEnabled: false`
 * (see the library `setup`), or a held finger only reaches the button when it
 * lifts and the long press never fires.
 */
import { PressableScale, type PressableChildrenCallbackParams } from 'pressto';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, useAnimatedStyle } from 'react-native-reanimated';

import { stickerArt } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage } from '@/demos/_shared/stage';
import { Button, Card, Text as ThemedText, haptic } from '@/design-system';

const HOLD = { duration: 600, easing: Easing.linear };

function HoldFill({ progress }: Pick<PressableChildrenCallbackParams, 'progress'>) {
  const fill = useAnimatedStyle(() => ({ width: `${progress.get() * 100}%` }));

  return (
    <>
      <Animated.View style={[styles.fill, fill]} />
      <Text style={styles.holdLabel}>Hold to delete</Text>
    </>
  );
}

export function HoldToConfirmDemo() {
  const [deleted, setDeleted] = useState(false);

  return (
    <DemoStage>
      {deleted ? (
        <Animated.View key="deleted" entering={FadeIn} style={styles.deleted}>
          <ThemedText style={styles.deletedEmoji}>🗑️</ThemedText>
          <ThemedText variant="heading">Memory deleted</ThemedText>
          <Button
            label="Restore"
            variant="soft"
            onPress={() => setDeleted(false)}
            style={styles.restore}
          />
        </Animated.View>
      ) : (
        <Animated.View key="card" entering={FadeIn} exiting={FadeOut}>
          <Card padding="md">
            <Picture art={stickerArt.cardSkate} style={styles.picture} />
            <View style={styles.caption}>
              <ThemedText variant="heading">Skate park with Ryan</ThemedText>
              <ThemedText variant="label" color="textSecondary">
                12 photos · Last summer
              </ThemedText>
            </View>
            <PressableScale
              animationType="timing"
              animationConfig={HOLD}
              accessibilityLabel="Hold to delete"
              onLongPress={() => {
                haptic.success();
                setDeleted(true);
              }}
              style={styles.holdButton}>
              {({ progress }) => <HoldFill progress={progress} />}
            </PressableScale>
          </Card>
        </Animated.View>
      )}
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  picture: { aspectRatio: 1.6, borderRadius: 14 },
  caption: { gap: 2, paddingVertical: 14, paddingHorizontal: 4 },
  holdButton: {
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  holdLabel: { fontSize: 16, fontWeight: '700', color: '#E5383B' },
  deleted: { alignItems: 'center', gap: 12 },
  restore: { alignSelf: 'center' },
  deletedEmoji: { fontSize: 48, lineHeight: 56 },
});
