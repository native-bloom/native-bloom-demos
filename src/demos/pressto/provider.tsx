import { useNavigation, type NativeStackNavigationOptions } from 'expo-router';
import { useEffect, type ReactNode } from 'react';

/**
 * Turns off the iOS 26 full-width back swipe while a pressto demo is open (the edge swipe
 * still works). That swipe holds back touch-down for Gesture Handler buttons until the finger
 * moves or lifts, so a held press would only animate on release and `onLongPress` would never
 * fire. In an app, set `fullScreenGestureEnabled: false` on the screens that use pressto.
 */
export function PresstoProvider({ children }: { children: ReactNode }) {
  const navigation = useNavigation();

  useEffect(() => {
    const setOptions = (options: NativeStackNavigationOptions) => navigation.setOptions(options);
    setOptions({ fullScreenGestureEnabled: false });
    // The demo screen is reused by the next demo: hand the default back.
    return () => setOptions({ fullScreenGestureEnabled: undefined });
  }, [navigation]);

  return children;
}
