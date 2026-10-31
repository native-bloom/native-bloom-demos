import { useNavigation, type NativeStackNavigationOptions } from 'expo-router';
import { useEffect, type ReactNode } from 'react';

/**
 * Turns off the iOS 26 full-width back swipe while a chart demo is open (the edge swipe
 * still works). Pointer charts (`pointerConfig`) and scrolling charts track horizontal
 * drags with a responder, and the full-width swipe wins that drag and pops the screen.
 * In an app, set `fullScreenGestureEnabled: false` on screens with interactive charts.
 */
export function GiftedChartsProvider({ children }: { children: ReactNode }) {
  const navigation = useNavigation();

  useEffect(() => {
    const setOptions = (options: NativeStackNavigationOptions) => navigation.setOptions(options);
    setOptions({ fullScreenGestureEnabled: false });
    // The demo screen is reused by the next demo: hand the default back.
    return () => setOptions({ fullScreenGestureEnabled: undefined });
  }, [navigation]);

  return children;
}
