/**
 * Bottom Sheet · Places on a map
 *
 * A Maps-style screen: a full-screen react-native-maps `MapView` with a
 * `<BottomSheet>` of cafés on top. `topInset` stops the sheet under the status
 * bar. The sheet writes its top edge into the `animatedPosition` shared value,
 * so the "back to all cafés" button rides just above the sheet and fades out
 * when the sheet covers most of the map. Tapping a café flies the camera there
 * and lowers the sheet to its first snap point.
 *
 * Extra package: react-native-maps (iOS only here: Android needs a Google Maps key).
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MapView, { Marker, type LatLng } from 'react-native-maps';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  IconTile,
  ListRow,
  Text as ThemedText,
  spacing,
  useColors,
  useTheme,
} from '@/design-system';

type Cafe = {
  id: string;
  name: string;
  emoji: string;
  kind: string;
  rating: number;
  color: string;
  coordinate: LatLng;
};

/** Real cafés around north Brooklyn; in an app these come from a places API. */
const CAFES: Cafe[] = [
  {
    id: 'plentea',
    name: 'Plentea Matcha',
    emoji: '🍵',
    kind: 'Matcha bar',
    rating: 4.7,
    color: '#EEF6E2',
    coordinate: { latitude: 40.6993, longitude: -73.9968 },
  },
  {
    id: 'neighbors',
    name: 'Neighbors Café',
    emoji: '🥐',
    kind: 'Bakery café',
    rating: 4.5,
    color: '#FFF1DB',
    coordinate: { latitude: 40.7024, longitude: -73.9962 },
  },
  {
    id: 'blue-door',
    name: 'Blue Door Bakery',
    emoji: '🥯',
    kind: 'Bakery',
    rating: 4.6,
    color: '#E8F0FF',
    coordinate: { latitude: 40.7035, longitude: -73.9872 },
  },
  {
    id: 'sunny',
    name: 'Sunny Side',
    emoji: '🥞',
    kind: 'Brunch',
    rating: 4.4,
    color: '#FFE4EC',
    coordinate: { latitude: 40.7142, longitude: -73.9614 },
  },
  {
    id: 'kettl',
    name: 'Kettl Greenpoint',
    emoji: '🫖',
    kind: 'Tea house',
    rating: 4.8,
    color: '#EAF7EE',
    coordinate: { latitude: 40.7299, longitude: -73.958 },
  },
];

/** North Brooklyn, shown until the map is ready to fit the cafés. */
const BROOKLYN = {
  latitude: 40.7135,
  longitude: -73.976,
  latitudeDelta: 0.06,
  longitudeDelta: 0.045,
};

export function PlacesDemo() {
  const colors = useColors();
  const { scheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const map = useRef<MapView>(null);
  const sheet = useRef<BottomSheet>(null);
  const animatedPosition = useSharedValue(0);
  const animatedIndex = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: animatedPosition.get() - 64 }],
    opacity: interpolate(animatedIndex.get(), [1, 1.6], [1, 0], Extrapolation.CLAMP),
  }));

  function focus(cafe: Cafe) {
    // Apple Maps zooms by `altitude`, Google Maps by `zoom`; pass both.
    map.current?.animateCamera(
      {
        center: {
          latitude: cafe.coordinate.latitude - 0.001,
          longitude: cafe.coordinate.longitude,
        },
        altitude: 1800,
        zoom: 16,
      },
      { duration: 700 },
    );
    sheet.current?.snapToIndex(0);
  }

  // Fit every café into the part of the map above the half-height sheet.
  function fitAll(animated: boolean) {
    map.current?.fitToCoordinates(
      CAFES.map((c) => c.coordinate),
      {
        edgePadding: { top: insets.top + 40, right: 48, bottom: height * 0.5 + 72, left: 48 },
        animated,
      },
    );
  }

  function showAll() {
    fitAll(true);
    sheet.current?.snapToIndex(1);
  }

  return (
    <View style={styles.fill}>
      <MapView
        ref={map}
        style={StyleSheet.absoluteFill}
        initialRegion={BROOKLYN}
        onMapReady={() => fitAll(false)}
        userInterfaceStyle={scheme}
        showsPointsOfInterests={false}>
        {CAFES.map((cafe) => (
          <Marker
            key={cafe.id}
            coordinate={cafe.coordinate}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={() => focus(cafe)}>
            <View style={[styles.pin, { backgroundColor: cafe.color }]}>
              <Text style={styles.pinEmoji}>{cafe.emoji}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <Animated.View style={[styles.floating, buttonStyle]} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="All cafés"
          onPress={showAll}
          style={[styles.chip, { backgroundColor: colors.surface }]}>
          <Text style={[styles.chipText, { color: colors.text }]}>☕️ All cafés</Text>
        </Pressable>
      </Animated.View>

      <BottomSheet
        accessible={false}
        ref={sheet}
        index={1}
        snapPoints={[150 + insets.bottom, '50%', '88%']}
        enableDynamicSizing={false}
        topInset={insets.top}
        animatedPosition={animatedPosition}
        animatedIndex={animatedIndex}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textTertiary }}>
        <BottomSheetFlatList
          data={CAFES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
          ListHeaderComponent={
            <View style={styles.header}>
              <ThemedText variant="title">Cafés near you</ThemedText>
              <ThemedText color="textSecondary">{CAFES.length} open now in Brooklyn</ThemedText>
            </View>
          }
          renderItem={({ item }) => (
            <ListRow
              title={item.name}
              subtitle={`${item.kind} · ★ ${item.rating}`}
              leading={<IconTile emoji={item.emoji} color={item.color} size={48} />}
              onPress={() => focus(item)}
            />
          )}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  pin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinEmoji: { fontSize: 20, lineHeight: 26 },
  floating: { position: 'absolute', top: 0, left: 16 },
  chip: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  chipText: { fontSize: 15, fontWeight: '600' },
  list: { paddingHorizontal: spacing.sm },
  header: { gap: spacing.xs, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
});
