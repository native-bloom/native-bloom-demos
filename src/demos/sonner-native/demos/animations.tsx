/**
 * Sonner Native · Custom animations
 *
 * Pass `animation: { enter, exit }` with any Reanimated entering / exiting
 * animation: presets, spring builders or a custom `Keyframe`. Set the same
 * prop on `<Toaster />` to change every toast.
 */
import {
  FadeIn,
  FadeOut,
  Keyframe,
  SlideInDown,
  SlideInLeft,
  SlideOutDown,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

const flipIn = new Keyframe({
  0: { opacity: 0, transform: [{ perspective: 600 }, { rotateX: '-90deg' }] },
  60: { opacity: 1, transform: [{ perspective: 600 }, { rotateX: '12deg' }] },
  100: { opacity: 1, transform: [{ perspective: 600 }, { rotateX: '0deg' }] },
}).duration(500);

const flipOut = new Keyframe({
  0: { opacity: 1, transform: [{ perspective: 600 }, { rotateX: '0deg' }] },
  100: { opacity: 0, transform: [{ perspective: 600 }, { rotateX: '90deg' }] },
}).duration(250);

export function AnimationsDemo() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          emoji="🌫️"
          label="Fade"
          onPress={() =>
            toast('Fade in, fade out', {
              animation: { enter: FadeIn.duration(500), exit: FadeOut.duration(400) },
            })
          }
        />
        <Trigger
          emoji="⬆️"
          label="Slide up"
          onPress={() =>
            toast('Slides in from below', {
              position: 'bottom-center',
              animation: {
                enter: SlideInDown.springify().damping(16),
                exit: SlideOutDown.duration(250),
              },
            })
          }
        />
        <Trigger
          emoji="↔️"
          label="Slide across"
          onPress={() =>
            toast('In from the left, out to the right', {
              animation: {
                enter: SlideInLeft.springify().damping(18),
                exit: SlideOutRight.duration(250),
              },
            })
          }
        />
        <Trigger
          emoji="🔍"
          label="Zoom"
          onPress={() =>
            toast.success('Zoomed in with a spring', {
              animation: { enter: ZoomIn.springify().damping(12), exit: ZoomOut.duration(200) },
            })
          }
        />
        <Trigger
          emoji="🔄"
          label="Flip"
          onPress={() =>
            toast('Flips in with a Keyframe', {
              animation: { enter: flipIn, exit: flipOut },
            })
          }
        />
      </TriggerStack>

      <Toaster />
    </DemoStage>
  );
}
