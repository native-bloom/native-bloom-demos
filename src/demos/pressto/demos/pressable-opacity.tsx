/**
 * Pressto · Pressable opacity
 *
 * `PressableOpacity` is the UI-thread version of `TouchableOpacity`: it fades
 * its content while pressed. `activeOpacity` sets how far it fades (0.5 by
 * default), set through `PressablesConfig config` for every pressable inside
 * it. Here it wraps list rows and a row of icon buttons.
 *
 * pressto 0.7.0 on npm has no per-pressable `config` prop yet (the README on
 * `main` documents one), so the value goes on `PressablesConfig`.
 */
import { PressableOpacity, PressablesConfig } from 'pressto';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { places } from '@/demos/_shared/fixtures';
import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Icon, IconTile, Text, useColors, type IconName } from '@/design-system';

const VARIANTS = [
  { value: 'light', label: 'Light', emoji: '☁️', activeOpacity: 0.8 },
  { value: 'default', label: 'Default', emoji: '🌫️', activeOpacity: 0.5 },
  { value: 'strong', label: 'Strong', emoji: '👻', activeOpacity: 0.15 },
] as const;

type Variant = (typeof VARIANTS)[number]['value'];

const PLACE_EMOJI: Record<string, string> = { plentea: '🍵', kettl: '🫖', neighbors: '☕️' };

const ACTIONS: { icon: IconName; label: string }[] = [
  { icon: 'heart', label: 'Like' },
  { icon: 'message', label: 'Comment' },
  { icon: 'share', label: 'Share' },
  { icon: 'bell', label: 'Notify' },
];

export function PressableOpacityDemo() {
  const colors = useColors();
  const [variant, setVariant] = useState<Variant>('default');
  const { activeOpacity } = VARIANTS.find((v) => v.value === variant)!;

  return (
    <DemoStage>
      <Showcase
        padding="sm"
        below={<VariantBar value={variant} options={VARIANTS} onChange={setVariant} />}>
        <PressablesConfig config={{ activeOpacity }}>
          {places.map((place) => (
            <PressableOpacity key={place.id} accessibilityLabel={place.name} style={styles.row}>
              <IconTile emoji={PLACE_EMOJI[place.id]} size={44} />
              <View style={styles.rowText}>
                <Text variant="bodyStrong">{place.name}</Text>
                <Text variant="label" color="textSecondary">
                  {place.kind} · ★ {place.rating}
                </Text>
              </View>
              <Icon name="forward" size={14} color="textTertiary" />
            </PressableOpacity>
          ))}

          <View style={[styles.actions, { borderTopColor: colors.border }]}>
            {ACTIONS.map((action) => (
              <PressableOpacity
                key={action.icon}
                accessibilityLabel={action.label}
                style={[styles.action, { backgroundColor: colors.surfaceMuted }]}>
                <Icon name={action.icon} size={20} color="text" />
              </PressableOpacity>
            ))}
          </View>
        </PressablesConfig>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  rowText: { flex: 1, gap: 2 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 14,
    paddingBottom: 10,
    marginTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  action: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
