/**
 * Enriched Markdown · Spoiler text
 *
 * `||text||` hides text behind an overlay until it is tapped, like spoilers in
 * chat apps. `spoilerOverlay="particles"` (default) covers it with drifting
 * particles; `"solid"` uses an opaque block. Spoilers can wrap a few words or a
 * whole paragraph. `markdownStyle.spoiler` sets the overlay color, the particle
 * density and speed, and the solid block's corner radius.
 *
 * The syntax is always on: any `||…||` in the content becomes a spoiler. A
 * revealed spoiler stays revealed; the demo changes the `key` to hide them again.
 */
import { useState } from 'react';
import { EnrichedMarkdownText, type MarkdownStyle } from 'react-native-enriched-markdown';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useMarkdownStyle } from '../styles';

const MARKDOWN = `### 🎁 Secret Santa

Your match this year is ||**Alex Smith**||.

Budget is ||25 dollars|| and the wishlist says ||a matcha whisk and a tote bag||.

||The exchange is at Kettl on Friday at 7, keep it quiet!||`;

type Overlay = 'particles' | 'solid' | 'dense';

const OPTIONS = [
  { value: 'particles', label: 'Particles', emoji: '✨' },
  { value: 'dense', label: 'Dense', emoji: '🌫️' },
  { value: 'solid', label: 'Solid', emoji: '⬛️' },
] as const;

const denseSpoiler: MarkdownStyle['spoiler'] = {
  color: '#7C3AED',
  particles: { density: 18, speed: 34 },
};

const solidSpoiler: MarkdownStyle['spoiler'] = { solid: { borderRadius: 6 } };

export function SpoilersDemo() {
  const [overlay, setOverlay] = useState<Overlay>('particles');
  const base = useMarkdownStyle();

  const markdownStyle: MarkdownStyle =
    overlay === 'dense'
      ? { ...base, spoiler: denseSpoiler }
      : overlay === 'solid'
        ? { ...base, spoiler: { ...base.spoiler, ...solidSpoiler } }
        : base;

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={overlay} options={OPTIONS} onChange={setOverlay} />}>
        <EnrichedMarkdownText
          key={overlay}
          markdown={MARKDOWN}
          markdownStyle={markdownStyle}
          containerStyle={{ backgroundColor: 'transparent' }}
          spoilerOverlay={overlay === 'solid' ? 'solid' : 'particles'}
        />
      </Showcase>
    </DemoStage>
  );
}
