import { toast } from 'sonner-native';

import type { LibraryDefinition } from '../types';
import { AnimationsDemo } from './demos/animations';
import { BasicDemo } from './demos/basic';
import { BehaviorDemo } from './demos/behavior';
import { BlurDemo } from './demos/blur';
import { ContentDemo } from './demos/content';
import { CustomJsxDemo } from './demos/custom-jsx';
import { PromiseDemo } from './demos/promise';
import { SheetDemo } from './demos/sheet';
import { StackingDemo } from './demos/stacking';
import { StylingDemo } from './demos/styling';
import { UndoDeleteDemo } from './demos/undo-delete';
import { VariantsDemo } from './demos/variants';
import { WiggleDemo } from './demos/wiggle';

export const sonnerNative: LibraryDefinition = {
  slug: 'sonner-native',
  name: 'Sonner Native',
  packageName: 'sonner-native',
  tagline: 'Opinionated toasts for React Native, a port of Sonner.',
  description:
    'Toasts with built-in variants, actions, promises, swipe to dismiss, stacking, custom JSX and Reanimated animations. Call toast() from anywhere, even outside React.',
  emoji: '🍞',
  color: '#FFF1DB',
  category: 'Feedback',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/gunnartorfis/sonner-native-toasts',
      icon: 'github',
    },
    { label: 'Docs', url: 'https://sonner-native.netlify.app/', icon: 'docs' },
  ],
  install: [
    'sonner-native',
    'react-native-reanimated',
    'react-native-worklets',
    'react-native-gesture-handler',
    'react-native-safe-area-context',
    'react-native-screens',
    'react-native-svg',
  ],
  setup:
    'Render <Toaster /> once in the root layout, inside GestureHandlerRootView and SafeAreaProvider. Then call toast() anywhere.',
  onDemoExit: () => toast.dismiss(),
  demos: [
    {
      slug: 'basic',
      title: 'Basic toast',
      emoji: '👋',
      level: 'basic',
      kind: 'isolated',
      description:
        'Mount <Toaster /> once and call toast() with a title and an optional description.',
      component: BasicDemo,
    },
    {
      slug: 'variants',
      title: 'Toast variants',
      emoji: '🎨',
      level: 'basic',
      kind: 'isolated',
      description: 'The six built-in variants: default, success, error, warning, info and loading.',
      component: VariantsDemo,
    },
    {
      slug: 'content',
      title: 'Toast content variants',
      emoji: '🧱',
      level: 'basic',
      kind: 'isolated',
      description:
        'Description, action and cancel buttons, a custom icon, a close button and rich colors.',
      component: ContentDemo,
    },
    {
      slug: 'promise',
      title: 'Toast with promise',
      emoji: '🤝',
      level: 'intermediate',
      kind: 'scenario',
      description:
        'toast.promise shows a loading toast that turns into success or error when a search settles.',
      component: PromiseDemo,
    },
    {
      slug: 'behavior',
      title: 'Toast behavior variants',
      emoji: '🎛️',
      level: 'intermediate',
      kind: 'isolated',
      description: 'Non-dismissible, infinite, tappable, short-lived, bottom and centered toasts.',
      component: BehaviorDemo,
    },
    {
      slug: 'stacking',
      title: 'Toast stacking',
      emoji: '🥞',
      level: 'intermediate',
      kind: 'isolated',
      description: 'A burst of notifications with stacking on or off. Tap the stack to expand it.',
      component: StackingDemo,
    },
    {
      slug: 'wiggle',
      title: 'Toast wiggle',
      emoji: '〰️',
      level: 'intermediate',
      kind: 'scenario',
      description:
        'Tapping Upload again during an upload wiggles the existing toast instead of adding another.',
      component: WiggleDemo,
    },
    {
      slug: 'styling',
      title: 'Toast custom styling',
      emoji: '💅',
      level: 'advanced',
      kind: 'isolated',
      description:
        'Four looks built with the styles option: an iOS pill, a dark card, a brand color and Windows XP.',
      component: StylingDemo,
    },
    {
      slug: 'custom-jsx',
      title: 'Custom JSX toasts',
      emoji: '🧩',
      level: 'advanced',
      kind: 'isolated',
      description:
        'toast.custom renders a chat message, an animated upload bar and a dark suggestion pill.',
      component: CustomJsxDemo,
    },
    {
      slug: 'animations',
      title: 'Toast custom animations',
      emoji: '🎬',
      level: 'advanced',
      kind: 'isolated',
      description:
        'Per-toast Reanimated enter and exit animations: fade, slide, zoom and a Keyframe flip.',
      component: AnimationsDemo,
    },
    {
      slug: 'blur',
      title: 'Glass toasts',
      emoji: '🫧',
      level: 'advanced',
      kind: 'scenario',
      description:
        'Frosted-glass toasts over a photo, using an expo-blur BlurView as the background.',
      extraPackages: ['expo-blur'],
      component: BlurDemo,
    },
    {
      slug: 'sheet',
      title: 'Toasts inside a sheet',
      emoji: '📤',
      level: 'advanced',
      kind: 'scenario',
      description:
        'A share sheet with its own Toaster channel, so toasts appear above the native sheet.',
      extraPackages: ['@expo/ui'],
      component: SheetDemo,
    },
    {
      slug: 'navigation',
      title: 'Toast after navigation',
      emoji: '🧭',
      level: 'advanced',
      kind: 'flow',
      description: 'Save on an edit screen, pop back, and the toast appears on the list below.',
      href: '/flows/sonner-native/navigation',
    },
    {
      slug: 'undo-delete',
      title: 'Undo delete',
      emoji: '🗑️',
      level: 'advanced',
      kind: 'scenario',
      description: 'Delete a memory instantly and bring it back with the Undo action in the toast.',
      component: UndoDeleteDemo,
    },
  ],
};
