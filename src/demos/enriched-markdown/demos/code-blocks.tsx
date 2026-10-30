/**
 * Enriched Markdown · Syntax highlighted code
 *
 * Fenced code blocks are highlighted natively with tree-sitter grammars. With
 * `flavor="github"` each block gets a header with the language and a copy
 * button; `onCopyPress` reports what was copied, so the app can confirm it.
 * `markdownStyle.codeBlock.syntaxColors` would recolor the tokens; this demo
 * keeps the default GitHub-dark palette.
 *
 * Highlighting is opt-in at build time: the app's package.json has an
 * "enriched-markdown" block with `enableCodeHighlight: true` and
 * `codeHighlightLanguages` listing the grammars to compile (here typescript,
 * swift, python, javascript). Without a grammar the code still renders, just
 * uncolored.
 */
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Badge } from '@/design-system';
import { useMarkdownStyle } from '../styles';

const FENCE = '```';

const DOCUMENTS = {
  typescript: `**Load the latest memories**

${FENCE}typescript
type Memory = { title: string };

async function latest(limit = 3) {
  const res = await fetch('/feed');
  // newest first
  const data = await res.json();
  return data.items.slice(0, limit);
}
${FENCE}`,
  swift: `**A memory card in SwiftUI**

${FENCE}swift
struct MemoryCard: View {
  let memory: Memory
  var body: some View {
    Text(memory.title)
      .font(.headline)
      .padding(16)
  }
}
${FENCE}`,
  python: `**Rank cafés by rating**

${FENCE}python
cafes = [("Kettl", 4.8),
         ("Plentea", 4.7)]

def best(places, n=1):
    # highest rated first
    top = sorted(places, key=score)
    return top[:n]

print(best(cafes))
${FENCE}`,
};

type Language = keyof typeof DOCUMENTS;

const OPTIONS = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'swift', label: 'Swift' },
  { value: 'python', label: 'Python' },
] as const;

export function CodeBlocksDemo() {
  const [language, setLanguage] = useState<Language>('typescript');
  const [copied, setCopied] = useState(false);
  const markdownStyle = useMarkdownStyle();

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <DemoStage>
      <Showcase
        padding="lg"
        below={<VariantBar value={language} options={OPTIONS} onChange={setLanguage} />}>
        <EnrichedMarkdownText
          flavor="github"
          markdown={DOCUMENTS[language]}
          markdownStyle={markdownStyle}
          onCopyPress={() => setCopied(true)}
        />
      </Showcase>
      <View style={styles.status}>
        {copied ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Badge label="Copied to clipboard" tone="success" />
          </Animated.View>
        ) : null}
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  status: { height: 28, alignItems: 'center' },
});
