import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';

import { palette, type ColorScheme, type ThemeColors } from './tokens';

export type ThemeMode = 'system' | ColorScheme;

type ThemeContextValue = {
  /** Resolved scheme actually in use. */
  scheme: ColorScheme;
  colors: ThemeColors;
  /** User preference. `system` follows the OS setting. */
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * The theme follows `useColorScheme()`. Forcing a mode goes through
 * `Appearance.setColorScheme`, so third-party components that read the color
 * scheme themselves (toasts, native controls) switch together with the app.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const scheme: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    Appearance.setColorScheme(next === 'system' ? 'unspecified' : next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ scheme, colors: palette[scheme], mode, setMode }),
    [scheme, mode, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/** Shorthand for the resolved color set. */
export function useColors(): ThemeColors {
  return useTheme().colors;
}
