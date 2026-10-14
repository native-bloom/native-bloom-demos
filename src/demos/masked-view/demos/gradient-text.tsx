/**
 * Masked View · Gradient text
 *
 * React Native text can't take a gradient color, but a mask can: render the
 * text as the `maskElement` and a gradient as the child. Only the alpha of the
 * mask matters, so the text color is irrelevant (use black). The gradient is a
 * plain View with `experimental_backgroundImage` (React Native 0.76+); a
 * LinearGradient from expo-linear-gradient works the same way.
 *
 * Size the MaskedView to the text, so the gradient spans just the letters.
 */
import MaskedView from '@react-native-masked-view/masked-view';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const GRADIENTS = [
  { value: 'sunset', label: 'Sunset' },
  { value: 'berry', label: 'Berry' },
  { value: 'matcha', label: 'Matcha' },
  { value: 'ocean', label: 'Ocean' },
] as const;

type Gradient = (typeof GRADIENTS)[number]['value'];

const BACKGROUNDS: Record<Gradient, string> = {
  sunset: 'linear-gradient(90deg, #FF9F43 0%, #FF5C7A 55%, #B44FD6 100%)',
  berry: 'linear-gradient(90deg, #FF2D78 0%, #FF7AA8 50%, #A855F7 100%)',
  matcha: 'linear-gradient(90deg, #2F6B31 0%, #5DBB63 55%, #C6E86B 100%)',
  ocean: 'linear-gradient(90deg, #1E3A8A 0%, #3478F6 50%, #22D3EE 100%)',
};

function GradientHeadline({
  text,
  gradient,
  size,
}: {
  text: string;
  gradient: string;
  size: number;
}) {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.headline, { fontSize: size, lineHeight: size * 1.15 }]}>{text}</Text>
      }>
      {/* Invisible copy of the text sizes the gradient to the letters. */}
      <Text style={[styles.headline, styles.sizer, { fontSize: size, lineHeight: size * 1.15 }]}>
        {text}
      </Text>
      <View style={[StyleSheet.absoluteFill, { experimental_backgroundImage: gradient }]} />
    </MaskedView>
  );
}

export function GradientTextDemo() {
  const [gradient, setGradient] = useState<Gradient>('sunset');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={gradient} options={GRADIENTS} onChange={setGradient} />}>
        <View style={styles.content}>
          <GradientHeadline text="Festive treats" gradient={BACKGROUNDS[gradient]} size={44} />
          <GradientHeadline
            text="12 memories with Sam"
            gradient={BACKGROUNDS[gradient]}
            size={22}
          />
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', gap: 8, paddingVertical: 12 },
  headline: { fontWeight: '900', letterSpacing: -1, color: '#000000', textAlign: 'center' },
  sizer: { opacity: 0 },
});
