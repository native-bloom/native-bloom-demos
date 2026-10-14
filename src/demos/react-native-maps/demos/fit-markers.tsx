/**
 * React Native Maps · Fit to markers
 *
 * `fitToCoordinates` zooms and centers the map so every coordinate you pass is
 * visible, with `edgePadding` keeping the pins away from the edges. Use it to
 * show search results or a set of saved places. (`fitToSuppliedMarkers` does
 * the same with marker `identifier`s.) Call it after `onMapReady`.
 */
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useTheme } from '@/design-system';

import { BROOKLYN, CAFES } from '../data';

const GROUPS = [
  { value: 'all', label: 'All cafés', ids: CAFES.map((c) => c.id) },
  { value: 'dumbo', label: 'DUMBO', ids: ['plentea', 'neighbors', 'blue-door'] },
  { value: 'north', label: 'Williamsburg + Greenpoint', ids: ['sunny', 'kettl'] },
] as const;

type Group = (typeof GROUPS)[number]['value'];

const PADDING = { top: 60, right: 60, bottom: 60, left: 60 };

export function FitMarkersDemo() {
  const { scheme } = useTheme();
  const map = useRef<MapView>(null);
  const [group, setGroup] = useState<Group>('all');
  const ids: readonly string[] = GROUPS.find((g) => g.value === group)!.ids;

  function fit(next: Group) {
    setGroup(next);
    const nextIds: readonly string[] = GROUPS.find((g) => g.value === next)!.ids;
    map.current?.fitToCoordinates(
      CAFES.filter((c) => nextIds.includes(c.id)).map((c) => c.coordinate),
      { edgePadding: PADDING, animated: true },
    );
  }

  return (
    <DemoStage>
      <Showcase padding={0} below={<VariantBar value={group} options={GROUPS} onChange={fit} />}>
        <MapView
          ref={map}
          style={styles.map}
          initialRegion={BROOKLYN}
          userInterfaceStyle={scheme}
          onMapReady={() => fit('all')}>
          {CAFES.map((cafe) => (
            <Marker
              key={cafe.id}
              coordinate={cafe.coordinate}
              title={cafe.name}
              pinColor={ids.includes(cafe.id) ? '#FF2D78' : '#A3A3AA'}
            />
          ))}
        </MapView>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  map: { height: 460 },
});
