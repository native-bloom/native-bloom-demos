/**
 * Design tokens for the Native Bloom demo app.
 *
 * The visual language is borrowed from the "Bond" mobile app: soft light-grey
 * canvas, white rounded cards, pill-shaped chips and buttons, a single blue
 * accent, black primary actions and generous whitespace.
 */
import { Platform } from 'react-native';

export const palette = {
  light: {
    canvas: '#F3F3F5',
    surface: '#FFFFFF',
    surfaceMuted: '#EEEEF1',
    surfacePressed: '#E6E6EA',
    border: '#E7E7EB',
    text: '#0B0B0D',
    textSecondary: '#6E6E75',
    textTertiary: '#A3A3AA',
    accent: '#3478F6',
    accentSoft: '#E8F0FF',
    onAccent: '#FFFFFF',
    inverse: '#111113',
    onInverse: '#FFFFFF',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3478F6',
    overlay: 'rgba(0,0,0,0.35)',
  },
  dark: {
    canvas: '#000000',
    surface: '#151517',
    surfaceMuted: '#222225',
    surfacePressed: '#2C2C30',
    border: '#2A2A2E',
    text: '#FFFFFF',
    textSecondary: '#A1A1A8',
    textTertiary: '#6A6A72',
    accent: '#5B93FF',
    accentSoft: '#15243F',
    onAccent: '#FFFFFF',
    inverse: '#FFFFFF',
    onInverse: '#0B0B0D',
    success: '#4ADE80',
    warning: '#FBBF24',
    danger: '#F87171',
    info: '#5B93FF',
    overlay: 'rgba(0,0,0,0.6)',
  },
} as const;

export type ColorScheme = keyof typeof palette;
export type ThemeColors = (typeof palette)[ColorScheme];
export type ColorToken = keyof ThemeColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 56,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const fontFamily = Platform.select({
  ios: { sans: 'system-ui', mono: 'ui-monospace' },
  android: { sans: 'sans-serif', mono: 'monospace' },
  default: { sans: 'system-ui', mono: 'monospace' },
})!;

export const typography = {
  display: { fontSize: 30, lineHeight: 36, fontWeight: '700', letterSpacing: -0.6 },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '700', letterSpacing: -0.4 },
  heading: { fontSize: 18, lineHeight: 24, fontWeight: '600', letterSpacing: -0.2 },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400', letterSpacing: 0 },
  bodyStrong: { fontSize: 16, lineHeight: 22, fontWeight: '600', letterSpacing: 0 },
  label: { fontSize: 14, lineHeight: 18, fontWeight: '500', letterSpacing: 0 },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500', letterSpacing: 0.1 },
  mono: { fontSize: 13, lineHeight: 18, fontWeight: '500', letterSpacing: 0 },
} as const;

export type TypographyVariant = keyof typeof typography;

/** Soft elevation used by cards and floating pills. */
export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
    },
    android: { elevation: 2 },
    default: {},
  })!,
  floating: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 6 },
    default: {},
  })!,
} as const;

export const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 } as const;
