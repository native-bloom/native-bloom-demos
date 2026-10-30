/**
 * Enriched Markdown · Headings and lists
 *
 * Block formatting in `EnrichedMarkdownTextInput`. `toggleHeading(level)`
 * turns the cursor's paragraph into a heading (or back), and
 * `toggleUnorderedList()` / `toggleOrderedList()` turn it into a list item;
 * Return continues the list, Return on an empty item ends it.
 * `onChangeState` reports `heading.level` and the list state at the cursor, so
 * the toolbar shows where you are. With `markdownShortcuts`, typing `# `, `- `
 * or `1. ` at the start of a line converts it the way Notion or Bear do.
 * `markdownStyle.list.itemSpacing` spaces the items out.
 */
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  EnrichedMarkdownTextInput,
  type EnrichedMarkdownTextInputInstance,
  type MarkdownTextInputStyle,
  type StyleState,
} from 'react-native-enriched-markdown';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { ScalePressable, Text, radius, useColors } from '@/design-system';
import { useInputStyle } from '../styles';

const DEFAULT_VALUE = `# Weekend in Brooklyn

- Matcha at Plentea
- Ferry to Pier 1

## Sunday

1. Brunch with Sam
2. Kettl tasting at 3`;

type Block = 'h1' | 'h2' | 'bullets' | 'numbers';

const BUTTONS: { block: Block; label: string; text: string }[] = [
  { block: 'h1', label: 'Title', text: 'H1' },
  { block: 'h2', label: 'Heading', text: 'H2' },
  { block: 'bullets', label: 'Bulleted list', text: '•  List' },
  { block: 'numbers', label: 'Numbered list', text: '1.  List' },
];

function isActive(state: StyleState | null, block: Block) {
  if (!state) return false;
  if (block === 'h1') return state.heading.isActive && state.heading.level === 1;
  if (block === 'h2') return state.heading.isActive && state.heading.level === 2;
  if (block === 'bullets') return state.unorderedList.isActive;
  return state.orderedList.isActive;
}

function apply(input: EnrichedMarkdownTextInputInstance | null, block: Block) {
  if (!input) return;
  if (block === 'h1') input.toggleHeading(1);
  if (block === 'h2') input.toggleHeading(2);
  if (block === 'bullets') input.toggleUnorderedList();
  if (block === 'numbers') input.toggleOrderedList();
}

export function HeadingsListsDemo() {
  const colors = useColors();
  const ref = useRef<EnrichedMarkdownTextInputInstance>(null);
  const [state, setState] = useState<StyleState | null>(null);
  const base = useInputStyle();
  const markdownStyle: MarkdownTextInputStyle = {
    ...base,
    h1: { ...base.h1, fontSize: 26 },
    h2: { ...base.h2, fontSize: 19 },
    list: { itemSpacing: 4 },
  };

  const toolbar = (
    <View style={[styles.toolbar, { backgroundColor: colors.surface }]}>
      {BUTTONS.map(({ block, label, text }) => {
        const active = isActive(state, block);
        return (
          <ScalePressable
            key={block}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: active }}
            onPress={() => apply(ref.current, block)}
            style={[
              styles.button,
              { backgroundColor: active ? colors.inverse : colors.surfaceMuted },
            ]}>
            <Text variant="bodyStrong" color={active ? 'onInverse' : 'text'}>
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
          markdownShortcuts
          defaultValue={DEFAULT_VALUE}
          placeholder="Plan something…"
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
  input: { fontSize: 17, minHeight: 160, maxHeight: 250 },
  toolbar: {
    flexDirection: 'row',
    gap: 8,
    padding: 6,
    borderRadius: radius.pill,
    borderCurve: 'continuous',
  },
  button: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
