/** Scene state shared by the two screens of the flow: the editable memory list. */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { memories as initialMemories, type Memory } from '@/demos/_shared/fixtures';

type MemoriesContextValue = {
  memories: Memory[];
  rename: (id: string, title: string) => void;
};

const MemoriesContext = createContext<MemoriesContextValue | null>(null);

export function MemoriesProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState(initialMemories.slice(0, 4));
  const value = useMemo<MemoriesContextValue>(
    () => ({
      memories,
      rename: (id, title) =>
        setMemories((list) => list.map((m) => (m.id === id ? { ...m, title } : m))),
    }),
    [memories],
  );
  return <MemoriesContext.Provider value={value}>{children}</MemoriesContext.Provider>;
}

export function useMemories(): MemoriesContextValue {
  const value = useContext(MemoriesContext);
  if (!value) throw new Error('useMemories must be used inside <MemoriesProvider>');
  return value;
}
