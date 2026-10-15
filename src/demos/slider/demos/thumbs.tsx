/**
 * Slider · Thumb size and images
 *
 * `thumbSize` sets the thumb's width and height (points on iOS, dp on
 * Android), and `thumbTintColor` colors it.
 *
 * `thumbImage` is meant to replace the thumb with a picture, but in 5.2 on
 * iOS 26 with the New Architecture the image never appears (local or remote),
 * so it isn't shown here.
 */
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <Text variant="label" color="textSecondary">
        {label}
      </Text>
      {children}
    </View>
  );
}

export function ThumbsDemo() {
  const [a, setA] = useState(0.3);
  const [b, setB] = useState(0.55);
  const [c, setC] = useState(0.75);

  return (
    <DemoStage>
      <Showcase>
        <Row label="Small thumb">
          <Slider style={styles.slider} value={a} onValueChange={setA} thumbSize={16} />
        </Row>
        <Row label="Large thumb">
          <Slider
            style={styles.slider}
            value={b}
            onValueChange={setB}
            thumbSize={36}
            minimumTrackTintColor="#3478F6"
          />
        </Row>
        <Row label="Tinted thumb">
          <Slider
            style={styles.slider}
            value={c}
            onValueChange={setC}
            thumbSize={30}
            thumbTintColor="#FF2D78"
            minimumTrackTintColor="#FF2D78"
            maximumTrackTintColor="#FFD1E0"
          />
        </Row>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: { gap: 2, marginBottom: 10 },
  slider: { height: 48 },
});
