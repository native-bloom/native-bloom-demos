/**
 * Gifted Charts · Axis colors for light and dark
 *
 * The library draws axes, rules and labels in black and grey by default and
 * has no color scheme prop. Bar, line and candlestick charts all take the same
 * axis props, so the demos spread this object onto them: a calm axis without a
 * y-axis line, dashed rules and secondary-colored labels that follow the theme.
 */
import { useColorScheme } from 'react-native';

const light = {
  xAxisColor: '#E7E7EB',
  yAxisThickness: 0,
  rulesColor: '#EEEEF1',
  yAxisTextStyle: { color: '#6E6E75', fontSize: 11 },
  xAxisLabelTextStyle: { color: '#6E6E75', fontSize: 11 },
};

const dark: typeof light = {
  xAxisColor: '#2A2A2E',
  yAxisThickness: 0,
  rulesColor: '#222225',
  yAxisTextStyle: { color: '#A1A1A8', fontSize: 11 },
  xAxisLabelTextStyle: { color: '#A1A1A8', fontSize: 11 },
};

export function useAxisTheme() {
  return useColorScheme() === 'dark' ? dark : light;
}

/** "12600" → "12.6k", for step counts on the y-axis. */
export function formatThousands(label: string) {
  const value = Number(label);
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(Math.round(value));
}
