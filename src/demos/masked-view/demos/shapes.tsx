/**
 * Masked View · Shape masks
 *
 * The mask can be any view, not just text: a View with a border radius, an
 * SVG path from react-native-svg, or even an emoji, whose opaque pixels
 * become the shape. Anything you can draw with alpha can crop a picture.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { Image } from 'expo-image';
import { useState, type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { stickerArt } from '@/demos/_shared/fixtures';
import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const SHAPES = [
  { value: 'circle', label: 'Circle' },
  { value: 'heart', label: 'SVG heart' },
  { value: 'emoji', label: 'Emoji' },
] as const;

type Shape = (typeof SHAPES)[number]['value'];

const SIZE = 240;

const MASKS: Record<Shape, ReactElement> = {
  circle: (
    <View style={{ width: SIZE, height: SIZE, borderRadius: SIZE / 2, backgroundColor: '#000' }} />
  ),
  heart: (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 24 24">
      <Path
        fill="#000"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </Svg>
  ),
  emoji: (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 200, lineHeight: 236 }}>🍓</Text>
    </View>
  ),
};

export function ShapesDemo() {
  const [shape, setShape] = useState<Shape>('heart');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={shape} options={SHAPES} onChange={setShape} />}>
        <View style={styles.center}>
          <MaskedView style={styles.masked} maskElement={MASKS[shape]}>
            {/* The light fill in both themes: it reads best against the dark backdrop. */}
            <Image source={stickerArt.fillMix.light} style={styles.photo} contentFit="cover" />
          </MaskedView>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  // A dark backdrop makes the shape's outline obvious.
  center: { alignItems: 'center', backgroundColor: '#15121A', paddingVertical: 28 },
  masked: { width: SIZE, height: SIZE },
  photo: { width: SIZE, height: SIZE },
});
