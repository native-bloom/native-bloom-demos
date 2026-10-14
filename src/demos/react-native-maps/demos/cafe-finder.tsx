/**
 * React Native Maps · Café finder
 *
 * A map with a card carousel, kept in sync both ways. Swiping the cards calls
 * `animateCamera` to center the selected café; tapping a pin scrolls the
 * carousel to its card. The selected pin is a bigger custom marker: changing a
 * marker's look means re-rendering it, so its `key` includes the selection
 * (cheaper than `tracksViewChanges` on every marker).
 */
import { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, shadow, spacing, useColors, useTheme } from '@/design-system';

import { CAFES, type Cafe } from '../data';

const CARD_GAP = 12;

function Pin({ cafe, selected }: { cafe: Cafe; selected: boolean }) {
  const size = selected ? 56 : 40;
  return (
    <View
      style={[
        styles.pin,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: selected ? '#111113' : cafe.color,
        },
      ]}>
      <Text style={{ fontSize: selected ? 28 : 20, lineHeight: selected ? 34 : 26 }}>
        {cafe.emoji}
      </Text>
    </View>
  );
}

export function CafeFinderDemo() {
  const colors = useColors();
  const { scheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = width - spacing.lg * 2 - 24;
  const snap = cardWidth + CARD_GAP;

  const map = useRef<MapView>(null);
  const list = useRef<FlatList<Cafe>>(null);
  const [index, setIndex] = useState(0);

  function focus(i: number) {
    setIndex(i);
    map.current?.animateCamera(
      { center: CAFES[i]!.coordinate, altitude: 4500, zoom: 14 },
      { duration: 600 },
    );
  }

  function onScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const i = Math.round(event.nativeEvent.contentOffset.x / snap);
    if (i !== index) focus(Math.max(0, Math.min(CAFES.length - 1, i)));
  }

  return (
    <View style={styles.fill}>
      <MapView
        ref={map}
        style={StyleSheet.absoluteFill}
        initialCamera={{
          center: CAFES[0]!.coordinate,
          altitude: 4500,
          zoom: 14,
          pitch: 0,
          heading: 0,
        }}
        userInterfaceStyle={scheme}
        showsPointsOfInterests={false}>
        {CAFES.map((cafe, i) => (
          <Marker
            key={`${cafe.id}-${i === index}`}
            coordinate={cafe.coordinate}
            anchor={{ x: 0.5, y: 0.5 }}
            zIndex={i === index ? 2 : 1}
            onPress={() => {
              focus(i);
              list.current?.scrollToOffset({ offset: i * snap, animated: true });
            }}>
            <Pin cafe={cafe} selected={i === index} />
          </Marker>
        ))}
      </MapView>

      <View
        style={[styles.header, { top: insets.top + spacing.sm, backgroundColor: colors.surface }]}>
        <Text style={[styles.headerText, { color: colors.text }]}>☕️ Cafés near you</Text>
      </View>

      <FlatList
        ref={list}
        style={[styles.carousel, { bottom: insets.bottom + spacing.md }]}
        data={CAFES}
        keyExtractor={(c) => c.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snap}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
        ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: cardWidth, backgroundColor: colors.surface }]}>
            <View style={[styles.cardIcon, { backgroundColor: item.color }]}>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.cardMeta, { color: colors.textSecondary }]}>
                {item.kind} · ★ {item.rating} · {item.price}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  pin: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  header: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    ...shadow.floating,
  },
  headerText: { fontSize: 15, fontWeight: '700' },
  carousel: { position: 'absolute', left: 0, right: 0, flexGrow: 0 },
  carouselContent: { paddingHorizontal: spacing.lg },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    ...shadow.floating,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: { fontSize: 28, lineHeight: 34 },
  flex: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: '700' },
  cardMeta: { fontSize: 13 },
});
