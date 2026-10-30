/**
 * Enriched Markdown · LaTeX math
 *
 * Math is part of the Markdown: `$…$` renders inline with the surrounding
 * text, and `$$…$$` renders a centered block (block math needs
 * `flavor="github"`). Formulas are drawn natively by the RaTeX engine, so they
 * scale, select and theme like the rest of the text. `markdownStyle.math` and
 * `inlineMath` restyle them; `onLatexError` reports formulas that fail to parse.
 *
 * Math is on by default (`md4cFlags.latexMath`) and needs `enableMath: true` in
 * the "enriched-markdown" block of the app's package.json (the default), which
 * downloads RaTeX at install time. With math on, every `$` pair is a formula,
 * so write prices as "USD 12" or escape the dollar sign (`\$`).
 */
import { useState } from 'react';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useMarkdownStyle } from '../styles';

const DOCUMENTS = {
  inline: String.raw`### Splitting the bill

Dinner for $n = 4$ at Kettl came to $t$ with a $15\%$ tip, so each of us pays $\frac{1.15\,t}{n}$.

Doubling the cookie recipe? Scale every ingredient by $k = 2$, so $250\,\text{g}$ of flour becomes $k \cdot 250 = 500\,\text{g}$.`,
  classics: String.raw`### Classics

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

$$e^{i\pi} + 1 = 0$$

$$\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}$$`,
  science: String.raw`### Science notes

$$\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$$

$$R = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

Energy and mass are linked by $E = mc^2$.`,
};

type DocumentKey = keyof typeof DOCUMENTS;

const OPTIONS = [
  { value: 'inline', label: 'Inline', emoji: '🧾' },
  { value: 'classics', label: 'Equations', emoji: '📐' },
  { value: 'science', label: 'Matrices', emoji: '🔬' },
] as const;

export function LatexMathDemo() {
  const [doc, setDoc] = useState<DocumentKey>('inline');
  const markdownStyle = useMarkdownStyle();

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={doc} options={OPTIONS} onChange={setDoc} />}>
        <EnrichedMarkdownText
          flavor="github"
          markdown={DOCUMENTS[doc]}
          markdownStyle={markdownStyle}
        />
      </Showcase>
    </DemoStage>
  );
}
