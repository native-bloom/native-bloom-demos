import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, View } from 'react-native';

import { getLibrary } from '@/demos/registry';
import { DEMO_LEVELS, DEMO_LEVEL_LABELS, demosByLevel } from '@/demos/types';
import {
  Badge,
  HeaderButton,
  Card,
  IconTile,
  ListRow,
  Screen,
  Section,
  Text,
  spacing,
} from '@/design-system';

const LEVEL_TONE = { basic: 'success', intermediate: 'accent', advanced: 'warning' } as const;

export default function LibraryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const library = getLibrary(slug);

  if (!library) {
    return (
      <Screen header={{ title: 'Not found' }}>
        <Card>
          <Text>No library with slug “{slug}”.</Text>
        </Card>
      </Screen>
    );
  }

  const grouped = demosByLevel(library);

  return (
    <Screen header={{ title: library.name, subtitle: `${library.demos.length} demos` }}>
      <Card padding="md" style={styles.hero}>
        <IconTile emoji={library.emoji} color={library.color} size={48} />
        <View style={styles.heroText}>
          <Text variant="bodyStrong">{library.name}</Text>
          <Text variant="label" color="textSecondary" numberOfLines={2}>
            {library.tagline}
          </Text>
        </View>
        <View style={styles.links}>
          {library.links.map((link) => (
            <HeaderButton
              key={link.url}
              icon={link.icon}
              label={link.label}
              onPress={() => WebBrowser.openBrowserAsync(link.url)}
            />
          ))}
        </View>
      </Card>

      {DEMO_LEVELS.map((level) =>
        grouped[level].length ? (
          <Section
            key={level}
            title={DEMO_LEVEL_LABELS[level]}
            action={<Badge label={`${grouped[level].length}`} tone={LEVEL_TONE[level]} />}>
            <Card padding={0}>
              {grouped[level].map((demo, i) => (
                <ListRow
                  key={demo.slug}
                  divider={i > 0}
                  leading={<IconTile emoji={demo.emoji} size={40} />}
                  title={demo.title}
                  subtitle={demo.description}
                  onPress={() =>
                    router.push({
                      pathname: '/demo/[library]/[demo]',
                      params: { library: library.slug, demo: demo.slug },
                    })
                  }
                />
              ))}
            </Card>
          </Section>
        ) : null,
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heroText: { flex: 1, gap: 2 },
  links: { flexDirection: 'row', gap: spacing.sm },
});
