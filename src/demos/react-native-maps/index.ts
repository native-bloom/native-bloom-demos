import type { LibraryDefinition } from '../types';
import { CafeFinderDemo } from './demos/cafe-finder';
import { CalloutsDemo } from './demos/callouts';
import { CameraDemo } from './demos/camera';
import { DeliveryDemo } from './demos/delivery';
import { FitMarkersDemo } from './demos/fit-markers';
import { MapStylesDemo } from './demos/map-styles';
import { MapViewDemo } from './demos/map-view';
import { MarkersDemo } from './demos/markers';
import { PickLocationDemo } from './demos/pick-location';
import { ShapesDemo } from './demos/shapes';

// Android renders Google Maps, which needs an API key (androidGoogleMapsApiKey in
// the config plugin). The app has none yet, so the demos run on iOS (Apple Maps).
const IOS_ONLY = ['ios' as const];

export const reactNativeMaps: LibraryDefinition = {
  slug: 'react-native-maps',
  name: 'React Native Maps',
  packageName: 'react-native-maps',
  tagline: 'Native maps: Apple Maps on iOS, Google Maps on Android.',
  description:
    'A native map view with markers, custom React Native markers and callouts, polylines, polygons and circles, camera animations, map types and reverse geocoding.',
  emoji: '🗺️',
  color: '#EAF7EE',
  category: 'Components',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/react-native-maps/react-native-maps',
      icon: 'github',
    },
    {
      label: 'Docs',
      url: 'https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md',
      icon: 'docs',
    },
  ],
  install: ['react-native-maps'],
  setup:
    'Add "react-native-maps" to the plugins in app.json and rebuild the dev build. iOS uses Apple Maps with no key; Android (and Google Maps on iOS) needs an API key passed to the plugin as androidGoogleMapsApiKey / iosGoogleMapsApiKey.',
  demos: [
    {
      slug: 'map-view',
      title: 'Map view',
      emoji: '🗺️',
      level: 'basic',
      kind: 'showcase',
      description: 'A map of Brooklyn with pins that open a title and description.',
      platforms: IOS_ONLY,
      component: MapViewDemo,
    },
    {
      slug: 'map-styles',
      title: 'Map styles',
      emoji: '🛰️',
      level: 'basic',
      kind: 'showcase',
      description: 'Standard, muted, satellite, hybrid and dark maps.',
      platforms: IOS_ONLY,
      component: MapStylesDemo,
    },
    {
      slug: 'markers',
      title: 'Custom markers',
      emoji: '📍',
      level: 'basic',
      kind: 'showcase',
      description: 'Markers drawn with React Native views: emoji pins and price tags.',
      platforms: IOS_ONLY,
      component: MarkersDemo,
    },
    {
      slug: 'callouts',
      title: 'Custom callouts',
      emoji: '💬',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Tap a pin for a custom card instead of the system bubble.',
      platforms: IOS_ONLY,
      component: CalloutsDemo,
    },
    {
      slug: 'camera',
      title: 'Camera control',
      emoji: '🎥',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Fly to places with tilt and rotation, over 3D buildings.',
      platforms: IOS_ONLY,
      component: CameraDemo,
    },
    {
      slug: 'fit-markers',
      title: 'Fit to markers',
      emoji: '🔭',
      level: 'intermediate',
      kind: 'showcase',
      description: 'Zoom the map to show exactly the pins you choose.',
      platforms: IOS_ONLY,
      component: FitMarkersDemo,
    },
    {
      slug: 'shapes',
      title: 'Shapes on the map',
      emoji: '🧭',
      level: 'intermediate',
      kind: 'showcase',
      description: 'A walking route, a park outline and a delivery radius.',
      platforms: IOS_ONLY,
      component: ShapesDemo,
    },
    {
      slug: 'pick-location',
      title: 'Pick a location',
      emoji: '🎯',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'Pan under a fixed pin and the address updates when the map stops.',
      platforms: IOS_ONLY,
      component: PickLocationDemo,
    },
    {
      slug: 'cafe-finder',
      title: 'Café finder',
      emoji: '☕️',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'A card carousel and map pins that stay in sync both ways.',
      platforms: IOS_ONLY,
      component: CafeFinderDemo,
    },
    {
      slug: 'delivery',
      title: 'Delivery on the way',
      emoji: '🛵',
      level: 'advanced',
      kind: 'scenario',
      chrome: 'none',
      description: 'A courier pin that rides along the route to your door.',
      platforms: IOS_ONLY,
      component: DeliveryDemo,
    },
  ],
};
