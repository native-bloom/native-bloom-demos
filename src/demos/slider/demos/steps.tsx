/**
 * Slider · Steps and ranges
 *
 * `minimumValue` and `maximumValue` set any range, negative numbers included.
 * `step` snaps the thumb (0 means continuous). On iOS, `tapToSeek` is meant to
 * jump the thumb to wherever you tap on the track; in 5.2 on iOS 26 taps
 * didn't move it in testing, so dragging is the reliable path.
 */
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

function Row({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowHeader}>
        <Text variant="bodyStrong">{label}</Text>
        <Text color="textSecondary">{value}</Text>
      </View>
      {children}
    </View>
  );
}

export function StepsDemo() {
  const [oven, setOven] = useState(180);
  const [sugar, setSugar] = useState(0.5);
  const [freezer, setFreezer] = useState(-18);

  return (
    <DemoStage>
      <Showcase>
        <Row label="🔥 Oven" value={`${oven}°C`}>
          <Slider
            style={styles.slider}
            minimumValue={140}
            maximumValue={240}
            step={10}
            value={oven}
            onValueChange={setOven}
            tapToSeek
          />
        </Row>
        <Row label="🍬 Sugar" value={`${sugar.toFixed(2)} cup`}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.25}
            value={sugar}
            onValueChange={setSugar}
            tapToSeek
          />
        </Row>
        <Row label="🧊 Freezer" value={`${freezer}°C`}>
          <Slider
            style={styles.slider}
            minimumValue={-24}
            maximumValue={-12}
            step={1}
            value={freezer}
            onValueChange={setFreezer}
            tapToSeek
          />
        </Row>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: { gap: 4, marginBottom: 8 },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  slider: { height: 40 },
});
