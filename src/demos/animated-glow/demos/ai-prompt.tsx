/**
 * Animated Glow · AI prompt field
 *
 * An assistant input with a multicolor light along its inner edge (an `inside` glow plus a
 * thin gradient border). While the answer is on its way, the field switches to a second
 * preset that is brighter, wider and faster. Both presets have the same layers and a
 * `transition` on their default state, so the field blends between them instead of
 * jumping.
 *
 * An `inside` glow adds light on top of the preset's `backgroundColor`, so on a white field
 * it would disappear. The preset leaves `backgroundColor` unset (transparent) and the
 * field's color comes from `style` on `AnimatedGlow`, under the glow canvas; that works in
 * light and dark mode. Keep `inside` colors saturated: white and pastels render as a dark
 * band on iOS (v3.2 with Skia 2.6).
 *
 * The answer is canned and arrives after a short delay; in an app it would stream from
 * your model.
 */
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { discoverPrompts } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, Icon, Text, useTheme } from '@/design-system';

const AI_COLORS = ['#A855F7', '#EC4899', '#6366F1', '#F43F5E', '#F59E0B', '#8B5CF6'];

function promptGlow(thinking: boolean): PresetConfig {
  return {
    states: [
      {
        name: 'default',
        transition: 600,
        preset: {
          cornerRadius: 26,
          outlineWidth: thinking ? 2.5 : 1.5,
          borderColor: [...AI_COLORS, AI_COLORS[0]],
          animationSpeed: thinking ? 2.6 : 0.8,
          glowLayers: [
            {
              glowPlacement: 'inside',
              colors: AI_COLORS,
              glowSize: thinking ? 20 : 9,
              opacity: thinking ? 0.6 : 0.35,
            },
          ],
        },
      },
    ],
  };
}

const ANSWERS: Record<string, string> = {
  'Best food to get right now':
    'The jam cookies at Neighbors Café just came out of the oven. Sam Lee rated them 5 stars last week.',
  'Perfect place for Friday':
    'Kettl Greenpoint has a quiet tea tasting at 7:30 PM. Alex Smith and Leo Lee are already going.',
  'TV show that I will love':
    'You loved cozy cooking shows this month. Try a baking competition: short episodes, lots of festive treats.',
};

export function AiPromptDemo() {
  const { scheme, colors } = useTheme();
  const dark = scheme === 'dark';
  const [text, setText] = useState('');
  const [thinking, setThinking] = useState(false);
  const [answer, setAnswer] = useState<{ question: string; reply: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function ask(question: string) {
    if (!question.trim() || thinking) return;
    setText(question);
    setAnswer(null);
    setThinking(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setThinking(false);
      setText('');
      setAnswer({
        question,
        reply:
          ANSWERS[question] ??
          'Plentea Matcha is two blocks away and Samsam saved it to your memories yesterday.',
      });
    }, 2600);
  }

  return (
    <DemoStage
      align="top"
      avoidKeyboard
      footer={
        <View style={styles.footer}>
          <AnimatedGlow
            preset={promptGlow(thinking)}
            style={[styles.fieldShell, { backgroundColor: dark ? '#151517' : '#FFFFFF' }]}>
            <View style={styles.field}>
              <Icon name="sparkles" size={20} tint="#A855F7" />
              <TextInput
                value={text}
                onChangeText={setText}
                onSubmitEditing={() => ask(text)}
                editable={!thinking}
                placeholder={thinking ? 'Thinking…' : 'Ask Bond anything'}
                placeholderTextColor={dark ? '#6A6A72' : '#A3A3AA'}
                returnKeyType="send"
                style={[styles.input, { color: dark ? '#FFFFFF' : '#0B0B0D' }]}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Send"
                onPress={() => ask(text)}
                style={[styles.send, { backgroundColor: colors.inverse }]}>
                <Icon name="forward" size={14} tint={colors.onInverse} weight="bold" />
              </Pressable>
            </View>
          </AnimatedGlow>
        </View>
      }>
      {answer ? (
        <Animated.View entering={FadeIn.duration(400)} exiting={FadeOut} style={styles.thread}>
          <View style={[styles.bubble, { backgroundColor: colors.inverse }]}>
            <Text variant="bodyStrong" color="onInverse">
              {answer.question}
            </Text>
          </View>
          <Card>
            <View style={styles.replyHeader}>
              <Icon name="sparkles" size={16} tint="#A855F7" />
              <Text variant="label" color="textSecondary">
                Bond
              </Text>
            </View>
            <Text>{answer.reply}</Text>
          </Card>
        </Animated.View>
      ) : (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition}
          style={styles.suggestions}>
          <Text variant="title" align="center">
            What are you in the mood for?
          </Text>
          {discoverPrompts.map((p) => (
            <Trigger key={p.label} emoji={p.emoji} label={p.label} onPress={() => ask(p.label)} />
          ))}
        </Animated.View>
      )}
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  footer: { alignSelf: 'stretch', paddingTop: 8, paddingBottom: 4 },
  fieldShell: { borderRadius: 26, borderCurve: 'continuous' },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 18,
    paddingRight: 8,
    height: 56,
  },
  input: { flex: 1, fontSize: 16, height: 56 },
  send: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  suggestions: { alignItems: 'center', gap: 12, marginTop: 96 },
  thread: { gap: 12, marginTop: 24 },
  bubble: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  replyHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
});
