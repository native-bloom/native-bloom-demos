/**
 * Sonner Native · Wiggle
 *
 * `toast.wiggle(id)` shakes a toast that is already on screen. Tap Upload,
 * then tap it again while the upload runs: instead of stacking a duplicate
 * toast, the existing one wiggles.
 *
 * Wiggle is ignored for toasts with `duration: Infinity`, so the upload toast
 * gets a finite duration that outlasts the upload. Wiggling also restarts the
 * toast's auto-close timer.
 */
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Toaster, toast } from 'sonner-native';

import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Card, IconTile, Text, spacing } from '@/design-system';

const UPLOAD_TOAST_ID = 'story-upload';

export function WiggleDemo() {
  const [uploading, setUploading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function upload() {
    if (uploading) {
      toast.wiggle(UPLOAD_TOAST_ID);
      return;
    }
    setUploading(true);
    toast.loading('Uploading story…', {
      id: UPLOAD_TOAST_ID,
      description: '3 photos',
      duration: 15000,
    });
    timer.current = setTimeout(() => {
      toast.success('Story uploaded', {
        id: UPLOAD_TOAST_ID,
        description: '3 photos',
        duration: 3000,
      });
      setUploading(false);
    }, 6000);
  }

  return (
    <DemoStage>
      <Card style={styles.card}>
        <View style={styles.photos}>
          <IconTile emoji="🍪" size={72} color="#FFF1DB" />
          <IconTile emoji="🧁" size={72} color="#FFE4EC" />
          <IconTile emoji="🎁" size={72} color="#E8F0FF" />
        </View>
        <View style={{ gap: 2 }}>
          <Text variant="heading">Festive treats with friends</Text>
          <Text variant="label" color="textSecondary">
            Desserts and Baking · 3 photos
          </Text>
        </View>
        <Trigger
          tone="primary"
          label={uploading ? 'Uploading…' : 'Upload story'}
          onPress={upload}
        />
      </Card>

      <Toaster />
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.lg, alignItems: 'center' },
  photos: { flexDirection: 'row', gap: spacing.md },
});
