/**
 * The shared sample world every demo draws from: the people, memories, places
 * and photos of a Bond-like app. Using the same cast across libraries keeps
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

/** Cartoon food scenes (Fluent Emoji artwork, see assets/demos/CREDITS.md), not real photos. */
export const photos = {
  strawberries: require('@/assets/demos/strawberries.jpg') as ImageSourcePropType,
  coffee: require('@/assets/demos/coffee.jpg') as ImageSourcePropType,
  salad: require('@/assets/demos/salad.jpg') as ImageSourcePropType,
  vegetables: require('@/assets/demos/vegetables.jpg') as ImageSourcePropType,
};

export type Memory = {
  id: string;
  title: string;
  category: string;
  ago: string;
  emoji: string;
  /** Background for the emoji tile. */
  color: string;
  photo?: ImageSourcePropType;
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
    photo: photos.coffee,
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
