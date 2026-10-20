/**
 * True Sheet · Stacked sheets
 *
 * Presenting a sheet while another is open stacks it on top; the sheets don't
 * need to be nested. Dismissing the top one brings the previous one back.
 * `dismissStack()` closes only the sheets above the one you call it on, and
 * `TrueSheet.dismissAll()` closes the whole stack in one animation.
 */
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { stickerArt } from '@/demos/_shared/fixtures';
import { Picture } from '@/demos/_shared/picture';
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';
import { Button, IconTile, Text, radius, spacing } from '@/design-system';

const PHOTOS = [
  stickerArt.tileCode,
  stickerArt.tileSurf,
  stickerArt.tileSkate,
  stickerArt.tileDuck,
];

export function StackingDemo() {
  const album = useRef<TrueSheet>(null);
  const picker = useRef<TrueSheet>(null);
  const caption = useRef<TrueSheet>(null);

  return (
    <DemoStage>
      <TriggerStack>
        <Trigger
          tone="primary"
          emoji="🧁"
          label="Festive treats album"
          onPress={() => album.current?.present()}
        />
      </TriggerStack>

      <TrueSheet ref={album} detents={['auto']}>
        <View style={styles.content}>
          <View style={styles.row}>
            <IconTile emoji="🧁" color="#FFE4EC" size={52} />
            <View>
              <Text variant="heading">Festive treats</Text>
              <Text variant="caption" color="textSecondary">
                12 memories · shared with Sam Lee
              </Text>
            </View>
          </View>
          <Button
            label="Add photos"
            emoji="🖼️"
            fullWidth
            onPress={() => picker.current?.present()}
          />
        </View>
      </TrueSheet>

      <TrueSheet ref={picker} detents={['auto']}>
        <View style={styles.content}>
          <Text variant="heading">Choose photos</Text>
          <View style={styles.grid}>
            {PHOTOS.map((art, i) => (
              <Picture key={i} art={art} style={styles.photo} />
            ))}
          </View>
          <Button label="Next" fullWidth onPress={() => caption.current?.present()} />
        </View>
      </TrueSheet>

      <TrueSheet ref={caption} detents={['auto']}>
        <View style={styles.content}>
          <Text variant="heading">Ready to add 4 photos</Text>
          <Text color="textSecondary">Go back to the album, or close everything at once.</Text>
          <Button
            label="Back to album"
            variant="soft"
            fullWidth
            onPress={() => album.current?.dismissStack()}
          />
          <Button label="Add and close" fullWidth onPress={() => TrueSheet.dismissAll()} />
        </View>
      </TrueSheet>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing['2xl'], paddingTop: spacing['3xl'], gap: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  grid: { flexDirection: 'row', gap: spacing.sm },
  photo: { flex: 1, aspectRatio: 1, borderRadius: radius.sm },
});
