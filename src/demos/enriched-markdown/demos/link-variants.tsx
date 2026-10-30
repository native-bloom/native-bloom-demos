/**
 * Enriched Markdown · Link variants
 *
 * `markdownStyle.linkVariants` styles links by URL pattern: each key is a
 * regex tested against the link's URL, and its color, underline and
 * background override the base `link` style. Here `user:` links read as
 * people, `place:` links as places, and ordinary https links keep the
 * default blue underline. `onLinkPress` gets the URL, so the app decides what
 * each kind of link does: open a profile, a place, or the browser.
 */
import { useState } from 'react';
import { Linking, StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { EnrichedMarkdownText, type MarkdownStyle } from 'react-native-enriched-markdown';

import { people, places } from '@/demos/_shared/fixtures';
import { DemoStage, Showcase } from '@/demos/_shared/stage';
import { Avatar, Card, IconTile, Text } from '@/design-system';
import { useMarkdownStyle } from '../styles';

const MARKDOWN = `**Sunday plans**

Meeting [Sam Lee](user:sam) and [Alex Smith](user:alex) at [Kettl Greenpoint](place:kettl) for a tasting, then a walk to [Plentea Matcha](place:plentea).

Menu is on [kettl.co](https://kettl.co).`;

const linkVariants: MarkdownStyle['linkVariants'] = {
  '^user:': { color: '#1264A3', backgroundColor: '#E8F5FB', underline: false },
  '^place:': { color: '#065F46', backgroundColor: '#D1FAE5', underline: false },
};

const darkLinkVariants: MarkdownStyle['linkVariants'] = {
  '^user:': { color: '#7CC4F2', backgroundColor: '#14324A', underline: false },
  '^place:': { color: '#6EE7B7', backgroundColor: '#123A2C', underline: false },
};

export function LinkVariantsDemo() {
  const base = useMarkdownStyle();
  const dark = useColorScheme() === 'dark';
  const [opened, setOpened] = useState<string | null>(null);

  const markdownStyle: MarkdownStyle = {
    ...base,
    paragraph: { ...base.paragraph, fontSize: 17, lineHeight: 26 },
    linkVariants: dark ? darkLinkVariants : linkVariants,
  };

  function handleLinkPress({ url }: { url: string }) {
    if (url.startsWith('https:')) {
      Linking.openURL(url);
      return;
    }
    setOpened(url);
  }

  const person = opened?.startsWith('user:')
    ? people.find((p) => p.id === opened.slice('user:'.length))
    : undefined;
  const place = opened?.startsWith('place:')
    ? places.find((p) => p.id === opened.slice('place:'.length))
    : undefined;

  return (
    <DemoStage>
      <Showcase>
        <EnrichedMarkdownText
          markdown={MARKDOWN}
          markdownStyle={markdownStyle}
          containerStyle={{ backgroundColor: 'transparent' }}
          onLinkPress={handleLinkPress}
        />
      </Showcase>
      <View style={styles.result}>
        {person ? (
          <Animated.View key={person.id} entering={FadeIn}>
            <Card style={styles.row}>
              <Avatar name={person.name} size={44} />
              <View style={styles.rowText}>
                <Text variant="bodyStrong">{person.name}</Text>
                <Text variant="label" color="textSecondary">
                  {person.handle}
                </Text>
              </View>
            </Card>
          </Animated.View>
        ) : null}
        {place ? (
          <Animated.View key={place.id} entering={FadeIn}>
            <Card style={styles.row}>
              <IconTile emoji="🍵" color="#EEF6E2" size={44} />
              <View style={styles.rowText}>
                <Text variant="bodyStrong">{place.name}</Text>
                <Text variant="label" color="textSecondary">
                  {`${place.kind} · ★ ${place.rating}`}
                </Text>
              </View>
            </Card>
          </Animated.View>
        ) : null}
      </View>
    </DemoStage>
  );
}

const styles = StyleSheet.create({
  result: { height: 84 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { flex: 1, gap: 2 },
});
