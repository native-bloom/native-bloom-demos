# Native Bloom Demos

One Expo app that hosts hand-made demos of React Native UI libraries for
[Native Bloom](https://nativebloom.dev). Each demo shows a single idea, is recorded
as a video for the website, and lives in one self-contained file that coding agents
can copy when a user installs the block.

## Run

```bash
npm install
npx expo start      # with the dev build installed
npm run ios         # build and install the iOS dev build
npm run android
```

## Libraries

### Sonner Native · 14 demos

| Level | Demos |
| ----- | ----- |
| Basic | Basic toast · Toast variants · Toast content variants |
| Intermediate | Toast with promise · Toast behavior variants · Toast stacking · Toast wiggle |
| Advanced | Toast custom styling · Custom JSX toasts · Toast custom animations · Glass toasts · Toasts inside a sheet · Toast after navigation · Undo delete |

### DateTimePicker · 10 demos

| Level | Demos |
| ----- | ----- |
| Basic | Date picker · Picker modes · Display styles |
| Intermediate | Date limits · Minute intervals · Time zones |
| Advanced | Custom colors · Event form · Birthday picker · Picker in a sheet |

### React Native Graph · 11 demos

| Level | Demos |
| ----- | ----- |
| Basic | Line graph · Animated transitions · Gradient fill |
| Intermediate | Scrub to read values · Axis labels · Fixed range · Live heart rate |
| Advanced | Line styles · Custom selection dot · Watchlist sparklines · Price chart |

## Adding a library or demo

- [DESIGN.md](DESIGN.md): how demos look.
- [docs/ADDING_DEMOS.md](docs/ADDING_DEMOS.md): how demos are structured.
- `.claude/skills/add-library-demos`: the workflow for agents, from GitHub link to verified demos.

```bash
npm run new:demo -- <library> <slug> "Title" --kind isolated|showcase|scenario|flow
npm run check:demos
```

## Stack

Expo SDK 57 · Expo Router · Expo UI · Reanimated 4 · react-native-keyboard-controller · TypeScript
