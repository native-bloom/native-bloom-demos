import type { ComponentType, ReactNode } from 'react';
import type { Href } from 'expo-router';

import type { IconName } from '@/design-system/components/icon';

/**
 * Difficulty bucket a demo is listed under on the library screen.
 *
 * - `basic`        — the library's core API, one concept per demo.
 * - `intermediate` — async flows, behaviour and layout options.
 * - `advanced`     — custom rendering, styling, animation and real product scenarios.
 */
export type DemoLevel = 'basic' | 'intermediate' | 'advanced';

export const DEMO_LEVELS: readonly DemoLevel[] = ['basic', 'intermediate', 'advanced'];

export const DEMO_LEVEL_LABELS: Record<DemoLevel, string> = {
  basic: 'Basic',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

/**
 * How a demo is staged. See DESIGN.md › Stages.
 *
 * - `isolated` — imperative API on a clean stage with a few triggers (toasts, haptics, alerts).
 * - `showcase` — one component in focus, with a small variant switcher (inputs, calendars, charts).
 * - `scenario` — the component inside a small, realistic product screen.
 * - `flow`     — several real screens in a native stack (navigation, shared transitions).
 */
export type DemoKind = 'isolated' | 'showcase' | 'scenario' | 'flow';

/**
 * - `header` — title-only header above the demo (default).
 * - `none`   — the demo owns the whole screen (cameras, stories, full-bleed calendars).
 */
export type DemoChrome = 'header' | 'none';

export type DemoPlatform = 'ios' | 'android';

type DemoBase = {
  /**
   * URL-safe id, unique inside its library. Also the file (or folder, for flows)
   * name: `src/demos/<library>/demos/<slug>.tsx`.
   */
  slug: string;
  /** Title used in the app header, on the website and as the block name. */
  title: string;
  /** One sentence: the single idea this demo shows. */
  description: string;
  level: DemoLevel;
  /** Emoji shown in the demo list. */
  emoji: string;
  /** Packages this demo needs on top of the library's `install` list. */
  extraPackages?: string[];
  /**
   * Platforms the demo works on. Defaults to both. Other platforms see a short
   * notice instead of the demo (e.g. a component that only renders inline on iOS).
   */
  platforms?: DemoPlatform[];
};

/** A demo rendered as one component under the shared demo chrome. */
export type ComponentDemo = DemoBase & {
  kind: Exclude<DemoKind, 'flow'>;
  /** Defaults to `header`. */
  chrome?: DemoChrome;
  component: ComponentType;
};

/**
 * A demo that spans several screens. Its code lives in the folder
 * `src/demos/<library>/demos/<slug>/` and its routes in
 * `src/app/flows/<library>/<slug>/`, which only re-export that code.
 */
export type FlowDemo = DemoBase & {
  kind: 'flow';
  /** The flow's first route, e.g. `/flows/sonner-native/navigation`. */
  href: Href;
};

export type DemoDefinition = ComponentDemo | FlowDemo;

export type LibraryLink = { label: string; url: string; icon: IconName };

export type ProviderComponent = ComponentType<{ children: ReactNode }>;

export type LibraryDefinition = {
  /** URL-safe id, e.g. `sonner-native`. Also the folder name under `src/demos/`. */
  slug: string;
  /** Display name, e.g. "Sonner Native". */
  name: string;
  /** npm package name. */
  packageName: string;
  /** Short tagline shown on cards. */
  tagline: string;
  /** Longer description for the library screen. */
  description: string;
  emoji: string;
  /** Background of the library's icon tile. */
  color: string;
  /** Category chip on the home screen. */
  category: string;
  links: LibraryLink[];
  /** Everything `npx expo install` needs for the demos to run, library first. */
  install: string[];
  /** One or two sentences of app-level setup an agent must do besides installing. */
  setup?: string;
  /**
   * Wraps every demo of this library (component demos and flows). Use it for
   * providers the library needs above its components, e.g. a portal host or a
   * keyboard provider. Prefer mounting providers inside the demo file when the
   * demo can own them, so the file stays self-contained.
   */
  Provider?: ProviderComponent;
  /**
   * Wraps the whole app. Only for libraries that must sit above the navigator
   * and cannot work when mounted per screen.
   */
  RootProvider?: ProviderComponent;
  /**
   * Called when the user leaves a demo. Use it to clear global library state so
   * it does not leak into the next demo (e.g. `toast.dismiss()`).
   */
  onDemoExit?: () => void;
  demos: DemoDefinition[];
};

export function demosByLevel(library: LibraryDefinition): Record<DemoLevel, DemoDefinition[]> {
  const out: Record<DemoLevel, DemoDefinition[]> = { basic: [], intermediate: [], advanced: [] };
  for (const demo of library.demos) out[demo.level].push(demo);
  return out;
}

/** Path of a demo's source, relative to the repo root (a folder for flows). */
export function demoSourcePath(librarySlug: string, demo: DemoDefinition): string {
  return demo.kind === 'flow'
    ? `src/demos/${librarySlug}/demos/${demo.slug}/`
    : `src/demos/${librarySlug}/demos/${demo.slug}.tsx`;
}
