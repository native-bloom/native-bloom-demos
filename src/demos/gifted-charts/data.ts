/**
 * Sample data for the react-native-gifted-charts demos.
 *
 * The charts take plain arrays (`{ value, label }` for bars and lines,
 * `{ value, color }` for pies) and fetch nothing, so in an app these come
 * from your API or a health / finance store. Series that look random are
 * generated with a seeded random walk, so every recording shows the same
 * shapes.
 */

/** Small deterministic PRNG (mulberry32). */
export function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A random walk of `count` values starting at `start`, kept inside [min, max]. */
export function walk(
  count: number,
  start: number,
  step: number,
  min: number,
  max: number,
  seed = 7,
) {
  const random = seeded(seed);
  const values = [start];
  for (let i = 1; i < count; i++) {
    const next = values[i - 1]! + (random() - 0.5) * 2 * step;
    values.push(Math.round(Math.min(max, Math.max(min, next))));
  }
  return values;
}

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Daily steps for one week, per friend. */
export const weeklySteps = {
  sam: [6200, 8400, 7100, 10300, 9200, 12600, 4800],
  alex: [9800, 7600, 11200, 8900, 6400, 5200, 10800],
  leo: [4300, 5100, 6800, 5900, 7400, 9900, 11600],
} as const;

/** Memories saved per month. */
export const memoriesPerMonth = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 18 },
  { label: 'Mar', value: 15 },
  { label: 'Apr', value: 24 },
  { label: 'May', value: 21 },
  { label: 'Jun', value: 30 },
  { label: 'Jul', value: 27 },
];

/** Share of memories per category. */
export const memoryCategories = [
  { label: 'Cooking', value: 38, color: '#F59E0B', emoji: '🍪' },
  { label: 'Cafés', value: 24, color: '#22C55E', emoji: '🍵' },
  { label: 'Friends', value: 20, color: '#3478F6', emoji: '🥳' },
  { label: 'Travel', value: 18, color: '#EC4899', emoji: '🗺️' },
];

/** Minutes per day in each part of the app, Monday to Sunday. */
export const screenTime = [
  { social: 42, photos: 18, maps: 12 },
  { social: 35, photos: 24, maps: 8 },
  { social: 50, photos: 15, maps: 20 },
  { social: 28, photos: 30, maps: 14 },
  { social: 46, photos: 22, maps: 26 },
  { social: 64, photos: 40, maps: 34 },
  { social: 58, photos: 36, maps: 18 },
];

/** Monthly spending per category, in dollars. */
export const spending = [
  { label: 'Groceries', value: 142, color: '#22C55E', emoji: '🛒' },
  { label: 'Dining out', value: 118, color: '#F59E0B', emoji: '🍜' },
  { label: 'Cafés', value: 86, color: '#3478F6', emoji: '🍵' },
  { label: 'Transport', value: 54, color: '#8B5CF6', emoji: '🚲' },
  { label: 'Gifts', value: 40, color: '#EC4899', emoji: '🎁' },
];

/** Daily steps for the last 30 days, oldest first. */
export const monthSteps = walk(30, 7400, 2200, 2500, 14000, 11).map((value, i) => ({
  value,
  date: `Oct ${i + 1}`,
  label: i % 7 === 0 ? `${i + 1} Oct` : '',
}));
