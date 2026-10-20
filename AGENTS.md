# Native Bloom Demos

Expo app (SDK 57, Expo Router, Expo UI) that hosts demos of React Native UI
libraries. Every demo is recorded as a video for Native Bloom, and its source is what
coding agents copy when a user installs that block.

## Read first

- [DESIGN.md](DESIGN.md) — how demos look: Bond visual language, stages, copy, theming, recording.
- [docs/ADDING_DEMOS.md](docs/ADDING_DEMOS.md) — structure: registry, folders, providers, file rules, verification, gotchas.
- `.claude/skills/add-library-demos` — the workflow when the user hands you a library's GitHub / docs links.
- `.claude/skills/sticker-art` — draws every picture a demo needs (stickers on the app canvas).

## Layout

```
src/
  app/                          # Expo Router routes only
    _layout.tsx                 # providers + Stack (+ library RootProviders)
    index.tsx                   # home: search + library cards
    library/[slug].tsx          # demos grouped by level
    demo/[library]/[demo].tsx   # every demo opens here; flows redirect to /flows/…
    flows/<library>/<slug>/     # flow demo routes (re-exports only)
    settings.tsx                # theme mode
  design-system/                # tokens, theme, components
  demos/
    types.ts                    # LibraryDefinition / DemoDefinition
    registry.ts                 # list of libraries
    _shared/stage.tsx           # DemoStage, TriggerStack, Trigger, Showcase, VariantBar, StageHint
    _shared/picture.tsx         # Picture: sticker art in a card slot, with an inner-shadow edge
    _shared/flow.tsx            # DemoFlow wrapper for flow layouts
    _shared/fixtures.ts         # shared people, memories, places, sticker art
    <library>/index.ts          # library metadata + demo list
    <library>/demos/<slug>.tsx  # component demo
    <library>/demos/<slug>/     # flow demo (layout.tsx + screens)
```

## Finding a demo's code (for agents installing a block)

A component demo is `src/demos/<library>/demos/<slug>.tsx`; a flow demo is the folder
`src/demos/<library>/demos/<slug>/` (start at `layout.tsx`). The header comment says what it
shows and lists extra packages. The library's `install` and `setup` fields in
`src/demos/<library>/index.ts` list what the app needs. Copy the library calls and anything
written in plain React Native. Imports from `@/design-system` and `@/demos/_shared` are demo
chrome; replace them with the target app's own components and data.

## Rules

- One idea per demo, little noise, self-contained code (docs/ADDING_DEMOS.md).
- `npx expo install <pkg>` for dependencies; native dependencies need `npm run ios`.
- Keyboard handling: react-native-keyboard-controller only (`KeyboardProvider` is in the root layout).
- Before finishing: `npm run check:demos`, `npm run typecheck`, `npm run lint`, then open each
  changed demo on the simulator with Argent and look at it.

## Expo

Expo ships breaking changes every SDK. Before touching an Expo / React Native API, check
`https://docs.expo.dev/versions/v57.0.0/` (or `https://docs.expo.dev/llms.txt`). For
`@expo/ui` prefer the universal components from `@expo/ui`; use `@expo/ui/swift-ui` or
`@expo/ui/jetpack-compose` only for platform-specific controls.

## Commands

```bash
npx expo start            # dev server (also regenerates typed routes)
npm run ios               # native dev build
npm run android
npm run typecheck
npm run lint
npm run check:demos
npm run new:demo -- <library> <slug> "Title" --kind isolated|showcase|scenario|flow
npm run argent -- open <library> <slug> | buttons | tap "<label>" | shot <name> | swipe-back
```
