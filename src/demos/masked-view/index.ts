import type { LibraryDefinition } from '../types';
import { FadedEdgesDemo } from './demos/faded-edges';
import { GradientTextDemo } from './demos/gradient-text';
import { ImageTextDemo } from './demos/image-text';
import { LogoRevealDemo } from './demos/logo-reveal';
import { ProgressTextDemo } from './demos/progress-text';
import { ShapesDemo } from './demos/shapes';
import { ShimmerDemo } from './demos/shimmer';
import { SpotlightDemo } from './demos/spotlight';
import { TextMaskDemo } from './demos/text-mask';

export const maskedView: LibraryDefinition = {
  slug: 'masked-view',
  name: 'Masked View',
  packageName: '@react-native-masked-view/masked-view',
  tagline: 'Show any view through the shape of another.',
  description:
    'Renders its children only where the mask element is opaque. Text, images, SVG shapes and gradients all work as masks, and the mask can animate: gradient text, faded scroll edges, shimmer effects and splash reveals.',
  emoji: '🎭',
  color: '#F6E8FF',
  category: 'Components',
  links: [
    { label: 'GitHub', url: 'https://github.com/callstack/masked-view', icon: 'github' },
    { label: 'Docs', url: 'https://github.com/callstack/masked-view#usage', icon: 'docs' },
  ],
  install: ['@react-native-masked-view/masked-view'],
  setup:
    'Native module: rebuild the dev build after installing (Expo Go and Expo Router apps already include it). On Android, animated masks need androidRenderingMode="software".',
  demos: [
    {
      slug: 'text-mask',
      title: 'Text mask',
      emoji: '🔤',
      level: 'basic',
      kind: 'showcase',
      description: 'Bold letters cut out of a row of color stripes.',
      component: TextMaskDemo,
    },
    {
      slug: 'image-text',
      title: 'Image through text',
      emoji: '🖼️',
      level: 'basic',
      kind: 'showcase',
      description: 'A picture seen through big letters.',
      component: ImageTextDemo,
    },
    {
      slug: 'shapes',
      title: 'Shape masks',
      emoji: '🔷',
      level: 'basic',
      kind: 'showcase',
      description: 'Crop a photo to a circle, an SVG heart or an emoji silhouette.',
      extraPackages: ['react-native-svg', 'expo-image'],
      component: ShapesDemo,
    },
    {
      slug: 'gradient-text',
      title: 'Gradient text',
      emoji: '🌈',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Headlines filled with a gradient instead of a flat color.',
      component: GradientTextDemo,
    },
    {
      slug: 'faded-edges',
      title: 'Faded edges',
      emoji: '🌫️',
      level: 'intermediate',
      kind: 'scenario',
      description: 'A list that fades out softly at the top and bottom as it scrolls.',
      component: FadedEdgesDemo,
    },
    {
      slug: 'spotlight',
      title: 'Animated mask',
      emoji: '🔦',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A circle that grows from the tap point to reveal a picture.',
      extraPackages: ['react-native-reanimated', 'expo-image'],
      component: SpotlightDemo,
    },
    {
      slug: 'shimmer',
      title: 'Shimmer text',
      emoji: '✨',
      level: 'advanced',
      kind: 'showcase',
      description: 'A band of light that sweeps across text, like slide to unlock.',
      extraPackages: ['react-native-reanimated'],
      component: ShimmerDemo,
    },
    {
      slug: 'progress-text',
      title: 'Progress fill text',
      emoji: '📶',
      level: 'advanced',
      kind: 'scenario',
      description: 'The upload percentage fills with color as the memory uploads.',
      extraPackages: ['react-native-reanimated'],
      component: ProgressTextDemo,
    },
    {
      slug: 'logo-reveal',
      title: 'Logo reveal',
      emoji: '🌸',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'A splash logo that zooms open to reveal the app behind it.',
      extraPackages: ['react-native-reanimated'],
      component: LogoRevealDemo,
    },
  ],
};
