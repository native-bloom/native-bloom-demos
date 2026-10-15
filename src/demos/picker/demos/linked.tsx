/**
 * Picker · Linked pickers
 *
 * The second wheel's items depend on the first: changing the country swaps
 * the list of cities and resets the city to the first one, in the same state
 * update so the selection is never out of range.
 */
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const PLACES: Record<string, { flag: string; cities: string[] }> = {
  Japan: { flag: '🇯🇵', cities: ['Kyoto', 'Tokyo', 'Osaka', 'Uji'] },
  Italy: { flag: '🇮🇹', cities: ['Rome', 'Florence', 'Naples', 'Bologna'] },
  France: { flag: '🇫🇷', cities: ['Paris', 'Lyon', 'Nice'] },
  Mexico: { flag: '🇲🇽', cities: ['Oaxaca', 'Mexico City', 'Puebla'] },
};
const COUNTRIES = Object.keys(PLACES);

export function LinkedDemo() {
  const [trip, setTrip] = useState({ country: 'Japan', city: 'Kyoto' });
  const { flag, cities } = PLACES[trip.country]!;

  return (
    <DemoStage>
      <Showcase>
        <Text variant="caption" color="textSecondary" align="center">
          NEXT FOOD TRIP
        </Text>
        <View style={styles.row}>
          <Picker
            style={styles.wheel}
            selectedValue={trip.country}
            onValueChange={(country) => setTrip({ country, city: PLACES[country]!.cities[0]! })}>
            {COUNTRIES.map((c) => (
              <Picker.Item key={c} label={`${PLACES[c]!.flag} ${c}`} value={c} />
            ))}
          </Picker>
          <Picker
            key={trip.country}
            style={styles.wheel}
            selectedValue={trip.city}
            onValueChange={(city) => setTrip((t) => ({ ...t, city }))}>
            {cities.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>
        <Text variant="heading" align="center">
          {flag} {trip.city} with Sam and Leo
        </Text>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  wheel: { flex: 1 },
});
