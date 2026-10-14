/**
 * React Native Maps · Custom markers
 *
 * Put any React Native view inside `<Marker>` and it becomes the pin: here an
 * emoji bubble with a tail, or a price tag. `anchor` sets which point of the
 * view sits on the coordinate ({ x: 0.5, y: 1 } is the bottom center).
 * Leave `tracksViewChanges` off (the default after first render) unless the
 * view changes, because tracking redraws the marker every frame.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useTheme } from '@/design-system';

import { CAFES, type Cafe, BROOKLYN } from '../data';

const KINDS = [
  { value: 'emoji', label: 'Emoji pins' },
  { value: 'price', label: 'Price tags' },
] as const;

type Kind = (typeof KINDS)[number]['value'];

function EmojiPin({ cafe }: { cafe: Cafe }) {
  return (
    <View style={styles.pinWrap}>
      <View style={[styles.pin, { backgroundColor: cafe.color }]}>
        <Text style={styles.pinEmoji}>{cafe.emoji}</Text>
      </View>
      <View style={[styles.tail, { borderTopColor: cafe.color }]} />
    </View>
  );
}

function PriceTag({ cafe }: { cafe: Cafe }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>
        {cafe.emoji} {cafe.price}
      </Text>
    </View>
  );
}

export function MarkersDemo() {
  const { scheme } = useTheme();
  const [kind, setKind] = useState<Kind>('emoji');

  return (
    <DemoStage>
      <Showcase padding={0} below={<VariantBar value={kind} options={KINDS} onChange={setKind} />}>
        <MapView style={styles.map} initialRegion={BROOKLYN} userInterfaceStyle={scheme}>
          {CAFES.map((cafe) => (
            <Marker
              key={`${kind}-${cafe.id}`}
              coordinate={cafe.coordinate}
              anchor={kind === 'emoji' ? { x: 0.5, y: 1 } : { x: 0.5, y: 0.5 }}>
              {kind === 'emoji' ? <EmojiPin cafe={cafe} /> : <PriceTag cafe={cafe} />}
            </Marker>
          ))}
        </MapView>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  map: { height: 460 },
  pinWrap: { alignItems: 'center' },
  pin: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pinEmoji: { fontSize: 22, lineHeight: 28 },
  tail: {
    width: 0,
    height: 0,
    marginTop: -2,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  tag: {
    backgroundColor: '#111113',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tagText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
