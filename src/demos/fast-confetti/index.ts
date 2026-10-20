import type { LibraryDefinition } from '../types';
import { BirthdayCardDemo } from './demos/birthday-card';
import { BurstDemo } from './demos/burst';
import { CannonsDemo } from './demos/cannons';
import { ChecklistDemo } from './demos/checklist';
import { ColorsDemo } from './demos/colors';
import { ConfettiDemo } from './demos/confetti';
import { ContinuousDemo } from './demos/continuous';
import { ControlsDemo } from './demos/controls';
import { GiftSentDemo } from './demos/gift-sent';
import { LikeBurstDemo } from './demos/like-burst';
import { PhysicsDemo } from './demos/physics';
import { ShapesDemo } from './demos/shapes';
import { TexturesDemo } from './demos/textures';

export const fastConfetti: LibraryDefinition = {
  slug: 'fast-confetti',
  name: 'Fast Confetti',
  packageName: 'react-native-fast-confetti',
  tagline: 'The fastest confetti for React Native, drawn with Skia Atlas.',
  description:
    'Falling, continuous, burst and cannon confetti drawn in a single Skia Atlas: rectangles, circles and pills of any size, image and SVG textures, color palettes, physics controls, and restart, pause, resume and reset through a ref.',
  emoji: '🎉',
  color: '#FFE4EC',
  category: 'Animations',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/AlirezaHadjar/react-native-fast-confetti',
      icon: 'github',
    },
    {
      label: 'Docs',
      url: 'https://github.com/AlirezaHadjar/react-native-fast-confetti#readme',
      icon: 'docs',
    },
  ],
  install: [
    'react-native-fast-confetti',
    '@shopify/react-native-skia',
    'react-native-reanimated',
    'react-native-worklets',
  ],
  setup:
    'No app-level setup. The library is plain JavaScript on top of Skia and Reanimated, which need a dev build (Expo Go includes both).',
  demos: [
    {
      slug: 'confetti',
      title: 'Confetti',
      emoji: '🎉',
      level: 'basic',
      kind: 'isolated',
      description: 'Confetti falling over the whole screen, started from a button.',
      component: ConfettiDemo,
    },
    {
      slug: 'burst',
      title: 'Confetti burst',
      emoji: '💥',
      level: 'basic',
      kind: 'isolated',
      description: 'Confetti bursting out of one point, or two at once, then drifting down.',
      component: BurstDemo,
    },
    {
      slug: 'cannons',
      title: 'Confetti cannons',
      emoji: '🎊',
      level: 'basic',
      kind: 'isolated',
      description: 'Cannons that fire from the corners, straight up, or crossing in the middle.',
      component: CannonsDemo,
    },
    {
      slug: 'shapes',
      title: 'Flake shapes',
      emoji: '🟦',
      level: 'basic',
      kind: 'showcase',
      description:
        'Strips, squares, circles and pills, alone or mixed, from flake sizes and corner radius.',
      component: ShapesDemo,
    },
    {
      slug: 'continuous',
      title: 'Continuous confetti',
      emoji: '♾️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A seamless, never-ending stream at three densities.',
      component: ContinuousDemo,
    },
    {
      slug: 'colors',
      title: 'Confetti colors',
      emoji: '🎨',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Color palettes for the whole shower or per flake, in solid or glossy finish.',
      component: ColorsDemo,
    },
    {
      slug: 'physics',
      title: 'Fall physics',
      emoji: '🪶',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Gravity, drift and wobble: floaty, heavy and tumbling confetti.',
      component: PhysicsDemo,
    },
    {
      slug: 'controls',
      title: 'Play controls',
      emoji: '⏯️',
      level: 'intermediate',
      kind: 'isolated',
      description: 'Start, pause, resume and reset the animation through its ref.',
      component: ControlsDemo,
    },
    {
      slug: 'textures',
      title: 'Custom textures',
      emoji: '❄️',
      level: 'advanced',
      kind: 'showcase',
      description: 'Snowflakes, autumn leaves and petals drawn from Skia SVGs.',
      component: TexturesDemo,
    },
    {
      slug: 'like-burst',
      title: 'Like burst',
      emoji: '❤️',
      level: 'advanced',
      kind: 'scenario',
      description: 'Hearts burst from exactly where you tap the like button.',
      component: LikeBurstDemo,
    },
    {
      slug: 'checklist',
      title: 'All done',
      emoji: '✅',
      level: 'advanced',
      kind: 'scenario',
      description: 'Checking off the last task fires confetti cannons from both corners.',
      component: ChecklistDemo,
    },
    {
      slug: 'gift-sent',
      title: 'Gift sent',
      emoji: '🎁',
      level: 'advanced',
      kind: 'scenario',
      description: 'A success screen that bursts confetti from behind its check mark.',
      component: GiftSentDemo,
    },
    {
      slug: 'birthday-card',
      title: 'Birthday card',
      emoji: '🎂',
      level: 'advanced',
      kind: 'scenario',
      description: 'Confetti that falls only inside one card, behind its text.',
      component: BirthdayCardDemo,
    },
  ],
};
