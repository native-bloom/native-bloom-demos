/**
 * True Sheet · Sheet with keyboard
 *
 * Keyboard avoidance is built in: when an input inside the sheet is focused,
 * the sheet rises above the keyboard, and the `footer` rides on top of it.
 * `footerOptions.keyboardOffset: -insets.bottom` tucks the footer's safe-area
 * padding behind the keyboard so there is no gap.
 *
 * Don't use `autoFocus` inside a sheet: the keyboard can open before the sheet
 * finishes presenting. Focus the input in `onDidPresent` instead.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Button, Chip, Text, radius, spacing, useColors } from '@/design-system';

const CATEGORIES = ['🍪 Cooking', '☕️ Cafes', '🎁 Gifts'];

export function KeyboardDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const sheet = useRef<TrueSheet>(null);
  const input = useRef<TextInput>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const footer = (
    <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.sm }]}>
      <Button
        label="Save memory"
        fullWidth
        disabled={!title.trim()}
        onPress={async () => {
          await sheet.current?.dismiss();
          setTitle('');
        }}
      />
    </View>
  );

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger tone="primary" emoji="✍️" label="New memory" onPress={() => sheet.current?.present()} />
      </TriggerStack>

      <TrueSheet
        ref={sheet}
        detents={['auto']}
        footer={footer}
        footerOptions={{ keyboardOffset: -insets.bottom }}
        onDidPresent={() => input.current?.focus()}>
        <View style={styles.content}>
          <Text variant="title">New memory</Text>
          <TextInput
            ref={input}
            value={title}
            onChangeText={setTitle}
            placeholder="What happened today?"
            placeholderTextColor={colors.textTertiary}
            style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceMuted }]}
          />
          <View style={styles.chips}>
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} size="sm" selected={category === c} onPress={() => setCategory(c)} />
            ))}
          </View>
        </View>
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  // Leaves room for the floating footer below the chips.
  content: { padding: spacing['2xl'], paddingTop: spacing['3xl'], paddingBottom: 72, gap: spacing.lg },
  input: {
    height: 52,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.lg,
    fontSize: 17,
  },
  chips: { flexDirection: 'row', gap: spacing.sm },
  footer: { paddingHorizontal: spacing['2xl'], paddingTop: spacing.sm },
});
