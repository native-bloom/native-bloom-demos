/**
 * Sonner Native · Promise toast
 *
 * `toast.promise` shows a loading toast and swaps it for a success or an error
 * toast when the promise settles. Here each suggestion runs a fake search;
 * the last one fails on purpose.
 */
import { Toaster, toast } from 'sonner-native';

import { places, type Place } from '@/demos/_shared/fixtures';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const RESULTS: Record<string, Place | null> = {
  food: places[0]!,
  friday: places[1]!,
  tv: null,
};

function searchMemories(query: keyof typeof RESULTS): Promise<Place> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const place = RESULTS[query];
      if (place) resolve(place);
      else reject(new Error('No memories about TV shows yet'));
    }, 1800);
  });
}

function discover(query: keyof typeof RESULTS) {
  toast.promise(searchMemories(query), {
    loading: 'Searching memories…',
    success: (place) => `${place.name} · ★ ${place.rating}`,
    error: (error) => (error instanceof Error ? error.message : 'Something went wrong'),
  });
}

export function PromiseDemo() {
  return (
    <DemoStage>
      <Text variant="heading" color="textSecondary" align="center">
        What are you looking for?
      </Text>
      <TriggerStack>
        <Trigger emoji="🍽️" label="Best food to get right now" onPress={() => discover('food')} />
        <Trigger emoji="🌆" label="Perfect place for Friday" onPress={() => discover('friday')} />
        <Trigger emoji="📺" label="TV show that I will love" onPress={() => discover('tv')} />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}
