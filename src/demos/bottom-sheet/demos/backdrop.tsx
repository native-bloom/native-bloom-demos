/**
 * Bottom Sheet · Backdrop variants
 *
 * `backdropComponent` draws behind the sheet. `<BottomSheetBackdrop>` fades in
 * between `disappearsOnIndex` and `appearsOnIndex`, up to `opacity`, and on tap
 * does its `pressBehavior`: `close` (default), `collapse` (back to
 * `disappearsOnIndex`), `none`, or a snap index. It accepts children, so a
 * blurred backdrop is the same component with a transparent background and an
 * expo-blur `BlurView` inside; the fade comes along for free.
 *
 * Define backdrop renderers outside the component (or memoize them) so the
 * sheet doesn't remount its backdrop on every render.
 *
 * Extra package: expo-blur.
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
import { BlurView } from 'expo-blur';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { IconTile, Text, spacing, useColors } from '@/design-system';

function DimmedBackdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />;
}

// Appears only at the top snap point; a tap collapses the sheet to the lower one.
function CollapsingBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={1}
      disappearsOnIndex={0}
      pressBehavior="collapse"
    />
  );
}

function BlurredBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={1}
      style={[props.style, { backgroundColor: 'transparent' }]}>
      <BlurView intensity={30} tint="systemMaterialDark" style={StyleSheet.absoluteFill} />
    </BottomSheetBackdrop>
  );
}

function SheetContent({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  const insets = useSafeAreaInsets();
  return (
    <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}>
      <IconTile emoji={emoji} color="#EEF6E2" size={64} />
      <Text variant="title" align="center">
        {title}
      </Text>
      <Text color="textSecondary" align="center">
        {subtitle}
      </Text>
    </BottomSheetView>
  );
}

export function BackdropDemo() {
  const colors = useColors();
  const dimmed = useRef<BottomSheetModal>(null);
  const collapsing = useRef<BottomSheetModal>(null);
  const blurred = useRef<BottomSheetModal>(null);

  const sheetProps = {
    backgroundStyle: { backgroundColor: colors.surface },
    handleIndicatorStyle: { backgroundColor: colors.textTertiary },
  };

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          tone="primary"
          emoji="🌗"
          label="Dimmed backdrop"
          onPress={() => dimmed.current?.present()}
        />
        <Trigger emoji="👆" label="Tap to collapse" onPress={() => collapsing.current?.present()} />
        <Trigger emoji="🌫️" label="Blurred backdrop" onPress={() => blurred.current?.present()} />
      </TriggerStack>

      <BottomSheetModal
        accessible={false}
        ref={dimmed}
        backdropComponent={DimmedBackdrop}
        {...sheetProps}>
        <SheetContent emoji="🍵" title="Plentea Matcha" subtitle="Tap outside to close" />
      </BottomSheetModal>

      <BottomSheetModal
        accessible={false}
        ref={collapsing}
        index={1}
        snapPoints={['30%', '70%']}
        enableDynamicSizing={false}
        backdropComponent={CollapsingBackdrop}
        {...sheetProps}>
        <SheetContent
          emoji="🫖"
          title="Kettl Greenpoint"
          subtitle="Tap outside to collapse, then use the screen behind"
        />
      </BottomSheetModal>

      <BottomSheetModal
        accessible={false}
        ref={blurred}
        backdropComponent={BlurredBackdrop}
        {...sheetProps}>
        <SheetContent
          emoji="🥐"
          title="Neighbors Café"
          subtitle="The screen blurs behind the sheet"
        />
      </BottomSheetModal>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing.lg,
  },
});
