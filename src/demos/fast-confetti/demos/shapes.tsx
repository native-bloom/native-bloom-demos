/**
 * Fast Confetti · Flake shapes
 *
 * Each `.Flake` child adds one kind of piece to the mix: `size` (or `width` and
 * `height`) and `radius` make strips, squares, circles and pills. Pieces are
 * spread evenly over the flakes you list. Flakes work the same in every
 * component; this card uses `<ContinuousConfetti />` so it never runs dry, and
 * `containerStyle` keeps it inside the card instead of the whole screen.
 *
 * The README on GitHub also lists `shape="heart" | "star" | "flower" | "streamer"`,
 * but that is not in the latest npm release (2.0.2). Use an SVG texture for
 * other silhouettes (see the Custom textures demo).
 */
import { useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContinuousConfetti } from 'react-native-fast-confetti';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const SHAPES = [
  { value: 'mix', label: 'Mix', emoji: '🎉' },
  { value: 'strips', label: 'Strips', emoji: '📏' },
  { value: 'squares', label: 'Squares', emoji: '🟨' },
  { value: 'circles', label: 'Circles', emoji: '🔵' },
  { value: 'pills', label: 'Pills', emoji: '💊' },
] as const;

type Shape = (typeof SHAPES)[number]['value'];

const FLAKES: Record<Shape, ReactNode> = {
  mix: (
    <>
      <ContinuousConfetti.Flake width={8} height={22} />
      <ContinuousConfetti.Flake size={14} />
      <ContinuousConfetti.Flake size={15} radius={7.5} />
      <ContinuousConfetti.Flake width={10} height={22} radius={5} />
    </>
  ),
  strips: <ContinuousConfetti.Flake width={8} height={26} />,
  squares: <ContinuousConfetti.Flake size={16} radius={2} />,
  circles: <ContinuousConfetti.Flake size={17} radius={8.5} />,
  pills: <ContinuousConfetti.Flake width={11} height={26} radius={5.5} />,
};

export function ShapesDemo() {
  const [shape, setShape] = useState<Shape>('mix');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={shape} options={SHAPES} onChange={setShape} />}>
        <View style={styles.area}>
          {/* A new key restarts the stream with the new flakes. */}
          <ContinuousConfetti key={shape} count={120} containerStyle={styles.confetti}>
            {FLAKES[shape]}
          </ContinuousConfetti>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  area: { height: 420 },
  confetti: { width: '100%', height: '100%' },
});
