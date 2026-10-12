---
name: add-library-demos
description: Create a full set of Native Bloom demos for a React Native library in this app. Use when the user gives a library's GitHub and/or docs links and asks for demos, when adding a new library to src/demos, or when redoing a library's demos. Covers research, demo planning, install, writing, and verifying on the iOS simulator with Argent.
---

# Add library demos

Turn a library's GitHub and docs links into 8–14 recordable demos. Read
[DESIGN.md](../../../DESIGN.md) (how demos look) and
[docs/ADDING_DEMOS.md](../../../docs/ADDING_DEMOS.md) (structure and file rules) first; this
skill is the order of work, not a replacement for them.

## 1. Research the library

Do not trust memory: APIs change between versions.

1. Clone the repo into the scratchpad (never into this app):
   `git clone --depth 1 <github-url> <scratchpad>/<lib>`.
2. Read, in this order: README, the docs site pages (WebFetch), `src/types.ts` or the public
   type definitions, the example app's screens, CHANGELOG for the current version.
3. Write down for yourself:
   - every public API (functions, components, props) and what it looks like on screen;
   - peer dependencies and required providers or setup;
   - native code? (an `ios/` folder, a config plugin, or `expo-modules`) → needs a new dev build;
   - which features are visually impressive and which only matter in code.
4. Check what the user already has: if they name demos (titles, screenshots from the website),
   those are required and come first.

## 2. Plan the demos and get approval

Draft a table before writing code:

| Level | Slug | Title | Kind | The single idea |
| ----- | ---- | ----- | ---- | --------------- |

- 3 basic, 3–5 intermediate, 3–6 advanced. At least 2 `scenario` (or `flow`) demos that show
  why someone would use the library in a product.
- Pick the kind per DESIGN.md › Stages: imperative API → `isolated`; component on screen →
  `showcase`; real use → `scenario`; spans screens → `flow`.
- Cut anything that does not read on video. Merge tiny options into a variants demo.
- Titles follow the website pattern: "<Library noun> variants", "<Noun> with promise",
  "Custom <thing>". Short, concrete.

Show the table to the user and wait for approval unless they said to go ahead without asking.

## 3. Install

```bash
npx expo install <library> <peer deps…>
```

- If the library or a peer has native code, rebuild and reinstall the dev build:
  `npm run ios` (keep it running in the background; it takes minutes).
- Root-level requirements (gesture root, safe area, `KeyboardProvider`) already exist in
  `src/app/_layout.tsx`. Any keyboard handling uses react-native-keyboard-controller.

## 4. Scaffold and register

```bash
npm run new:demo -- <library> <first-slug> "<Title>" --kind <kind>
```

The first run creates `src/demos/<library>/index.ts`. Fill in the library entry completely
(`install`, `setup`, `links`, `category`, `onDemoExit` if the library keeps global state) and
add it to `src/demos/registry.ts`. Scaffold the remaining demos the same way and paste the
printed registry entries.

## 5. Write the demos

For each demo:

- Header comment first: `Library · Title`, the idea in one paragraph, extra packages, caveats.
- Library setup inside the demo file whenever possible (providers, hosts, `<Toaster />`), so an
  agent can copy one file. Use the library `Provider` only for wrappers every demo needs.
- Library-rendered content in plain React Native with literal styles. Scene and triggers from
  `@/design-system`, `@/demos/_shared/stage`, `@/demos/_shared/fixtures`.
- Realistic copy from the Bond world (DESIGN.md › Copy and sample data).
- Basic demos keep the library's default look; styling demos restyle.
- If a demo only works on one platform (inline native views, iOS-only props), set
  `platforms` in its registry entry instead of shipping a broken screen on the other.

Then run:

```bash
npm run check:demos && npm run typecheck && npm run lint
```

For flows, start Metro once (`npx expo start`) before the typecheck so typed routes include the
new routes.

## 6. Verify every demo on the simulator

Start Metro from this repo (`npx expo start`), then for each demo, with Argent MCP tools if
loaded, otherwise with `npm run argent -- …`:

1. `open <library> <slug>` → screenshot the idle stage. It should look calm and centred.
2. Tap every trigger (`buttons` lists them; `tap "<label>" --exact`) and screenshot the result.
3. Fix what you see: clipped text, output covering the scene, wrong colors, stray default icons,
   actions that do nothing. For animations, record with `screen-recording-start/stop` and
   inspect frames with ffmpeg.
4. Switch to dark mode (Settings) and re-check at least the styling and scenario demos.
5. Read the console (Argent `debugger-connect`, `debugger-log-registry`). No warnings allowed.
6. Open the next demo and confirm nothing leaked (toasts, sheets, timers).

When a library behaves differently from its docs, write the workaround into the demo's
header comment and add a line to the "Gotchas" section of docs/ADDING_DEMOS.md.

## 7. Finish

- Stop Metro. Make sure Argent output stayed in this repo's `.argent/` (gitignored).
- Report to the user: the demo list, what you fixed during verification, any library caveats,
  and anything you could not verify.
