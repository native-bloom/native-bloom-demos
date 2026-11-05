import type { LibraryDefinition } from '../types';
import { AiPromptDemo } from './demos/ai-prompt';
import { CometTrailDemo } from './demos/comet-trail';
import { GlowButtonDemo } from './demos/glow-button';
import { GlowLayersDemo } from './demos/glow-layers';
import { GradientBorderDemo } from './demos/gradient-border';
import { PlacementsDemo } from './demos/placements';
import { PlanPickerDemo } from './demos/plan-picker';
import { PresetsDemo } from './demos/presets';
import { PressStatesDemo } from './demos/press-states';
import { ScreenEdgeDemo } from './demos/screen-edge';
import { StoryRingsDemo } from './demos/story-rings';

export const animatedGlow: LibraryDefinition = {
  slug: 'animated-glow',
  name: 'Animated Glow',
  packageName: 'react-native-animated-glow',
  tagline: 'Animated glows and gradient borders drawn by one Skia shader.',
  description:
    'Wrap any view in <AnimatedGlow /> to give it flowing glows and animated gradient borders, rendered in a single Skia shader on the UI thread. Stack up to seven glow layers behind, inside or over the view, taper them into comet trails, and blend smoothly between default, hover and press looks.',
  emoji: '✨',
  color: '#F1E8FF',
  category: 'Animations',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/realimposter/react-native-animated-glow',
      icon: 'github',
    },
    { label: 'Docs', url: 'https://reactnativeglow.com/docs', icon: 'docs' },
  ],
  install: [
    'react-native-animated-glow',
    '@shopify/react-native-skia',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-worklets',
  ],
  setup:
    'Follow the Skia, Reanimated and Gesture Handler setup (Babel plugin, <GestureHandlerRootView /> at the root). Skia has native code: rebuild the dev build after installing it.',
  demos: [
    {
      slug: 'presets',
      title: 'Glow presets',
      emoji: '🌈',
      level: 'basic',
      kind: 'showcase',
      description: 'The two presets that ship with the library, on the same button.',
      component: PresetsDemo,
    },
    {
      slug: 'glow-button',
      title: 'Glowing button',
      emoji: '🔆',
      level: 'basic',
      kind: 'showcase',
      description: 'One soft glow layer behind a pill button, in four colors.',
      component: GlowButtonDemo,
    },
    {
      slug: 'press-states',
      title: 'Glow on press',
      emoji: '👆',
      level: 'basic',
      kind: 'showcase',
      description: 'The glow grows, brightens and speeds up while the button is held.',
      component: PressStatesDemo,
    },
    {
      slug: 'placements',
      title: 'Glow placement',
      emoji: '🎯',
      level: 'intermediate',
      kind: 'showcase',
      description: 'The same glow drawn behind, inside or over a card.',
      component: PlacementsDemo,
    },
    {
      slug: 'gradient-border',
      title: 'Animated gradient border',
      emoji: '🖍️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A list of border colors turns the outline into a moving gradient.',
      component: GradientBorderDemo,
    },
    {
      slug: 'comet-trail',
      title: 'Comet trail',
      emoji: '☄️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A short, tapered glow that chases around the edge of a card.',
      component: CometTrailDemo,
    },
    {
      slug: 'glow-layers',
      title: 'Layered glow',
      emoji: '🧅',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Glow layers with their own sizes and speeds stack into one rich glow.',
      component: GlowLayersDemo,
    },
    {
      slug: 'ai-prompt',
      title: 'AI prompt field',
      emoji: '🪄',
      level: 'advanced',
      kind: 'scenario',
      description: 'An inner glow around an assistant input that speeds up while it thinks.',
      component: AiPromptDemo,
    },
    {
      slug: 'plan-picker',
      title: 'Glowing plan picker',
      emoji: '💎',
      level: 'advanced',
      kind: 'scenario',
      description: 'Only the selected plan glows; the glow fades from card to card.',
      component: PlanPickerDemo,
    },
    {
      slug: 'story-rings',
      title: 'Live story rings',
      emoji: '🔴',
      level: 'advanced',
      kind: 'scenario',
      description: 'Friends who are live get a spinning gradient ring around their avatar.',
      component: StoryRingsDemo,
    },
    {
      slug: 'screen-edge',
      title: 'Screen edge glow',
      emoji: '🎙️',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'An assistant glow wraps the screen edges while it listens.',
      component: ScreenEdgeDemo,
    },
  ],
};
