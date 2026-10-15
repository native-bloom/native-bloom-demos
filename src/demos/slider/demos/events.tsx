/**
 * Slider · Slide events
 *
 * Three callbacks cover a drag: `onSlidingStart` when the finger goes down,
 * `onValueChange` on every move, and `onSlidingComplete` when it lifts. Show
 * a preview while dragging and only commit (save, send a request) on
 * complete.
 */
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text, useColors } from '@/design-system';

export function EventsDemo() {
  const colors = useColors();
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(25);
  const [saved, setSaved] = useState(25);

  return (
    <DemoStage>
      <Showcase>
        <Text variant="caption" color="textSecondary" align="center">
          ⏰ REMIND ME BEFORE MATCHA WITH SAM
        </Text>
        <Text
          variant="display"
          align="center"
          style={{ color: dragging ? colors.accent : colors.text }}>
          {preview} min
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={60}
          step={5}
          value={saved}
          onSlidingStart={() => setDragging(true)}
          onValueChange={setPreview}
          onSlidingComplete={(value) => {
            setDragging(false);
            setSaved(value);
          }}
          minimumTrackTintColor="#3478F6"
        />
        <View style={[styles.status, { backgroundColor: colors.surfaceMuted }]}>
          <Text variant="label" color="textSecondary">
            {dragging ? '✋ Dragging…' : `✓ Saved: ${saved} min before`}
          </Text>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  slider: { height: 44, marginVertical: 8 },
  status: { alignSelf: 'center', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
});
