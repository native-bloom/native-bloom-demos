import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

import { libraries, totalDemoCount } from '@/demos/registry';
import {
  Card,
  HeaderButton,
  ListRow,
  Screen,
  Section,
  Segmented,
  Text,
  useTheme,
  type ThemeMode,
} from '@/design-system';

const MODES = [
  { value: 'system', label: 'System', emoji: '📱' },
  { value: 'light', label: 'Light', emoji: '☀️' },
  { value: 'dark', label: 'Dark', emoji: '🌙' },
] as const satisfies readonly { value: ThemeMode; label: string; emoji: string }[];

export default function SettingsScreen() {
  const router = useRouter();
  const { mode, setMode } = useTheme();
  const isModal = Platform.OS === 'ios';

  return (
    <Screen
      header={{
        title: 'Settings',
        back: !isModal,
        inset: !isModal,
        right: isModal ? (
          <HeaderButton icon="close" label="Close" onPress={() => router.back()} />
        ) : undefined,
      }}>
      <Section
        title="Appearance"
        description="Applies to the whole app, including the library components in each demo.">
        <Segmented value={mode} options={MODES} onChange={setMode} wrap size="md" />
      </Section>

      <Section title="About">
        <Card padding={0}>
          <ListRow
            title="Native Bloom Demos"
            subtitle={`v${Constants.expoConfig?.version ?? '1.0.0'} · Expo SDK ${Constants.expoConfig?.sdkVersion ?? '57'}`}
          />
          <ListRow
            divider
            title="Libraries"
            subtitle={libraries.map((l) => l.name).join(', ')}
            trailing={
              <Text variant="label" color="textSecondary">
                {libraries.length}
              </Text>
            }
          />
          <ListRow
            divider
            title="Demos"
            trailing={
              <Text variant="label" color="textSecondary">
                {totalDemoCount()}
              </Text>
            }
          />
        </Card>
      </Section>
    </Screen>
  );
}
