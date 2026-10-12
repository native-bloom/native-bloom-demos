/**
 * Sonner Native · Glass toasts
 *
 * `backgroundComponent` renders behind a toast's content and animates with it.
 * An `expo-blur` BlurView turns the toast into frosted glass over the photo.
 *
 * Extra package: expo-blur. On Android, BlurView needs
 * `experimentalBlurMethod="dimezisBlurView"` to really blur.
 */
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Toaster, toast } from 'sonner-native';

import { photos } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { radius, spacing } from '@/design-system';

const blurMethod = Platform.OS === 'android' ? 'dimezisBlurView' : undefined;

function showLightGlass() {
  toast('Saved to Memories', {
    description: 'Strawberry season · 12 photos',
    icon: <Text style={{ fontSize: 18 }}>🍓</Text>,
    backgroundComponent: (
      <BlurView
        intensity={70}
        tint="light"
        experimentalBlurMethod={blurMethod}
        style={StyleSheet.absoluteFill}
      />
    ),
    styles: {
      title: { color: '#0B0B0D' },
      description: { color: '#3A3A40' },
    },
  });
}

function showDarkGlass() {
  toast('Sam Lee loved your story', {
    description: 'Strawberry season',
    icon: <Text style={{ fontSize: 18 }}>❤️</Text>,
    backgroundComponent: (
      <BlurView
        intensity={80}
        tint="dark"
        experimentalBlurMethod={blurMethod}
        style={StyleSheet.absoluteFill}
      />
    ),
    styles: {
      title: { color: '#FFFFFF' },
      description: { color: 'rgba(255,255,255,0.75)' },
    },
  });
}

export function BlurDemo() {
  return (
    <DemoStage bleed align="top">
      <View style={styles.photoWrap}>
        <Image source={photos.strawberries} style={styles.photo} contentFit="cover" />
        <View style={styles.actions}>
          <Trigger emoji="🤍" label="Light glass" onPress={showLightGlass} />
          <Trigger emoji="🖤" label="Dark glass" onPress={showDarkGlass} />
        </View>
      </View>

      <Toaster position="center" />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  photoWrap: {
    flex: 1,
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  photo: StyleSheet.absoluteFill,
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
