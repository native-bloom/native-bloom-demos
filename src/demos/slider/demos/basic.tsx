/**
 * Slider · Slider
 *
 * The native slider (UISlider on iOS, SeekBar on Android). Set the range with
 * `minimumValue` / `maximumValue`, pass the current `value`, and read changes
 * from `onValueChange`. `step={1}` snaps it to whole numbers.
 */
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

export function BasicDemo() {
  const [cookies, setCookies] = useState(12);

  return (
    <DemoStage>
      <Showcase>
        <View style={styles.readout}>
          <Text style={styles.emoji}>{'🍪'.repeat(Math.max(1, Math.round(cookies / 6)))}</Text>
          <Text variant="display">{cookies}</Text>
          <Text color="textSecondary">cookies to bake</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={36}
          step={1}
          value={cookies}
          onValueChange={setCookies}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  readout: { alignItems: 'center', gap: 2, marginBottom: 16 },
  emoji: { fontSize: 26, lineHeight: 34, height: 34 },
  slider: { height: 40 },
});
