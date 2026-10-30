/**
 * Enriched Markdown · Native markdown text
 *
 * `EnrichedMarkdownText` takes a Markdown string and draws it with the
 * platform's text APIs, not a WebView: headings, bold and italic, lists,
 * blockquotes, inline code and links, all selectable like native text. The
 * look is the library's default (CommonMark flavor); `onLinkPress` receives the
 * tapped URL. In dark mode the demo passes a dark `markdownStyle`, because the
 * library ships light colors only (see ../styles.ts).
 *
 * iOS, CommonMark flavor: give the container an explicit
 * `backgroundColor: 'transparent'`, or in dark mode the text is drawn on an
 * opaque white box. The GitHub flavor is not affected.
 */
import { useState } from 'react';
import { Linking } from 'react-native';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useMarkdownStyle } from '../styles';

const DOCUMENTS = {
  memory: `# Festive treats with friends

Spent the afternoon baking with **Sam Lee** and *Alex Smith*. The jam cookies came out perfect.

- Cookie dough, made the night before
- Candied nuts for the gift boxes
- Matcha from [Plentea](https://plenteamatcha.com) to keep us going

> Next year we start with a double batch.`,
  recipe: `## Jam cookies

Makes **24** small cookies. Bake at \`180 °C\` for *12 minutes*.

1. Cream the butter and sugar
2. Fold in flour and a pinch of salt
3. Press a thumbprint into each ball
4. Fill with jam and bake

> Let them cool on the tray, the jam stays put.`,
  release: `### What's new in Bond 4.2

**Memories** now open twice as fast, and you can pin a favourite place to the top of your list.

- New *Cafés* collection
- Share a memory straight to a group
- A cleaner, faster map

Read the full notes on [our blog](https://nativebloom.dev).`,
};

type DocumentKey = keyof typeof DOCUMENTS;

const OPTIONS = [
  { value: 'memory', label: 'Memory', emoji: '🧁' },
  { value: 'recipe', label: 'Recipe', emoji: '🍪' },
  { value: 'release', label: 'Changelog', emoji: '✨' },
] as const;

export function MarkdownTextDemo() {
  const [doc, setDoc] = useState<DocumentKey>('memory');
  const markdownStyle = useMarkdownStyle();

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={doc} options={OPTIONS} onChange={setDoc} />}>
        <EnrichedMarkdownText
          markdown={DOCUMENTS[doc]}
          markdownStyle={markdownStyle}
          containerStyle={{ backgroundColor: 'transparent' }}
          onLinkPress={({ url }) => Linking.openURL(url)}
        />
      </Showcase>
    </DemoStage>
  );
}
