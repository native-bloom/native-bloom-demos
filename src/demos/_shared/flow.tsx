/**
 * Chrome for multi-screen (`flow`) demos. A flow's `layout.tsx` renders its
 * navigator inside `<DemoFlow>`, which applies the library's `Provider` and
 * runs `onDemoExit` when the flow closes, exactly like single-screen demos.
 */
import { useEffect, type ReactNode } from 'react';

import { getLibrary } from '@/demos/registry';

export type DemoFlowProps = {
  /** Library slug, e.g. `sonner-native`. */
  library: string;
  children: ReactNode;
};

export function DemoFlow({ library: librarySlug, children }: DemoFlowProps) {
  const library = getLibrary(librarySlug);
  const onExit = library?.onDemoExit;

  useEffect(() => () => onExit?.(), [onExit]);

  const Provider = library?.Provider;
  return Provider ? <Provider>{children}</Provider> : <>{children}</>;
}
