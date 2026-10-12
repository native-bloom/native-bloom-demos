#!/usr/bin/env node
/**
 * Checks the file conventions agents and the website rely on:
 *
 * - component demos: src/demos/<library>/demos/<slug>.tsx exists and starts with a JSDoc header
 * - flow demos:      src/demos/<library>/demos/<slug>/layout.tsx exists with a JSDoc header,
 *                    and src/app/flows/<library>/<slug>/_layout.tsx re-exports it
 * - every file or folder under src/demos/<library>/demos/ is registered in index.ts
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const demosRoot = join(root, 'src', 'demos');
const problems = [];
let count = 0;

const hasHeader = (file) => readFileSync(file, 'utf8').trimStart().startsWith('/**');

for (const library of readdirSync(demosRoot)) {
  const dir = join(demosRoot, library);
  if (library.startsWith('_') || !statSync(dir).isDirectory()) continue;
  const indexPath = join(dir, 'index.ts');
  if (!existsSync(indexPath)) {
    problems.push(`${library}: missing index.ts`);
    continue;
  }

  const index = readFileSync(indexPath, 'utf8');
  const demosBlock = index.slice(index.indexOf('demos: ['));
  // Each demo entry is a flat object literal: { slug: '…', kind: '…', … }
  const entries = [...demosBlock.matchAll(/\{([^{}]*)\}/g)]
    .map((m) => ({
      slug: m[1].match(/slug:\s*'([^']+)'/)?.[1],
      kind: m[1].match(/kind:\s*'([^']+)'/)?.[1],
    }))
    .filter((e) => e.slug);

  const demosDir = join(dir, 'demos');
  const onDisk = existsSync(demosDir)
    ? readdirSync(demosDir)
        .filter((f) => f.endsWith('.tsx') || statSync(join(demosDir, f)).isDirectory())
        .map((f) => f.replace(/\.tsx$/, ''))
    : [];

  for (const { slug, kind } of entries) {
    count++;
    const id = `${library}/${slug}`;
    if (!kind) problems.push(`${id}: missing kind`);
    if (kind === 'flow') {
      const layout = join(demosDir, slug, 'layout.tsx');
      const route = join(root, 'src', 'app', 'flows', library, slug, '_layout.tsx');
      if (!existsSync(layout))
        problems.push(`${id}: no flow layout at src/demos/${library}/demos/${slug}/layout.tsx`);
      else if (!hasHeader(layout))
        problems.push(`${id}: layout.tsx must start with a JSDoc header comment`);
      if (!existsSync(route))
        problems.push(`${id}: no route at src/app/flows/${library}/${slug}/_layout.tsx`);
    } else {
      const file = join(demosDir, `${slug}.tsx`);
      if (!existsSync(file))
        problems.push(`${id}: no file at src/demos/${library}/demos/${slug}.tsx`);
      else if (!hasHeader(file))
        problems.push(`${id}: file must start with a JSDoc header comment`);
    }
  }

  const slugs = entries.map((e) => e.slug);
  for (const name of onDisk) {
    if (!slugs.includes(name))
      problems.push(`${library}/demos/${name}: not registered in index.ts`);
  }
}

if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${count} demos, all files present and registered`);
