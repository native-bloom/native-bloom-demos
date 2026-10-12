/**
 * react-native-graph · Watchlist sparklines
 *
 * Small static graphs in list rows. Leaving `animated` off uses the lightweight
 * static renderer, which is meant for many graphs on one screen.
 */
import { StyleSheet, View } from 'react-native';
import { LineGraph } from 'react-native-graph';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, Text, spacing, useColors } from '@/design-system';
import { changeBetween, formatPrice, priceHistory, randomWalk } from '../data';

const HOUR = 60 * 60 * 1000;

const ASSETS = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    emoji: '🟠',
    color: '#FFF1DB',
    start: 61000,
    drift: 0.003,
    seed: 31,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    emoji: '💎',
    color: '#E8F0FF',
    start: 3180,
    drift: 0.002,
    seed: 11,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    emoji: '🌅',
    color: '#F3E8FF',
    start: 148,
    drift: -0.003,
    seed: 17,
  },
  {
    symbol: 'AAPL',
    name: 'Apple',
    emoji: '🍎',
    color: '#FFE4EC',
    start: 228,
    drift: 0.001,
    seed: 42,
  },
  {
    symbol: 'NVDA',
    name: 'Nvidia',
    emoji: '🟩',
    color: '#EAF7EE',
    start: 132,
    drift: 0.004,
    seed: 8,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    emoji: '⚡️',
    color: '#EEEEF1',
    start: 251,
    drift: -0.004,
    seed: 25,
  },
].map((asset) => ({
  ...asset,
  // ETH shares its data with the Price chart demo.
  points:
    asset.symbol === 'ETH'
      ? priceHistory['1D']
      : randomWalk({
          count: 48,
          start: asset.start,
          volatility: 0.012,
          drift: asset.drift,
          stepMs: HOUR / 2,
          seed: asset.seed,
        }),
}));

export function SparklinesDemo() {
  const colors = useColors();
  return (
    <DemoStage align="top">
      <Card padding={0}>
        {ASSETS.map((asset, index) => {
          const change = changeBetween(asset.points);
          const up = change >= 0;
          const color = up ? '#16A34A' : '#EF4444';
          return (
            <View
              key={asset.symbol}
              style={[
                styles.row,
                index > 0 && [styles.divider, { borderTopColor: colors.border }],
              ]}>
              <IconTile emoji={asset.emoji} color={asset.color} size={40} />
              <View style={styles.name}>
                <Text variant="bodyStrong">{asset.symbol}</Text>
                <Text variant="caption" color="textSecondary">
                  {asset.name}
                </Text>
              </View>
              <LineGraph
                style={styles.sparkline}
                points={asset.points}
                color={color}
                lineThickness={2}
              />
              <View style={styles.price}>
                <Text variant="bodyStrong">
                  {formatPrice(asset.points[asset.points.length - 1]!.value)}
                </Text>
                <Text variant="caption" style={{ color }}>
                  {up ? '+' : '−'}
                  {(Math.abs(change) * 100).toFixed(2)}%
                </Text>
              </View>
            </View>
          );
        })}
      </Card>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  divider: { borderTopWidth: StyleSheet.hairlineWidth },
  name: { width: 72 },
  sparkline: { flex: 1, height: 32 },
  price: { alignItems: 'flex-end', minWidth: 92 },
});
