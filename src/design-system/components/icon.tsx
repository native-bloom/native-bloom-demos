import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

import { useColors } from '../theme';
import type { ColorToken } from '../tokens';

/**
 * A small, curated icon set. Each entry maps to an SF Symbol on iOS and a
 * Material Symbol on Android / web so the same name works everywhere.
 */
export const icons = {
  back: { ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' },
  forward: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  settings: { ios: 'slider.horizontal.3', android: 'tune', web: 'tune' },
  plus: { ios: 'plus', android: 'add', web: 'add' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  sparkles: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  link: { ios: 'arrow.up.right', android: 'open_in_new', web: 'open_in_new' },
  github: { ios: 'chevron.left.forwardslash.chevron.right', android: 'code', web: 'code' },
  docs: { ios: 'book', android: 'menu_book', web: 'menu_book' },
  bell: { ios: 'bell.fill', android: 'notifications', web: 'notifications' },
  heart: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
  trash: { ios: 'trash', android: 'delete', web: 'delete' },
  refresh: { ios: 'arrow.clockwise', android: 'refresh', web: 'refresh' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  info: { ios: 'info.circle', android: 'info', web: 'info' },
  warning: { ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' },
  error: { ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' },
  success: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  cloud: { ios: 'cloud.fill', android: 'cloud', web: 'cloud' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  inbox: { ios: 'tray.fill', android: 'inbox', web: 'inbox' },
  moon: { ios: 'moon.fill', android: 'dark_mode', web: 'dark_mode' },
  sun: { ios: 'sun.max.fill', android: 'light_mode', web: 'light_mode' },
  phone: { ios: 'iphone', android: 'smartphone', web: 'smartphone' },
  wifi: { ios: 'wifi', android: 'wifi', web: 'wifi' },
  download: { ios: 'arrow.down.circle.fill', android: 'download', web: 'download' },
  share: { ios: 'square.and.arrow.up', android: 'share', web: 'share' },
  layers: { ios: 'square.stack.3d.up.fill', android: 'layers', web: 'layers' },
  bolt: { ios: 'bolt.fill', android: 'bolt', web: 'bolt' },
  message: { ios: 'bubble.left.fill', android: 'chat_bubble', web: 'chat_bubble' },
  photo: { ios: 'photo.fill', android: 'image', web: 'image' },
} as const satisfies Record<string, SymbolViewProps['name']>;

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
  size?: number;
  /** Theme color token. Ignored when `tint` is provided. */
  color?: ColorToken;
  /** Raw color override. */
  tint?: ColorValue;
  weight?: SymbolViewProps['weight'];
  style?: StyleProp<ViewStyle>;
};

export function Icon({
  name,
  size = 18,
  color = 'text',
  tint,
  weight = 'semibold',
  style,
}: IconProps) {
  const colors = useColors();
  return (
    <SymbolView
      name={icons[name]}
      size={size}
      weight={weight}
      tintColor={tint ?? colors[color]}
      resizeMode="scaleAspectFit"
      style={[{ width: size, height: size }, style]}
    />
  );
}
