import type { LibraryDefinition } from '../types';
import { ActivityDashboardDemo } from './demos/activity-dashboard';
import { AnimatedDataDemo } from './demos/animated-data';
import { BarChartDemo } from './demos/bar-chart';
import { ChartTypesDemo } from './demos/chart-types';
import { DonutFocusDemo } from './demos/donut-focus';
import { LineAreaDemo } from './demos/line-area';
import { LinePointerDemo } from './demos/line-pointer';
import { LiveHeartRateDemo } from './demos/live-heart-rate';
import { MultiLineDemo } from './demos/multi-line';
import { PieDonutDemo } from './demos/pie-donut';
import { GiftedChartsProvider } from './provider';
import { SpendingBreakdownDemo } from './demos/spending-breakdown';
import { StackedBarsDemo } from './demos/stacked-bars';

export const giftedCharts: LibraryDefinition = {
  slug: 'gifted-charts',
  name: 'Gifted Charts',
  packageName: 'react-native-gifted-charts',
  tagline: 'Bar, line, area, pie, radar and more charts with one prop each.',
  description:
    'A large chart library built on react-native-svg: bar, stacked, horizontal and 3D bars, line and area charts with gradients and pointers, pie and donut charts with focus on press, radar, population pyramid, candlestick and bubble charts. Animations on load and on data change come from a single prop, and almost every part (axes, labels, tooltips, data points) is customizable.',
  emoji: '📊',
  color: '#FFF1DB',
  category: 'Charts',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts',
      icon: 'github',
    },
    { label: 'Docs', url: 'https://gifted-charts.web.app', icon: 'docs' },
  ],
  install: ['react-native-gifted-charts', 'react-native-svg', 'expo-linear-gradient'],
  setup:
    'Pure JavaScript on react-native-svg, but it needs a linear gradient module (expo-linear-gradient in Expo apps), which is native: rebuild the dev build after installing it. On iOS 26 native-stack screens, set `fullScreenGestureEnabled: false` where charts use pointers or scroll, or the full-width back swipe takes the drag.',
  Provider: GiftedChartsProvider,
  demos: [
    {
      slug: 'bar-chart',
      title: 'Bar chart variants',
      emoji: '📊',
      level: 'basic',
      kind: 'showcase',
      description: 'A week of steps as default, rounded, gradient and 3D bars.',
      component: BarChartDemo,
    },
    {
      slug: 'line-area',
      title: 'Line and area charts',
      emoji: '📈',
      level: 'basic',
      kind: 'showcase',
      description: 'The same data as a straight line, a curved line and a gradient area.',
      component: LineAreaDemo,
    },
    {
      slug: 'pie-donut',
      title: 'Pie and donut',
      emoji: '🥧',
      level: 'basic',
      kind: 'showcase',
      description: 'One dataset as a pie, a donut with a center label and a 3D pie.',
      component: PieDonutDemo,
    },
    {
      slug: 'animated-data',
      title: 'Animated data change',
      emoji: '🎞️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Bars and a line animate to new values when the data changes.',
      component: AnimatedDataDemo,
    },
    {
      slug: 'line-pointer',
      title: 'Line chart with pointer',
      emoji: '👆',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Drag across an area chart and a pointer label follows your finger.',
      component: LinePointerDemo,
    },
    {
      slug: 'stacked-bars',
      title: 'Stacked bar chart',
      emoji: '🧱',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Screen time per day, stacked by part of the app, with a legend.',
      component: StackedBarsDemo,
    },
    {
      slug: 'donut-focus',
      title: 'Donut focus on press',
      emoji: '🍩',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Tap a slice: it pops out and the center label shows its share.',
      component: DonutFocusDemo,
    },
    {
      slug: 'multi-line',
      title: 'Multi-line comparison',
      emoji: '〰️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Three friends’ steps on one chart, each line toggled from the legend.',
      component: MultiLineDemo,
    },
    {
      slug: 'chart-types',
      title: 'More chart types',
      emoji: '🧭',
      level: 'advanced',
      kind: 'showcase',
      description: 'Radar, population pyramid, candlestick and bubble charts.',
      component: ChartTypesDemo,
    },
    {
      slug: 'activity-dashboard',
      title: 'Activity dashboard',
      emoji: '🏃',
      level: 'advanced',
      kind: 'scenario',
      description: 'Steps per day with a goal line and a trend line; tap a day for its stats.',
      component: ActivityDashboardDemo,
    },
    {
      slug: 'spending-breakdown',
      title: 'Spending breakdown',
      emoji: '💸',
      level: 'advanced',
      kind: 'scenario',
      description: 'A donut of the month’s spending that focuses the category you tap.',
      component: SpendingBreakdownDemo,
    },
    {
      slug: 'live-heart-rate',
      title: 'Live data chart',
      emoji: '❤️',
      level: 'advanced',
      kind: 'scenario',
      description: 'A heart-rate line that grows every second and scrolls to the newest beat.',
      component: LiveHeartRateDemo,
    },
  ],
};
