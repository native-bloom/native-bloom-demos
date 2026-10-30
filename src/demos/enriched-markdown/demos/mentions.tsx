/**
 * Enriched Markdown · Mentions composer
 *
 * A group chat composer built on `EnrichedMarkdownTextInput`. With
 * `mentionIndicators={['@']}`, typing `@` (or calling `startMention('@')`)
 * fires `onStartMention`; `onChangeMention` reports the query on every
 * keystroke and `onEndMention` fires when the mention is done or abandoned.
 * The app shows matching friends and calls `insertMention(name, url)`, which
 * turns the token into a link: the Markdown is `[@Sam Lee](user:sam)`.
 *
 * Send reads the message with `getMarkdown()`, clears the input with
 * `setValue('')`, and the thread renders it with `EnrichedMarkdownText`.
 * The same `linkVariants` pattern (`^user:`) tints mentions in the input and
 * in the sent messages.
 */
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
import {
  EnrichedMarkdownText,
  EnrichedMarkdownTextInput,
  type EnrichedMarkdownTextInputInstance,
  type MarkdownStyle,
  type MarkdownTextInputStyle,
} from 'react-native-enriched-markdown';

import { people } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Avatar, Icon, ScalePressable, Text, radius, spacing, useColors } from '@/design-system';
import { darkInputStyle, darkMarkdownStyle } from '../styles';

const mentionVariants = {
  '^user:': { color: '#1264A3', backgroundColor: '#E8F5FB', underline: false },
};

const darkMentionVariants = {
  '^user:': { color: '#7CC4F2', backgroundColor: '#14324A', underline: false },
};

const lightText: MarkdownStyle = {
  paragraph: { fontSize: 16, lineHeight: 22 },
  linkVariants: mentionVariants,
};
const darkText: MarkdownStyle = {
  ...darkMarkdownStyle,
  paragraph: { ...darkMarkdownStyle.paragraph, fontSize: 16, lineHeight: 22 },
  linkVariants: darkMentionVariants,
};
const lightInput: MarkdownTextInputStyle = { linkVariants: mentionVariants };
const darkInput: MarkdownTextInputStyle = { ...darkInputStyle, linkVariants: darkMentionVariants };

type Message = { id: string; author: string; markdown: string };

const INITIAL: Message[] = [
  { id: '1', author: 'Sam Lee', markdown: 'Who’s up for the **Kettl** tasting on Sunday? 🍵' },
  {
    id: '2',
    author: 'Alex Smith',
    markdown: 'Me! [@Leo Lee](user:leo) said he might bring the jam cookies',
  },
];

export function MentionsDemo() {
  const colors = useColors();
  const dark = useColorScheme() === 'dark';
  const ref = useRef<EnrichedMarkdownTextInputInstance>(null);
  const [messages, setMessages] = useState(INITIAL);
  const [query, setQuery] = useState<string | null>(null);
  const [empty, setEmpty] = useState(true);

  const matches =
    query === null
      ? []
      : people.filter((p) =>
          p.name
            .toLowerCase()
            .split(' ')
            .some((word) => word.startsWith(query.toLowerCase())),
        );

  async function send() {
    const markdown = (await ref.current?.getMarkdown())?.trim();
    if (!markdown) return;
    setMessages((list) => [...list, { id: String(Date.now()), author: 'You', markdown }]);
    ref.current?.setValue('');
    // setValue does not end an open mention flow, so close the picker here.
    setQuery(null);
  }

  const composer = (
    <View style={styles.composerWrap}>
      {matches.length > 0 ? (
        <Animated.View entering={FadeInDown.duration(180)} exiting={FadeOut.duration(120)}>
          <ScrollView
            horizontal
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestions}>
            {matches.map((person) => (
              <ScalePressable
                key={person.id}
                accessibilityRole="button"
                accessibilityLabel={`Mention ${person.name}`}
                onPress={() => ref.current?.insertMention(`@${person.name}`, `user:${person.id}`)}
                style={[styles.suggestion, { backgroundColor: colors.surface }]}>
                <Avatar name={person.name} size={28} />
                <Text variant="label">{person.name}</Text>
              </ScalePressable>
            ))}
          </ScrollView>
        </Animated.View>
      ) : null}

      <View style={[styles.composer, { backgroundColor: colors.surface }]}>
        <ScalePressable
          accessibilityRole="button"
          accessibilityLabel="Mention someone"
          onPress={() => ref.current?.startMention('@')}
          style={[styles.round, { backgroundColor: colors.surfaceMuted }]}>
          <Text variant="heading">@</Text>
        </ScalePressable>
        <EnrichedMarkdownTextInput
          ref={ref}
          autoFocus
          placeholder="Message the group"
          placeholderTextColor={colors.textTertiary}
          mentionIndicators={['@']}
          onStartMention={() => setQuery('')}
          onChangeMention={({ text }) => setQuery(text)}
          onEndMention={() => setQuery(null)}
          onChangeText={(text) => setEmpty(text.trim().length === 0)}
          markdownStyle={dark ? darkInput : lightInput}
          style={{ ...styles.input, color: colors.text }}
        />
        <ScalePressable
          accessibilityRole="button"
          accessibilityLabel="Send"
          disabled={empty}
          onPress={send}
          style={[styles.round, { backgroundColor: empty ? colors.surfaceMuted : colors.accent }]}>
          <Icon
            name="forward"
            size={18}
            {...(empty ? { color: 'textTertiary' } : { tint: '#FFFFFF' })}
          />
        </ScalePressable>
      </View>
    </View>
  );

  return (
    <DemoStage align="top" avoidKeyboard footer={composer}>
      <View style={styles.thread}>
        {messages.map((message) => {
          const mine = message.author === 'You';
          return (
            <Animated.View
              key={message.id}
              entering={FadeIn}
              layout={LinearTransition}
              style={[styles.message, mine && styles.mine]}>
              {mine ? null : <Avatar name={message.author} size={32} />}
              <View
                style={[
                  styles.bubble,
                  { backgroundColor: mine ? colors.accentSoft : colors.surface },
                ]}>
                {mine ? null : (
                  <Text variant="caption" color="textSecondary">
                    {message.author}
                  </Text>
                )}
                <EnrichedMarkdownText
                  markdown={message.markdown}
                  markdownStyle={dark ? darkText : lightText}
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
            </Animated.View>
          );
        })}
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  thread: { gap: spacing.md },
  message: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, maxWidth: '86%' },
  mine: { alignSelf: 'flex-end' },
  bubble: {
    flexShrink: 1,
    gap: 2,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
  },
  composerWrap: { alignSelf: 'stretch', gap: spacing.sm },
  suggestions: { gap: spacing.sm },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
    paddingLeft: 6,
    paddingRight: 14,
    borderRadius: radius.pill,
    borderCurve: 'continuous',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 6,
    borderRadius: 26,
    borderCurve: 'continuous',
  },
  input: { flex: 1, fontSize: 16, minHeight: 40, maxHeight: 120, paddingVertical: 9 },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
