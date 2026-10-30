import type { LibraryDefinition } from '../types';
import { ChecklistDemo } from './demos/checklist';
import { CodeBlocksDemo } from './demos/code-blocks';
import { CustomStylesDemo } from './demos/custom-styles';
import { GithubFlavorDemo } from './demos/github-flavor';
import { HeadingsListsDemo } from './demos/headings-lists';
import { LatexMathDemo } from './demos/latex-math';
import { LinkVariantsDemo } from './demos/link-variants';
import { MarkdownTextDemo } from './demos/markdown-text';
import { MentionsDemo } from './demos/mentions';
import { RichTextInputDemo } from './demos/rich-text-input';
import { SpoilersDemo } from './demos/spoilers';
import { StreamingReplyDemo } from './demos/streaming-reply';

export const enrichedMarkdown: LibraryDefinition = {
  slug: 'enriched-markdown',
  name: 'Enriched Markdown',
  packageName: 'react-native-enriched-markdown',
  tagline: 'Markdown rendered as native text, plus a rich text input that writes Markdown.',
  description:
    'Software Mansion’s Markdown renderer and editor. EnrichedMarkdownText draws CommonMark and GitHub flavored Markdown with platform text APIs (no WebView): tables, task lists, callouts, syntax highlighted code, LaTeX math, spoilers and streaming for AI replies, all styled through one markdownStyle object. EnrichedMarkdownTextInput is an uncontrolled rich text input with toolbar commands, headings, lists, links and mentions that outputs Markdown.',
  emoji: '📝',
  color: '#EEF2FF',
  category: 'Components',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/software-mansion/enriched-markdown',
      icon: 'github',
    },
    { label: 'Docs', url: 'https://enriched.swmansion.com/markdown', icon: 'docs' },
  ],
  install: ['react-native-enriched-markdown'],
  setup:
    'Native module for the New Architecture: rebuild the dev build after installing (not in Expo Go). Optional features are set in an "enriched-markdown" block in the app package.json (enableCodeHighlight, enableMath, enableVideo, codeHighlightLanguages); its postinstall downloads the highlighting grammars and math engine.',
  demos: [
    {
      slug: 'markdown-text',
      title: 'Native markdown text',
      emoji: '📄',
      level: 'basic',
      kind: 'showcase',
      description: 'A Markdown string rendered as native text with the library’s default look.',
      component: MarkdownTextDemo,
    },
    {
      slug: 'github-flavor',
      title: 'GitHub flavored markdown',
      emoji: '🐙',
      level: 'basic',
      kind: 'showcase',
      description: 'Tables, task lists and callouts with flavor="github".',
      component: GithubFlavorDemo,
    },
    {
      slug: 'rich-text-input',
      title: 'Rich text input',
      emoji: '✍️',
      level: 'basic',
      kind: 'showcase',
      description:
        'A rich text input with a formatting toolbar that lights up for the active styles.',
      component: RichTextInputDemo,
    },
    {
      slug: 'code-blocks',
      title: 'Syntax highlighted code',
      emoji: '🧑‍💻',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Fenced code blocks highlighted natively, with a copy button in the header.',
      component: CodeBlocksDemo,
    },
    {
      slug: 'latex-math',
      title: 'LaTeX math',
      emoji: '➗',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Inline and block LaTeX formulas rendered natively inside Markdown.',
      component: LatexMathDemo,
    },
    {
      slug: 'spoilers',
      title: 'Spoiler text',
      emoji: '🙈',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Hidden text under a particle or solid overlay that reveals on tap.',
      component: SpoilersDemo,
    },
    {
      slug: 'headings-lists',
      title: 'Headings and lists',
      emoji: '📋',
      level: 'intermediate',
      kind: 'showcase',
      description: 'An editor with heading and list buttons, and Markdown shortcuts while typing.',
      component: HeadingsListsDemo,
    },
    {
      slug: 'link-variants',
      title: 'Link variants',
      emoji: '🔗',
      level: 'intermediate',
      kind: 'showcase',
      description: 'People, places and web links styled by URL pattern, each handling its own tap.',
      component: LinkVariantsDemo,
    },
    {
      slug: 'custom-styles',
      title: 'Custom markdown styles',
      emoji: '🎨',
      level: 'advanced',
      kind: 'showcase',
      description: 'One document restyled four ways through markdownStyle.',
      component: CustomStylesDemo,
    },
    {
      slug: 'streaming-reply',
      title: 'Streaming AI reply',
      emoji: '🤖',
      level: 'advanced',
      kind: 'scenario',
      description: 'An assistant answer that streams in token by token and fades in as it grows.',
      component: StreamingReplyDemo,
    },
    {
      slug: 'mentions',
      title: 'Mentions composer',
      emoji: '👥',
      level: 'advanced',
      kind: 'scenario',
      description:
        'Type @ to pick a friend; the mention becomes a tinted link in the sent message.',
      component: MentionsDemo,
    },
    {
      slug: 'checklist',
      title: 'Interactive checklist',
      emoji: '✅',
      level: 'advanced',
      kind: 'scenario',
      description: 'A Markdown task list whose checkboxes drive a progress header.',
      component: ChecklistDemo,
    },
  ],
};
