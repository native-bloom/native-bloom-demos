/**
 * Slider · Rate your visit
 *
 * A five-step slider as a rating control. `StepMarker` draws an emoji at each
 * step that grows when the thumb is on it (`stepMarked`) and fades when it is
 * past. The thumb itself is hidden with a transparent `thumbTintColor`, so the
 * emoji are the whole interface: drag across the faces to pick one. The
 * markers use `pointerEvents="none"` so they don't block touches. (`tapToSeek`
 * is set, but in 5.2 on iOS 26 a tap didn't move the thumb in testing.)
 */
import Slider, { type MarkerProps } from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DemoStage } from '@/demos/_shared/stage';
import { Button, Card, IconTile, Text as ThemedText, spacing } from '@/design-system';

const FACES = ['😖', '🙁', '😐', '🙂', '😍'];
const WORDS = ['Not for me', 'Could be better', 'It was fine', 'Really good', 'Loved it'];

function Face({ index, stepMarked }: MarkerProps) {
  return (
    <View pointerEvents="none" style={styles.marker}>
      <Text style={[styles.face, stepMarked ? styles.faceOn : styles.faceOff]}>{FACES[index]}</Text>
    </View>
  );
}

export function RatingDemo() {
  const [rating, setRating] = useState(3);
  const [sent, setSent] = useState(false);

  return (
    <DemoStage
      align="top"
      footer={
        <Button
          label={sent ? 'Thanks for your review ✓' : 'Send review'}
          variant={sent ? 'soft' : 'primary'}
          fullWidth
          onPress={() => setSent(true)}
        />
      }>
      <Card padding="md" style={styles.place}>
        <IconTile emoji="🍵" color="#EEF6E2" size={52} />
        <View style={styles.flex}>
          <ThemedText variant="bodyStrong">Plentea Matcha</ThemedText>
          <ThemedText variant="caption" color="textSecondary">
            Saturday with Sam Lee
          </ThemedText>
        </View>
      </Card>

      <Card padding="lg" style={styles.rate}>
        <ThemedText variant="heading" align="center">
          How was your visit?
        </ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={4}
          step={1}
          value={rating}
          onValueChange={(value) => {
            setRating(value);
            setSent(false);
          }}
          StepMarker={Face}
          tapToSeek
          thumbTintColor="transparent"
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
        />
        <ThemedText variant="title" align="center">
          {WORDS[rating]}
        </ThemedText>
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  place: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  rate: { gap: spacing.lg, paddingVertical: spacing['2xl'] },
  slider: { height: 40, marginVertical: 16 },
  marker: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  face: { textAlign: 'center' },
  faceOn: { fontSize: 50, lineHeight: 56 },
  faceOff: { fontSize: 30, lineHeight: 36, opacity: 0.45 },
});
