/**
 * Bottom Sheet · Detached sheet
 *
 * `detached` lifts the sheet off the bottom edge: `bottomInset` sets the gap
 * (here the home indicator plus a margin), `style` adds side margins, and
 * `backgroundStyle` rounds all four corners. It still drags, snaps and
 * dismisses like any other sheet, so it suits short confirmations and pickers.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { people } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Avatar, Button, Text, spacing, useColors } from '@/design-system';

const FACES = ['😖', '🙁', '😐', '🙂', '😍'];

function Backdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />;
}

export function DetachedDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const invite = useRef<BottomSheetModal>(null);
  const rate = useRef<BottomSheetModal>(null);
  const [rating, setRating] = useState(3);

  const sheetProps = {
    detached: true,
    bottomInset: insets.bottom + 12,
    style: styles.sheet,
    backdropComponent: Backdrop,
    backgroundStyle: [styles.background, { backgroundColor: colors.surface }],
    handleIndicatorStyle: { backgroundColor: colors.textTertiary },
  };

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          tone="primary"
          emoji="💌"
          label="Invite friends"
          onPress={() => invite.current?.present()}
        />
        <Trigger emoji="⭐️" label="Rate your visit" onPress={() => rate.current?.present()} />
      </TriggerStack>

      <BottomSheetModal accessible={false} ref={invite} {...sheetProps}>
        <BottomSheetView style={styles.content}>
          <View style={styles.avatars}>
            {people.slice(0, 4).map((person, i) => (
              <View
                key={person.id}
                style={[styles.avatar, { borderColor: colors.surface }, i > 0 && styles.overlap]}>
                <Avatar name={person.name} size={48} />
              </View>
            ))}
          </View>
          <Text variant="title" align="center">
            Bake with friends
          </Text>
          <Text color="textSecondary" align="center">
            Sam, Alex and 2 others are sharing festive treats this week
          </Text>
          <Button label="Invite friends" fullWidth onPress={() => invite.current?.dismiss()} />
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal accessible={false} ref={rate} {...sheetProps}>
        <BottomSheetView style={styles.content}>
          <Text variant="title" align="center">
            How was Plentea Matcha?
          </Text>
          <View style={styles.faces}>
            {FACES.map((face, i) => (
              <Pressable key={face} hitSlop={6} onPress={() => setRating(i)}>
                <RNText style={[styles.face, i === rating ? styles.faceOn : styles.faceOff]}>
                  {face}
                </RNText>
              </Pressable>
            ))}
          </View>
          <Button label="Send review" fullWidth onPress={() => rate.current?.dismiss()} />
        </BottomSheetView>
      </BottomSheetModal>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  sheet: { marginHorizontal: 12 },
  background: { borderRadius: 32, borderCurve: 'continuous' },
  content: {
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing.sm,
    paddingBottom: spacing['2xl'],
  },
  avatars: { flexDirection: 'row', marginBottom: spacing.sm },
  avatar: { borderRadius: 26, borderWidth: 2 },
  overlap: { marginLeft: -14 },
  faces: { flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md },
  face: { textAlign: 'center' },
  faceOn: { fontSize: 44, lineHeight: 52 },
  faceOff: { fontSize: 32, lineHeight: 52, opacity: 0.4 },
});
