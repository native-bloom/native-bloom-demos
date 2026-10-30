/**
 * Enriched Markdown · Light and dark styles
 *
 * The library ships light-mode defaults only and has no color scheme prop. Its
 * docs suggest one `markdownStyle` per scheme, picked with `useColorScheme()`.
 * The light style is empty (the library's own look); the dark style overrides
 * every default color that would vanish on a dark surface. Keep these objects
 * at module level so the same reference is reused across renders.
 *
 * On iOS the CommonMark renderer (the default flavor) draws an opaque white
 * box behind the text in dark mode unless the container has an explicit
 * background, so those demos pass `containerStyle={{ backgroundColor:
 * 'transparent' }}`.
 */
import { useColorScheme } from 'react-native';
import type { MarkdownStyle, MarkdownTextInputStyle } from 'react-native-enriched-markdown';

export const lightMarkdownStyle: MarkdownStyle = {};

export const darkMarkdownStyle: MarkdownStyle = {
  paragraph: { color: '#E5E7EB' },
  h1: { color: '#FFFFFF' },
  h2: { color: '#FFFFFF' },
  h3: { color: '#FFFFFF' },
  h4: { color: '#FFFFFF' },
  h5: { color: '#E5E7EB' },
  h6: { color: '#D1D5DB' },
  blockquote: {
    color: '#D1D5DB',
    borderColor: '#4B5563',
    backgroundColor: '#1F2023',
    admonitions: {
      note: { color: '#58A6FF' },
      tip: { color: '#3FB950' },
      important: { color: '#A371F7' },
      warning: { color: '#D29922' },
      caution: { color: '#F85149' },
    },
  },
  list: { color: '#E5E7EB', bulletColor: '#9CA3AF', markerColor: '#9CA3AF' },
  codeBlock: { backgroundColor: '#0D1117', borderColor: '#30363D' },
  link: { color: '#60A5FA' },
  code: { color: '#FF8BA7', backgroundColor: '#2A1A20', borderColor: '#4A2632' },
  underline: { color: '#E5E7EB' },
  thematicBreak: { color: '#2F3136' },
  table: {
    color: '#E5E7EB',
    headerTextColor: '#FFFFFF',
    headerBackgroundColor: '#24262A',
    rowEvenBackgroundColor: '#151517',
    rowOddBackgroundColor: '#1B1C1F',
    borderColor: '#2F3136',
  },
  math: { color: '#E5E7EB', backgroundColor: '#1F2023' },
  inlineMath: { color: '#E5E7EB' },
  taskList: { checkedColor: '#0A84FF', borderColor: '#6B7280', checkedTextColor: '#9CA3AF' },
  spoiler: { color: '#D1D5DB' },
  highlight: { color: '#111827' },
};

/** The default markdown style for the current color scheme. */
export function useMarkdownStyle(): MarkdownStyle {
  return useColorScheme() === 'dark' ? darkMarkdownStyle : lightMarkdownStyle;
}

export const lightInputStyle: MarkdownTextInputStyle = {};

export const darkInputStyle: MarkdownTextInputStyle = {
  link: { color: '#60A5FA' },
  spoiler: { color: '#D1D5DB', backgroundColor: '#2F3136' },
  h1: { color: '#FFFFFF' },
  h2: { color: '#FFFFFF' },
  h3: { color: '#FFFFFF' },
};

/** The default input style for the current color scheme. */
export function useInputStyle(): MarkdownTextInputStyle {
  return useColorScheme() === 'dark' ? darkInputStyle : lightInputStyle;
}
