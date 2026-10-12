#!/usr/bin/env node
/**
 * Scaffold a demo (and the library folder if it does not exist).
 *
 *   npm run new:demo -- <library-slug> <demo-slug> "Demo title" [--kind isolated|showcase|scenario|flow]
 *
 * Kinds are explained in DESIGN.md › Stages. Default: isolated.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const kindIndex = args.indexOf('--kind');
const kind = kindIndex >= 0 ? args[kindIndex + 1] : 'isolated';
const positional =
  kindIndex >= 0 ? args.filter((_, i) => i !== kindIndex && i !== kindIndex + 1) : args;
const [librarySlug, demoSlug, title = 'New demo'] = positional;
const KINDS = ['isolated', 'showcase', 'scenario', 'flow'];

if (!librarySlug || !demoSlug || !KINDS.includes(kind)) {
  console.error(
    'Usage: npm run new:demo -- <library-slug> <demo-slug> "Demo title" [--kind isolated|showcase|scenario|flow]',
  );
  process.exit(1);
}

const pascal = (s) => s.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const camel = (s) => pascal(s).replace(/^./, (c) => c.toLowerCase());
const libraryName = pascal(librarySlug).replace(/([a-z])([A-Z])/g, '$1 $2');
const componentName = `${pascal(demoSlug)}Demo`;
const root = join(process.cwd(), 'src', 'demos', librarySlug);
const demosDir = join(root, 'demos');
mkdirSync(demosDir, { recursive: true });

const header = (extra = '') => `/**
 * ${libraryName} · ${title}
 *
 * One paragraph: the single idea this demo shows. List extra packages and
 * platform caveats here.${extra}
 */`;

function write(path, content) {
  if (existsSync(path)) {
    console.error(`Already exists: ${path}`);
    process.exit(1);
  }
  writeFileSync(path, content);
  console.log(`Created ${path.replace(process.cwd() + '/', '')}`);
}

const templates = {
  isolated: `${header()}
import { DemoStage, Trigger, TriggerStack } from '@/demos/_shared/stage';

export function ${componentName}() {
  return (
    <DemoStage>
      <TriggerStack>
        <Trigger tone="primary" label="Try it" onPress={() => {}} />
        <Trigger emoji="✨" label="Another variant" onPress={() => {}} />
      </TriggerStack>
    </DemoStage>
  );
}
`,
  showcase: `${header()}
import { useState } from 'react';

import { DemoStage, Showcase, VariantBar } from '@/demos/_shared/stage';
import { Text } from '@/design-system';

const VARIANTS = [
  { value: 'default', label: 'Default' },
  { value: 'compact', label: 'Compact' },
] as const;

type Variant = (typeof VARIANTS)[number]['value'];

export function ${componentName}() {
  const [variant, setVariant] = useState<Variant>('default');

  return (
    <DemoStage>
      <Showcase below={<VariantBar value={variant} options={VARIANTS} onChange={setVariant} />}>
        {/* The library component goes here, configured by \`variant\`. */}
        <Text align="center">{variant}</Text>
      </Showcase>
    </DemoStage>
  );
}
`,
  scenario: `${header()}
import { DemoStage } from '@/demos/_shared/stage';
import { memories } from '@/demos/_shared/fixtures';
import { Card, IconTile, ListRow } from '@/design-system';

export function ${componentName}() {
  return (
    <DemoStage align="top">
      <Card padding={0}>
        {memories.slice(0, 3).map((memory, index) => (
          <ListRow
            key={memory.id}
            divider={index > 0}
            leading={<IconTile emoji={memory.emoji} color={memory.color} size={44} />}
            title={memory.title}
            subtitle={\`\${memory.category} · \${memory.ago}\`}
          />
        ))}
      </Card>
    </DemoStage>
  );
}
`,
};

let entry;
if (kind === 'flow') {
  const flowDir = join(demosDir, demoSlug);
  const routeDir = join(process.cwd(), 'src', 'app', 'flows', librarySlug, demoSlug);
  mkdirSync(flowDir, { recursive: true });
  mkdirSync(routeDir, { recursive: true });
  const base = `/flows/${librarySlug}/${demoSlug}`;
  write(
    join(flowDir, 'layout.tsx'),
    `${header(`
 *
 * Screens: first-screen.tsx, second-screen.tsx. In an app this layout is a
 * route group's _layout.tsx.`)}
import { Stack } from 'expo-router';

import { DemoFlow } from '@/demos/_shared/flow';
import { useColors } from '@/design-system';

export default function ${pascal(demoSlug)}FlowLayout() {
  const colors = useColors();
  return (
    <DemoFlow library="${librarySlug}">
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }} />
    </DemoFlow>
  );
}
`,
  );
  write(
    join(flowDir, 'first-screen.tsx'),
    `import { useRouter } from 'expo-router';

import { DemoStage, Trigger } from '@/demos/_shared/stage';
import { Screen } from '@/design-system';

export default function FirstScreen() {
  const router = useRouter();
  return (
    <Screen header={{ title: '${title}', back: false }} scroll={false} bleed>
      <DemoStage>
        <Trigger tone="primary" label="Open next screen" onPress={() => router.push('${base}/second')} />
      </DemoStage>
    </Screen>
  );
}
`,
  );
  write(
    join(flowDir, 'second-screen.tsx'),
    `import { DemoStage } from '@/demos/_shared/stage';
import { Screen, Text } from '@/design-system';

export default function SecondScreen() {
  return (
    <Screen header={{ title: 'Second screen' }} scroll={false} bleed>
      <DemoStage>
        <Text align="center">Second screen</Text>
      </DemoStage>
    </Screen>
  );
}
`,
  );
  const reexport = (file) =>
    `export { default } from '@/demos/${librarySlug}/demos/${demoSlug}/${file}';\n`;
  write(join(routeDir, '_layout.tsx'), reexport('layout'));
  write(join(routeDir, 'index.tsx'), reexport('first-screen'));
  write(join(routeDir, 'second.tsx'), reexport('second-screen'));
  entry = `{
      slug: '${demoSlug}',
      title: '${title}',
      emoji: '🧭',
      level: 'advanced',
      kind: 'flow',
      description: 'One sentence: the single idea this demo shows.',
      href: '${base}',
    }`;
  console.log('Run `npx expo start` once so typed routes pick up the new flow routes.');
} else {
  write(join(demosDir, `${demoSlug}.tsx`), templates[kind]);
  entry = `{
      slug: '${demoSlug}',
      title: '${title}',
      emoji: '👋',
      level: 'basic',
      kind: '${kind}',
      description: 'One sentence: the single idea this demo shows.',
      component: ${componentName},
    }`;
}

const indexPath = join(root, 'index.ts');
const importLine =
  kind === 'flow' ? '' : `import { ${componentName} } from './demos/${demoSlug}';\n`;
if (!existsSync(indexPath)) {
  writeFileSync(
    indexPath,
    `import type { LibraryDefinition } from '../types';
${importLine}
export const ${camel(librarySlug)}: LibraryDefinition = {
  slug: '${librarySlug}',
  name: '${libraryName}',
  packageName: '${librarySlug}',
  tagline: 'One line shown on the home card.',
  description: 'A paragraph for the library screen.',
  emoji: '🧩',
  color: '#E8F0FF',
  category: 'Components',
  links: [
    { label: 'GitHub', url: 'https://github.com/', icon: 'github' },
    { label: 'Docs', url: 'https://', icon: 'docs' },
  ],
  install: ['${librarySlug}'],
  demos: [
    ${entry},
  ],
};
`,
  );
  console.log(`Created src/demos/${librarySlug}/index.ts. Add it to src/demos/registry.ts.`);
} else {
  console.log(
    `\nAdd to src/demos/${librarySlug}/index.ts:\n${importLine}\n  demos: [\n    ${entry},\n  ]`,
  );
}
