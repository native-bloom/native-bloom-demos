import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { useColors } from '../theme';
import { Text } from './text';

export type AvatarProps = {
  name: string;
  uri?: string;
  size?: number;
  /** Small coloured status dot, as on the Bond member list. */
  status?: 'online' | 'busy';
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]!.toUpperCase())
    .join('');
}

export function Avatar({ name, uri, size = 40, status }: AvatarProps) {
  const colors = useColors();
  return (
    <View style={{ width: size, height: size }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          contentFit="cover"
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: colors.surfaceMuted,
            },
          ]}>
          <Text variant="label" color="textSecondary" style={{ fontSize: size * 0.36 }}>
            {initials(name)}
          </Text>
        </View>
      )}
      {status ? (
        <View
          style={[
            styles.dot,
            {
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: size * 0.15,
              borderColor: colors.surface,
              backgroundColor: status === 'online' ? colors.success : colors.danger,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', right: -1, bottom: -1, borderWidth: 2 },
});
