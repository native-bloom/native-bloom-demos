/**
 * Native controls backed by Expo UI (SwiftUI on iOS, Jetpack Compose on
 * Android). Each control is wrapped in a labelled row so demo "playgrounds"
 * all look the same.
 */
import { Host, Picker, Row, Slider, Switch, type PickerItemValue } from '@expo/ui';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../theme';
import { spacing } from '../tokens';
import { Text } from './text';

export type ControlRowProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  /** Stack the control under the label (sliders). */
  stacked?: boolean;
  divider?: boolean;
};

export function ControlRow({
  label,
  hint,
  children,
  stacked = false,
  divider = false,
}: ControlRowProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.row,
        stacked && styles.stacked,
        divider && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
      ]}>
      <View style={styles.labels}>
        <Text variant="bodyStrong">{label}</Text>
        {hint ? (
          <Text variant="caption" color="textSecondary">
            {hint}
          </Text>
        ) : null}
      </View>
      <View style={stacked ? styles.controlStacked : styles.control}>{children}</View>
    </View>
  );
}

type BaseProps = { label: string; hint?: string; divider?: boolean; disabled?: boolean };

export type SwitchRowProps = BaseProps & {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

/** Label + native toggle. */
export function SwitchRow({
  label,
  hint,
  divider,
  disabled,
  value,
  onValueChange,
}: SwitchRowProps) {
  const { colors, scheme } = useTheme();
  return (
    <ControlRow label={label} hint={hint} divider={divider}>
      <Host
        matchContents={{ horizontal: true }}
        style={styles.inlineHost}
        colorScheme={scheme}
        seedColor={colors.accent}>
        <Row alignment="center" style={styles.inlineRow}>
          <Switch value={value} onValueChange={onValueChange} disabled={disabled} />
        </Row>
      </Host>
    </ControlRow>
  );
}

export type PickerRowProps<T extends PickerItemValue> = BaseProps & {
  value: T;
  options: readonly { value: T; label: string }[];
  onValueChange: (value: T) => void;
};

/** Label + native menu picker. */
export function PickerRow<T extends PickerItemValue>({
  label,
  hint,
  divider,
  disabled,
  value,
  options,
  onValueChange,
}: PickerRowProps<T>) {
  const { colors, scheme } = useTheme();
  return (
    <ControlRow label={label} hint={hint} divider={divider}>
      <Host
        matchContents={{ horizontal: true }}
        style={styles.inlineHost}
        colorScheme={scheme}
        seedColor={colors.accent}>
        <Row alignment="center" style={styles.inlineRow}>
          <Picker
            selectedValue={value}
            onValueChange={onValueChange}
            appearance="menu"
            enabled={!disabled}>
            {options.map((o) => (
              <Picker.Item key={String(o.value)} label={o.label} value={o.value} />
            ))}
          </Picker>
        </Row>
      </Host>
    </ControlRow>
  );
}

export type SliderRowProps = BaseProps & {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
  /** Formats the value shown next to the label. */
  format?: (value: number) => string;
};

/** Label + value readout + native slider. */
export function SliderRow({
  label,
  hint,
  divider,
  disabled,
  value,
  min = 0,
  max = 1,
  step,
  onValueChange,
  format,
}: SliderRowProps) {
  const { colors, scheme } = useTheme();
  return (
    <ControlRow label={label} hint={hint} divider={divider} stacked>
      <View style={styles.sliderLine}>
        <Host style={styles.sliderHost} colorScheme={scheme} seedColor={colors.accent}>
          <Slider
            value={value}
            min={min}
            max={max}
            step={step}
            onValueChange={onValueChange}
            disabled={disabled}
          />
        </Host>
        <Text variant="mono" color="textSecondary" style={styles.readout} numberOfLines={1}>
          {format ? format(value) : String(Math.round(value * 100) / 100)}
        </Text>
      </View>
    </ControlRow>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  stacked: { flexDirection: 'column', alignItems: 'stretch' },
  labels: { flex: 1, gap: 2 },
  control: { alignItems: 'flex-end', justifyContent: 'center' },
  controlStacked: { marginTop: spacing.xs },
  inlineHost: { height: 40 },
  inlineRow: { height: 40 },
  sliderLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  sliderHost: { flex: 1, height: 36 },
  readout: { width: 56, textAlign: 'right' },
});
