/**
 * Pressto · Pressable scale
 *
 * `PressableScale` shrinks its content while pressed, animated on the UI thread.
 * It takes the usual pressable props (`onPress`, `style`, …). How far it shrinks
 * is `minScale` (0.96 by default), set through `PressablesConfig config` for
 * every pressable inside it. Wrap anything in it: a whole card, or a pill
 * button.
 *
 * pressto 0.7.0 on npm has no per-pressable `config` prop yet (the README on
 * `main` documents one), so the value goes on `PressablesConfig`.
 */
import { PressableScale, PressablesConfig } from 'pressto';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { stickerArt } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text, useColors } from '@/design-system';

const VARIANTS = [
  { value: 'subtle', label: 'Subtle', emoji: '🪶', minScale: 0.98 },
  { value: 'default', label: 'Default', emoji: '🤏', minScale: 0.96 },
  { value: 'deep', label: 'Deep', emoji: '🫳', minScale: 0.88 },
] as const;

type Variant = (typeof VARIANTS)[number]['value'];

export function PressableScaleDemo() {
  const colors = useColors();
  const [variant, setVariant] = useState<Variant>('default');
  const { minScale } = VARIANTS.find((v) => v.value === variant)!;

  return (
    <DemoStage>
      <Showcase
        padding="lg"
        below={<VariantBar value={variant} options={VARIANTS} onChange={setVariant} />}>
        <PressablesConfig config={{ minScale }}>
          <PressableScale
            accessibilityLabel="Surf trip memory"
            style={[styles.card, { backgroundColor: colors.surfaceMuted }]}>
            <Picture art={stickerArt.cardSurf} style={styles.picture} />
            <View style={styles.caption}>
              <Text variant="bodyStrong">Surf trip with Leo</Text>
              <Text variant="label" color="textSecondary">
                Montauk · 2 days ago
              </Text>
            </View>
          </PressableScale>

          <PressableScale
            accessibilityLabel="Save memory"
            style={[styles.button, { backgroundColor: colors.inverse }]}>
            <Text variant="bodyStrong" color="onInverse">
              Save memory
            </Text>
          </PressableScale>
        </PressablesConfig>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderCurve: 'continuous', overflow: 'hidden' },
  picture: { aspectRatio: 1.6 },
  caption: { padding: 14, gap: 2 },
  button: {
    marginTop: 16,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
