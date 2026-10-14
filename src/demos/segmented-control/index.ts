import type { LibraryDefinition } from '../types';
import { AppearanceDemo } from './demos/appearance';
import { BasicDemo } from './demos/basic';
import { FilterFeedDemo } from './demos/filter-feed';
import { IconsDemo } from './demos/icons';
import { StatesDemo } from './demos/states';
import { StylesDemo } from './demos/styles';
import { TabsDemo } from './demos/tabs';
import { ThemeSettingDemo } from './demos/theme-setting';
import { ViewSwitcherDemo } from './demos/view-switcher';

export const segmentedControl: LibraryDefinition = {
  slug: 'segmented-control',
  name: 'Segmented Control',
  packageName: '@react-native-segmented-control/segmented-control',
  tagline: 'The native iOS segmented control, with a matching Android version.',
  description:
    'UISegmentedControl on iOS and a look-alike JavaScript control on Android and web. Text or icon segments, momentary and disabled states, custom tint, background and fonts, and a forced light or dark appearance.',
  emoji: '🎛️',
  color: '#E8F0FF',
  category: 'Inputs',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/react-native-segmented-control/segmented-control',
      icon: 'github',
    },
    {
      label: 'Docs',
      url: 'https://github.com/react-native-segmented-control/segmented-control#reference',
      icon: 'docs',
    },
  ],
  install: ['@react-native-segmented-control/segmented-control'],
  setup: 'Native module on iOS: rebuild the dev build after installing (Expo Go includes it).',
  demos: [
    {
      slug: 'basic',
      title: 'Segmented control',
      emoji: '🎛️',
      level: 'basic',
      kind: 'showcase',
      description: 'Switch between day, week and month and read the choice back.',
      component: BasicDemo,
    },
    {
      slug: 'icons',
      title: 'Icon segments',
      emoji: '🖼️',
      level: 'basic',
      kind: 'showcase',
      description: 'Segments that show template images instead of text.',
      component: IconsDemo,
    },
    {
      slug: 'states',
      title: 'Momentary and disabled',
      emoji: '⏸️',
      level: 'basic',
      kind: 'showcase',
      description: 'A momentary control that acts like buttons, and a disabled one.',
      component: StatesDemo,
    },
    {
      slug: 'styles',
      title: 'Custom styles',
      emoji: '🎨',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Brand tints, backgrounds, fonts and a taller control.',
      component: StylesDemo,
    },
    {
      slug: 'appearance',
      title: 'Forced appearance',
      emoji: '🌗',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A control that stays light or dark whatever the system theme is.',
      component: AppearanceDemo,
    },
    {
      slug: 'filter-feed',
      title: 'Filter a feed',
      emoji: '🗂️',
      level: 'advanced',
      kind: 'scenario',
      description: 'Filter memories by category, with the list animating to the new results.',
      component: FilterFeedDemo,
    },
    {
      slug: 'view-switcher',
      title: 'List and grid toggle',
      emoji: '🔲',
      level: 'advanced',
      kind: 'scenario',
      description: 'Icon segments that switch a photo album between a list and a grid.',
      component: ViewSwitcherDemo,
    },
    {
      slug: 'theme-setting',
      title: 'Theme setting',
      emoji: '🌓',
      level: 'advanced',
      kind: 'scenario',
      description: 'A settings row that switches the whole app between light, dark and system.',
      component: ThemeSettingDemo,
    },
    {
      slug: 'tabs',
      title: 'Segmented tabs',
      emoji: '📑',
      level: 'advanced',
      kind: 'scenario',
      description: 'A profile whose memories, places and friends panes slide with the control.',
      component: TabsDemo,
    },
  ],
};
