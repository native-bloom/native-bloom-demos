import { LogBox } from 'react-native';

import type { LibraryDefinition } from '../types';
import { AnimatedDemo } from './demos/animated';
import { AxisLabelsDemo } from './demos/axis-labels';
import { BasicDemo } from './demos/basic';
import { CustomDotDemo } from './demos/custom-dot';
import { GradientDemo } from './demos/gradient';
import { LineStylesDemo } from './demos/line-styles';
import { LiveDemo } from './demos/live';
import { PriceChartDemo } from './demos/price-chart';
import { RangeDemo } from './demos/range';
import { ScrubbingDemo } from './demos/scrubbing';
import { SparklinesDemo } from './demos/sparklines';

// react-native-graph 1.4 still builds paths with SkPath methods that Skia 2.6 deprecates.
// The warnings come from inside the library and would put a LogBox banner in recordings.
LogBox.ignoreLogs(['[react-native-skia] SkPath.']);

export const reactNativeGraph: LibraryDefinition = {
  slug: 'react-native-graph',
  name: 'React Native Graph',
  packageName: 'react-native-graph',
  tagline: 'Fast, beautiful line graphs drawn with Skia.',
  description:
    'Line graphs rendered with Skia: smooth bezier lines, animated path morphing on the UI thread, gradient fills, scrubbing with a selection dot, a pulsing live indicator and custom ranges. Built by Margelo for crypto and wallet apps.',
  emoji: '📈',
  color: '#EAF7EE',
  category: 'Charts',
  links: [
    { label: 'GitHub', url: 'https://github.com/margelo/react-native-graph', icon: 'github' },
    { label: 'Docs', url: 'https://github.com/margelo/react-native-graph#readme', icon: 'docs' },
  ],
  install: [
    'react-native-graph',
    '@shopify/react-native-skia',
    'react-native-reanimated',
    'react-native-worklets',
    'react-native-gesture-handler',
  ],
  setup:
    'Skia is a native module: rebuild the dev build after installing (Expo Go includes it). Scrubbing needs the app wrapped in GestureHandlerRootView.',
  demos: [
    {
      slug: 'basic',
      title: 'Line graph',
      emoji: '📉',
      level: 'basic',
      kind: 'showcase',
      description:
        'A static line graph from dates and values, switching between three health metrics.',
      component: BasicDemo,
    },
    {
      slug: 'animated',
      title: 'Animated transitions',
      emoji: '🌊',
      level: 'basic',
      kind: 'showcase',
      description: 'The line morphs into the new shape when the time range changes.',
      component: AnimatedDemo,
    },
    {
      slug: 'gradient',
      title: 'Gradient fill',
      emoji: '🎨',
      level: 'basic',
      kind: 'showcase',
      description: 'A fading gradient under the line, from single colors to a sunset blend.',
      component: GradientDemo,
    },
    {
      slug: 'scrubbing',
      title: 'Scrub to read values',
      emoji: '👆',
      level: 'intermediate',
      kind: 'scenario',
      description:
        'Slide along the graph and the balance above shows the value and time under your finger.',
      extraPackages: ['expo-haptics'],
      component: ScrubbingDemo,
    },
    {
      slug: 'axis-labels',
      title: 'Axis labels',
      emoji: '🏷️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'High and low price labels placed above and below their points.',
      component: AxisLabelsDemo,
    },
    {
      slug: 'range',
      title: 'Fixed range',
      emoji: '🎯',
      level: 'intermediate',
      kind: 'scenario',
      description: 'A savings goal plotted against the whole year and the target amount.',
      component: RangeDemo,
    },
    {
      slug: 'live',
      title: 'Live heart rate',
      emoji: '❤️',
      level: 'intermediate',
      kind: 'scenario',
      description: 'A new reading every second, with a pulsing indicator on the latest one.',
      component: LiveDemo,
    },
    {
      slug: 'line-styles',
      title: 'Line styles',
      emoji: '✏️',
      level: 'advanced',
      kind: 'showcase',
      description: 'Thin, regular and bold lines, and a line that fades in from the left.',
      component: LineStylesDemo,
    },
    {
      slug: 'custom-dot',
      title: 'Custom selection dot',
      emoji: '🔘',
      level: 'advanced',
      kind: 'showcase',
      description: 'Flat, halo and crosshair selection dots drawn with Skia while scrubbing.',
      component: CustomDotDemo,
    },
    {
      slug: 'sparklines',
      title: 'Watchlist sparklines',
      emoji: '📋',
      level: 'advanced',
      kind: 'scenario',
      description: 'A watchlist with a small static graph in every row.',
      component: SparklinesDemo,
    },
    {
      slug: 'price-chart',
      title: 'Price chart',
      emoji: '💹',
      level: 'advanced',
      kind: 'scenario',
      description:
        'A full asset screen: scrubbing, time ranges, a live indicator and haptics together.',
      extraPackages: ['expo-haptics'],
      component: PriceChartDemo,
    },
  ],
};
