/**
 * Pressto · Toggle pressables
 *
 * Every pressable keeps an `isToggled` flag that flips on each press. The
 * worklet passed to `createAnimatedPressable` reads it next to `progress`, and
 * `withAnimation` (the pressable's own timing or spring, already configured)
 * animates the switch between the two looks. `initialToggled` sets where it
 * starts. The labels and counts flip in React state on the same press.
 *
 * pressto 0.7.0 with Reanimated 4.5: the `isToggled` passed to `onPress` still
 * holds the value from before the press, so the demo keeps its own toggle in
 * React instead of reading it.
 */
import { createAnimatedPressable } from 'pressto';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { interpolate } from 'react-native-reanimated';

import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Avatar, Icon, Text } from '@/design-system';

const FollowButton = createAnimatedPressable((progress, { isToggled, withAnimation }) => {
  'worklet';
  return {
    backgroundColor: withAnimation(isToggled ? 'rgba(127, 127, 127, 0.16)' : '#3478F6'),
    transform: [{ scale: interpolate(progress, [0, 1], [1, 0.94]) }],
  };
});

const BellToggle = createAnimatedPressable((progress, { isToggled, withAnimation }) => {
  'worklet';
  return {
    backgroundColor: withAnimation(isToggled ? '#F59E0B' : 'rgba(127, 127, 127, 0.16)'),
    transform: [
      { scale: interpolate(progress, [0, 1], [1, 0.88]) },
      { rotate: withAnimation(isToggled ? '-12deg' : '0deg') },
    ],
  };
});

const HeartToggle = createAnimatedPressable((progress, { isToggled, withAnimation }) => {
  'worklet';
  return {
    backgroundColor: withAnimation(isToggled ? '#EF4444' : 'rgba(127, 127, 127, 0.16)'),
    transform: [{ scale: interpolate(progress, [0, 1], [1, 0.82]) }],
  };
});

export function ToggleDemo() {
  const [following, setFollowing] = useState(false);
  const [notify, setNotify] = useState(false);
  const [liked, setLiked] = useState(true);

  return (
    <DemoStage>
      <Showcase>
        <View style={styles.person}>
          <Avatar name="Samsam" size={52} />
          <View style={styles.personText}>
            <Text variant="heading">Samsam</Text>
            <Text variant="label" color="textSecondary">
              @samsam
            </Text>
          </View>
          <FollowButton
            accessibilityLabel={following ? 'Following' : 'Follow'}
            onPress={() => setFollowing((on) => !on)}
            style={styles.follow}>
            <Text variant="label" color={following ? 'text' : 'onAccent'} style={styles.bold}>
              {following ? 'Following' : 'Follow'}
            </Text>
          </FollowButton>
        </View>

        <View style={styles.toggles}>
          <View style={styles.toggle}>
            <HeartToggle
              initialToggled
              accessibilityLabel="Like"
              onPress={() => setLiked((on) => !on)}
              style={styles.round}>
              <Icon name="heart" size={26} {...(liked ? { tint: '#FFFFFF' } : { color: 'text' })} />
            </HeartToggle>
            <Text variant="label" color="textSecondary">
              {liked ? '25 likes' : '24 likes'}
            </Text>
          </View>
          <View style={styles.toggle}>
            <BellToggle
              accessibilityLabel="Notify me"
              onPress={() => setNotify((on) => !on)}
              style={styles.round}>
              <Icon name="bell" size={24} {...(notify ? { tint: '#FFFFFF' } : { color: 'text' })} />
            </BellToggle>
            <Text variant="label" color="textSecondary">
              {notify ? 'Notifying' : 'Notify me'}
            </Text>
          </View>
        </View>
      </Showcase>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  person: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  personText: { flex: 1, gap: 2 },
  follow: {
    height: 38,
    minWidth: 104,
    paddingHorizontal: 16,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: { fontWeight: '700' },
  toggles: { flexDirection: 'row', justifyContent: 'center', gap: 48, marginTop: 28 },
  toggle: { alignItems: 'center', gap: 8 },
  round: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
