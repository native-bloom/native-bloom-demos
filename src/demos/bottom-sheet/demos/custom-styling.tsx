/**
 * Bottom Sheet · Custom handle and background
 *
 * `handleComponent` replaces the grabber row (it stays draggable) and
 * `backgroundComponent` replaces the sheet's surface. Both receive the sheet's
 * `animatedIndex` / `animatedPosition` and a `style` to spread. Here: a glass
 * sheet (expo-blur `BlurView` as background), a dark sheet, and a brand sheet
 * with a CSS gradient (`experimental_backgroundImage`, iOS and new-arch
 * Android). Define these components at module level so they don't remount.
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
  type BottomSheetBackgroundProps,
  type BottomSheetHandleProps,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useRef, type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { stickerArt } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { useTheme } from '@/design-system';

type Look = { title: string; text: string; muted: string; grabber: string; stamp: string };

const LOOKS = {
  glass: {
    title: 'Plentea rewards',
    text: '#0B0B0D',
    muted: '#3C3C43',
    grabber: '#0B0B0D33',
    stamp: '#FFFFFF80',
  },
  dark: {
    title: 'Plentea rewards',
    text: '#FFFFFF',
    muted: '#A1A1A8',
    grabber: '#FFFFFF40',
    stamp: '#FFFFFF14',
  },
  brand: {
    title: 'Plentea rewards',
    text: '#FFFFFF',
    muted: '#FFFFFFCC',
    grabber: '#FFFFFF66',
    stamp: '#FFFFFF26',
  },
} satisfies Record<string, Look>;

function handleFor(look: Look): FC<BottomSheetHandleProps> {
  return function Handle() {
    return (
      <View style={styles.handle}>
        <View style={[styles.grabber, { backgroundColor: look.grabber }]} />
        <Text style={[styles.handleTitle, { color: look.text }]}>{look.title}</Text>
      </View>
    );
  };
}

const GlassHandle = handleFor(LOOKS.glass);
const DarkHandle = handleFor(LOOKS.dark);
const BrandHandle = handleFor(LOOKS.brand);

function GlassBackground({ style }: BottomSheetBackgroundProps) {
  return (
    <View style={[style, styles.clip]}>
      <BlurView intensity={60} tint="systemThinMaterialLight" style={StyleSheet.absoluteFill} />
    </View>
  );
}

function DarkBackground({ style }: BottomSheetBackgroundProps) {
  return <View style={[style, styles.clip, { backgroundColor: '#141416' }]} />;
}

function BrandBackground({ style }: BottomSheetBackgroundProps) {
  return (
    <View
      style={[
        style,
        styles.clip,
        { experimental_backgroundImage: 'linear-gradient(160deg, #4E7A58 0%, #1E3A2B 100%)' },
      ]}
    />
  );
}

function Backdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.25} />
  );
}

function Rewards({ look }: { look: Look }) {
  const insets = useSafeAreaInsets();
  return (
    <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
      <Text style={[styles.big, { color: look.text }]}>8 of 10 stamps</Text>
      <Text style={[styles.muted, { color: look.muted }]}>
        Two more matchas and the next is on us
      </Text>
      <View style={styles.stamps}>
        {Array.from({ length: 10 }, (_, i) => (
          <View key={i} style={[styles.stamp, { backgroundColor: look.stamp }]}>
            <Text style={[styles.stampEmoji, i >= 8 && styles.empty]}>🍵</Text>
          </View>
        ))}
      </View>
    </BottomSheetView>
  );
}

export function CustomStylingDemo() {
  const { scheme } = useTheme();
  const glass = useRef<BottomSheetModal>(null);
  const dark = useRef<BottomSheetModal>(null);
  const brand = useRef<BottomSheetModal>(null);

  return (
    <View style={styles.fill}>
      {/* Something colourful behind the stage gives the glass sheet something to blur. */}
      <Image source={stickerArt.desk[scheme]} style={StyleSheet.absoluteFill} contentFit="cover" />
      <DemoStage>
        <TriggerStack>
          <Trigger
            tone="primary"
            emoji="🫧"
            label="Glass"
            onPress={() => glass.current?.present()}
          />
          <Trigger emoji="🌑" label="Dark" onPress={() => dark.current?.present()} />
          <Trigger emoji="🍵" label="Brand gradient" onPress={() => brand.current?.present()} />
        </TriggerStack>

        <BottomSheetModal
          accessible={false}
          ref={glass}
          handleComponent={GlassHandle}
          backgroundComponent={GlassBackground}
          backdropComponent={Backdrop}>
          <Rewards look={LOOKS.glass} />
        </BottomSheetModal>

        <BottomSheetModal
          accessible={false}
          ref={dark}
          handleComponent={DarkHandle}
          backgroundComponent={DarkBackground}
          backdropComponent={Backdrop}>
          <Rewards look={LOOKS.dark} />
        </BottomSheetModal>

        <BottomSheetModal
          accessible={false}
          ref={brand}
          handleComponent={BrandHandle}
          backgroundComponent={BrandBackground}
          backdropComponent={Backdrop}>
          <Rewards look={LOOKS.brand} />
        </BottomSheetModal>
      </DemoStage>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  clip: { borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden' },
  handle: { alignItems: 'center', paddingTop: 8, paddingBottom: 4, gap: 12 },
  grabber: { width: 40, height: 5, borderRadius: 3 },
  handleTitle: { fontSize: 13, fontWeight: '600', letterSpacing: 0.4, textTransform: 'uppercase' },
  content: { paddingHorizontal: 24, paddingTop: 12, gap: 6 },
  big: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.5 },
  muted: { fontSize: 16, lineHeight: 22 },
  stamps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 18,
  },
  stamp: {
    width: 56,
    height: 56,
    borderRadius: 18,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampEmoji: { fontSize: 28, lineHeight: 34 },
  empty: { opacity: 0.25 },
});
