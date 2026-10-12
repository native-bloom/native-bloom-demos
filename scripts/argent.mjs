#!/usr/bin/env node
/**
 * Thin wrapper over the Argent CLI for checking demos on the iOS simulator when
 * the Argent MCP tools are not loaded in the agent session.
 *
 *   npm run argent -- open <library> <demo>     # deep link to a demo
 *   npm run argent -- buttons                   # list tappable elements
 *   npm run argent -- tap "<label>" [--exact] [--nth N]
 *   npm run argent -- swipe-back                # left-edge swipe
 *   npm run argent -- shot <name>               # screenshot to .argent/shots/<name>.png
 *
 * Device: $ARGENT_UDID, or the first booted iOS simulator.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const run = (args) => execFileSync('argent', ['run', ...args], { encoding: 'utf8' });

function udid() {
  if (process.env.ARGENT_UDID) return process.env.ARGENT_UDID;
  const { devices } = JSON.parse(run(['list-devices', '--json']));
  const device = devices.find((d) => d.platform === 'ios' && d.state === 'Booted');
  if (!device) throw new Error('No booted iOS simulator. Boot one or set ARGENT_UDID.');
  return device.udid;
}

function elements(id) {
  const { description } = JSON.parse(run(['describe', '--udid', id, '--json']));
  return description
    .split('\n')
    .map((line) => line.match(/^\s*(\S+)\s+"([^"]*)".*\(([\d.]+), ([\d.]+), ([\d.]+), ([\d.]+)\)/))
    .filter(Boolean)
    .map(([, role, label, x, y, w, h]) => ({ role, label, x: +x + +w / 2, y: +y + +h / 2 }));
}

const [command, ...rest] = process.argv.slice(2);
const id = udid();

switch (command) {
  case 'open': {
    const [library, demo] = rest;
    run(['open-url', '--udid', id, '--url', `nativebloomdemos://demo/${library}/${demo}`]);
    console.log(`opened ${library}/${demo}`);
    break;
  }
  case 'buttons':
    for (const e of elements(id))
      if (/Button|Group|TextField/.test(e.role)) console.log(`${e.role} "${e.label}"`);
    break;
  case 'tap': {
    const label = rest[0];
    const exact = rest.includes('--exact');
    const nth = rest.includes('--nth') ? Number(rest[rest.indexOf('--nth') + 1]) : 0;
    const matches = elements(id).filter((e) =>
      exact ? e.label === label : e.label.toLowerCase().includes(label.toLowerCase()),
    );
    const target = matches[nth];
    if (!target) {
      console.error(`Not found: "${label}". Run \`npm run argent -- buttons\` to list elements.`);
      process.exit(1);
    }
    run(['gesture-tap', '--udid', id, '--x', target.x.toFixed(3), '--y', target.y.toFixed(3)]);
    console.log(`tapped "${target.label}"`);
    break;
  }
  case 'swipe-back':
    run([
      'gesture-swipe',
      '--udid',
      id,
      '--fromX',
      '0.01',
      '--fromY',
      '0.5',
      '--toX',
      '0.8',
      '--toY',
      '0.5',
    ]);
    console.log('swiped back');
    break;
  case 'shot': {
    const dir = join(process.cwd(), '.argent', 'shots');
    mkdirSync(dir, { recursive: true });
    const out = join(dir, `${rest[0] ?? 'shot'}.png`);
    run(['screenshot', '--udid', id, '--scale', '0.4', '--out', out]);
    console.log(out);
    break;
  }
  default:
    console.error(
      'Commands: open <library> <demo> | buttons | tap "<label>" [--exact] [--nth N] | swipe-back | shot <name>',
    );
    process.exit(1);
}
