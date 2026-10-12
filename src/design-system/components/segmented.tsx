import { ScrollView, StyleSheet, View } from 'react-native';

import { spacing } from '../tokens';
import { Chip } from './chip';

export type SegmentedOption<T extends string | number> = {
  value: T;
  label: string;
  emoji?: string;
};

export type SegmentedProps<T extends string | number> = {
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  /** Wrap chips onto multiple lines instead of scrolling horizontally. */
  wrap?: boolean;
  size?: 'sm' | 'md';
};

/** A row of selectable chips — the app's take on a segmented control. */
export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  wrap = false,
  size = 'sm',
}: SegmentedProps<T>) {
  const chips = options.map((o) => (
    <Chip
      key={String(o.value)}
      label={o.label}
      emoji={o.emoji}
      size={size}
      selected={o.value === value}
      onPress={() => onChange(o.value)}
    />
  ));
  if (wrap) return <View style={styles.wrap}>{chips}</View>;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {chips}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
});
