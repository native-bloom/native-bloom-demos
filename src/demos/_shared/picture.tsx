/**
 * `Picture` shows a piece of sticker art (`stickerArt.*` from the fixtures) in a card-like
 * slot: the light or dark version for the current theme, cropped to fill, with a soft inner
 * shadow around the whole edge so the picture reads as its own surface on the canvas instead
 * of fading into it. Pass the slot's size and corner radius in `style`; the shadow follows the
 * same corners. Children render on top (overlays, buttons).
 *
 * Demo chrome: in an app, use your own image component here.
 */
import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import type { StickerArt } from '@/demos/_shared/fixtures';
import { useTheme } from '@/design-system';

const INNER_SHADOW = {
  light: 'inset 0 0 0 0.5px rgba(16, 16, 32, 0.06), inset 0 0 22px rgba(16, 16, 32, 0.09)',
  dark: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.09), inset 0 0 22px rgba(0, 0, 0, 0.7)',
};

const RADIUS_KEYS = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
] as const;

export type PictureProps = {
  art: StickerArt;
  /** Force the light or dark version (e.g. over a fixed dark backdrop). Defaults to the theme. */
  surface?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function Picture({ art, surface, style, children }: PictureProps) {
  const theme = useTheme();
  const scheme = surface ?? theme.scheme;
  const flat = StyleSheet.flatten(style) ?? {};
  const corners = Object.fromEntries(
    RADIUS_KEYS.filter((key) => flat[key] !== undefined).map((key) => [key, flat[key]]),
  );

  return (
    <View style={[styles.clip, style]}>
      <Image source={art[scheme]} style={StyleSheet.absoluteFill} contentFit="cover" />
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, corners, { boxShadow: INNER_SHADOW[scheme] }]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden', borderCurve: 'continuous' },
});
