/**
 * Masked View · Image through text
 *
 * Any view can be the child, including an image: big, heavy letters as the
 * mask turn a picture into a poster headline. Use a very heavy font weight so
 * enough of the picture shows through.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { stickerArt } from '@/demos/_shared/fixtures';
import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

// The light sticker fills in both themes: light letters read best on the dark backdrop.
const SCENES = [
  { value: 'code', label: 'Code', word: 'CODE', photo: stickerArt.fillDev.light },
  { value: 'surf', label: 'Surf', word: 'SURF', photo: stickerArt.fillSurf.light },
  { value: 'skate', label: 'Skate', word: 'SKATE', photo: stickerArt.fillSkate.light },
] as const;

type Scene = (typeof SCENES)[number]['value'];

export function ImageTextDemo() {
  const [scene, setScene] = useState<Scene>('code');
  const current = SCENES.find((s) => s.value === scene)!;

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={scene} options={SCENES} onChange={setScene} />}>
        {/* A dark backdrop makes the light letters pop. */}
        <View style={styles.backdrop}>
          <MaskedView
            style={styles.masked}
            maskElement={
              <View style={styles.mask}>
                <Text style={styles.word} adjustsFontSizeToFit numberOfLines={1}>
                  {current.word}
                </Text>
              </View>
            }>
            <Image source={current.photo} style={styles.photo} resizeMode="cover" />
          </MaskedView>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: '#15121A', paddingHorizontal: 16, paddingVertical: 28 },
  masked: { height: 170 },
  mask: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center' },
  word: {
    fontSize: 104,
    fontWeight: '900',
    letterSpacing: -4,
    textAlign: 'center',
    color: '#000000',
  },
  photo: { width: '100%', height: '100%' },
});
