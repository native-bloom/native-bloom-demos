/**
 * True Sheet · Maps-style sheet
 *
 * The Apple Maps pattern: a sheet that is always there. `initialDetentIndex`
 * presents it on mount, `dismissible={false}` keeps it, and `dimmed={false}`
 * leaves the map usable behind it (`dimmedDetentIndex={2}` dims only at full
 * height). The `'peek'` detent collapses it to the measured `header`.
 *
 * `ReanimatedTrueSheet` inside a `ReanimatedTrueSheetProvider` exposes the
 * sheet's position as shared values; the locate button rides the sheet's top
 * edge with `animatedPosition` and fades out with `animatedIndex`.
 *
 * The map is drawn with plain views to keep the demo self-contained; use
 * react-native-maps or expo-maps in an app.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import {
  ReanimatedTrueSheet,
  ReanimatedTrueSheetProvider,
  useReanimatedTrueSheet,
} from '@lodev09/react-native-true-sheet/reanimated';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { places } from '@/demos/_shared/fixtures';
import { IconTile, ListRow, Text, radius, spacing, useColors, useTheme } from '@/design-system';

const PIN_EMOJI: Record<string, string> = { plentea: '🍵', kettl: '🫖', neighbors: '🥐' };
const PIN_POSITION: Record<string, { top: `${number}%`; left: `${number}%` }> = {
  plentea: { top: '22%', left: '58%' },
  kettl: { top: '36%', left: '18%' },
  neighbors: { top: '48%', left: '66%' },
};

const MAP_COLORS = {
  light: { land: '#ECEFE6', water: '#BFDDF2', park: '#CDE6C0', road: '#FFFFFF' },
  dark: { land: '#1E2421', water: '#1B3346', park: '#22382A', road: '#3A403D' },
};

/** A stylized map drawn with views. */
function FakeMap({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const map = MAP_COLORS[useTheme().scheme];
  const road = { backgroundColor: map.road };
  return (
    <View style={[styles.map, { backgroundColor: map.land }]}>
      <View style={[styles.water, { backgroundColor: map.water }]} />
      <View style={[styles.park, { backgroundColor: map.park }]} />
      <View style={[styles.road, road, { top: '30%', transform: [{ rotate: '-12deg' }] }]} />
      <View style={[styles.road, road, { top: '55%', transform: [{ rotate: '8deg' }] }]} />
      <View style={[styles.road, road, styles.avenue]} />
      {places.map((place) => (
        <Pressable
          key={place.id}
          onPress={() => onSelect(place.id)}
          style={[styles.pin, PIN_POSITION[place.id], selected === place.id && styles.pinSelected]}>
          <Text style={styles.pinEmoji}>{PIN_EMOJI[place.id]}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function LocateButton({ onPress }: { onPress: () => void }) {
  const colors = useColors();
  const { animatedPosition, animatedIndex } = useReanimatedTrueSheet();

  // `animatedPosition` is the sheet's top edge, measured from the top of the screen.
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: animatedPosition.get() - 56 - 12 }],
    opacity: interpolate(animatedIndex.get(), [0, 1, 1.5], [1, 1, 0], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[styles.locate, style]}>
      <Pressable onPress={onPress} style={[styles.locateButton, { backgroundColor: colors.surface }]}>
        <Text style={styles.locateEmoji}>📍</Text>
      </Pressable>
    </Animated.View>
  );
}

function MapScreen() {
  const colors = useColors();
  const sheet = useRef<TrueSheet>(null);
  const [selected, setSelected] = useState<string | null>(null);

  function select(id: string) {
    setSelected(id);
    void sheet.current?.resize(1);
  }

  const header = (
    <View style={styles.header}>
      <View style={[styles.search, { backgroundColor: colors.surfaceMuted }]}>
        <Text color="textSecondary">🔍  Search Brooklyn</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.fill}>
      <FakeMap selected={selected} onSelect={select} />
      <LocateButton onPress={() => setSelected(null)} />

      <ReanimatedTrueSheet
        ref={sheet}
        detents={['peek', 0.5, 1]}
        initialDetentIndex={0}
        dismissible={false}
        dimmed={false}
        dimmedDetentIndex={2}
        header={header}>
        <View style={styles.content}>
          <Text variant="heading" style={styles.sectionTitle}>
            Matcha nearby
          </Text>
          {places.map((place, i) => (
            <ListRow
              key={place.id}
              title={place.name}
              subtitle={`${place.kind} · ★ ${place.rating} · ${place.address}`}
              leading={
                <IconTile
                  emoji={PIN_EMOJI[place.id]}
                  color={selected === place.id ? '#FFE4EC' : '#EEF6E2'}
                />
              }
              divider={i > 0}
              chevron={false}
              onPress={() => setSelected(place.id)}
            />
          ))}
        </View>
      </ReanimatedTrueSheet>
    </View>
  );
}

export function MapDemo() {
  return (
    <ReanimatedTrueSheetProvider>
      <MapScreen />
    </ReanimatedTrueSheetProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  map: { ...StyleSheet.absoluteFill, overflow: 'hidden' },
  water: {
    position: 'absolute',
    left: '-30%',
    bottom: '-10%',
    width: '90%',
    height: '55%',
    borderRadius: 220,
  },
  park: {
    position: 'absolute',
    top: '8%',
    left: '8%',
    width: '38%',
    height: '18%',
    borderRadius: 28,
  },
  road: { position: 'absolute', left: '-10%', width: '120%', height: 14 },
  avenue: { top: 0, bottom: 0, left: '44%', width: 18, height: undefined },
  pin: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  pinSelected: { backgroundColor: '#FF2D78', transform: [{ scale: 1.15 }] },
  pinEmoji: { fontSize: 24, lineHeight: 30 },
  locate: { position: 'absolute', top: 0, right: spacing.lg },
  locateButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  locateEmoji: { fontSize: 24, lineHeight: 30 },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing['2xl'], paddingBottom: spacing.md },
  search: { height: 48, borderRadius: radius.pill, justifyContent: 'center', paddingHorizontal: spacing.lg },
  content: { paddingHorizontal: spacing.sm },
  sectionTitle: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
});
