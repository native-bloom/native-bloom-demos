import { useRouter } from 'expo-router';

import { DemoStage } from '@/demos/_shared/stage';
import { Card, IconTile, ListRow, Screen } from '@/design-system';
import { useMemories } from './memories';

export default function MemoriesListScreen() {
  const router = useRouter();
  const { memories } = useMemories();

  return (
    <Screen header={{ title: 'Toast after navigation', back: false }} scroll={false} bleed>
      <DemoStage align="top">
        <Card padding={0}>
          {memories.map((memory, index) => (
            <ListRow
              key={memory.id}
              divider={index > 0}
              leading={<IconTile emoji={memory.emoji} color={memory.color} size={44} />}
              title={memory.title}
              subtitle={`${memory.category} · ${memory.ago}`}
              onPress={() =>
                router.push({
                  pathname: '/flows/sonner-native/navigation/edit',
                  params: { id: memory.id },
                })
              }
            />
          ))}
        </Card>
      </DemoStage>
    </Screen>
  );
}
