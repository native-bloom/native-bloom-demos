import type { LibraryDefinition } from '../types';
import { CircularSlidersDemo } from './demos/circular-sliders';
import { ColorGridDemo } from './demos/color-grid';
import { ColorInputDemo } from './demos/color-input';
import { ColorWheelDemo } from './demos/color-wheel';
import { HarmoniesDemo } from './demos/harmonies';
import { HuePanelDemo } from './demos/hue-panel';
import { ProfileColorDemo } from './demos/profile-color';
import { ScrollViewDemo } from './demos/scroll-view';
import { SliderPickerDemo } from './demos/slider-picker';
import { SpectrumPanelDemo } from './demos/spectrum-panel';
import { SquarePickerDemo } from './demos/square-picker';
import { ThumbShapesDemo } from './demos/thumb-shapes';
import { VerticalSlidersDemo } from './demos/vertical-sliders';

export const reanimatedColorPicker: LibraryDefinition = {
  slug: 'reanimated-color-picker',
  name: 'Reanimated Color Picker',
  packageName: 'reanimated-color-picker',
  tagline: 'A pure JavaScript color picker built on Reanimated.',
  description:
    'Compose a color picker from panels, wheels, sliders, swatches, previews and text inputs. Everything runs on the UI thread with Reanimated and Gesture Handler, with no native code of its own.',
  emoji: '🎨',
  color: '#FFE4EC',
  category: 'Inputs',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/alabsi91/reanimated-color-picker',
      icon: 'github',
    },
    { label: 'Docs', url: 'https://alabsi91.github.io/reanimated-color-picker/', icon: 'docs' },
  ],
  install: ['reanimated-color-picker', 'react-native-reanimated', 'react-native-gesture-handler'],
  setup:
    'Pure JavaScript: no rebuild needed beyond Reanimated and Gesture Handler. The app root must be wrapped in GestureHandlerRootView.',
  demos: [
    {
      slug: 'square-picker',
      title: 'Square picker',
      emoji: '🟥',
      level: 'basic',
      kind: 'showcase',
      description:
        'The classic picker: a saturation and brightness square, hue and opacity sliders, swatches and a live value.',
      component: SquarePickerDemo,
    },
    {
      slug: 'color-wheel',
      title: 'Color wheel',
      emoji: '🎡',
      level: 'basic',
      kind: 'showcase',
      description: 'A hue wheel whose centre controls saturation, HSL saturation or brightness.',
      component: ColorWheelDemo,
    },
    {
      slug: 'hue-panel',
      title: 'Hue panel',
      emoji: '🌈',
      level: 'basic',
      kind: 'showcase',
      description:
        'Hue across, and saturation, HSL saturation or brightness down, in one rectangle.',
      component: HuePanelDemo,
    },
    {
      slug: 'slider-picker',
      title: 'Slider picker',
      emoji: '🎚️',
      level: 'basic',
      kind: 'showcase',
      description: 'A picker made only of labelled sliders, in HSB, HSL or RGB.',
      component: SliderPickerDemo,
    },
    {
      slug: 'vertical-sliders',
      title: 'Vertical sliders',
      emoji: '📶',
      level: 'intermediate',
      kind: 'showcase',
      description: 'The same sliders standing up, like a mixing desk for color channels.',
      component: VerticalSlidersDemo,
    },
    {
      slug: 'circular-sliders',
      title: 'Circular sliders',
      emoji: '⭕️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A hue or luminance ring wrapped around a panel.',
      component: CircularSlidersDemo,
    },
    {
      slug: 'spectrum-panel',
      title: 'Spectrum panel',
      emoji: '🌅',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Every hue, from white to black, on one panel.',
      component: SpectrumPanelDemo,
    },
    {
      slug: 'color-grid',
      title: 'Color grid',
      emoji: '🔲',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A grid of preset colors to tap or drag across, with an opacity slider.',
      component: ColorGridDemo,
    },
    {
      slug: 'color-input',
      title: 'Color input',
      emoji: '⌨️',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Type an exact HEX, RGB, HSL, HWB or HSV value next to the panel.',
      component: ColorInputDemo,
    },
    {
      slug: 'scroll-view',
      title: 'Picker in a scroll view',
      emoji: '📜',
      level: 'intermediate',
      kind: 'scenario',
      description: 'A settings page that scrolls, while dragging a slider never scrolls it.',
      component: ScrollViewDemo,
    },
    {
      slug: 'harmonies',
      title: 'Color harmonies',
      emoji: '🎼',
      level: 'advanced',
      kind: 'showcase',
      description:
        'Extra thumbs on the wheel that follow the main one: complementary, triadic and analogous palettes.',
      component: HarmoniesDemo,
    },
    {
      slug: 'thumb-shapes',
      title: 'Thumb shapes',
      emoji: '🔘',
      level: 'advanced',
      kind: 'showcase',
      description: 'Built-in thumb shapes, and a fully custom thumb that shows the color it picks.',
      component: ThumbShapesDemo,
    },
    {
      slug: 'profile-color',
      title: 'Profile color',
      emoji: '🪪',
      level: 'advanced',
      kind: 'scenario',
      description:
        'A profile card that recolors live on the UI thread, with presets that animate the picker.',
      component: ProfileColorDemo,
    },
  ],
};
