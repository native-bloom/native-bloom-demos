import type { LibraryDefinition } from '../types';
import { AddRemoveDemo } from './demos/add-remove';
import { AutoScrollDemo } from './demos/auto-scroll';
import { DayPlannerDemo } from './demos/day-planner';
import { DragFeedbackDemo } from './demos/drag-feedback';
import { DropIndicatorDemo } from './demos/drop-indicator';
import { GridDemo } from './demos/grid';
import { HandleDemo } from './demos/handle';
import { HomeScreenDemo } from './demos/home-screen';
import { ListDemo } from './demos/list';
import { PinnedDemo } from './demos/pinned';
import { StrategiesDemo } from './demos/strategies';
import { TagsDemo } from './demos/tags';

export const sortables: LibraryDefinition = {
  slug: 'sortables',
  name: 'React Native Sortables',
  packageName: 'react-native-sortables',
  tagline: 'Drag-and-drop sortable grids and flex layouts.',
  description:
    'Sortable grids, lists and flex layouts with drag handles, fixed items, drop indicators, auto scroll and layout animations. Built on Reanimated and Gesture Handler, with no native code of its own.',
  emoji: '🧲',
  color: '#EAF7EE',
  category: 'Components',
  links: [
    { label: 'GitHub', url: 'https://github.com/MatiPl01/react-native-sortables', icon: 'github' },
    { label: 'Docs', url: 'https://react-native-sortables-docs.vercel.app/', icon: 'docs' },
    {
      label: 'Demos',
      url: 'https://github.com/MatiPl01/react-native-sortables-demos',
      icon: 'link',
    },
  ],
  install: [
    'react-native-sortables',
    'react-native-reanimated',
    'react-native-worklets',
    'react-native-gesture-handler',
  ],
  setup:
    'Pure JavaScript: wrap the app in GestureHandlerRootView. Haptics turn on automatically when expo-haptics is installed.',
  demos: [
    {
      slug: 'grid',
      title: 'Sortable grid',
      emoji: '🔳',
      level: 'basic',
      kind: 'showcase',
      description: 'Long-press a tile and drag it to a new spot in a three-column grid.',
      component: GridDemo,
    },
    {
      slug: 'tags',
      title: 'Sortable tags',
      emoji: '🏷️',
      level: 'basic',
      kind: 'showcase',
      description: 'Chips of different widths that wrap and reflow while you drag.',
      component: TagsDemo,
    },
    {
      slug: 'list',
      title: 'Sortable list',
      emoji: '🏆',
      level: 'basic',
      kind: 'showcase',
      description: 'Rank your favourite cafés; the numbers follow the new order.',
      component: ListDemo,
    },
    {
      slug: 'handle',
      title: 'Drag handle',
      emoji: '🤚',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Rows that only move when you grab the grip, so the rest stays tappable.',
      component: HandleDemo,
    },
    {
      slug: 'pinned',
      title: 'Pinned items',
      emoji: '📌',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A grid where pinned cells keep their place while the rest reorder around them.',
      component: PinnedDemo,
    },
    {
      slug: 'strategies',
      title: 'Reorder strategies',
      emoji: '🔀',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Insert shifts every tile along; swap trades places with one.',
      component: StrategiesDemo,
    },
    {
      slug: 'drop-indicator',
      title: 'Drop indicator',
      emoji: '🎯',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A placeholder that shows where the tile will land, default or custom.',
      component: DropIndicatorDemo,
    },
    {
      slug: 'auto-scroll',
      title: 'Auto scroll',
      emoji: '📜',
      level: 'intermediate',
      kind: 'scenario',
      description: 'Drag a song to the edge of a long playlist and the page scrolls with you.',
      component: AutoScrollDemo,
    },
    {
      slug: 'add-remove',
      title: 'Add and remove items',
      emoji: '➕',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Tags animate in and out, and the delete button still works inside a sortable.',
      component: AddRemoveDemo,
    },
    {
      slug: 'drag-feedback',
      title: 'Custom drag feedback',
      emoji: '✨',
      level: 'advanced',
      kind: 'showcase',
      description: 'Tiles that change color and tilt as they lift, driven by the item context.',
      component: DragFeedbackDemo,
    },
    {
      slug: 'home-screen',
      title: 'Home screen icons',
      emoji: '📱',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'Jiggle mode like the iPhone home screen: drag to rearrange, tap to remove.',
      extraPackages: ['expo-haptics'],
      component: HomeScreenDemo,
    },
    {
      slug: 'day-planner',
      title: 'Day planner',
      emoji: '🗓️',
      level: 'advanced',
      kind: 'scenario',
      description: 'Drag tasks above the line to schedule them; their start times update live.',
      component: DayPlannerDemo,
    },
  ],
};
