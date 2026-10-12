import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { useColors } from '../theme';
import { fontFamily, radius, spacing } from '../tokens';
import { Icon } from './icon';
import { ScalePressable } from './pressable';

export type SearchFieldProps = Omit<TextInputProps, 'style'> & {
  onClear?: () => void;
};

/** Rounded search pill with a leading magnifier and a clear button. */
export function SearchField({ value, onClear, ...rest }: SearchFieldProps) {
  const colors = useColors();
  return (
    <View style={[styles.field, { backgroundColor: colors.surfaceMuted }]}>
      <Icon name="search" size={16} color="textTertiary" />
      <TextInput
        {...rest}
        value={value}
        placeholderTextColor={colors.textTertiary}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="never"
        style={[styles.input, { color: colors.text, fontFamily: fontFamily.sans }]}
      />
      {value ? (
        <ScalePressable
          onPress={onClear}
          hitSlop={8}
          style={[styles.clear, { backgroundColor: colors.textTertiary }]}>
          <Icon name="close" size={10} tint={colors.surface} weight="bold" />
        </ScalePressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 44,
    borderRadius: radius.pill,
    borderCurve: 'continuous',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 0 },
  clear: { width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
});
