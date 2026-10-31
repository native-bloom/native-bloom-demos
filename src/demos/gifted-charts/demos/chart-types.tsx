/**
 * Gifted Charts · More chart types
 *
 * Beyond bars, lines and pies the library ships four more chart components
 * with the same prop style:
 * - `RadarChart` takes `data` (numbers) and `labels`; `polygonConfig` and
 *   `gridConfig` color the shape and the web.
 * - `PopulationPyramid` takes `{ left, right }` rows and draws them back to back.
 * - `CandleStickChart` takes `{ open, close, high, low }` and colors rising and
 *   falling candles (`bullishColor` / `bearishColor` are swapped in 1.4.81, so
 *   the demo colors each candle through its `color`).
 * - `BubbleChart` takes `{ x, y, r }` points; `scatterChart` would draw dots.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  BubbleChart,
  CandleStickChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useColors } from '@/design-system';
import { useAxisTheme } from '../theme';

type ChartType = 'radar' | 'pyramid' | 'candles' | 'bubbles';

const OPTIONS = [
  { value: 'radar', label: 'Radar' },
  { value: 'pyramid', label: 'Pyramid' },
  { value: 'candles', label: 'Candles' },
  { value: 'bubbles', label: 'Bubbles' },
] as const;

const TITLES: Record<ChartType, [string, string]> = {
  radar: ['Kettl gyokuro', 'Taste profile'],
  pyramid: ['Bond members', 'By age, women and men'],
  candles: ['Matcha price', 'Per tin, last 8 weeks'],
  bubbles: ['Cafés nearby', 'Distance, visits and rating'],
};

const pyramid = [
  { left: 9, right: 7 },
  { left: 14, right: 12 },
  { left: 22, right: 19 },
  { left: 26, right: 24 },
  { left: 18, right: 20 },
  { left: 11, right: 13 },
].map((row) => ({ ...row, leftBarColor: '#EC4899', rightBarColor: '#3478F6' }));

const AGES = ['55+', '45–54', '35–44', '25–34', '18–24', '13–17'];

const candles = [
  { open: 32, close: 35, high: 37, low: 30 },
  { open: 35, close: 33, high: 36, low: 31 },
  { open: 33, close: 38, high: 40, low: 32 },
  { open: 38, close: 41, high: 43, low: 37 },
  { open: 41, close: 39, high: 42, low: 36 },
  { open: 39, close: 44, high: 46, low: 38 },
  { open: 44, close: 42, high: 47, low: 40 },
  { open: 42, close: 47, high: 49, low: 41 },
].map((c) => {
  // In 1.4.81 `bullishColor` goes to candles that close lower than they open,
  // so color each candle from its own data instead.
  const color = c.close >= c.open ? '#22C55E' : '#EF4444';
  return { ...c, color, barBorderColor: color };
});

// x: minutes on foot, y: visits this year, r: rating (bigger is better).
const bubbles = [
  { x: 6, y: 16, r: 24, label: 'Kettl' },
  { x: 12, y: 11, r: 20, label: 'Plentea' },
  { x: 17, y: 5, r: 14 },
  { x: 9, y: 4, r: 9 },
  { x: 14, y: 8, r: 11 },
].map((b, i) => ({
  ...b,
  bubbleColor: ['#22C55E', '#3478F6', '#F59E0B', '#A3A3AA', '#A3A3AA'][i],
  labelTextStyle: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
}));

export function ChartTypesDemo() {
  const colors = useColors();
  const axis = useAxisTheme();
  const [type, setType] = useState<ChartType>('radar');
  const [title, subtitle] = TITLES[type];

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={type} options={OPTIONS} onChange={setType} />}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        <View style={styles.chart}>
          {type === 'radar' ? (
            <RadarChart
              data={[82, 65, 90, 48, 72]}
              labels={['Sweet', 'Bitter', 'Umami', 'Floral', 'Nutty']}
              maxValue={100}
              noOfSections={4}
              chartSize={260}
              labelConfig={{ stroke: colors.textSecondary, fontSize: 13, fontWeight: '600' }}
              gridConfig={{ stroke: colors.border, fill: colors.surface, showGradient: false }}
              asterLinesConfig={{ stroke: colors.border }}
              polygonConfig={{
                stroke: '#22C55E',
                strokeWidth: 2.5,
                fill: 'rgba(34, 197, 94, 0.25)',
              }}
            />
          ) : null}
          {type === 'pyramid' ? (
            <PopulationPyramid
              data={pyramid}
              width={300}
              height={220}
              yAxisLabelTexts={AGES}
              yAxisLabelWidth={44}
              yAxisLabelColor={axis.yAxisTextStyle.color}
              yAxisLabelFontSize={11}
              xAxisColor={axis.xAxisColor}
              showXAxisLabelTexts={false}
              showVerticalLines={false}
              showXAxisIndices={false}
              rulesColor={axis.rulesColor}
              hideYAxisText={false}
              yAxisThickness={0}
              midAxisThickness={0}
              barBorderRadius={4}
              showValuesAsBarLabels
              barLabelColor={axis.xAxisLabelTextStyle.color}
              barLabelFontSize={10}
              leftBarLabelSuffix="%"
              rightBarLabelSuffix="%"
            />
          ) : null}
          {type === 'candles' ? (
            <CandleStickChart
              {...axis}
              data={candles}
              width={260}
              height={200}
              barWidth={16}
              spacing={14}
              initialSpacing={12}
              noOfSections={5}
              maxValue={50}
              yAxisLabelWidth={32}
              yAxisLabelPrefix="$"
              bullishVerticalLineColor="#A3A3AA"
              bearishVerticalLineColor="#A3A3AA"
              disableScroll
            />
          ) : null}
          {type === 'bubbles' ? (
            <BubbleChart
              {...axis}
              data={bubbles}
              width={260}
              height={200}
              // The bubble chart pads its axes to fit the bubbles, so the tick
              // values come out uneven; this demo shows the grid without numbers.
              hideYAxisText
              xAxisLabelTexts={[]}
              maxX={20}
              maxY={20}
              yNoOfSections={4}
              yAxisLabelWidth={28}
              initialSpacing={0}
              opacity={0.85}
              disableScroll
            />
          ) : null}
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 13, marginTop: 2, marginBottom: 12 },
  chart: { height: 270, alignItems: 'center', justifyContent: 'center' },
});
