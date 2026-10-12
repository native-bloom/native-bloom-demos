/**
 * Sonner Native · Custom styling
 *
 * The `styles` option targets each part of a toast (toastContainer, toast,
 * toastContent, title, description, buttons, closeButton). Add
 * `unstyled: true` to drop the defaults and start from a blank toast.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

function showIosStyle() {
  toast('AirPods Pro', {
    description: 'Connected',
    unstyled: true,
    icon: (
      <View style={styles.iosIcon}>
        <Text style={{ fontSize: 18 }}>🎧</Text>
      </View>
    ),
    styles: {
      toastContainer: { alignItems: 'center' },
      toast: {
        backgroundColor: '#FFFFFF',
        borderRadius: 999,
        borderCurve: 'continuous',
        shadowColor: '#000',
        shadowOpacity: 0.14,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
      },
      toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        paddingLeft: 12,
        paddingRight: 28,
      },
      // The text column defaults to flex: 1, which collapses inside a shrink-wrapped pill.
      textContainer: { flex: 0 },
      title: { fontSize: 15, fontWeight: '700', color: '#0B0B0D' },
      description: { fontSize: 13, color: '#6E6E75' },
    },
  });
}

function showDarkCard() {
  const id = toast('Finalize this discover?', {
    description: 'Members will see the final pick',
    icon: <Text style={{ fontSize: 18 }}>🏁</Text>,
    action: { label: 'Finalize', onClick: () => toast.dismiss(id) },
    cancel: { label: 'Later', onClick: () => {} },
    styles: {
      toast: { backgroundColor: '#111113', borderRadius: 22, borderCurve: 'continuous' },
      title: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
      description: { color: '#A1A1A8' },
    },
    actionButtonStyle: {
      backgroundColor: '#FFFFFF',
      borderWidth: 0,
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 7,
    },
    actionButtonTextStyle: { color: '#0B0B0D', fontWeight: '600' },
    cancelButtonStyle: {
      backgroundColor: '#2C2C30',
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 7,
    },
    cancelButtonTextStyle: { color: '#FFFFFF', fontWeight: '600' },
  });
}

function showBrand() {
  toast('Bond Pro unlocked', {
    description: 'Unlimited memories and discovers',
    icon: <Text style={{ fontSize: 18 }}>✨</Text>,
    styles: {
      toast: { backgroundColor: '#3478F6', borderRadius: 18, borderCurve: 'continuous' },
      title: { color: '#FFFFFF', fontWeight: '700' },
      description: { color: 'rgba(255,255,255,0.8)' },
    },
  });
}

function showWindowsXp() {
  const id = toast('Your memory could not be saved', {
    description: 'Please try again later.',
    unstyled: true,
    icon: <Text style={{ fontSize: 26 }}>🖥️</Text>,
    action: { label: 'OK', onClick: () => toast.dismiss(id) },
    styles: {
      toastContainer: { paddingHorizontal: 24 },
      toast: {
        backgroundColor: '#ECE9D8',
        borderWidth: 2,
        borderColor: '#0055EA',
        borderRadius: 4,
        padding: 14,
      },
      toastContent: { flexDirection: 'row', alignItems: 'center', gap: 14 },
      title: { fontSize: 14, fontWeight: '700', color: '#000000' },
      description: { fontSize: 13, color: '#000000' },
      buttons: { marginTop: 10, alignItems: 'center' },
    },
    actionButtonStyle: {
      borderWidth: 1,
      borderColor: '#003C74',
      borderRadius: 3,
      backgroundColor: '#F5F4EA',
      paddingHorizontal: 24,
      paddingVertical: 4,
    },
    actionButtonTextStyle: { color: '#000000', fontSize: 13 },
  });
}

export function StylingDemo() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger emoji="🎧" label="iOS style" onPress={showIosStyle} />
        <Trigger emoji="🌑" label="Dark card" onPress={showDarkCard} />
        <Trigger emoji="💙" label="Brand color" onPress={showBrand} />
        <Trigger emoji="🪟" label="Windows XP" onPress={showWindowsXp} />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  iosIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
