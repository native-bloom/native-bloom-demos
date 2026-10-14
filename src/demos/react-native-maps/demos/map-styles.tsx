/**
 * React Native Maps · Map styles
 *
 * `mapType` switches the base map: `standard`, `mutedStandard` (quieter
 * colors that let your markers stand out, iOS only), `satellite` and
 * `hybrid` (satellite with labels). `userInterfaceStyle` forces the light or
 * dark Apple Maps palette regardless of the system setting. (Fully custom
 * colors via `customMapStyle` need Google Maps.)
 */
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, type MapType } from 'react-native-maps';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

import { CAFES, DUMBO } from '../data';

const STYLES = [
  { value: 'standard', label: 'Standard' },
  { value: 'muted', label: 'Muted' },
  { value: 'satellite', label: 'Satellite' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'dark', label: 'Dark' },
] as const;

type Style = (typeof STYLES)[number]['value'];

const MAP_TYPE: Record<Style, MapType> = {
  standard: 'standard',
  muted: 'mutedStandard',
  satellite: 'satellite',
  hybrid: 'hybrid',
  dark: 'standard',
};

export function MapStylesDemo() {
  const [style, setStyle] = useState<Style>('muted');

  return (
    <DemoStage>
      <Showcase
        padding={0}
        below={<VariantBar value={style} options={STYLES} onChange={setStyle} />}>
        <MapView
          style={styles.map}
          initialRegion={DUMBO}
          mapType={MAP_TYPE[style]}
          userInterfaceStyle={style === 'dark' ? 'dark' : 'light'}
          showsBuildings>
          {CAFES.slice(0, 3).map((cafe) => (
            <Marker key={cafe.id} coordinate={cafe.coordinate} title={cafe.name} />
          ))}
        </MapView>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  map: { height: 420 },
});
