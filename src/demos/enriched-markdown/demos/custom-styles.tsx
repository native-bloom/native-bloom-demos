/**
 * Enriched Markdown · Custom markdown styles
 *
 * Everything the renderer draws is styled through one `markdownStyle` object:
 * fonts, sizes and colors per heading level and paragraph, blockquote bar and
 * fill, list markers, inline code, links and more. The same Markdown is shown
 * with the default look and three themes; `containerStyle` paints the page
 * behind it. Keep each style object at module level (or memoize it) so the
 * native side only re-applies styles when they really change.
 */
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { EnrichedMarkdownText, type MarkdownStyle } from 'react-native-enriched-markdown';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useMarkdownStyle } from '../styles';

const MARKDOWN = `# Matcha notes

Whisk **2 g** of matcha in *70 ml* of \`80°C\` water, then top with oat milk. Recipe from [Kettl](https://kettl.co).

> Sift first, it's the difference between smooth and lumpy.

- Ceremonial grade for drinking
- Culinary grade for baking`;

type Theme = 'default' | 'paper' | 'midnight' | 'brand';

const paperStyle: MarkdownStyle = {
  paragraph: { fontFamily: 'Georgia', fontSize: 17, lineHeight: 26, color: '#3B2F2F' },
  h1: { fontFamily: 'Georgia', fontSize: 30, color: '#2A1F1F', marginBottom: 10 },
  strong: { color: '#7A4E1D' },
  em: { color: '#7A4E1D' },
  link: { color: '#B4532A', underline: true },
  code: { color: '#7A4E1D', backgroundColor: '#F1E6CF', borderColor: '#E6D5B0' },
  blockquote: {
    fontFamily: 'Georgia',
    color: '#5C4A3A',
    borderColor: '#D9A441',
    backgroundColor: '#F5ECD9',
    borderWidth: 3,
    borderRadius: 4,
  },
  list: { fontFamily: 'Georgia', color: '#3B2F2F', bulletColor: '#D9A441', bulletSize: 7 },
};

const midnightStyle: MarkdownStyle = {
  paragraph: { fontSize: 16, lineHeight: 24, color: '#C9D1D9' },
  h1: { fontFamily: 'Menlo', fontSize: 26, color: '#FFFFFF', marginBottom: 10 },
  strong: { color: '#F0ABFC' },
  em: { color: '#A78BFA' },
  link: { color: '#A78BFA', underline: false, backgroundColor: '#251C3A' },
  code: {
    fontFamily: 'Menlo',
    color: '#F0ABFC',
    backgroundColor: '#2A1F3D',
    borderColor: '#3D2C5A',
  },
  blockquote: {
    color: '#E5E7EB',
    borderColor: '#7C3AED',
    backgroundColor: '#1A1530',
    borderWidth: 4,
    borderRadius: 8,
  },
  list: { color: '#C9D1D9', bulletColor: '#7C3AED', bulletSize: 8 },
};

const brandStyle: MarkdownStyle = {
  paragraph: { fontSize: 17, lineHeight: 25, color: '#0B0B0D' },
  h1: { fontSize: 30, fontWeight: '800', color: '#3478F6', marginBottom: 8 },
  strong: { color: '#3478F6' },
  link: { color: '#3478F6', underline: false, backgroundColor: '#E8F0FF' },
  code: { color: '#3478F6', backgroundColor: '#E8F0FF', borderColor: '#C9DBFF' },
  blockquote: {
    color: '#0B0B0D',
    fontWeight: '600',
    borderColor: '#3478F6',
    backgroundColor: '#E8F0FF',
    borderWidth: 4,
    gapWidth: 12,
    borderRadius: 14,
  },
  list: { color: '#0B0B0D', bulletColor: '#3478F6', bulletSize: 8, itemSpacing: 4 },
};

const THEMES: Record<Exclude<Theme, 'default'>, { style: MarkdownStyle; page: ViewStyle }> = {
  paper: { style: paperStyle, page: { backgroundColor: '#FBF7EF' } },
  midnight: { style: midnightStyle, page: { backgroundColor: '#0F1115' } },
  brand: { style: brandStyle, page: { backgroundColor: '#FFFFFF' } },
};

const OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'paper', label: 'Paper' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'brand', label: 'Brand' },
] as const;

export function CustomStylesDemo() {
  const [theme, setTheme] = useState<Theme>('paper');
  const defaultStyle = useMarkdownStyle();
  const current =
    theme === 'default'
      ? { style: defaultStyle, page: { backgroundColor: 'transparent' } }
      : THEMES[theme];

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={theme} options={OPTIONS} onChange={setTheme} />}>
        <EnrichedMarkdownText
          markdown={MARKDOWN}
          markdownStyle={current.style}
          containerStyle={{ padding: 20, ...current.page }}
        />
      </Showcase>
    </DemoStage>
  );
}
