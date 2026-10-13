import { LogBox } from 'react-native';

import type { LibraryDefinition } from '../types';
import { AnimatedDemo } from './demos/animated';
import { BasicDemo } from './demos/basic';
import { BehaviorsDemo } from './demos/behaviors';
import { CommentsDemo } from './demos/comments';
import { DetentsDemo } from './demos/detents';
import { FooterDemo } from './demos/footer';
import { KeyboardDemo } from './demos/keyboard';
import { MapDemo } from './demos/map';
import { MiniPlayerDemo } from './demos/mini-player';
import { ScrollableDemo } from './demos/scrollable';
import { StackingDemo } from './demos/stacking';
import { StylingDemo } from './demos/styling';

// TrueSheet 3.11 hides a presented sheet when its screen navigates away and re-presents it
// on return. Fast back-and-forth navigation races with that and the native side logs these
// two harmless warnings, which would put a LogBox banner in recordings.
LogBox.ignoreLogs([
  'TrueSheet: sheet is already presented',
  'TrueSheet: sheet is already dismissed',
]);

export const trueSheet: LibraryDefinition = {
  slug: 'true-sheet',
  name: 'True Sheet',
  packageName: '@lodev09/react-native-true-sheet',
  tagline: 'The true native bottom sheet for React Native.',
  description:
    'Bottom sheets backed by UISheetPresentationController on iOS and BottomSheetBehavior on Android: detents, Liquid Glass, headers and footers, scrolling, keyboard handling, stacking and Reanimated-driven animations.',
  emoji: '🪟',
  color: '#E8F0FF',
  category: 'Components',
  links: [
    { label: 'GitHub', url: 'https://github.com/lodev09/react-native-true-sheet', icon: 'github' },
    { label: 'Docs', url: 'https://sheet.lodev09.com/', icon: 'docs' },
  ],
  install: [
    '@lodev09/react-native-true-sheet',
    'react-native-reanimated',
    'react-native-worklets',
  ],
  setup:
    'Native module (New Architecture only): rebuild the dev build after installing; not available in Expo Go. Reanimated is only needed for ReanimatedTrueSheet.',
  demos: [
    {
      slug: 'basic',
      title: 'Bottom sheet',
      emoji: '🪟',
      level: 'basic',
      kind: 'isolated',
      description: 'A sheet that sizes itself to its content, opened and closed through a ref.',
      component: BasicDemo,
    },
    {
      slug: 'detents',
      title: 'Sheet detents',
      emoji: '📏',
      level: 'basic',
      kind: 'isolated',
      description: 'Open a sheet at its content height, 60% or full screen, and resize it from inside.',
      component: DetentsDemo,
    },
    {
      slug: 'footer',
      title: 'Sheet footer',
      emoji: '🦶',
      level: 'basic',
      kind: 'isolated',
      description: 'A booking button pinned to the bottom of the sheet at every size.',
      component: FooterDemo,
    },
    {
      slug: 'scrollable',
      title: 'Scrollable sheet',
      emoji: '📜',
      level: 'intermediate',
      kind: 'isolated',
      description: 'A fixed header above a long list that scrolls inside the sheet.',
      component: ScrollableDemo,
    },
    {
      slug: 'keyboard',
      title: 'Sheet with keyboard',
      emoji: '⌨️',
      level: 'intermediate',
      kind: 'isolated',
      description: 'A quick-add form that rises with the keyboard, its save button riding on top.',
      component: KeyboardDemo,
    },
    {
      slug: 'behaviors',
      title: 'Sheet behaviors',
      emoji: '🔒',
      level: 'intermediate',
      kind: 'isolated',
      description: 'Sheets that cannot be swiped away, cannot be resized, or leave the screen behind usable.',
      component: BehaviorsDemo,
    },
    {
      slug: 'stacking',
      title: 'Stacked sheets',
      emoji: '🗂️',
      level: 'intermediate',
      kind: 'isolated',
      description: 'Three sheets on top of each other, with one tap back to the first or out of all.',
      extraPackages: ['expo-image'],
      component: StackingDemo,
    },
    {
      slug: 'styling',
      title: 'Custom sheet styles',
      emoji: '🎨',
      level: 'advanced',
      kind: 'isolated',
      description: 'Solid colors, blur, corner radius and a custom grabber instead of Liquid Glass.',
      component: StylingDemo,
    },
    {
      slug: 'mini-player',
      title: 'Mini player',
      emoji: '🎧',
      level: 'advanced',
      kind: 'scenario',
      description: 'A music player that peeks as a mini bar and expands into the full player.',
      component: MiniPlayerDemo,
    },
    {
      slug: 'map',
      title: 'Maps-style sheet',
      emoji: '🗺️',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'A sheet that never closes over a usable map, with a button riding its top edge.',
      extraPackages: ['react-native-reanimated'],
      component: MapDemo,
    },
    {
      slug: 'animated',
      title: 'Sheet-driven animation',
      emoji: '🌀',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'A photo that shrinks and fades as the sheet over it is dragged up.',
      extraPackages: ['react-native-reanimated'],
      component: AnimatedDemo,
    },
    {
      slug: 'comments',
      title: 'Comments sheet',
      emoji: '💬',
      level: 'advanced',
      kind: 'scenario',
      description: 'A comments sheet with a reply bar, where scrolling never expands the sheet.',
      extraPackages: ['expo-image'],
      component: CommentsDemo,
    },
  ],
};
