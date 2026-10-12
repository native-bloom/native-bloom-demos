import type { LibraryDefinition } from '../types';
import { BasicDemo } from './demos/basic';
import { BirthdayDemo } from './demos/birthday';
import { DisplaysDemo } from './demos/displays';
import { EventFormDemo } from './demos/event-form';
import { LimitsDemo } from './demos/limits';
import { MinuteIntervalDemo } from './demos/minute-interval';
import { ModesDemo } from './demos/modes';
import { SheetDemo } from './demos/sheet';
import { StylingDemo } from './demos/styling';
import { TimeZonesDemo } from './demos/time-zones';

export const datetimepicker: LibraryDefinition = {
  slug: 'datetimepicker',
  name: 'DateTimePicker',
  packageName: '@react-native-community/datetimepicker',
  tagline: 'Native date and time pickers for iOS and Android.',
  description:
    'The platform date and time pickers: compact, inline calendar and wheel styles on iOS, dialogs on Android. Supports date ranges, minute intervals, time zones and accent colors.',
  emoji: '📅',
  color: '#E8F0FF',
  category: 'Inputs',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/react-native-datetimepicker/datetimepicker',
      icon: 'github',
    },
    {
      label: 'Docs',
      url: 'https://github.com/react-native-datetimepicker/datetimepicker/blob/master/README.md',
      icon: 'docs',
    },
  ],
  install: ['@react-native-community/datetimepicker'],
  setup:
    'Native module: rebuild the dev build after installing (Expo Go includes it). iOS renders the picker inline; on Android it opens a dialog, best opened with DateTimePickerAndroid.open().',
  demos: [
    {
      slug: 'basic',
      title: 'Date picker',
      emoji: '📅',
      level: 'basic',
      kind: 'showcase',
      description:
        'Pick a date and read it back, with the inline picker on iOS and a dialog on Android.',
      component: BasicDemo,
    },
    {
      slug: 'modes',
      title: 'Picker modes',
      emoji: '🎚️',
      level: 'basic',
      kind: 'showcase',
      description: 'Date, time, date and time, and countdown wheels.',
      platforms: ['ios'],
      component: ModesDemo,
    },
    {
      slug: 'displays',
      title: 'Display styles',
      emoji: '🗓️',
      level: 'basic',
      kind: 'showcase',
      description: 'The compact pill, the inline calendar and the classic wheels.',
      platforms: ['ios'],
      component: DisplaysDemo,
    },
    {
      slug: 'limits',
      title: 'Date limits',
      emoji: '⛔️',
      level: 'intermediate',
      kind: 'scenario',
      description: 'A booking calendar that only allows the next two weeks.',
      platforms: ['ios'],
      component: LimitsDemo,
    },
    {
      slug: 'minute-interval',
      title: 'Minute intervals',
      emoji: '⏱️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Time wheels that step by 1, 5, 15 or 30 minutes.',
      platforms: ['ios'],
      component: MinuteIntervalDemo,
    },
    {
      slug: 'time-zones',
      title: 'Time zones',
      emoji: '🌍',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Pick a call time in New York, London or Tokyo and see it in your own time.',
      platforms: ['ios'],
      component: TimeZonesDemo,
    },
    {
      slug: 'styling',
      title: 'Custom colors',
      emoji: '🎨',
      level: 'advanced',
      kind: 'showcase',
      description: 'An inline calendar in blue, pink, green and a dark night theme.',
      platforms: ['ios'],
      component: StylingDemo,
    },
    {
      slug: 'event-form',
      title: 'Event form',
      emoji: '📝',
      level: 'advanced',
      kind: 'scenario',
      description: 'Start and end pickers in a new-event form, with an all-day switch.',
      platforms: ['ios'],
      component: EventFormDemo,
    },
    {
      slug: 'birthday',
      title: 'Birthday picker',
      emoji: '🎂',
      level: 'advanced',
      kind: 'scenario',
      description: 'An onboarding step with birthday wheels, a minimum age and a live age readout.',
      platforms: ['ios'],
      component: BirthdayDemo,
    },
    {
      slug: 'sheet',
      title: 'Picker in a sheet',
      emoji: '🔔',
      level: 'advanced',
      kind: 'scenario',
      description: 'A reminder row that opens date and time wheels in a bottom sheet.',
      extraPackages: ['@expo/ui'],
      platforms: ['ios'],
      component: SheetDemo,
    },
  ],
};
