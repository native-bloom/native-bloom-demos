import { Link } from 'expo-router';

import { Button, Card, Screen, Text } from '@/design-system';

export default function NotFoundScreen() {
  return (
    <Screen header={{ title: 'Not found' }}>
      <Card style={{ gap: 12 }}>
        <Text variant="heading">This screen does not exist.</Text>
        <Link href="/" asChild>
          <Button label="Go home" />
        </Link>
      </Card>
    </Screen>
  );
}
