/**
 * React Native Maps · Camera control
 *
 * `animateCamera` flies the map to a new camera: `center`, `pitch` (tilt in
 * degrees), `heading` (rotation from north) and, on Apple Maps, `altitude` in
 * meters (Google Maps uses `zoom` instead; pass both for cross-platform code).
 * With `showsBuildings`, a tilted camera shows 3D buildings.
 */
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { type Camera } from 'react-native-maps';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useTheme } from '@/design-system';

const SHOTS = [
  { value: 'overview', label: 'Overview' },
  { value: 'bridge', label: 'Bridge' },
  { value: 'pier', label: 'Pier 1' },
  { value: 'greenpoint', label: 'Greenpoint' },
] as const;

type Shot = (typeof SHOTS)[number]['value'];

const CAMERAS: Record<Shot, Camera> = {
  overview: {
    center: { latitude: 40.7135, longitude: -73.976 },
    pitch: 0,
    heading: 0,
    altitude: 9000,
    zoom: 13,
  },
  bridge: {
    center: { latitude: 40.7061, longitude: -73.9969 },
    pitch: 60,
    heading: 300,
    altitude: 700,
    zoom: 17,
  },
  pier: {
    center: { latitude: 40.7018, longitude: -73.9969 },
    pitch: 45,
    heading: 30,
    altitude: 500,
    zoom: 17.5,
  },
  greenpoint: {
    center: { latitude: 40.7299, longitude: -73.958 },
    pitch: 55,
    heading: 120,
    altitude: 600,
    zoom: 17,
  },
};

export function CameraDemo() {
  const { scheme } = useTheme();
  const map = useRef<MapView>(null);
  const [shot, setShot] = useState<Shot>('overview');

  function fly(next: Shot) {
    setShot(next);
    map.current?.animateCamera(CAMERAS[next], { duration: 1600 });
  }

  return (
    <DemoStage>
      <Showcase padding={0} below={<VariantBar value={shot} options={SHOTS} onChange={fly} />}>
        <MapView
          ref={map}
          style={styles.map}
          initialCamera={CAMERAS.overview}
          userInterfaceStyle={scheme}
          showsBuildings
          pitchEnabled
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  map: { height: 480 },
});
