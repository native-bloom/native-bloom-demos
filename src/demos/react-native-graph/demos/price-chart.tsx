/**
 * react-native-graph · Price chart
 *
 * The whole thing in a real screen: an animated graph with a gradient fill
 * that morphs between time ranges, a live indicator on the latest price, and
 * scrubbing that drives the price, change and date in the header, with haptics.
 */
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineGraph, type GraphPoint } from 'react-native-graph';

import { DemoStage, Trigger, VariantBar } from '@/demos/_shared/stage';
import { IconTile, Text, spacing } from '@/design-system';
import { TIME_RANGES, formatPrice, priceHistory, type TimeRange } from '../data';

const UP = '#16A34A';
const DOWN = '#EF4444';

function formatDate(date: Date, range: TimeRange) {
  return range === '1D' || range === '1W'
    ? date.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function PriceChartDemo() {
  const [range, setRange] = useState<TimeRange>('1D');
  const [selected, setSelected] = useState<GraphPoint | null>(null);

  const points = priceHistory[range];
  const first = points[0]!.value;
  const shown = selected ?? points[points.length - 1]!;
  const change = shown.value - first;
  const up = change >= 0;
  const color = up ? UP : DOWN;

  return (
    <DemoStage
      align="top"
      bleed
      footer={<Trigger tone="primary" label="Buy Ethereum" onPress={() => {}} />}>
      <View style={styles.header}>
        <View style={styles.asset}>
          <IconTile emoji="💎" color="#E8F0FF" size={36} />
          <Text variant="bodyStrong">Ethereum</Text>
          <Text variant="label" color="textSecondary">
            ETH
          </Text>
        </View>
        <Text variant="display">{formatPrice(shown.value)}</Text>
        <Text variant="label" style={{ color }}>
          {up ? '+' : '−'}
          {formatPrice(Math.abs(change))} ({((Math.abs(change) / first) * 100).toFixed(2)}%){' '}
          <Text variant="label" color="textSecondary">
            {selected
              ? formatDate(selected.date, range)
              : range === '1D'
                ? 'Today'
                : `Past ${range}`}
          </Text>
        </Text>
      </View>

      <LineGraph
        style={styles.graph}
        animated
        points={points}
        color={color}
        gradientFillColors={[`${color}38`, `${color}00`]}
        enablePanGesture
        panGestureDelay={0}
        enableIndicator
        indicatorPulsating
        horizontalPadding={28}
        verticalPadding={20}
        onGestureStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        onPointSelected={(point) => {
          setSelected(point);
          Haptics.selectionAsync();
        }}
        onGestureEnd={() => setSelected(null)}
      />

      <VariantBar
        value={range}
        options={TIME_RANGES}
        onChange={(next) => {
          Haptics.selectionAsync();
          setRange(next);
        }}
      />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, gap: spacing.xs },
  asset: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  graph: { height: 340 },
});
