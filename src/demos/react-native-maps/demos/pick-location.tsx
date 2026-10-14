/**
 * React Native Maps · Pick a location
 *
 * The "move the map, not the pin" picker from ride and delivery apps. The pin
 * is a plain view centred over the map, not a Marker. `onRegionChangeStart`
 * lifts it while the map moves; `onRegionChangeComplete` drops it and asks
 * `addressForCoordinate` (Apple's reverse geocoder on iOS) for the street
 * address at the new center. The geocoder is rate-limited and needs network,
 * so handle failures (here: show the coordinates).
 */
import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import MapView, { type Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, radius, shadow, spacing, useColors, useTheme } from '@/design-system';

import { DUMBO } from '../data';

type Place = { title: string; subtitle: string };

export function PickLocationDemo() {
  const colors = useColors();
  const { scheme } = useTheme();
  const insets = useSafeAreaInsets();
  const map = useRef<MapView>(null);
  const [moving, setMoving] = useState(false);
  const [place, setPlace] = useState<Place | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function onRegionChangeComplete(region: Region) {
    setMoving(false);
    try {
      const address = await map.current?.addressForCoordinate({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      if (!address) return;
      // Apple's geocoder can return the string "(null)" for missing parts.
      const part = (value?: string) => (value && value !== '(null)' ? value : undefined);
      const street = [part(address.subThoroughfare), part(address.thoroughfare)]
        .filter(Boolean)
        .join(' ');
      setPlace({
        title: street || part(address.name) || 'Dropped pin',
        subtitle: [part(address.subLocality) || part(address.locality), part(address.postalCode)]
          .filter(Boolean)
          .join(' · '),
      });
    } catch {
      // The geocoder is rate-limited and needs network; fall back to coordinates.
      setPlace({
        title: 'Dropped pin',
        subtitle: `${region.latitude.toFixed(5)}, ${region.longitude.toFixed(5)}`,
      });
    }
  }

  const pinStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(moving ? -14 : 0) }],
  }));
  const shadowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(moving ? 0.6 : 1) }],
    opacity: withSpring(moving ? 0.25 : 0.45),
  }));

  return (
    <View style={styles.fill}>
      <MapView
        ref={map}
        style={StyleSheet.absoluteFill}
        initialRegion={DUMBO}
        userInterfaceStyle={scheme}
        showsPointsOfInterests={false}
        onRegionChangeStart={() => {
          setMoving(true);
          setConfirmed(false);
        }}
        onRegionChangeComplete={onRegionChangeComplete}
      />

      {/* The pin sits over the map's center; its tip marks the picked point. */}
      <View pointerEvents="none" style={styles.center}>
        <Animated.View style={[styles.pinShadow, shadowStyle]} />
        <Animated.View style={[styles.pin, pinStyle]}>
          <View style={styles.pinHead}>
            <View style={styles.pinDot} />
          </View>
          <View style={styles.pinStem} />
        </Animated.View>
      </View>

      <View
        style={[styles.title, { top: insets.top + spacing.sm, backgroundColor: colors.surface }]}>
        <Text style={[styles.titleText, { color: colors.text }]}>Where should Sam meet you?</Text>
      </View>

      <View
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + spacing.md, backgroundColor: colors.surface },
        ]}>
        <View style={styles.addressRow}>
          <Text style={styles.addressEmoji}>📍</Text>
          <View style={styles.flex}>
            {moving || !place ? (
              <ActivityIndicator style={styles.loading} />
            ) : (
              <>
                <Text style={[styles.addressTitle, { color: colors.text }]} numberOfLines={1}>
                  {place.title}
                </Text>
                <Text style={[styles.addressSubtitle, { color: colors.textSecondary }]}>
                  {place.subtitle}
                </Text>
              </>
            )}
          </View>
        </View>
        <Button
          label={confirmed ? 'Sent to Sam ✓' : 'Meet here'}
          variant={confirmed ? 'soft' : 'primary'}
          fullWidth
          disabled={moving || !place}
          onPress={() => setConfirmed(true)}
        />
      </View>
    </View>
  );
}

const PIN = 44;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Lift the pin so its tip, not its middle, sits on the center point.
  pin: { position: 'absolute', alignItems: 'center', marginTop: -(PIN + 18) },
  pinHead: {
    width: PIN,
    height: PIN,
    borderRadius: PIN / 2,
    backgroundColor: '#FF2D78',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  pinDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFFFFF' },
  pinStem: { width: 4, height: 18, borderRadius: 2, backgroundColor: '#FF2D78' },
  pinShadow: { width: 14, height: 6, borderRadius: 7, backgroundColor: '#000000' },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    ...shadow.floating,
  },
  titleText: { fontSize: 15, fontWeight: '600' },
  sheet: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    padding: spacing.lg,
    gap: spacing.lg,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    ...shadow.floating,
  },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 44 },
  addressEmoji: { fontSize: 24, lineHeight: 30 },
  flex: { flex: 1 },
  loading: { alignSelf: 'flex-start' },
  addressTitle: { fontSize: 17, fontWeight: '700' },
  addressSubtitle: { fontSize: 13 },
});
