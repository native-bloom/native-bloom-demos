/**
 * Enriched Markdown · GitHub flavored markdown
 *
 * `flavor="github"` switches to the GFM renderer: tables (with column
 * alignment, rich text in cells and horizontal scrolling), task lists with
 * tappable checkboxes, strikethrough, and GitHub alerts (`> [!TIP]`,
 * `> [!WARNING]`…) drawn as callouts with an icon and title. Everything keeps
 * the library's default look.
 */
import { useState } from 'react';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { useMarkdownStyle } from '../styles';

const DOCUMENTS = {
  table: `### Best matcha in Brooklyn

| Place | Rating | Walk |
| :--- | :---: | ---: |
| **Kettl** Greenpoint | 4.8 | 6 min |
| Plentea Matcha | 4.7 | 12 min |
| Neighbors Café | 4.5 | 18 min |
| ~~Green Leaf~~ | closed | – |`,
  tasks: `### Cookie swap prep

- [x] Bake jam cookies
- [x] Candy the nuts
- [ ] Pack the gift boxes
- [ ] Invite Sam and Alex
- [ ] Pick up matcha on the way`,
  alerts: `> [!TIP]
> Plentea opens at 8 am on weekends, go early.

> [!NOTE]
> Kettl only takes card payments.

> [!WARNING]
> The Greenpoint ferry skips Pier 1 this week.`,
};

type DocumentKey = keyof typeof DOCUMENTS;

const OPTIONS = [
  { value: 'table', label: 'Table', emoji: '📊' },
  { value: 'tasks', label: 'Task list', emoji: '☑️' },
  { value: 'alerts', label: 'Alerts', emoji: '💡' },
] as const;

export function GithubFlavorDemo() {
  const [doc, setDoc] = useState<DocumentKey>('table');
  const markdownStyle = useMarkdownStyle();

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={doc} options={OPTIONS} onChange={setDoc} />}>
        <EnrichedMarkdownText
          flavor="github"
          markdown={DOCUMENTS[doc]}
          markdownStyle={markdownStyle}
        />
      </Showcase>
    </DemoStage>
  );
}
