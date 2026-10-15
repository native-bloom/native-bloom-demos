import type { LibraryDefinition } from '../types';
import { BasicDemo } from './demos/basic';
import { DisabledDemo } from './demos/disabled';
import { ExpandableRowDemo } from './demos/expandable-row';
import { LinkedDemo } from './demos/linked';
import { MultipleWheelsDemo } from './demos/multiple-wheels';
import { SheetDemo } from './demos/sheet';
import { StyledItemsDemo } from './demos/styled-items';
import { ThemeDemo } from './demos/theme';

export const picker: LibraryDefinition = {
  slug: 'picker',
  name: 'Picker',
  packageName: '@react-native-picker/picker',
  tagline: 'The native wheel picker on iOS and spinner on Android.',
  description:
    'A cross-platform picker: UIPickerView wheels on iOS, a dropdown or dialog spinner on Android. Controlled with selectedValue, with per-item colors and disabled items, iOS fonts and selection color, and Android prompt and dialog modes.',
  emoji: '🎰',
  color: '#FFF1DB',
  category: 'Inputs',
  links: [
    { label: 'GitHub', url: 'https://github.com/react-native-picker/picker', icon: 'github' },
    { label: 'Docs', url: 'https://github.com/react-native-picker/picker#props', icon: 'docs' },
  ],
  install: ['@react-native-picker/picker'],
  setup:
    'Native module: rebuild the dev build after installing (Expo Go includes it). iOS renders inline wheels; Android renders a spinner that opens a dropdown or dialog.',
  demos: [
    {
      slug: 'basic',
      title: 'Picker',
      emoji: '🎰',
      level: 'basic',
      kind: 'showcase',
      description: 'Pick a café from a wheel and read the choice back.',
      component: BasicDemo,
    },
    {
      slug: 'styled-items',
      title: 'Styled items',
      emoji: '🎨',
      level: 'basic',
      kind: 'showcase',
      description: 'Bigger, bolder wheels with colored items and a tinted selection.',
      platforms: ['ios'],
      component: StyledItemsDemo,
    },
    {
      slug: 'disabled',
      title: 'Disabled items',
      emoji: '🚫',
      level: 'basic',
      kind: 'showcase',
      description: 'Sold-out sizes you can see but not pick, and a locked picker.',
      component: DisabledDemo,
    },
    {
      slug: 'multiple-wheels',
      title: 'Multiple wheels',
      emoji: '⏲️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Hours and minutes wheels side by side for a baking timer.',
      component: MultipleWheelsDemo,
    },
    {
      slug: 'linked',
      title: 'Linked pickers',
      emoji: '🔗',
      level: 'intermediate',
      kind: 'showcase',
      description: 'The city wheel refills when you change the country.',
      component: LinkedDemo,
    },
    {
      slug: 'theme',
      title: 'Light and dark wheels',
      emoji: '🌗',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Force a light or dark wheel whatever the system theme.',
      platforms: ['ios'],
      component: ThemeDemo,
    },
    {
      slug: 'sheet',
      title: 'Picker in a sheet',
      emoji: '🔔',
      level: 'advanced',
      kind: 'scenario',
      description: 'A reminder row that opens a wheel in a bottom sheet with a Done button.',
      extraPackages: ['@lodev09/react-native-true-sheet'],
      component: SheetDemo,
    },
    {
      slug: 'expandable-row',
      title: 'Expandable row',
      emoji: '📋',
      level: 'advanced',
      kind: 'scenario',
      description: 'Settings-style rows that open an inline wheel under them.',
      platforms: ['ios'],
      component: ExpandableRowDemo,
    },
  ],
};
