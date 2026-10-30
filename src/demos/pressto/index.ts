import type { LibraryDefinition } from '../types';
import { AnimatedChildrenDemo } from './demos/animated-children';
import { CustomPressableDemo } from './demos/custom-pressable';
import { HoldToConfirmDemo } from './demos/hold-to-confirm';
import { MemoryFeedDemo } from './demos/memory-feed';
import { PasscodeKeypadDemo } from './demos/passcode-keypad';
import { PressableOpacityDemo } from './demos/pressable-opacity';
import { PressableScaleDemo } from './demos/pressable-scale';
import { PresstoProvider } from './provider';
import { ThemedDemo } from './demos/themed';
import { TimeSlotsDemo } from './demos/time-slots';
import { TimingSpringDemo } from './demos/timing-spring';
import { ToggleDemo } from './demos/toggle';

export const pressto: LibraryDefinition = {
  slug: 'pressto',
  name: 'Pressto',
  packageName: 'pressto',
  tagline: 'Animated pressables that run on the UI thread.',
  description:
    'Drop-in replacements for TouchableOpacity built on Gesture Handler and Reanimated: scale and opacity pressables, custom press animations from a single worklet, toggle and selection states, app-wide timing or spring config, theme metadata and global handlers for haptics.',
  emoji: '👆',
  color: '#FFF1DB',
  category: 'Animations',
  links: [
    { label: 'GitHub', url: 'https://github.com/enzomanuelmangano/pressto', icon: 'github' },
    {
      label: 'Docs',
      url: 'https://github.com/enzomanuelmangano/pressto#readme',
      icon: 'docs',
    },
  ],
  install: [
    'pressto',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-worklets',
  ],
  setup:
    'Wrap the app in <GestureHandlerRootView />. On iOS 26 native-stack screens, set `fullScreenGestureEnabled: false`, or the full-width back swipe holds back touches until the finger lifts (held presses and onLongPress break). Optional: <PressablesConfig /> at the root for app-wide animation config, theme metadata and global handlers.',
  Provider: PresstoProvider,
  demos: [
    {
      slug: 'pressable-scale',
      title: 'Pressable scale',
      emoji: '🤏',
      level: 'basic',
      kind: 'showcase',
      description: 'A card and a button that shrink on press, from subtle to deep.',
      component: PressableScaleDemo,
    },
    {
      slug: 'pressable-opacity',
      title: 'Pressable opacity',
      emoji: '🌫️',
      level: 'basic',
      kind: 'showcase',
      description: 'Rows and icon buttons that fade on press, from light to strong.',
      component: PressableOpacityDemo,
    },
    {
      slug: 'custom-pressable',
      title: 'Custom press animations',
      emoji: '🌀',
      level: 'basic',
      kind: 'showcase',
      description: 'Rotate, lift, tilt and squish pressables, each made from one worklet.',
      component: CustomPressableDemo,
    },
    {
      slug: 'timing-spring',
      title: 'Timing and spring',
      emoji: '🪀',
      level: 'intermediate',
      kind: 'showcase',
      description: 'The same pressables with timing, spring or bouncy spring animations.',
      component: TimingSpringDemo,
    },
    {
      slug: 'toggle',
      title: 'Toggle pressables',
      emoji: '🔁',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Follow, notify and like buttons that flip their look on every press.',
      component: ToggleDemo,
    },
    {
      slug: 'animated-children',
      title: 'Animated children',
      emoji: '🧩',
      level: 'intermediate',
      kind: 'showcase',
      description: 'The picture zooms and the arrow slides inside a card while you press it.',
      component: AnimatedChildrenDemo,
    },
    {
      slug: 'themed',
      title: 'Themed pressables',
      emoji: '🎨',
      level: 'intermediate',
      kind: 'showcase',
      description: 'One theme passed into every press animation, switched live.',
      component: ThemedDemo,
    },
    {
      slug: 'hold-to-confirm',
      title: 'Hold to confirm',
      emoji: '⏳',
      level: 'advanced',
      kind: 'showcase',
      description: 'A button that fills while held and deletes only when the fill completes.',
      component: HoldToConfirmDemo,
    },
    {
      slug: 'passcode-keypad',
      title: 'Passcode keypad',
      emoji: '🔢',
      level: 'advanced',
      kind: 'scenario',
      description: 'One global handler gives every key a haptic and reads which digit was pressed.',
      extraPackages: ['expo-haptics'],
      component: PasscodeKeypadDemo,
    },
    {
      slug: 'time-slots',
      title: 'Time slot picker',
      emoji: '🕖',
      level: 'advanced',
      kind: 'scenario',
      description: 'Book a table: the last tapped time slot stays highlighted.',
      component: TimeSlotsDemo,
    },
    {
      slug: 'memory-feed',
      title: 'Pressable list',
      emoji: '📜',
      level: 'advanced',
      kind: 'scenario',
      description:
        'Memory cards in a scrolling list that expand on tap and never flash while scrolling.',
      component: MemoryFeedDemo,
    },
  ],
};
