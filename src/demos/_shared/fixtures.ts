/**
 * The shared sample world every demo draws from: the people, memories and places
 * of a Bond-like app, and the sticker art that stands in for pictures. Using the same cast across libraries keeps
 * the recordings consistent and saves inventing data per demo.
 *
 * Demo code may inline short strings ("Sam Lee loved your story"); use these
 * fixtures for anything list-shaped.
 */
import type { ImageSourcePropType } from 'react-native';

export type Person = { id: string; name: string; handle: string; color: string };

export const people: Person[] = [
  { id: 'sam', name: 'Sam Lee', handle: '@samlee', color: '#E8F0FF' },
  { id: 'alex', name: 'Alex Smith', handle: '@alexsmith', color: '#FFE4EC' },
  { id: 'samsam', name: 'Samsam', handle: '@samsam', color: '#EAF7EE' },
  { id: 'leo', name: 'Leo Lee', handle: '@leolee', color: '#FFF1DB' },
  { id: 'ryan', name: 'Ryan Lee', handle: '@ryanlee', color: '#EEF6E2' },
];

/**
 * Sticker art: original dev and skate/surf stickers on the app's canvas, drawn with the
 * `sticker-art` skill (.claude/skills/sticker-art). Each comes in a light and a dark surface;
 * pick by `useTheme().scheme`.
 */
export const stickerArt = {
  /** Full stage under the header, empty band in the middle for triggers. */
  desk: {
    light: require('@/assets/demos/stickers-desk.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-desk-dark.jpg') as ImageSourcePropType,
  },
  /** Full screen, clear at the top for a title. */
  cover: {
    light: require('@/assets/demos/stickers-cover.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-cover-dark.jpg') as ImageSourcePropType,
  },
  /** Tall rounded card, clear along the bottom for a row of triggers. */
  glass: {
    light: require('@/assets/demos/stickers-glass.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-glass-dark.jpg') as ImageSourcePropType,
  },
  /** Square-ish showcase card. */
  spotlight: {
    light: require('@/assets/demos/stickers-spotlight.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-spotlight-dark.jpg') as ImageSourcePropType,
  },
  /** Landscape cards (≈16:10): dev, surf and skate sets. */
  cardDev: {
    light: require('@/assets/demos/stickers-card-dev.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-card-dev-dark.jpg') as ImageSourcePropType,
  },
  cardSurf: {
    light: require('@/assets/demos/stickers-card-surf.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-card-surf-dark.jpg') as ImageSourcePropType,
  },
  cardSkate: {
    light: require('@/assets/demos/stickers-card-skate.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-card-skate-dark.jpg') as ImageSourcePropType,
  },
  /** Dense fills that show through text and shape masks. */
  fillDev: {
    light: require('@/assets/demos/stickers-fill-dev.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-fill-dev-dark.jpg') as ImageSourcePropType,
  },
  fillSurf: {
    light: require('@/assets/demos/stickers-fill-surf.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-fill-surf-dark.jpg') as ImageSourcePropType,
  },
  fillSkate: {
    light: require('@/assets/demos/stickers-fill-skate.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-fill-skate-dark.jpg') as ImageSourcePropType,
  },
  fillMix: {
    light: require('@/assets/demos/stickers-fill-mix.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-fill-mix-dark.jpg') as ImageSourcePropType,
  },
  /** Square album tiles, one big sticker each. */
  tileCode: {
    light: require('@/assets/demos/stickers-tile-code.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-tile-code-dark.jpg') as ImageSourcePropType,
  },
  tileSurf: {
    light: require('@/assets/demos/stickers-tile-surf.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-tile-surf-dark.jpg') as ImageSourcePropType,
  },
  tileSkate: {
    light: require('@/assets/demos/stickers-tile-skate.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-tile-skate-dark.jpg') as ImageSourcePropType,
  },
  tileDuck: {
    light: require('@/assets/demos/stickers-tile-duck.jpg') as ImageSourcePropType,
    dark: require('@/assets/demos/stickers-tile-duck-dark.jpg') as ImageSourcePropType,
  },
};

export type StickerArt = (typeof stickerArt)[keyof typeof stickerArt];

export type Memory = {
  id: string;
  title: string;
  category: string;
  ago: string;
  emoji: string;
  /** Background for the emoji tile. */
  color: string;
};

export const memories: Memory[] = [
  {
    id: '1',
    title: 'Enjoyed making the dough for the treats',
    category: 'Cooking',
    ago: '19 min ago',
    emoji: '🍪',
    color: '#FFF1DB',
  },
  {
    id: '2',
    title: 'Made cookie dough',
    category: 'Cooking',
    ago: '19 min ago',
    emoji: '🥣',
    color: '#EAF7EE',
  },
  {
    id: '3',
    title: 'Gift box with jam cookies and candied nuts',
    category: 'Cooking',
    ago: '27 min ago',
    emoji: '🎁',
    color: '#E8F0FF',
  },
  {
    id: '4',
    title: 'Festive treats with friends',
    category: 'Desserts and Baking',
    ago: '2 days ago',
    emoji: '🧁',
    color: '#FFE4EC',
  },
  {
    id: '5',
    title: 'Best matcha place in New York',
    category: 'Cafes',
    ago: '3 days ago',
    emoji: '🍵',
    color: '#EEF6E2',
  },
];

export type Place = { id: string; name: string; kind: string; rating: number; address: string };

export const places: Place[] = [
  {
    id: 'plentea',
    name: 'Plentea Matcha',
    kind: 'Cafe',
    rating: 4.7,
    address: '60 Furman St, Brooklyn',
  },
  {
    id: 'kettl',
    name: 'Kettl Greenpoint',
    kind: 'Tea house',
    rating: 4.8,
    address: '70 Greenpoint Ave, Brooklyn',
  },
  {
    id: 'neighbors',
    name: 'Neighbors Café',
    kind: 'Cafe',
    rating: 4.5,
    address: 'Pier 1, Brooklyn',
  },
];

export const discoverPrompts = [
  { emoji: '🍽️', label: 'Best food to get right now' },
  { emoji: '🌆', label: 'Perfect place for Friday' },
  { emoji: '📺', label: 'TV show that I will love' },
];
