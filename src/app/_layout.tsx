import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { rootProviders } from '@/demos/registry';
import { ThemeProvider, useTheme } from '@/design-system';

SplashScreen.preventAutoHideAsync();

function Navigator() {
  const { colors } = useTheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.canvas },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="library/[slug]" />
      {/* One demo screen at a time: a deep link to another demo reuses it instead of stacking. */}
      <Stack.Screen name="demo/[library]/[demo]" dangerouslySingular={() => 'demo'} />
      <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

/** Library-level providers that must sit above the navigator (rare). */
function RootProviders({ children }: { children: ReactNode }) {
  return rootProviders.reduceRight<ReactNode>(
    (tree, Provider) => <Provider>{tree}</Provider>,
    children,
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      {/* App-wide keyboard handling: every keyboard-aware view comes from react-native-keyboard-controller. */}
      <KeyboardProvider>
        <ThemeProvider>
          <RootProviders>
            <Navigator />
          </RootProviders>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
