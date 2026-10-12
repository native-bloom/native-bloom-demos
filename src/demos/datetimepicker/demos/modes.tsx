/**
 * DateTimePicker · Picker modes
 *
 * `mode` picks what the wheels select: a date, a time, both, or a countdown
 * duration. Shown with `display="spinner"` so the difference is easy to see.
 *
 * iOS only: `datetime` and `countdown` do not exist on Android.
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';

const MODES = [
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'datetime', label: 'Date & time' },
  { value: 'countdown', label: 'Countdown' },
] as const;

type Mode = (typeof MODES)[number]['value'];

export function ModesDemo() {
  const [mode, setMode] = useState<Mode>('date');
  const [value, setValue] = useState(() => new Date());

  return (
    <DemoStage>
      <Showcase padding="sm" below={<VariantBar value={mode} options={MODES} onChange={setMode} />}>
        <DateTimePicker
          key={mode}
          value={value}
          mode={mode}
          display="spinner"
          onValueChange={(_event, selected) => setValue(selected)}
        />
      </Showcase>
    </DemoStage>
  );
}
