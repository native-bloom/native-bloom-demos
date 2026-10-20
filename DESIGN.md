# Design

How demos look. Structure and file rules live in [docs/ADDING_DEMOS.md](docs/ADDING_DEMOS.md).

Every demo ends up as a short video on [Native Bloom](https://nativebloom.dev). Design for
someone watching a 10–20 second clip without sound: they should get the idea at a glance
and want the component in their app.

## Visual language

The app borrows the vibe of the Bond mobile app: calm, light, rounded, friendly.

| Element | Rule |
| ------- | ---- |
| Canvas | Light grey (`canvas`), never pure white. Black in dark mode. |
| Surfaces | White cards (`surface`), `radius.lg` (22), soft shadow, `borderCurve: 'continuous'`. |
| Actions | Pills. Black primary (`inverse`), grey tonal (`surfaceMuted`), blue accent (`accent`) only for "connect / reply" style actions. |
| Triggers | Tonal emoji pills, like Bond's Discover suggestions: `🍽️ Best food to get right now`. |
| Type | System font. `title` and `heading` bold with tight tracking. Body copy is short. |
| Color | Mostly greyscale. One accent per scene. Status colors only for status. |
| Icons | Emoji for content and triggers, SF Symbols / Material Symbols (`Icon`) for UI chrome. |

Use only `@/design-system` tokens (`palette`, `spacing`, `radius`, `typography`, `shadow`)
for scene code. No ad-hoc hex values outside library code (see "Theming library components").

## Stages

Every demo picks one stage (`kind` in the registry). They share a header with the demo title
and nothing else: no back button, no description, no code.

### Isolated — `DemoStage` + `TriggerStack` + `Trigger`

For imperative APIs: toasts, alerts, haptics, sheets opened by a call.

- 3–6 triggers, centred vertically. One may be `tone="primary"` when there is a main action.
- Each trigger label names the variant ("Rich colors", "Stays until acknowledged"), with an emoji.
- The library output (the toast, the alert) is the star. Leave the stage empty around it.

### Showcase — `DemoStage` + `Showcase` + `VariantBar`

For components that are the demo themselves: inputs, calendars, pickers, charts, avatars.

- One instance of the component on a white `Showcase` card, centred.
- A `VariantBar` underneath switches between 2–5 variants of the same component.
- Use `padding={0}` for components with their own edges (calendars, maps, media).
- Text inputs: `<DemoStage avoidKeyboard>` and `autoFocus` so the keyboard is part of the shot.
  Keyboard handling always goes through react-native-keyboard-controller (docs/ADDING_DEMOS.md).

### Scenario — `DemoStage align="top"`

The component inside a tiny product screen that shows why you would use it: undo a delete,
search with a loading state, share from a sheet.

- One screen, one job. A list of 3–5 items, a card, or a picture, plus the component.
- Build the scene from design-system pieces (`Card`, `ListRow`, `IconTile`, `Avatar`) and fixtures.
- Put library output where it does not cover the scene (bottom toasts over a list, for example).

### Flow — several routes

For navigation, shared transitions, link previews, or anything that must survive a screen change.

- 2–3 screens maximum. The first screen's header shows the demo title without a back button.
  Later screens get a back chip, because navigating is the point.
- Screens use `Screen` + `DemoStage` like any other demo.

### Full screen — `chrome: 'none'`

Any component demo can drop the header for immersive content: cameras, stories, full-bleed
media, onboarding. `DemoStage` then adds the top safe-area inset itself. Use it only when the
header would visibly get in the way.

## Layout

- Side gutter `spacing.lg` (16). Gaps between blocks `spacing.xl` (20), inside cards `spacing.md` (12).
- Keep the top 140 pt clear of important content on isolated stages: top toasts and banners land there.
- Keep the bottom 100 pt clear on scenario screens unless the demo puts something there on purpose.
- Pinned primary actions go in `DemoStage footer`, never floating mid-screen. With `avoidKeyboard`
  the footer rides on top of the keyboard.

## Copy and sample data

- The world is a Bond-like app: people (Sam Lee, Alex Smith, Samsam, Leo Lee, Ryan Lee),
  memories (cooking, cafés, festive treats), places (Plentea Matcha, Kettl) and stories.
  Use `@/demos/_shared/fixtures` for anything list-shaped.
- Pictures are sticker art, never photos or emoji scenes: original dev and skate/surf stickers on
  the app's canvas, from `stickerArt` in the fixtures (light and dark, pick by `useTheme().scheme`).
  Show them in cards with `Picture` (`@/demos/_shared/picture`), which frames them with a soft
  inner shadow so they don't melt into the canvas.
  Need a new one? Draw it with the `sticker-art` skill (`.claude/skills/sticker-art`).
- Short and human: "Sam Lee loved your story", "Storage almost full", "Memory restored".
- No lorem ipsum, "Item 1", "Test", or developer words (props, callback, payload) on screen.
- Sentence case everywhere. No trailing periods in titles or labels.

## Theming library components

Libraries come with their own looks. Make them sit naturally in the Bond world without hiding
what the library looks like out of the box.

- **Basic demos keep the library's default look.** People need to see what they get by default.
- **Styling demos may restyle freely.** Show the range: a native-feeling version, a dark version,
  a brand version, and one playful outlier.
- Map our tokens onto the library's theme API when it has one (`theme={{ primary: palette.light.accent }}`).
  When the code sits inside library-rendered content, write literal values so an agent can copy it.
- Light and dark: the library must follow the app theme. The theme switch calls
  `Appearance.setColorScheme`, so libraries that read `useColorScheme()` follow automatically.
  For libraries that take a `theme` prop, pass the scheme from `useTheme()`.

## Motion

- Let the library animate; do not add competing motion to the scene.
- Scene interactions use `ScalePressable` (spring press) and Reanimated layout animations
  (`LinearTransition`, `FadeIn`, `FadeOut`) for list changes.
- Anything that loops (progress, timers) must stop on its own within a few seconds, unless the live
  update is the subject of the demo (a live chart). Then it must stop when the demo closes.

## Recording

- Portrait iPhone, light mode unless the demo is about dark mode.
- Every demo opens by deep link: `nativebloomdemos://demo/<library>/<slug>`, flows included.
- Before recording, check there is no dev overlay ("Open debugger to view warnings" banner,
  red box). A demo with a warning is not ready.
- A good take: open, pause a beat, trigger 3–4 variants with a pause between each, end on a
  clean state.
