import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { useColors } from '../theme';
import { fontFamily, typography, type ColorToken, type TypographyVariant } from '../tokens';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  /** Color token from the theme. Defaults to `text`. */
  color?: ColorToken;
  align?: TextStyle['textAlign'];
};

export function Text({ variant = 'body', color = 'text', align, style, ...rest }: TextProps) {
  const colors = useColors();
  const base = typography[variant];
  return (
    <RNText
      {...rest}
      style={[
        {
          fontFamily: variant === 'mono' ? fontFamily.mono : fontFamily.sans,
          fontSize: base.fontSize,
          lineHeight: base.lineHeight,
          fontWeight: base.fontWeight,
          letterSpacing: base.letterSpacing,
          color: colors[color],
          textAlign: align,
        },
        style,
      ]}
    />
  );
}
