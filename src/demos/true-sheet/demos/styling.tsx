/**
 * True Sheet · Custom sheet styles
 *
 * Setting `backgroundColor` or `backgroundBlur` replaces the default Liquid
 * Glass look (iOS 26.1+). `cornerRadius` rounds the top corners, and
 * `grabberOptions` swaps the system grabber for a custom one (width, height,
 * margin, color). `backgroundBlur` and `blurOptions` are iOS only.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

type Look = { emoji: string; title: string; body: string; text: string; muted: string; button: string; buttonText: string };

function SheetBody({ look, onDone }: { look: Look; onDone: () => void }) {
  return (
    <View style={styles.content}>
      <Text style={styles.emoji}>{look.emoji}</Text>
      <Text style={[styles.title, { color: look.text }]}>{look.title}</Text>
      <Text style={[styles.body, { color: look.muted }]}>{look.body}</Text>
      <Pressable onPress={onDone} style={[styles.button, { backgroundColor: look.button }]}>
        <Text style={[styles.buttonText, { color: look.buttonText }]}>Done</Text>
      </Pressable>
    </View>
  );
}

const CREAM: Look = {
  emoji: '🍪',
  title: 'Cookie day',
  body: 'A warm solid background with extra-round corners.',
  text: '#3D2A14',
  muted: '#8A6A47',
  button: '#3D2A14',
  buttonText: '#FFF6E8',
};

const NIGHT: Look = {
  emoji: '🌙',
  title: 'Late-night matcha',
  body: 'A dark sheet with a custom accent grabber.',
  text: '#FFFFFF',
  muted: '#A1A1A8',
  button: '#7DD3A7',
  buttonText: '#0B0B0D',
};

const BLUR: Look = {
  emoji: '🫧',
  title: 'Frosted glass',
  body: 'A dark material blur over whatever is behind the sheet.',
  text: '#FFFFFF',
  muted: 'rgba(255,255,255,0.7)',
  button: '#FFFFFF',
  buttonText: '#0B0B0D',
};

const PINK: Look = {
  emoji: '🍓',
  title: 'Strawberry season',
  body: 'Brand color, square corners and a wide grabber.',
  text: '#FFFFFF',
  muted: 'rgba(255,255,255,0.85)',
  button: '#FFFFFF',
  buttonText: '#E0245E',
};

export function StylingDemo() {
  const cream = useRef<TrueSheet>(null);
  const night = useRef<TrueSheet>(null);
  const blur = useRef<TrueSheet>(null);
  const pink = useRef<TrueSheet>(null);

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger emoji="🍪" label="Warm and round" onPress={() => cream.current?.present()} />
        <Trigger emoji="🌙" label="Night mode" onPress={() => night.current?.present()} />
        <Trigger emoji="🫧" label="Frosted blur" onPress={() => blur.current?.present()} />
        <Trigger emoji="🍓" label="Brand color" onPress={() => pink.current?.present()} />
      </TriggerStack>

      <TrueSheet ref={cream} detents={['auto']} backgroundColor="#FFF6E8" cornerRadius={44}>
        <SheetBody look={CREAM} onDone={() => cream.current?.dismiss()} />
      </TrueSheet>

      <TrueSheet
        ref={night}
        detents={['auto']}
        backgroundColor="#111113"
        cornerRadius={28}
        grabberOptions={{ width: 40, height: 5, topMargin: 8, color: '#7DD3A7' }}>
        <SheetBody look={NIGHT} onDone={() => night.current?.dismiss()} />
      </TrueSheet>

      <TrueSheet
        ref={blur}
        detents={['auto']}
        backgroundBlur="system-thick-material-dark"
        blurOptions={{ intensity: 90, interaction: false }}>
        <SheetBody look={BLUR} onDone={() => blur.current?.dismiss()} />
      </TrueSheet>

      <TrueSheet
        ref={pink}
        detents={['auto']}
        backgroundColor="#E0245E"
        cornerRadius={0}
        grabberOptions={{ width: 72, height: 6, topMargin: 10, color: 'rgba(255,255,255,0.6)' }}>
        <SheetBody look={PINK} onDone={() => pink.current?.dismiss()} />
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingTop: 36, gap: 12, alignItems: 'center' },
  emoji: { fontSize: 44, lineHeight: 52 },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '700', letterSpacing: -0.4 },
  body: { fontSize: 16, lineHeight: 22, textAlign: 'center' },
  button: {
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
});
