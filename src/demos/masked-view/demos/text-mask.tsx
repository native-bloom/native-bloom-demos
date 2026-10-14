/**
 * Masked View · Text mask
 *
 * The library's own example: the children (four color stripes) only show
 * where the `maskElement` is opaque. The mask works on the alpha channel, so
 * keep its background transparent and draw the shape (here bold text) in any
 * opaque color.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { StyleSheet, Text, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';

const STRIPES = ['#3478F6', '#FFD43B', '#FF5C7A', '#5DBB63', '#A855F7'];

export function TextMaskDemo() {
  return (
    <DemoStage>
      <Showcase>
        <MaskedView
          style={styles.masked}
          maskElement={
            <View style={styles.mask}>
              <Text style={styles.maskText}>bloom</Text>
            </View>
          }>
          {/* Shows through the letters. */}
          <View style={styles.stripes}>
            {STRIPES.map((color) => (
              <View key={color} style={[styles.stripe, { backgroundColor: color }]} />
            ))}
          </View>
        </MaskedView>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  masked: { height: 150 },
  mask: {
    flex: 1,
    // Transparent: only the letters' alpha counts.
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskText: {
    fontSize: 96,
    lineHeight: 110,
    fontWeight: '900',
    letterSpacing: -4,
    color: '#000000',
  },
  stripes: { flex: 1, flexDirection: 'row' },
  stripe: { flex: 1 },
});
