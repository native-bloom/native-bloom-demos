import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import type { LibraryDefinition } from '../types';
import { BackdropDemo } from './demos/backdrop';
import { CommentsDemo } from './demos/comments';
import { CustomStylingDemo } from './demos/custom-styling';
import { DetachedDemo } from './demos/detached';
import { DynamicSizingDemo } from './demos/dynamic-sizing';
import { FooterDemo } from './demos/footer';
import { MiniPlayerDemo } from './demos/mini-player';
import { ModalDemo } from './demos/modal';
import { PlacesDemo } from './demos/places';
import { ScrollableDemo } from './demos/scrollable';
import { SnapPointsDemo } from './demos/snap-points';
import { StackingDemo } from './demos/stacking';

export const bottomSheet: LibraryDefinition = {
  slug: 'bottom-sheet',
  name: 'Bottom Sheet',
  packageName: '@gorhom/bottom-sheet',
  tagline: 'A performant, fully configurable bottom sheet built on Reanimated.',
  description:
    'Interactive bottom sheets and modals in JavaScript on Reanimated and Gesture Handler: snap points, dynamic sizing, backdrops, footers, scrollables, stacked and detached modals, custom handles and backgrounds, keyboard handling, and animated values to drive the screen around the sheet.',
  emoji: '🧺',
  color: '#E8F0FF',
  category: 'Components',
  links: [
    { label: 'GitHub', url: 'https://github.com/gorhom/react-native-bottom-sheet', icon: 'github' },
    { label: 'Docs', url: 'https://gorhom.dev/react-native-bottom-sheet/', icon: 'docs' },
  ],
  install: ['@gorhom/bottom-sheet', 'react-native-reanimated', 'react-native-gesture-handler'],
  setup:
    'Wrap the app in <GestureHandlerRootView> and, for BottomSheetModal, <BottomSheetModalProvider> inside it.',
  // Above the navigator, like the docs recommend, so a modal and its backdrop cover the
  // whole screen (header included) instead of only the demo body.
  RootProvider: BottomSheetModalProvider,
  demos: [
    {
      slug: 'snap-points',
      title: 'Snap points',
      emoji: '📍',
      level: 'basic',
      kind: 'isolated',
      description: 'A sheet that rests at a quarter and snaps to half, most or closed.',
      component: SnapPointsDemo,
    },
    {
      slug: 'modal',
      title: 'Bottom sheet modal',
      emoji: '🪟',
      level: 'basic',
      kind: 'isolated',
      description: 'Present and dismiss a modal sheet with the default look.',
      component: ModalDemo,
    },
    {
      slug: 'dynamic-sizing',
      title: 'Dynamic sizing',
      emoji: '📏',
      level: 'basic',
      kind: 'isolated',
      description: 'Sheets that grow to fit their content, up to a maximum height.',
      component: DynamicSizingDemo,
    },
    {
      slug: 'backdrop',
      title: 'Backdrop variants',
      emoji: '🌫️',
      level: 'intermediate',
      kind: 'isolated',
      description: 'Dimmed, tap-to-collapse and blurred backdrops behind a modal.',
      extraPackages: ['expo-blur'],
      component: BackdropDemo,
    },
    {
      slug: 'scrollable',
      title: 'Scrollable sheet',
      emoji: '📜',
      level: 'intermediate',
      kind: 'scenario',
      description: 'A list of memories that scrolls once the sheet is fully open.',
      component: ScrollableDemo,
    },
    {
      slug: 'footer',
      title: 'Sticky footer',
      emoji: '📌',
      level: 'intermediate',
      kind: 'isolated',
      description: 'A share sheet whose send button stays pinned while the sheet moves.',
      component: FooterDemo,
    },
    {
      slug: 'stacking',
      title: 'Stacked modals',
      emoji: '🗂️',
      level: 'intermediate',
      kind: 'isolated',
      description: 'A place, its menu and an item, each pushed on top of the last.',
      component: StackingDemo,
    },
    {
      slug: 'detached',
      title: 'Detached sheet',
      emoji: '🎈',
      level: 'intermediate',
      kind: 'isolated',
      description: 'A floating card sheet with side margins above the home indicator.',
      component: DetachedDemo,
    },
    {
      slug: 'custom-styling',
      title: 'Custom handle and background',
      emoji: '🎨',
      level: 'advanced',
      kind: 'isolated',
      description: 'Glass, dark and brand sheets with their own handle and background.',
      extraPackages: ['expo-blur'],
      component: CustomStylingDemo,
    },
    {
      slug: 'comments',
      title: 'Comment sheet',
      emoji: '💬',
      level: 'advanced',
      kind: 'scenario',
      description: 'Comments on a memory with a reply box that rides above the keyboard.',
      component: CommentsDemo,
    },
    {
      slug: 'mini-player',
      title: 'Mini player',
      emoji: '🎧',
      level: 'advanced',
      kind: 'scenario',
      description: 'A mini player that expands into a full player as you drag it up.',
      component: MiniPlayerDemo,
    },
    {
      slug: 'places',
      title: 'Places on a map',
      emoji: '🗺️',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'A Maps-style sheet of cafés over a map, with a button that rides on top.',
      extraPackages: ['react-native-maps'],
      // react-native-maps needs a Google Maps key on Android, which the app doesn't have.
      platforms: ['ios'],
      component: PlacesDemo,
    },
  ],
};
