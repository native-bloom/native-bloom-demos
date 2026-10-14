/**
 * React Native Maps · Custom callouts
 *
 * Put a `<Callout>` inside a `<Marker>` to replace the system bubble. With
 * `tooltip`, the library draws no bubble at all and your view is the whole
 * callout, here a small card with a tail. `onPress` on the Callout fires when
 * the card is tapped.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text as ThemedText, useTheme } from '@/design-system';

import { CAFES, DUMBO } from '../data';

export function CalloutsDemo() {
  const { scheme } = useTheme();
  const [saved, setSaved] = useState<string[]>([]);

  return (
    <DemoStage>
      <Showcase padding={0}>
        <MapView style={styles.map} initialRegion={DUMBO} userInterfaceStyle={scheme}>
          {CAFES.slice(0, 3).map((cafe) => (
            <Marker key={cafe.id} coordinate={cafe.coordinate} pinColor="#FF2D78">
              <Callout
                tooltip
                onPress={() =>
                  setSaved((s) =>
                    s.includes(cafe.id) ? s.filter((x) => x !== cafe.id) : [...s, cafe.id],
                  )
                }>
                <View style={styles.card}>
                  <View style={[styles.icon, { backgroundColor: cafe.color }]}>
                    <Text style={styles.emoji}>{cafe.emoji}</Text>
                  </View>
                  <View>
                    <Text style={styles.name}>{cafe.name}</Text>
                    <Text style={styles.meta}>
                      {cafe.kind} · ★ {cafe.rating}
                    </Text>
                    <Text style={styles.action}>
                      {saved.includes(cafe.id) ? '♥ Saved' : '♡ Tap to save'}
                    </Text>
                  </View>
                </View>
                <View style={styles.tail} />
              </Callout>
            </Marker>
          ))}
        </MapView>
      </Showcase>
      <ThemedText variant="label" color="textSecondary" align="center">
        {saved.length ? `${saved.length} saved` : 'Tap a pin'}
      </ThemedText>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  map: { height: 440 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    paddingRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  icon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 22, lineHeight: 28 },
  name: { fontSize: 15, fontWeight: '700', color: '#0B0B0D' },
  meta: { fontSize: 12, color: '#6E6E75' },
  action: { fontSize: 12, fontWeight: '700', color: '#FF2D78', marginTop: 2 },
  tail: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
});
