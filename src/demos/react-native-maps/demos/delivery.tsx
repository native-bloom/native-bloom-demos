/**
 * React Native Maps · Delivery on the way
 *
 * Order tracking: the route is a `Polyline`, the done part is drawn on top in
 * a stronger color, and the courier is a custom `Marker` whose `coordinate`
 * moves along the path. Updating a marker's coordinate animates it smoothly
 * on iOS. Here a timer walks the route for a few seconds and stops at your
 * door; in an app the position comes from the courier's live location.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, type LatLng } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Trigger } from '@/demos/_shared/stage';
import { Avatar, radius, shadow, spacing, useColors, useTheme } from '@/design-system';

// Kettl Greenpoint down to a home in Williamsburg.
const ROUTE: LatLng[] = [
  { latitude: 40.7299, longitude: -73.958 },
  { latitude: 40.7268, longitude: -73.9555 },
  { latitude: 40.7226, longitude: -73.9531 },
  { latitude: 40.7192, longitude: -73.9562 },
  { latitude: 40.7161, longitude: -73.9597 },
  { latitude: 40.7139, longitude: -73.9572 },
];
const HOME = ROUTE[ROUTE.length - 1]!;
const STEPS = 120;
const TICK = 50; // ms → the trip takes 6 s.

/** Point at `t` (0…1) along the route, interpolating between vertices. */
function pointAt(t: number): { point: LatLng; done: LatLng[] } {
  const segments = ROUTE.length - 1;
  const pos = Math.min(t, 0.9999) * segments;
  const i = Math.floor(pos);
  const f = pos - i;
  const a = ROUTE[i]!;
  const b = ROUTE[i + 1]!;
  const point = {
    latitude: a.latitude + (b.latitude - a.latitude) * f,
    longitude: a.longitude + (b.longitude - a.longitude) * f,
  };
  return { point: t >= 1 ? HOME : point, done: [...ROUTE.slice(0, i + 1), t >= 1 ? HOME : point] };
}

export function DeliveryDemo() {
  const colors = useColors();
  const { scheme } = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Advances the courier one step per tick until it reaches the door.
  const drive = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS) {
          if (timer.current) clearInterval(timer.current);
          return STEPS;
        }
        return s + 1;
      });
    }, TICK);
  }, []);

  useEffect(() => {
    drive();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [drive]);

  function replay() {
    setStep(0);
    drive();
  }

  const t = step / STEPS;
  const { point, done } = pointAt(t);
  const arrived = step >= STEPS;
  const minutes = Math.max(1, Math.ceil((1 - t) * 12));

  return (
    <View style={styles.fill}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 40.7215,
          longitude: -73.9565,
          latitudeDelta: 0.03,
          longitudeDelta: 0.02,
        }}
        mapPadding={{ top: 0, right: 0, bottom: 180, left: 0 }}
        userInterfaceStyle={scheme}
        showsPointsOfInterests={false}>
        <Polyline
          coordinates={ROUTE}
          strokeColor="rgba(52,120,246,0.35)"
          strokeWidth={6}
          lineJoin="round"
        />
        <Polyline
          coordinates={done}
          strokeColor="#3478F6"
          strokeWidth={6}
          lineJoin="round"
          lineCap="round"
        />
        <Marker coordinate={HOME} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={[styles.homePin, { backgroundColor: arrived ? '#22C55E' : '#FFFFFF' }]}>
            <Text style={styles.pinEmoji}>🏠</Text>
          </View>
        </Marker>
        <Marker coordinate={point} anchor={{ x: 0.5, y: 0.5 }} zIndex={3}>
          <View style={styles.courier}>
            <Text style={styles.pinEmoji}>🛵</Text>
          </View>
        </Marker>
      </MapView>

      <View
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + spacing.md, backgroundColor: colors.surface },
        ]}>
        <View style={styles.row}>
          <Avatar name="Leo Lee" size={48} />
          <View style={styles.flex}>
            <Text style={[styles.title, { color: colors.text }]}>
              {arrived ? 'Leo is at your door' : `Leo is ${minutes} min away`}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Matcha and mochi from Kettl Greenpoint
            </Text>
          </View>
        </View>
        <View style={[styles.progress, { backgroundColor: colors.surfaceMuted }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${t * 100}%`, backgroundColor: arrived ? '#22C55E' : '#3478F6' },
            ]}
          />
        </View>
        {arrived ? (
          <View style={styles.replay}>
            <Trigger emoji="🔁" label="Track again" onPress={replay} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  courier: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#3478F6',
    ...shadow.floating,
  },
  homePin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...shadow.floating,
  },
  pinEmoji: { fontSize: 20, lineHeight: 26 },
  sheet: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    padding: spacing.lg,
    gap: spacing.md,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    ...shadow.floating,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  title: { fontSize: 17, fontWeight: '700' },
  subtitle: { fontSize: 13 },
  progress: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  replay: { alignItems: 'center' },
});
