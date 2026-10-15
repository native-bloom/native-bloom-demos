import type { LibraryDefinition } from '../types';
import { BasicDemo } from './demos/basic';
import { ColorsDemo } from './demos/colors';
import { EventsDemo } from './demos/events';
import { LimitsDemo } from './demos/limits';
import { MusicPlayerDemo } from './demos/music-player';
import { PhotoAdjustDemo } from './demos/photo-adjust';
import { RatingDemo } from './demos/rating';
import { StepMarkersDemo } from './demos/step-markers';
import { StepsDemo } from './demos/steps';
import { ThumbsDemo } from './demos/thumbs';

export const slider: LibraryDefinition = {
  slug: 'slider',
  name: 'Slider',
  packageName: '@react-native-community/slider',
  tagline: 'The native slider: UISlider on iOS, SeekBar on Android.',
  description:
    'A native slider with steps, ranges, slide limits, track and thumb colors, thumb images and sizes, custom step markers with numbers, and start, change and complete events.',
  emoji: '🎚️',
  color: '#E8F0FF',
  category: 'Inputs',
  links: [
    { label: 'GitHub', url: 'https://github.com/callstack/react-native-slider', icon: 'github' },
    {
      label: 'Docs',
      url: 'https://github.com/callstack/react-native-slider/tree/main/package#properties',
      icon: 'docs',
    },
  ],
  install: ['@react-native-community/slider'],
  setup: 'Native module: rebuild the dev build after installing (Expo Go includes it).',
  demos: [
    {
      slug: 'basic',
      title: 'Slider',
      emoji: '🎚️',
      level: 'basic',
      kind: 'showcase',
      description: 'Drag to set how many cookies to bake and read the value live.',
      component: BasicDemo,
    },
    {
      slug: 'steps',
      title: 'Steps and ranges',
      emoji: '🪜',
      level: 'basic',
      kind: 'showcase',
      description: 'Custom min and max, snapping steps, and tap anywhere to jump.',
      component: StepsDemo,
    },
    {
      slug: 'colors',
      title: 'Slider colors',
      emoji: '🎨',
      level: 'basic',
      kind: 'showcase',
      description: 'Track and thumb tints in a few brand looks.',
      component: ColorsDemo,
    },
    {
      slug: 'limits',
      title: 'Limits',
      emoji: '🚧',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A slider whose thumb stops at limits inside the full track.',
      component: LimitsDemo,
    },
    {
      slug: 'step-markers',
      title: 'Step markers',
      emoji: '📍',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Custom dots for each step that light up as the thumb passes them.',
      component: StepMarkersDemo,
    },
    {
      slug: 'thumbs',
      title: 'Thumb sizes',
      emoji: '🔘',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Small, large and tinted thumbs.',
      component: ThumbsDemo,
    },
    {
      slug: 'events',
      title: 'Slide events',
      emoji: '📡',
      level: 'intermediate',
      kind: 'showcase',
      description: 'React when a drag starts, while it moves and when it ends.',
      component: EventsDemo,
    },
    {
      slug: 'music-player',
      title: 'Music player',
      emoji: '🎧',
      level: 'advanced',
      kind: 'scenario',
      description: 'A scrubber that seeks when you let go, plus a volume slider.',
      component: MusicPlayerDemo,
    },
    {
      slug: 'photo-adjust',
      title: 'Photo adjustments',
      emoji: '🖼️',
      level: 'advanced',
      kind: 'scenario',
      description: 'Brightness, warmth and fade sliders that edit a picture live.',
      component: PhotoAdjustDemo,
    },
    {
      slug: 'rating',
      title: 'Rate your visit',
      emoji: '⭐️',
      level: 'advanced',
      kind: 'scenario',
      description: 'A five-step slider with emoji markers that grow as you pick.',
      component: RatingDemo,
    },
  ],
};
