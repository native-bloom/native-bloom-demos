import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../tokens';
import { Text } from './text';

export type SectionProps = {
  title?: string;
  /** Short grey helper text rendered under the title. */
  description?: string;
  /** Right-aligned slot in the header row (e.g. "All ›"). */
  action?: ReactNode;
  children: ReactNode;
};

/** Vertical block with the "Recent   All ›" style header. */
export function Section({ title, description, action, children }: SectionProps) {
  return (
    <View style={styles.section}>
      {title || action ? (
        <View style={styles.header}>
          <View style={{ flex: 1, gap: 2 }}>
            {title ? <Text variant="heading">{title}</Text> : null}
            {description ? (
              <Text variant="label" color="textSecondary">
                {description}
              </Text>
            ) : null}
          </View>
          {action}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    gap: spacing.md,
  },
});
