import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { DemoChromeContext } from '@/demos/_shared/stage';
import { getDemo } from '@/demos/registry';
import { Card, Screen, Text } from '@/design-system';

const PLATFORM_NAMES = { ios: 'iOS', android: 'Android' } as const;

/**
 * Every demo opens through this route, so `nativebloomdemos://demo/<library>/<slug>`
 * works for all of them.
 *
 * - Component demos render under a title-only header (or full screen with
 *   `chrome: 'none'`). No back button, so recordings stay clean; the edge swipe
 *   still goes back.
 * - Flow demos redirect to their own routes under `/flows/<library>/<slug>`.
 */
export default function DemoScreen() {
  const params = useLocalSearchParams<{ library: string; demo: string }>();
  const { library, demo } = getDemo(params.library, params.demo);
  const onExit = library?.onDemoExit;
  const isFlow = demo?.kind === 'flow';

  // Clear library state (e.g. visible toasts) when leaving or switching demos.
  // Flows do this themselves through <DemoFlow>.
  useEffect(() => (isFlow ? undefined : () => onExit?.()), [onExit, demo?.slug, isFlow]);

  if (!library || !demo) {
    return (
      <Screen header={{ title: 'Not found' }}>
        <Card>
          <Text>
            No demo “{params.demo}” in “{params.library}”.
          </Text>
        </Card>
      </Screen>
    );
  }

  const supported = !demo.platforms || demo.platforms.some((p) => p === Platform.OS);
  if (!supported) {
    return (
      <Screen header={{ title: demo.title, back: false }}>
        <Card>
          <Text variant="label" color="textSecondary" align="center">
            This demo runs on {demo.platforms!.map((p) => PLATFORM_NAMES[p]).join(' and ')} only.
          </Text>
        </Card>
      </Screen>
    );
  }

  if (demo.kind === 'flow') return <Redirect href={demo.href} />;

  const chrome = demo.chrome ?? 'header';
  const Demo = demo.component;
  const Provider = library.Provider;
  const content = <Demo key={`${library.slug}/${demo.slug}`} />;

  return (
    <Screen
      header={chrome === 'none' ? null : { title: demo.title, back: false }}
      scroll={false}
      bleed>
      <DemoChromeContext.Provider value={chrome}>
        {Provider ? <Provider>{content}</Provider> : content}
      </DemoChromeContext.Provider>
    </Screen>
  );
}
