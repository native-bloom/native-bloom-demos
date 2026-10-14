/**
 * React Native Maps · Shapes on the map
 *
 * Draw on the map with coordinates: `Polyline` for a route (dashed with
 * `lineDashPattern`), `Polygon` for an area (fill plus stroke), and `Circle`
 * for a radius in meters around a point. All three take colors, stroke widths
 * and `tappable` + `onPress`.
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Circle, Marker, Polygon, Polyline } from 'react-native-maps';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useTheme } from '@/design-system';

import { CAFES, DUMBO, PARK, WALK } from '../data';

const SHAPES = [
  { value: 'route', label: 'Walking route' },
  { value: 'park', label: 'Park' },
  { value: 'radius', label: 'Delivery radius' },
] as const;

type Shape = (typeof SHAPES)[number]['value'];

export function ShapesDemo() {
  const { scheme } = useTheme();
  const [shape, setShape] = useState<Shape>('route');
  const start = CAFES[0]!;
  const end = CAFES[2]!;

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={shape} options={SHAPES} onChange={setShape} />}>
        <MapView style={styles.map} initialRegion={DUMBO} userInterfaceStyle={scheme}>
          {shape === 'route' ? (
            <>
              <Polyline
                coordinates={WALK}
                strokeColor="#3478F6"
                strokeWidth={6}
                lineCap="round"
                lineJoin="round"
                lineDashPattern={[1, 10]}
              />
              <Marker coordinate={start.coordinate} title={start.name} pinColor="#22C55E" />
              <Marker coordinate={end.coordinate} title={end.name} pinColor="#FF2D78" />
            </>
          ) : null}
          {shape === 'park' ? (
            <Polygon
              coordinates={PARK}
              fillColor="rgba(34,197,94,0.3)"
              strokeColor="#16A34A"
              strokeWidth={3}
            />
          ) : null}
          {shape === 'radius' ? (
            <>
              <Circle
                center={start.coordinate}
                radius={450}
                fillColor="rgba(255,45,120,0.15)"
                strokeColor="#FF2D78"
                strokeWidth={2}
              />
              <Marker
                coordinate={start.coordinate}
                title={`${start.name} delivers here`}
                pinColor="#FF2D78"
              />
            </>
          ) : null}
        </MapView>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  map: { height: 440 },
});
