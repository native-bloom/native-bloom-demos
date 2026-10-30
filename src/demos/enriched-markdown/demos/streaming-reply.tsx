/**
 * Enriched Markdown · Streaming AI reply
 *
 * An assistant answer arrives token by token, the way an LLM response
 * streams, and is passed straight to `EnrichedMarkdownText` on every token.
 * `streamingAnimation` fades in only the newly appended tail instead of
 * re-rendering the whole message, and `streamingConfig.tableMode` decides how
 * a half-received table shows: `'progressive'` adds rows as they complete.
 *
 * The stream here is simulated with a timer over a fixed answer. With a real
 * model, append each chunk to the string you pass as `markdown`. For streams
 * that cut Markdown mid-token (an unclosed `**`), Software Mansion's
 * react-native-streamdown wraps this component and repairs the partial
 * Markdown off the JS thread.
 */
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, ScalePressable, Text, radius, spacing, useColors } from '@/design-system';
import { useMarkdownStyle } from '../styles';

const PROMPTS = [
  {
    id: 'sunday',
    emoji: '🌿',
    label: 'Plan my Sunday',
    question: 'Plan a slow Sunday in Greenpoint for Sam and me',
    answer: `Here's a relaxed plan for **you and Sam**:

1. **Brunch** at Neighbors Café, ask for the window seats
2. **Walk** the waterfront to Transmitter Park
3. **Tasting** at Kettl, book the 3 pm slot

| Stop | Time | Walk |
| :--- | :---: | ---: |
| Neighbors Café | 11:00 | – |
| Transmitter Park | 13:00 | 9 min |
| Kettl | 15:00 | 6 min |

> Tip: Kettl sells out of *gyokuro* early on weekends.`,
  },
  {
    id: 'matcha',
    emoji: '🍵',
    label: 'Matcha grades',
    question: 'What is the difference between matcha grades?',
    answer: `### Ceremonial vs culinary

**Ceremonial** matcha is made from the youngest leaves. It's *sweet*, bright green and meant to be whisked with water.

**Culinary** matcha uses later harvests. It's more bitter, which is exactly what you want in:

- Lattes and smoothies
- Cookies and cakes
- Ice cream

> For the jam cookies, culinary grade is perfect and much cheaper.`,
  },
];

type Prompt = (typeof PROMPTS)[number];

const TOKEN_MS = 40;

/** Words with their trailing whitespace, so newlines stream too. */
function tokenize(text: string) {
  return text.match(/\S+\s*|\s+/g) ?? [];
}

export function StreamingReplyDemo() {
  const colors = useColors();
  const markdownStyle = useMarkdownStyle();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [reply, setReply] = useState('');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function stop() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }

  useEffect(() => stop, []);

  function ask(next: Prompt) {
    stop();
    setPrompt(next);
    setReply('');
    const tokens = tokenize(next.answer);
    let index = 0;
    timer.current = setInterval(() => {
      index += 1;
      setReply(tokens.slice(0, index).join(''));
      if (index >= tokens.length) stop();
    }, TOKEN_MS);
  }

  const suggestions = (
    <View style={styles.suggestions}>
      {PROMPTS.map((p) => (
        <ScalePressable
          key={p.id}
          accessibilityRole="button"
          accessibilityLabel={p.label}
          onPress={() => ask(p)}
          style={[styles.suggestion, { backgroundColor: colors.surfaceMuted }]}>
          <Text style={styles.emoji}>{p.emoji}</Text>
          <Text variant="label">{p.label}</Text>
        </ScalePressable>
      ))}
    </View>
  );

  return (
    <DemoStage align="top" footer={suggestions}>
      <View style={styles.thread}>
        {prompt ? (
          <Animated.View
            key={prompt.id}
            entering={FadeIn}
            style={[styles.question, { backgroundColor: colors.inverse }]}>
            <Text color="onInverse">{prompt.question}</Text>
          </Animated.View>
        ) : null}

        <View style={styles.answerRow}>
          <IconTile emoji="✨" color={colors.accentSoft} size={32} />
          <Card style={styles.answer}>
            {prompt ? (
              <EnrichedMarkdownText
                key={prompt.id}
                flavor="github"
                markdown={reply || ' '}
                markdownStyle={markdownStyle}
                streamingAnimation
                streamingConfig={{ tableMode: 'progressive' }}
              />
            ) : (
              <Text>Hi! Ask me anything about your places and plans.</Text>
            )}
          </Card>
        </View>
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  thread: { gap: spacing.lg },
  question: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.lg,
    borderBottomRightRadius: 6,
    borderCurve: 'continuous',
  },
  answerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  answer: { flex: 1, padding: spacing.lg, borderTopLeftRadius: 6 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    borderCurve: 'continuous',
  },
  emoji: { fontSize: 16, lineHeight: 20 },
});
