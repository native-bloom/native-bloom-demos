/**
 * Bottom Sheet · Bottom sheet modal
 *
 * `<BottomSheetModal>` stays hidden until you call `present()` on its ref and
 * unmounts its content again after `dismiss()` (or a pan down). Without
 * `snapPoints` it sizes itself to its content. Modals render through
 * `<BottomSheetModalProvider>`, which wraps the app once (inside
 * `GestureHandlerRootView`), so they cover the whole screen.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { people } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Avatar, Button, IconTile, Text, spacing, useColors } from '@/design-system';

export function ModalDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const sheet = useRef<BottomSheetModal>(null);

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          tone="primary"
          emoji="🍪"
          label="Share memory"
          onPress={() => sheet.current?.present()}
        />
      </TriggerStack>

      <BottomSheetModal
        accessible={false}
        ref={sheet}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textTertiary }}>
        <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom + spacing.md }]}>
          <View style={styles.memory}>
            <IconTile emoji="🍪" color="#FFF1DB" size={52} />
            <View style={styles.flex}>
              <Text variant="heading">Made cookie dough</Text>
              <Text variant="caption" color="textSecondary">
                Cooking · 19 min ago
              </Text>
            </View>
          </View>

          <Text color="textSecondary">Share with your close friends</Text>
          <View style={styles.people}>
            {people.slice(0, 4).map((person) => (
              <View key={person.id} style={styles.person}>
                <Avatar name={person.name} size={52} />
                <Text variant="caption">{person.name.split(' ')[0]}</Text>
              </View>
            ))}
          </View>

          <Button label="Share" fullWidth onPress={() => sheet.current?.dismiss()} />
        </BottomSheetView>
      </BottomSheetModal>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing['2xl'], paddingTop: spacing.md, gap: spacing.xl },
  memory: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  people: { flexDirection: 'row', justifyContent: 'space-between' },
  person: { alignItems: 'center', gap: spacing.xs },
});
