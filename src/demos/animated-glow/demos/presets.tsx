/**
 * Animated Glow · Glow presets
 *
 * The library ships two ready-made looks in `glowPresets`: `defaultRainbow` (a spinning
 * rainbow border over three glow layers) and `oceanSunset` (a pink, blue and orange
 * gradient). Pass one to `preset` and wrap any view. The preset also paints the view's
 * background and rounds its corners, and its `metadata.textColor` is a good text color
 * for content on top.
 *
 * The demo changes `key` along with the preset, so the new glow fades in from scratch.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { glowPresets } from 'react-native-animated-glow';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

type PresetName = keyof typeof glowPresets;

const OPTIONS = [
  { value: 'defaultRainbow', label: 'Default rainbow', emoji: '🌈' },
  { value: 'oceanSunset', label: 'Ocean sunset', emoji: '🌅' },
] as const satisfies readonly { value: PresetName; label: string; emoji: string }[];

export function PresetsDemo() {
  const [name, setName] = useState<PresetName>('defaultRainbow');
  const preset = glowPresets[name];

  return (
    <DemoStage>
      <Showcase
        below={<VariantBar value={name} options={OPTIONS} onChange={setName} />}>
        <View style={styles.stage}>
          <AnimatedGlow key={name} preset={preset}>
            <View style={styles.button}>
              <Text style={[styles.label, { color: preset.metadata.textColor }]}>
                Join the matcha meetup
              </Text>
            </View>
          </AnimatedGlow>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stage: { paddingVertical: 48, alignItems: 'center' },
  button: { paddingVertical: 20, paddingHorizontal: 32 },
  label: { fontSize: 17, fontWeight: '700' },
});
