import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { categories, libraries, totalDemoCount } from '@/demos/registry';
import {
  Badge,
  Card,
  Chip,
  HeaderButton,
  Icon,
  IconTile,
  Screen,
  SearchField,
  Section,
  Text,
  spacing,
  useColors,
} from '@/design-system';

function Wordmark() {
  return (
    <View style={styles.wordmark}>
      <Text variant="title" style={{ letterSpacing: -1 }}>
        native bloom
      </Text>
      <Badge label="demos" tone="accent" />
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return libraries
      .filter((l) => !category || l.category === category)
      .map((l) => {
        if (!q) return { library: l, demos: l.demos };
        const libMatch = l.name.toLowerCase().includes(q) || l.packageName.includes(q);
        const demos = l.demos.filter(
          (d) => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q),
        );
        return {
          library: l,
          demos: libMatch ? l.demos : demos,
          matchedDemos: libMatch ? [] : demos,
        };
      })
      .filter((r) => r.demos.length > 0);
  }, [query, category]);

  return (
    <Screen
      header={{
        back: false,
        center: <Wordmark />,
        right: (
          <HeaderButton icon="settings" label="Settings" onPress={() => router.push('/settings')} />
        ),
      }}>
      <Card style={styles.hero}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="caption" color="textSecondary">
            DISCOVER
          </Text>
          <Text variant="title">Native demos, curated the Bloom way</Text>
          <Text variant="label" color="textSecondary">
            {totalDemoCount()} demos across {libraries.length}{' '}
            {libraries.length === 1 ? 'library' : 'libraries'}, from basic to advanced.
          </Text>
        </View>
        <View style={styles.chips}>
          <Chip
            label="All"
            selected={category === null}
            onPress={() => setCategory(null)}
            size="sm"
          />
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={category === c}
              onPress={() => setCategory(category === c ? null : c)}
              size="sm"
            />
          ))}
        </View>
      </Card>

      <SearchField
        placeholder="Search demos and libraries"
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
      />

      <Section title="Libraries" description="Tap a library to browse its demos.">
        {results.length === 0 ? (
          <Card variant="muted">
            <Text variant="label" color="textSecondary" align="center">
              No matches for “{query}”.
            </Text>
          </Card>
        ) : null}
        {results.map(({ library, matchedDemos }) => (
          <Card
            key={library.slug}
            onPress={() =>
              router.push({ pathname: '/library/[slug]', params: { slug: library.slug } })
            }
            style={{ gap: spacing.md }}>
            <View style={styles.libraryRow}>
              <IconTile emoji={library.emoji} color={library.color} size={52} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="heading">{library.name}</Text>
                <Text variant="label" color="textSecondary" numberOfLines={2}>
                  {library.tagline}
                </Text>
              </View>
              <Icon name="forward" size={14} color="textTertiary" />
            </View>
            <View style={styles.meta}>
              <Badge label={library.category} tone="accent" />
              <Badge label={`${library.demos.length} demos`} />
              <Text
                variant="caption"
                color="textTertiary"
                numberOfLines={1}
                ellipsizeMode="middle"
                style={styles.packageName}>
                {library.packageName}
              </Text>
            </View>
            {matchedDemos && matchedDemos.length ? (
              <View style={[styles.matches, { borderTopColor: colors.border }]}>
                {matchedDemos.slice(0, 4).map((d) => (
                  <Chip
                    key={d.slug}
                    emoji={d.emoji}
                    label={d.title}
                    size="sm"
                    variant="outline"
                    onPress={() =>
                      router.push({
                        pathname: '/demo/[library]/[demo]',
                        params: { library: library.slug, demo: d.slug },
                      })
                    }
                  />
                ))}
              </View>
            ) : null}
          </Card>
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  hero: { gap: spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  libraryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  // Long scoped names (@react-native-community/…) shrink instead of overflowing the card.
  packageName: { flexShrink: 1, marginLeft: 'auto', textAlign: 'right' },
  matches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
