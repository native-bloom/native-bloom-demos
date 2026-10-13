/**
 * Reanimated Color Picker · Picker in a scroll view
 *
 * A picker inside a scrolling settings page. With the `ScrollView` from
 * react-native-gesture-handler, a drag that starts on a slider moves the
 * slider and never scrolls the page; drags elsewhere still scroll. (With
 * Reanimated's `Animated.ScrollView`, pass each slider a `Gesture.Pan()` in
 * `gestures` that turns `scrollEnabled` off while it is active.)
 *
 * The album tile follows the picker live: `onChange` is a worklet that writes
 * a shared value on the UI thread, with no React re-render while dragging.
 *
 * Based on the library's `With RNGH ScrollView` and
 * `With Reanimated ScrollView` examples.
 */
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPicker, {
  HSLSaturationSlider,
  HueSlider,
  LuminanceSlider,
  type ColorFormatsObject,
} from 'reanimated-color-picker';

import { DemoStage } from '@/demos/_shared/stage';
import { memories } from '@/demos/_shared/fixtures';
import { Card, IconTile, ListRow, Section, SwitchRow, Text, spacing } from '@/design-system';

const INITIAL = '#FF8FB1';

export function ScrollViewDemo() {
  const albumColor = useSharedValue(INITIAL);

  // Runs on the UI thread for every frame of the drag.
  function onChange(result: ColorFormatsObject) {
    'worklet';
    albumColor.set(result.hex);
  }

  const tileStyle = useAnimatedStyle(() => ({ backgroundColor: albumColor.get() }));

  return (
    <DemoStage bleed>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card padding="lg" style={styles.album}>
          <Animated.View style={[styles.cover, tileStyle]}>
            <Text style={styles.coverEmoji}>🧁</Text>
          </Animated.View>
          <Text variant="heading" align="center">
            Festive treats
          </Text>
          <Text variant="caption" color="textSecondary" align="center">
            12 memories · shared with Sam Lee
          </Text>
        </Card>

        <Section title="Album color">
          <Card padding="lg">
            <ColorPicker
              value={INITIAL}
              sliderThickness={28}
              thumbSize={28}
              thumbShape="circle"
              onChange={onChange}
              style={styles.picker}
              adaptSpectrum
              boundedThumb>
              <HueSlider style={styles.slider} />
              <HSLSaturationSlider style={styles.slider} />
              <LuminanceSlider style={styles.slider} />
            </ColorPicker>
          </Card>
        </Section>

        <Section title="Album">
          <Card padding={0}>
            <SwitchRow label="Show on profile" value onValueChange={() => {}} />
            <SwitchRow label="Let friends add memories" value={false} onValueChange={() => {}} divider />
          </Card>
        </Section>

        <Section title="Memories">
          <Card padding={0}>
            {memories.map((memory, i) => (
              <ListRow
                key={memory.id}
                title={memory.title}
                subtitle={memory.ago}
                leading={<IconTile emoji={memory.emoji} color={memory.color} />}
                divider={i > 0}
              />
            ))}
          </Card>
        </Section>
      </ScrollView>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing['3xl'], gap: spacing.xl },
  album: { alignItems: 'center', gap: spacing.xs },
  cover: {
    width: 88,
    height: 88,
    borderRadius: 26,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  coverEmoji: { fontSize: 40, lineHeight: 48 },
  picker: { gap: 18 },
  slider: { borderRadius: 20 },
});
