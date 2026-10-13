# Adding demos

How demos are structured. How they look lives in [DESIGN.md](../DESIGN.md). The end-to-end
workflow for a new library is the `add-library-demos` skill in `.claude/skills/`.

Every demo serves two readers:

| Reader | Needs | So the demo must be |
| ------ | ----- | ------------------- |
| A person watching the recording on Native Bloom | To get the idea in seconds and want it | One idea, little noise, attractive, realistic copy |
| An agent installing the block | To find the library calls and copy them | Self-contained code, library parts in plain React Native |

## What makes a good demo

1. **One idea.** "Toast variants", "Undo delete", "Glass toasts". If the title needs "and", split it.
2. **The right stage.** `isolated`, `showcase`, `scenario` or `flow` (DESIGN.md › Stages).
3. **Show the power, skip the plumbing.** Demo what looks impressive and what people build with the
   library. Leave out options that do not read on video (accessibility flags, font scaling, dev
   warnings). They stay in the library's own docs.
4. **No explanation on screen.** No code, notes, tag lists or logs. The title says what it is.

## Coverage per library

Aim for 8–14 demos that together cover what the library is good at. If the user names demos
(for example from screenshots of the website), those come first.

| Level | Covers |
| ----- | ------ |
| `basic` | Minimal setup, built-in variants, main content options |
| `intermediate` | Async flows, behaviour and layout options, attention effects |
| `advanced` | Custom styling, custom rendering, animation, and 2–4 real-world scenarios |

## Folder layout

```
src/demos/<library>/
  index.ts                  # LibraryDefinition: metadata + demo list
  data.ts                   # optional: sample data the library consumes (chart points, events)
  demos/
    <slug>.tsx              # component demo (isolated, showcase, scenario)
    <slug>/                 # flow demo
      layout.tsx            #   navigator + anything the library needs around it
      <name>-screen.tsx     #   one file per screen
src/app/flows/<library>/<slug>/
  _layout.tsx               # export { default } from '@/demos/<library>/demos/<slug>/layout'
  index.tsx                 # export { default } from '…/<first>-screen'
  <route>.tsx               # export { default } from '…/<other>-screen'
```

Route files only re-export; the code agents read lives under `src/demos/`.

## The registry entry

```ts
// Component demo
{
  slug: 'variants',            // = file name
  title: 'Toast variants',     // header, website and block name
  emoji: '🎨',
  level: 'basic',
  kind: 'isolated',            // 'isolated' | 'showcase' | 'scenario'
  chrome: 'header',            // optional; 'none' = full screen
  description: 'One sentence: the single idea.',
  extraPackages: ['expo-blur'],// optional; beyond the library's `install`
  platforms: ['ios'],          // optional; other platforms see a notice instead
  component: VariantsDemo,
}

// Flow demo
{
  slug: 'navigation',          // = folder name
  title: 'Toast after navigation',
  emoji: '🧭',
  level: 'advanced',
  kind: 'flow',
  description: 'One sentence: the single idea.',
  href: '/flows/sonner-native/navigation',
}
```

Every demo, flows included, opens at `nativebloomdemos://demo/<library>/<slug>`. Flow entries
redirect to their `href`.

## The library entry

```ts
export const myLib: LibraryDefinition = {
  slug: 'my-lib',                 // = folder name
  name: 'My Lib',
  packageName: 'my-lib',
  tagline: 'One line for cards.',
  description: 'A paragraph for the library screen.',
  emoji: '🧩',
  color: '#E8F0FF',               // icon tile background
  category: 'Inputs',             // home filter chip
  links: [
    { label: 'GitHub', url: 'https://github.com/…', icon: 'github' },
    { label: 'Docs', url: 'https://…', icon: 'docs' },
  ],
  install: ['my-lib', 'react-native-reanimated'], // everything `npx expo install` needs
  setup: 'Wrap the app in <MyProvider />.',       // app-level setup besides installing
  Provider: MyProvider,           // optional: wraps every demo of this library
  RootProvider: MyRootProvider,   // optional, rare: wraps the whole app
  onDemoExit: () => resetMyLib(), // optional: clear global state between demos
  demos: [ … ],
};
```

Register it in `src/demos/registry.ts`. Home, library and demo screens are generated.

### Where providers go

1. **Inside the demo file** when the demo can own it (sonner mounts `<Toaster />` per demo).
   Best for agents: the whole setup is in one file.
2. **`Provider`** when every demo needs the same wrapper and repeating it would add noise
   (a portal host, a keyboard provider, a query client).
3. **`RootProvider`** only when the library breaks unless it sits above the navigator.

## File rules (what agents rely on)

- **Header comment.** Each demo file, and each flow's `layout.tsx`, starts with a JSDoc block:
  `Library · Demo title`, one paragraph on the idea, extra packages and platform caveats.
- **Library code in plain React Native.** Anything the library renders (custom content, icons,
  style objects, animation configs) uses `react-native` primitives and literal values.
- **Scene code may use the design system.** Triggers, cards, lists and layout come from
  `@/design-system`, `@/demos/_shared/stage` and `@/demos/_shared/fixtures`. They are chrome.
- **Module-level helpers** for long calls (`function showDarkCard() { toast(…) }`).
- **Clean up.** Clear timers in effect cleanups. Global library state is cleared by `onDemoExit`.
- **Library-shaped sample data** (chart points, calendar events) goes in `src/demos/<library>/data.ts`
  with a header saying where real data would come from. Make it deterministic (seeded), so every
  recording shows the same thing. People, memories and places still come from the shared fixtures.

## Scripts

```bash
npm run new:demo -- <library> <slug> "Title" --kind isolated|showcase|scenario|flow
npm run check:demos      # files exist, headers present, everything registered
npm run typecheck
npm run lint
npm run argent -- open <library> <slug>   # simulator helpers, see below
```

After adding flow routes, run `npx expo start` once so typed routes include them, or the
typecheck rejects the new `href`.

New native dependencies need a new dev build: `npx expo install <pkg>`, then `npm run ios`.

## Verify on the simulator

Look at every demo you add or change, the way a viewer will see it. Prefer the Argent MCP tools
when they are loaded; otherwise use the wrapper:

```bash
npm run argent -- open sonner-native variants   # deep link
npm run argent -- buttons                       # what can be tapped
npm run argent -- tap "Success" --exact
npm run argent -- shot variants-success         # → .argent/shots/variants-success.png
npm run argent -- swipe-back
```

Checklist per demo:

1. Every trigger produces the expected result, and the result is fully visible.
2. Nothing overlaps awkwardly: library output vs. header, list, keyboard or home indicator.
3. Light and dark mode (Settings chip on the home screen).
4. No "Open debugger to view warnings" banner. Read the console with Argent's
   `debugger-log-registry` when one appears.
5. Leaving the demo leaves no state behind (open the next demo and check).

## Gotchas learned so far

- **Expo UI `BottomSheet` + React Native content:** wrap the content in `RNHostView` from
  `@expo/ui`, or it renders but never receives touches. Give the inner view an explicit width.
- **Keyboard: always react-native-keyboard-controller.** `KeyboardProvider` is mounted in the root
  layout. Use `<DemoStage avoidKeyboard>` (add `scroll` for long forms); it is built on the
  library's `KeyboardAvoidingView`, `KeyboardAwareScrollView` and `KeyboardStickyView`. In custom
  layouts import those components (or `useReanimatedKeyboardAnimation`) from
  `react-native-keyboard-controller`. Never use React Native's `KeyboardAvoidingView` or
  Reanimated's `useAnimatedKeyboard`: both under-measure the iOS 26 keyboard.
- **Platform-specific demos:** set `platforms: ['ios']` when a demo only makes sense on one
  platform. Say why in the header comment.
- **React Compiler is on:** mutate Reanimated shared values with `.set()` / `.get()`, never `.value =`.
- **Theme:** the app theme switch calls `Appearance.setColorScheme`, so libraries that read the
  color scheme stay in sync.
- **sonner-native (0.27):** action buttons do not close the toast; update it by id in `onClick`
  (`action: undefined` drops the button) or call `toast.dismiss(id)`. `toast.wiggle` is ignored
  for `duration: Infinity` toasts. A toast in a native sheet needs its own
  `<Toaster id="…" fullWindowOverlay={false} />` and `toasterId` on each call. The default
  `visibleToasts={3}` counts toasts at every position together.
- **Warnings from inside a library** put a LogBox banner in recordings. When a warning comes from
  the library's own code and the demos cannot avoid it, silence exactly that message with
  `LogBox.ignoreLogs([...])` at the top of the library's `index.ts`, with a comment saying why.
- **react-native-graph (1.4): every dataset an animated graph switches between must have the same
  number of points.** Skia can only interpolate paths with matching commands; with different counts
  the line jumps instead of morphing. Spread the same count over each time range.
- **react-native-graph (1.4):** give every graph an explicit height and keep it off the card edges
  (`marginHorizontal`), or the line runs into rounded corners. With `enableIndicator`, add
  `verticalPadding` (and more `horizontalPadding` in full-bleed layouts) so the pulsing dot is not
  clipped. `gradientFillColors`, scrubbing, labels and the indicator need `animated`. Scrubbing
  starts after a 300 ms hold unless `panGestureDelay={0}`. Custom `SelectionDot` components render
  inside the Skia canvas, receive shared values, and must be defined at module level. The library
  logs Skia `SkPath` deprecation warnings on Skia 2.6; they are silenced in its `index.ts`.
- **@react-native-community/datetimepicker (9.1):** use `onValueChange` / `onDismiss`
  (`onChange` is deprecated). iOS renders inline (`compact`, `inline`, `spinner`); Android opens
  a dialog, so demos that rely on inline layouts are `platforms: ['ios']` and Android demos use
  `DateTimePickerAndroid.open()`. Remount with `key` when switching `mode` or `display`. The
  compact pill is left-aligned in its frame: `style={{ alignSelf: 'center' }}`.
  `minuteInterval` and `textColor` only work with `display="spinner"`; `accentColor` does not.
- **reanimated-color-picker (5.1):** `ColorPicker` reads `value` only as a starting point and when
  it changes; remount with `key` when switching which children it renders. `setColor()` on the ref
  animates the thumbs but does not fire `onChange`, so animate anything that follows the color
  yourself (`withTiming` on the same shared value). `renderThumb`'s `positionStyle` is typed for
  View, Text and Image at once; cast it to `StyleProp<AnimatedStyle<ViewStyle>>` on an
  `Animated.View`. `Preview` shows the initial and current color side by side unless
  `hideInitialColor`. Inside a scroll view, use the gesture-handler `ScrollView` so slider drags
  do not scroll the page. Pass `inputProps={{ autoCapitalize: 'none' }}` to `InputWidget`, or iOS
  capitalizes hex values.
- **@lodev09/react-native-true-sheet (3.11):** native module, needs a dev build. Don't call
  `TrueSheet.dismissAll()` from `onDemoExit`: leaving the screen already dismisses its sheets, and
  the second dismiss logs "sheet is already dismissed". Fast navigation can still log that and
  "already presented" from the library's own navigation handling; both are silenced in its
  `index.ts`. `draggable={false}` does not hide the iOS grabber; pass `grabber={false}` too. A
  non-dismissible sheet at a tall detent covers the screen edge, so the back swipe can't reach the
  screen underneath; keep the top detent below about 0.8 (or let it be dismissed). Persistent sheets
  (`initialDetentIndex`) only present when their screen is on top: chaining deep links pushes
  screens and leaves the earlier sheet blocking the next, so swipe back between demos. A Metro
  reload while a sheet is presented leaves an orphaned native sheet; relaunch the app. With
  `scrollable`, `scrollToEnd()` is unreliable; use `scrollToOffset({ offset: 99999 })`.
- **react-native-sortables (1.10):** pure JS; haptics turn on by themselves because expo-haptics is
  installed. Items are keyed by `id`, then `key`, then the item itself; pass `keyExtractor` for
  anything else (e.g. a separator string mixed with objects). Buttons inside an item must be
  `Sortable.Touchable`, or the tap fights the long-press drag. `Sortable.Handle mode` only takes
  effect with `customHandle` on the sortable. Live per-item values (rank, scheduled state) come from
  `useItemContext()` shared values, so they update mid-drag without React renders. Drags need a
  long press: with Argent, use `gesture-custom` (Down, a Move at the same point after ~700 ms, then
  the drag), not `gesture-swipe`.
