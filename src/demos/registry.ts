import type { LibraryDefinition, ProviderComponent } from './types';
import { datetimepicker } from './datetimepicker';
import { maskedView } from './masked-view';
import { picker } from './picker';
import { reactNativeGraph } from './react-native-graph';
import { reactNativeMaps } from './react-native-maps';
import { reanimatedColorPicker } from './reanimated-color-picker';
import { segmentedControl } from './segmented-control';
import { slider } from './slider';
import { sonnerNative } from './sonner-native';
import { sortables } from './sortables';
import { trueSheet } from './true-sheet';

/**
 * Every library that ships demos. Add new libraries here; the home, library and
 * demo screens are generated from this list.
 */
export const libraries: readonly LibraryDefinition[] = [
  sonnerNative,
  datetimepicker,
  reactNativeGraph,
  reanimatedColorPicker,
  trueSheet,
  sortables,
  segmentedControl,
  maskedView,
  reactNativeMaps,
  picker,
  slider,
];

export const categories: readonly string[] = Array.from(new Set(libraries.map((l) => l.category)));

/** Root providers of all libraries, outermost first. Mounted around the navigator. */
export const rootProviders: readonly ProviderComponent[] = libraries.flatMap((l) =>
  l.RootProvider ? [l.RootProvider] : [],
);

export function getLibrary(slug: string | undefined): LibraryDefinition | undefined {
  return libraries.find((l) => l.slug === slug);
}

export function getDemo(librarySlug: string | undefined, demoSlug: string | undefined) {
  const library = getLibrary(librarySlug);
  const demo = library?.demos.find((d) => d.slug === demoSlug);
  return { library, demo };
}

export function totalDemoCount(): number {
  return libraries.reduce((n, l) => n + l.demos.length, 0);
}
