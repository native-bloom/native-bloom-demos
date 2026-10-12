import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useColors } from '../theme';
import { radius } from '../tokens';
import { Icon, type IconName } from './icon';
import { Text } from './text';

export type IconTileProps = {
  emoji?: string;
  icon?: IconName;
  /** Background color. Defaults to the muted surface. */
  color?: string;
  /** Foreground color for `icon`. */
  tint?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/** Rounded square with an emoji or icon, used as a leading visual in rows and cards. */
export function IconTile({ emoji, icon, color, tint, size = 44, style }: IconTileProps) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.32),
          backgroundColor: color ?? colors.surfaceMuted,
        },
        style,
      ]}>
      {emoji ? (
        <Text style={{ fontSize: Math.round(size * 0.48), lineHeight: Math.round(size * 0.6) }}>
          {emoji}
        </Text>
      ) : icon ? (
        <Icon name={icon} size={Math.round(size * 0.46)} tint={tint ?? colors.text} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
    borderRadius: radius.md,
  },
});
