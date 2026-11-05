/**
 * Animated Glow · Glowing button
 *
 * The smallest custom preset: a `default` state with a corner radius, a background
 * color and one glow layer `behind` the button. Two shades in `colors` make the glow
 * flow slowly around the edge. All four colors share the same shape, and the default
 * state has a `transition`, so switching colors blends the glow instead of jumping.
 *
 * With glow layers, the border is drawn by the shader only when `borderColor` is a list
 * of two or more colors; this button sets `outlineWidth: 0` and has no border.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

function glowButton(color: string, light: string): PresetConfig {
  return {
    states: [
      {
        name: 'default',
        transition: 500,
        preset: {
          cornerRadius: 30,
          outlineWidth: 0,
          backgroundColor: color,
          animationSpeed: 1,
          glowLayers: [
            { glowPlacement: 'behind', colors: [color, light], glowSize: 22, opacity: 0.45 },
          ],
        },
      },
    ],
  };
}

const BUTTONS = {
  ocean: glowButton('#3478F6', '#7FB0FF'),
  rose: glowButton('#F43F7A', '#FF9EC0'),
  mint: glowButton('#10B981', '#7EE8C4'),
  sun: glowButton('#F59E0B', '#FFD27A'),
};

type Color = keyof typeof BUTTONS;

const OPTIONS = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'rose', label: 'Rose' },
  { value: 'mint', label: 'Mint' },
  { value: 'sun', label: 'Sun' },
] as const satisfies readonly { value: Color; label: string }[];

export function GlowButtonDemo() {
  const [color, setColor] = useState<Color>('ocean');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={color} options={OPTIONS} onChange={setColor} />}>
        <View style={styles.stage}>
          <AnimatedGlow preset={BUTTONS[color]}>
            <View style={styles.button}>
              <Text style={styles.label}>Say hi to Sam Lee</Text>
            </View>
          </AnimatedGlow>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stage: { paddingVertical: 48, alignItems: 'center' },
  button: { paddingVertical: 18, paddingHorizontal: 34 },
  label: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});
