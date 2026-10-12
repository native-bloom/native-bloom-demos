/**
 * Sample data for the react-native-graph demos.
 *
 * The library takes `GraphPoint[]` (`{ date: Date; value: number }`, oldest first)
 * and does not fetch anything, so in an app these points come from your API.
 * Here they are generated with a seeded random walk so every recording shows
 * the same curves.
 */
import type { GraphPoint } from 'react-native-graph';

/** Small deterministic PRNG (mulberry32). */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type WalkOptions = {
  /** Number of points. */
  count: number;
  /** First value. */
  start: number;
  /** Max relative move per step, e.g. 0.03 = ±3%. */
  volatility: number;
  /** Average relative move per step; positive trends up. */
  drift?: number;
  /** Time between points in ms. */
  stepMs: number;
  seed: number;
  /** Date of the last point. Defaults to now. */
  end?: Date;
};

/** A random walk that looks like a price or a metric over time. */
export function randomWalk({
  count,
  start,
  volatility,
  drift = 0,
  stepMs,
  seed,
  end = new Date(),
}: WalkOptions): GraphPoint[] {
  const random = seeded(seed);
  const first = end.getTime() - (count - 1) * stepMs;
  let value = start;
  return Array.from({ length: count }, (_, index) => {
    if (index > 0) value *= 1 + drift + (random() * 2 - 1) * volatility;
    return { date: new Date(first + index * stepMs), value };
  });
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export type TimeRange = '1D' | '1W' | '1M' | '1Y';

export const TIME_RANGES = [
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '1Y', label: '1Y' },
] as const;

/** Latest price shared by every range, so switching ranges keeps the same "now". */
const CURRENT_PRICE = 3257.91;

/** Rescale a series so its last value equals `last`. */
function endingAt(points: GraphPoint[], last: number): GraphPoint[] {
  const factor = last / points[points.length - 1]!.value;
  return points.map((p) => ({ date: p.date, value: p.value * factor }));
}

/**
 * Every range has the same number of points. The animated graph can only morph
 * between paths with the same number of points; otherwise it jumps to the new line.
 */
const POINTS_PER_RANGE = 90;
const step = (spanMs: number) => spanMs / (POINTS_PER_RANGE - 1);

/** Price history of a fictional asset for each time range. */
export const priceHistory: Record<TimeRange, GraphPoint[]> = {
  '1D': endingAt(
    randomWalk({
      count: POINTS_PER_RANGE,
      start: 3180,
      volatility: 0.006,
      drift: 0.0004,
      stepMs: step(DAY),
      seed: 11,
    }),
    CURRENT_PRICE,
  ),
  '1W': endingAt(
    randomWalk({
      count: POINTS_PER_RANGE,
      start: 2950,
      volatility: 0.012,
      drift: 0.0009,
      stepMs: step(7 * DAY),
      seed: 7,
    }),
    CURRENT_PRICE,
  ),
  '1M': endingAt(
    randomWalk({
      count: POINTS_PER_RANGE,
      start: 3420,
      volatility: 0.02,
      drift: -0.0008,
      stepMs: step(30 * DAY),
      seed: 3,
    }),
    CURRENT_PRICE,
  ),
  '1Y': endingAt(
    randomWalk({
      count: POINTS_PER_RANGE,
      start: 1900,
      volatility: 0.04,
      drift: 0.006,
      stepMs: step(365 * DAY),
      seed: 21,
    }),
    CURRENT_PRICE,
  ),
};

export function formatPrice(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
}

export function changeBetween(points: GraphPoint[]) {
  const first = points[0]?.value ?? 0;
  const last = points[points.length - 1]?.value ?? 0;
  return first === 0 ? 0 : (last - first) / first;
}
