/**
 * Enriched Markdown · Rich text input
 *
 * `EnrichedMarkdownTextInput` is an uncontrolled rich text input that writes
 * Markdown. The toolbar calls `toggleBold()`, `toggleItalic()`,
 * `toggleUnderline()`, `toggleStrikethrough()` and `toggleSpoiler()` on the
 * ref; with a selection they style it, with only a cursor they style what is
 * typed next. `onChangeState` reports which styles are active at the cursor,
 * so the matching buttons light up. `defaultValue` is Markdown, and
 * `getMarkdown()` (or `onChangeMarkdown`) gives Markdown back.
 *
 * The toolbar sits on the keyboard through react-native-keyboard-controller
 * (`DemoStage avoidKeyboard` + `footer`).
 */
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  EnrichedMarkdownTextInput,
  type EnrichedMarkdownTextInputInstance,
  type StyleState,
} from 'react-native-enriched-markdown';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { ScalePressable, Text, radius, useColors } from '@/design-system';
import { useInputStyle } from '../styles';

const DEFAULT_VALUE =
  'Dinner at **Kettl** was *so* good. Sam ordered the ~~usual~~ hojicha latte and the ending of the film is ||they move to Kyoto||.';

type Format = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'spoiler';

const BUTTONS: { format: Format; label: string; text: string }[] = [
  { format: 'bold', label: 'Bold', text: 'B' },
  { format: 'italic', label: 'Italic', text: 'I' },
  { format: 'underline', label: 'Underline', text: 'U' },
  { format: 'strikethrough', label: 'Strikethrough', text: 'S' },
  { format: 'spoiler', label: 'Spoiler', text: '👀' },
];

function toggle(input: EnrichedMarkdownTextInputInstance | null, format: Format) {
  if (!input) return;
  if (format === 'bold') input.toggleBold();
  if (format === 'italic') input.toggleItalic();
  if (format === 'underline') input.toggleUnderline();
  if (format === 'strikethrough') input.toggleStrikethrough();
  if (format === 'spoiler') input.toggleSpoiler();
}

export function RichTextInputDemo() {
  const colors = useColors();
  const ref = useRef<EnrichedMarkdownTextInputInstance>(null);
  const [state, setState] = useState<StyleState | null>(null);
  const markdownStyle = useInputStyle();

  const toolbar = (
    <View style={[styles.toolbar, { backgroundColor: colors.surface }]}>
      {BUTTONS.map(({ format, label, text }) => {
        const active = state?.[format].isActive ?? false;
        return (
          <ScalePressable
            key={format}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: active }}
            onPress={() => toggle(ref.current, format)}
            style={[
              styles.button,
              { backgroundColor: active ? colors.inverse : colors.surfaceMuted },
            ]}>
            <Text
              variant="bodyStrong"
              color={active ? 'onInverse' : 'text'}
              style={[
                format === 'italic' && styles.italic,
                format === 'underline' && styles.underline,
                format === 'strikethrough' && styles.strike,
              ]}>
              {text}
            </Text>
          </ScalePressable>
        );
      })}
    </View>
  );

  return (
    <DemoStage avoidKeyboard footer={toolbar}>
      <Showcase>
        <EnrichedMarkdownTextInput
          ref={ref}
          autoFocus
          defaultValue={DEFAULT_VALUE}
          placeholder="Write a memory…"
          placeholderTextColor={colors.textTertiary}
          markdownStyle={markdownStyle}
          onChangeState={setState}
          style={{ ...styles.input, color: colors.text }}
        />
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  input: { fontSize: 18, lineHeight: 26, minHeight: 140, maxHeight: 220 },
  toolbar: {
    flexDirection: 'row',
    gap: 8,
    padding: 6,
    borderRadius: radius.pill,
    borderCurve: 'continuous',
  },
  button: {
    width: 48,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  italic: { fontStyle: 'italic' },
  underline: { textDecorationLine: 'underline' },
  strike: { textDecorationLine: 'line-through' },
});
