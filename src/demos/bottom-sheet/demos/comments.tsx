/**
 * Bottom Sheet · Comment sheet
 *
 * Comments on a memory: a `BottomSheetFlatList` with a reply box in the
 * `footerComponent`. The input is a `BottomSheetTextInput`, which tells the
 * sheet when it is focused; `keyboardBehavior="interactive"` then pushes the
 * sheet up by the keyboard height so the reply box sits on the keyboard, and
 * `keyboardBlurBehavior="restore"` puts it back when the keyboard closes.
 * `android_keyboardInputMode="adjustResize"` does the same on Android, and
 * `topInset` stops the raised sheet below the status bar.
 *
 * The sheet moves itself (from React Native keyboard events). The footer keeps
 * home-indicator padding only while the keyboard is closed: react-native-
 * keyboard-controller's `useReanimatedKeyboardAnimation().progress` fades that
 * padding out as the keyboard opens, so the reply box sits flush on it.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetTextInput,
  type BottomSheetBackdropProps,
  type BottomSheetFlatListMethods,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { people, stickerArt } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage } from '@/demos/_shared/stage';
import {
  Avatar,
  Button,
  Card,
  Icon,
  Text,
  radius,
  spacing,
  typography,
  useColors,
} from '@/design-system';

type Comment = { id: string; name: string; text: string; ago: string };

const SAMPLE = [
  'That skate deck is so good',
  'Trade you a duck for the checkerboard',
  'Saving a spot on my lid for these',
  'Bring the 404 one on Friday please',
  'Where did you find the ⌘K key?',
  'Leo already stuck SHIP IT on his laptop',
  'Need that coffee mug sticker',
  'Best sticker swap so far',
];

const INITIAL: Comment[] = SAMPLE.map((text, i) => ({
  id: String(i),
  name: people[i % people.length]!.name,
  text,
  ago: `${(i + 1) * 6} min`,
}));

const FOOTER_HEIGHT = 44 + spacing.md * 2;

function Backdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />;
}

export function CommentsDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const sheet = useRef<BottomSheetModal>(null);
  const list = useRef<BottomSheetFlatListMethods>(null);
  const [comments, setComments] = useState(INITIAL);
  const [draft, setDraft] = useState('');
  const keyboard = useReanimatedKeyboardAnimation();
  const footerPadding = useAnimatedStyle(() => ({
    paddingBottom: spacing.md + insets.bottom * (1 - keyboard.progress.get()),
  }));

  function send() {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [...prev, { id: String(Date.now()), name: 'You', text, ago: 'now' }]);
    setDraft('');
    setTimeout(() => list.current?.scrollToEnd({ animated: true }), 50);
  }

  const renderFooter = (props: BottomSheetFooterProps) => (
    <BottomSheetFooter {...props}>
      <Animated.View
        style={[
          styles.footer,
          { backgroundColor: colors.surface, borderTopColor: colors.border },
          footerPadding,
        ]}>
        <BottomSheetTextInput
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={send}
          placeholder="Add a comment"
          placeholderTextColor={colors.textTertiary}
          returnKeyType="send"
          style={[styles.input, { backgroundColor: colors.surfaceMuted, color: colors.text }]}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send"
          onPress={send}
          style={[
            styles.send,
            { backgroundColor: draft.trim() ? colors.accent : colors.surfaceMuted },
          ]}>
          <Icon name="forward" size={16} tint={draft.trim() ? '#FFFFFF' : colors.textTertiary} />
        </Pressable>
      </Animated.View>
    </BottomSheetFooter>
  );

  return (
    <DemoStage align="top">
      <Card padding={0} style={styles.post}>
        <Picture art={stickerArt.cardSkate} style={styles.photo} />
        <View style={styles.postBody}>
          <View style={styles.author}>
            <Avatar name="Sam Lee" size={36} />
            <View style={styles.flex}>
              <Text variant="bodyStrong">Sam Lee</Text>
              <Text variant="caption" color="textSecondary">
                Sticker swap at Plentea · 2 days ago
              </Text>
            </View>
          </View>
          <Button
            label={`${comments.length} comments`}
            emoji="💬"
            variant="soft"
            fullWidth
            onPress={() => sheet.current?.present()}
          />
        </View>
      </Card>

      <BottomSheetModal
        accessible={false}
        ref={sheet}
        snapPoints={['60%', '92%']}
        enableDynamicSizing={false}
        topInset={insets.top}
        backdropComponent={Backdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        footerComponent={renderFooter}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textTertiary }}>
        <BottomSheetFlatList
          ref={list}
          data={comments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.list, { paddingBottom: FOOTER_HEIGHT + insets.bottom }]}
          ListHeaderComponent={<Text variant="heading">Comments</Text>}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Avatar name={item.name} size={32} />
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
      </BottomSheetModal>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  post: { overflow: 'hidden' },
  photo: { height: 260, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  postBody: { padding: spacing.lg, gap: spacing.lg },
  author: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  list: { paddingHorizontal: spacing.xl, gap: spacing.lg },
  comment: { flexDirection: 'row', gap: spacing.md },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    fontSize: typography.body.fontSize,
  },
  send: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
