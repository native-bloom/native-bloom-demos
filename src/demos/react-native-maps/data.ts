/**
 * Map sample data for the react-native-maps demos: cafés around north
 * Brooklyn with real-world coordinates, a walking route and a park outline.
 * In an app these come from your backend or a places API; the names match the
 * shared fixtures (Plentea Matcha, Kettl Greenpoint, Neighbors Café).
 */
import type { LatLng, Region } from 'react-native-maps';

export type Cafe = {
  id: string;
  name: string;
  emoji: string;
  kind: string;
  rating: number;
  price: string;
  color: string;
  coordinate: LatLng;
};

export const CAFES: Cafe[] = [
  {
    id: 'plentea',
    name: 'Plentea Matcha',
    emoji: '🍵',
    kind: 'Matcha bar',
    rating: 4.7,
    price: '$6',
    color: '#EEF6E2',
    coordinate: { latitude: 40.6993, longitude: -73.9968 },
  },
  {
    id: 'neighbors',
    name: 'Neighbors Café',
    emoji: '🥐',
    kind: 'Bakery café',
    rating: 4.5,
    price: '$4',
    color: '#FFF1DB',
    coordinate: { latitude: 40.7024, longitude: -73.9962 },
  },
  {
    id: 'blue-door',
    name: 'Blue Door Bakery',
    emoji: '🥯',
    kind: 'Bakery',
    rating: 4.6,
    price: '$5',
    color: '#E8F0FF',
    coordinate: { latitude: 40.7035, longitude: -73.9872 },
  },
  {
    id: 'sunny',
    name: 'Sunny Side',
    emoji: '🥞',
    kind: 'Brunch',
    rating: 4.4,
    price: '$14',
    color: '#FFE4EC',
    coordinate: { latitude: 40.7142, longitude: -73.9614 },
  },
  {
    id: 'kettl',
    name: 'Kettl Greenpoint',
    emoji: '🫖',
    kind: 'Tea house',
    rating: 4.8,
    price: '$7',
    color: '#EAF7EE',
    coordinate: { latitude: 40.7299, longitude: -73.958 },
  },
];

/** Shows DUMBO up to Greenpoint. */
export const BROOKLYN: Region = {
  latitude: 40.7135,
  longitude: -73.976,
  latitudeDelta: 0.06,
  longitudeDelta: 0.045,
};

/** Close-up of DUMBO and Brooklyn Bridge Park. */
export const DUMBO: Region = {
  latitude: 40.7015,
  longitude: -73.9915,
  latitudeDelta: 0.014,
  longitudeDelta: 0.012,
};

/** A walk from Plentea Matcha along the park to Blue Door Bakery. */
export const WALK: LatLng[] = [
  { latitude: 40.6993, longitude: -73.9968 },
  { latitude: 40.7004, longitude: -73.9975 },
  { latitude: 40.7024, longitude: -73.9962 },
  { latitude: 40.7036, longitude: -73.9935 },
  { latitude: 40.7032, longitude: -73.9905 },
  { latitude: 40.7035, longitude: -73.9872 },
];

/** Rough outline of Brooklyn Bridge Park's Pier 1 lawn. */
export const PARK: LatLng[] = [
  { latitude: 40.7012, longitude: -73.9985 },
  { latitude: 40.7032, longitude: -73.9974 },
  { latitude: 40.7026, longitude: -73.9952 },
  { latitude: 40.7004, longitude: -73.9962 },
];
