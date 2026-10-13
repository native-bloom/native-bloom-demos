/**
 * True Sheet · Comments sheet
 *
 * A YouTube-style comments sheet. `scrollable` fits the `FlatList` to the
 * sheet, and `scrollableOptions.scrollingExpandsSheet: false` means scrolling
 * the comments never grows the sheet; only dragging the grabber does. The
 * reply bar is the `footer`: it rides on the keyboard, with
 * `keyboardOffset: -insets.bottom` hiding its safe-area padding.
 *
 * `topScrollEdgeEffect` / `bottomScrollEdgeEffect` (iOS 26+) blur the list
 * where it scrolls under the header and the reply bar.
 *
 * With `scrollable`, `scrollToEnd()` can stop short because the native frame
 * changes; `scrollToOffset` with a large offset is the documented workaround.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { people, photos } from '@/demos/_shared/fixtures';
import { DemoStage } from '@/demos/_shared/stage';
import { Avatar, Button, Card, Text, radius, spacing, useColors } from '@/design-system';

type Comment = { id: string; name: string; text: string; ago: string };

const SAMPLE = [
  'This place is so good',
  'Saving this for Saturday',
  'The hojicha latte is my favourite',
  'Take me next time',
  'Best matcha in New York, no question',
  'That foam art though',
  'We were there yesterday!',
  'Adding it to our café list',
];

const INITIAL: Comment[] = SAMPLE.map((text, i) => ({
  id: String(i),
  name: people[i % people.length]!.name,
  text,
  ago: `${(i + 1) * 7} min`,
}));

export function CommentsDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const sheet = useRef<TrueSheet>(null);
  const list = useRef<FlatList<Comment>>(null);
  const [comments, setComments] = useState(INITIAL);
  const [draft, setDraft] = useState('');

  function send() {
    const text = draft.trim();
    if (!text) return;
    setComments((c) => [...c, { id: String(Date.now()), name: 'You', text, ago: 'now' }]);
    setDraft('');
    // `scrollToEnd()` is unreliable inside a scrollable sheet.
    requestAnimationFrame(() => list.current?.scrollToOffset({ offset: 99999, animated: true }));
  }

  const header = (
    <View style={styles.header}>
      <Text variant="heading">Comments</Text>
      <Text variant="label" color="textSecondary">
        {comments.length}
      </Text>
    </View>
  );

  const footer = (
    <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.sm }]}>
      <TextInput
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={send}
        placeholder="Add a comment"
        placeholderTextColor={colors.textTertiary}
        returnKeyType="send"
        style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceMuted }]}
      />
      <Pressable onPress={send} hitSlop={8} style={[styles.send, { backgroundColor: colors.inverse }]}>
        <Text style={{ color: colors.onInverse, fontSize: 18 }}>↑</Text>
      </Pressable>
    </View>
  );

  return (
    <DemoStage align="top">
      <Card padding={0} style={styles.post}>
        <Image source={photos.coffee} style={styles.photo} contentFit="cover" />
        <View style={styles.postBody}>
          <Text variant="heading">Best matcha place in New York</Text>
          <Text variant="caption" color="textSecondary">
            Sam Lee · Plentea Matcha · 3 days ago
          </Text>
          <Button
            label={`${comments.length} comments`}
            emoji="💬"
            variant="soft"
            size="sm"
            style={styles.commentsButton}
            onPress={() => sheet.current?.present()}
          />
        </View>
      </Card>

      <TrueSheet
        ref={sheet}
        detents={[0.6, 1]}
        scrollable
        scrollableOptions={{
          scrollingExpandsSheet: false,
          keyboardScrollOffset: 16,
          // iOS 26+: soft blur where the list scrolls under the header and reply bar.
          topScrollEdgeEffect: 'soft',
          bottomScrollEdgeEffect: 'soft',
        }}
        header={header}
        footer={footer}
        footerOptions={{ keyboardOffset: -insets.bottom }}>
        <FlatList
          ref={list}
          data={comments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Avatar name={item.name} size={36} />
              <View style={styles.flex}>
                <Text variant="label">
                  {item.name}{' '}
                  <Text variant="caption" color="textTertiary">
                    {item.ago}
                  </Text>
                </Text>
                <Text>{item.text}</Text>
              </View>
            </View>
          )}
        />
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  post: { overflow: 'hidden' },
  photo: { width: '100%', height: 260 },
  postBody: { padding: spacing.lg, gap: spacing.xs },
  commentsButton: { alignSelf: 'flex-start', marginTop: spacing.sm },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.md,
  },
  // Leaves room for the floating reply bar.
  list: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: 96, gap: spacing.lg },
  comment: { flexDirection: 'row', gap: spacing.md },
  flex: { flex: 1, gap: 2 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  input: { flex: 1, height: 44, borderRadius: radius.pill, paddingHorizontal: spacing.lg, fontSize: 16 },
  send: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
