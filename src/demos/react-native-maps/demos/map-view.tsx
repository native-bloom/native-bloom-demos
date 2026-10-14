/**
 * React Native Maps · Map view
 *
 * `MapView` with an `initialRegion` (center plus latitude/longitude deltas,
 * which set the zoom) and a few `Marker`s. A marker with a `title` and
 * `description` opens the system callout when tapped. On iOS this is Apple
 * Maps; pass `userInterfaceStyle` so the map follows the app's light or dark
 * theme.
 *
 * Setup: add "react-native-maps" to the app.json plugins. iOS only here:
 * Android needs a Google Maps API key.
 */
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { useTheme } from '@/design-system';

import { BROOKLYN, CAFES } from '../data';

export function MapViewDemo() {
  const { scheme } = useTheme();

  return (
    <DemoStage>
      <Showcase padding={0}>
        <MapView style={styles.map} initialRegion={BROOKLYN} userInterfaceStyle={scheme}>
          {CAFES.map((cafe) => (
            <Marker
              key={cafe.id}
              coordinate={cafe.coordinate}
              title={cafe.name}
              description={`${cafe.kind} · ★ ${cafe.rating}`}
            />
          ))}
        </MapView>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  map: { height: 480 },
});
