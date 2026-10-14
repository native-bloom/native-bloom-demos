/**
 * Segmented Control · Custom styles
 *
 * `tintColor` paints the selected segment and `backgroundColor` the track
 * (iOS 13+). `fontStyle` and `activeFontStyle` set color, size, weight and
 * family for the normal and selected labels. Make the control taller with
 * `style={{ height }}`. On iOS 26, round and clip the view
 * (`borderRadius` + `overflow: 'hidden'`) when you set `backgroundColor`, or
 * the color fills a square behind the pill-shaped control. On Android and
 * web, `tabStyle` and `sliderStyle` style the JavaScript tabs and slider
 * further.
 */
import SegmentedControl, {
  type SegmentedControlProps,
} from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const LOOKS = [
  { value: 'blue', label: 'Blue' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'matcha', label: 'Matcha' },
  { value: 'large', label: 'Large' },
] as const;

type Look = (typeof LOOKS)[number]['value'];

// iOS 26 draws `backgroundColor` as a square behind the pill-shaped control;
// rounding and clipping the view keeps the track a pill.
const ROUNDED = { borderRadius: 100, overflow: 'hidden' } as const;

const STYLES: Record<Look, SegmentedControlProps> = {
  blue: {
    tintColor: '#3478F6',
    activeFontStyle: { color: '#FFFFFF', fontWeight: '600' },
  },
  strawberry: {
    style: ROUNDED,
    tintColor: '#FF2D78',
    backgroundColor: '#FFE4EC',
    fontStyle: { color: '#B0144A' },
    activeFontStyle: { color: '#FFFFFF', fontWeight: '700' },
  },
  matcha: {
    style: ROUNDED,
    tintColor: '#FFFFFF',
    backgroundColor: '#5DA05A',
    fontStyle: { color: '#EAF7EE', fontFamily: 'Georgia' },
    activeFontStyle: { color: '#2F6B31', fontFamily: 'Georgia', fontWeight: '700' },
  },
  large: {
    style: { height: 52 },
    fontStyle: { fontSize: 17 },
    activeFontStyle: { fontSize: 17, fontWeight: '700' },
  },
};

export function StylesDemo() {
  const [look, setLook] = useState<Look>('strawberry');
  const [index, setIndex] = useState(0);

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={look} options={LOOKS} onChange={setLook} />}>
        <SegmentedControl
          key={look}
          values={['Cookies', 'Cakes', 'Pies']}
          selectedIndex={index}
          onChange={(event) => setIndex(event.nativeEvent.selectedSegmentIndex)}
          {...STYLES[look]}
        />
      </Showcase>
    </DemoStage>
  );
}
