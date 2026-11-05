/**
 * Animated Glow · Glow on press
 *
 * A preset can describe `hover` and `press` states next to `default`. Each one only lists
 * what changes (here: a bigger, brighter glow and a faster spin) and how long the
 * `transition` into it takes. `AnimatedGlow` doesn't listen to touches itself: you pass
 * the current state through `activeState`, here from a `Pressable`'s press and hover
 * events (hover fires on web, iPad pointers and desktop). Every number and color blends
 * smoothly between states on the UI thread.
 */
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { type GlowEvent, type PresetConfig } from 'react-native-animated-glow';

import { DemoStage, Showcase } from '@/demos/_shared/stage';

const SEND_GLOW: PresetConfig = {
  states: [
    {
      name: 'default',
      preset: {
        cornerRadius: 32,
        outlineWidth: 2,
        borderColor: ['#FF7AB6', '#8B7BFF', '#FF7AB6'],
        backgroundColor: '#16131F',
        animationSpeed: 0.8,
        glowLayers: [
          { glowPlacement: 'behind', colors: ['#FF7AB6', '#8B7BFF'], glowSize: 14, opacity: 0.3 },
          { glowPlacement: 'behind', colors: ['#FFC1DD', '#C3BAFF'], glowSize: 4, opacity: 0.5 },
        ],
      },
    },
    {
      name: 'hover',
      transition: 300,
      preset: {
        animationSpeed: 1.6,
        glowLayers: [{ glowSize: 22, opacity: 0.4 }, { glowSize: 5, opacity: 0.6 }],
      },
    },
    {
      name: 'press',
      transition: 160,
      preset: {
        animationSpeed: 3,
        outlineWidth: 3,
        glowLayers: [{ glowSize: 34, opacity: 0.55 }, { glowSize: 8, opacity: 0.8 }],
      },
    },
  ],
};

export function PressStatesDemo() {
  const [glow, setGlow] = useState<GlowEvent>('default');
  const hovered = useRef(false);

  return (
    <DemoStage>
      <Showcase>
        <View style={styles.stage}>
          <AnimatedGlow preset={SEND_GLOW} activeState={glow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Send a wave"
              onPressIn={() => setGlow('press')}
              onPressOut={() => setGlow(hovered.current ? 'hover' : 'default')}
              onHoverIn={() => {
                hovered.current = true;
                setGlow((state) => (state === 'press' ? state : 'hover'));
              }}
              onHoverOut={() => {
                hovered.current = false;
                setGlow((state) => (state === 'press' ? state : 'default'));
              }}
              style={styles.button}>
              <Text style={styles.emoji}>👋</Text>
              <Text style={styles.label}>Send a wave</Text>
            </Pressable>
          </AnimatedGlow>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  stage: { paddingVertical: 56, alignItems: 'center' },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 36,
  },
  emoji: { fontSize: 22 },
  label: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});
