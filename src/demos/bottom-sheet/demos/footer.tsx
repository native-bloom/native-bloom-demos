/**
 * Bottom Sheet · Sticky footer
 *
 * `footerComponent` renders a `<BottomSheetFooter>` that stays pinned to the
 * bottom of the visible sheet at every snap point and while it is dragged.
 * Pass the props it receives (`animatedFooterPosition`) through. Pad the
 * footer's own background past the home indicator (rather than `bottomInset`,
 * which leaves a see-through gap), and give the list matching bottom padding
 * so its last row can scroll above the footer.
 *
 * `accessible={false}` on the sheet: by default it is a single accessibility
 * element, which hides the buttons inside it from VoiceOver.
 */
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { people } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Avatar, Button, Icon, ListRow, Text, spacing, useColors } from '@/design-system';

const FRIENDS = [
  ...people,
  { id: 'mia', name: 'Mia Park', handle: '@miapark', color: '#E8F0FF' },
  { id: 'noah', name: 'Noah Kim', handle: '@noahkim', color: '#FFF1DB' },
  { id: 'zoe', name: 'Zoe Chen', handle: '@zoechen', color: '#FFE4EC' },
  { id: 'eli', name: 'Eli Brown', handle: '@elibrown', color: '#EAF7EE' },
];

const FOOTER_HEIGHT = 46 + spacing.md * 2;

export function FooterDemo() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const sheet = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState<string[]>(['sam', 'alex']);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  const renderFooter = (props: BottomSheetFooterProps) => (
    <BottomSheetFooter {...props}>
      {/* The surface runs under the home indicator, so the list doesn't show below the button. */}
      <View
        style={[
          styles.footer,
          { backgroundColor: colors.surface, paddingBottom: insets.bottom + spacing.md },
        ]}>
        <Button
          label={
            selected.length === 0
              ? 'Pick friends'
              : `Send to ${selected.length} ${selected.length === 1 ? 'friend' : 'friends'}`
          }
          fullWidth
          disabled={selected.length === 0}
          onPress={() => sheet.current?.dismiss()}
        />
      </View>
    </BottomSheetFooter>
  );

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
        snapPoints={['50%', '85%']}
        enableDynamicSizing={false}
        footerComponent={renderFooter}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textTertiary }}>
        <BottomSheetFlatList
          data={FRIENDS}
          keyExtractor={(item) => item.id}
          extraData={selected}
          contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + insets.bottom }}
          ListHeaderComponent={
            <Text variant="heading" style={styles.title}>
              Share Made cookie dough
            </Text>
          }
          renderItem={({ item }) => {
            const on = selected.includes(item.id);
            return (
              <ListRow
                title={item.name}
                subtitle={item.handle}
                leading={<Avatar name={item.name} size={40} />}
                trailing={
                  <View
                    style={[
                      styles.check,
                      on
                        ? { backgroundColor: colors.accent, borderColor: colors.accent }
                        : { borderColor: colors.textTertiary },
                    ]}>
                    {on ? <Icon name="check" size={13} tint="#FFFFFF" /> : null}
                  </View>
                }
                chevron={false}
                onPress={() => toggle(item.id)}
              />
            );
          }}
        />
      </BottomSheetModal>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { paddingHorizontal: spacing.xl, paddingVertical: spacing.sm },
  footer: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
