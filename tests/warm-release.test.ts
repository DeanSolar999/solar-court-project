import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const digest = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');

test('warm release changes only visual App references and preserves deployment, registration and document bytes', () => {
  const originalApp = read('src/App.tsx')
    .replaceAll('WarmCampaignHero', 'PixelCampaignHero')
    .replaceAll('warm-campaign-hero', 'pixel-campaign-hero')
    .replaceAll('warm-qualification', 'pixel-qualification')
    .replaceAll('-warm-v1.webp', '-illustration-v1.webp');
  assert.equal(digest(originalApp), '55e339141fc532753d0fdd3ce0a0ea4a57d942d439f0b8282e31fb88f936f0dc');
  const hashes = {
    'src/pages/activity-details.tsx': 'ac235502e48950267f59beb395f1d2a67b07c386231aeca4576bf486856ae5bb',
    'src/components/registration-link.tsx': '67bff6d045559adaee1907012ac117d468e2eb91c0c8eb578c1c41e88c402e4f',
    'src/components/mobile-registration-cta.tsx': 'cc7753aef3e493c809b30d1dc8e4dbccdb7f52ab801224f2f492ed4e9a032758',
    'index.html': '495baf0b742d11317b0719210f6b8b8728fdf01d89096ff435e4dd02301ba849',
    'package.json': '79b2083f761e063a19e4a778a2d6c9f9096ed1360bda721dcead27cf8f7e9a35',
    'package-lock.json': 'b7eaa5777f69d662d0794441552ef6b648aef29dceff4141ae17f9ea6d1edc2e',
    '.github/workflows/deploy-pages.yml': '1f7a4902aae41e1776497f0bb79ec09ea74b50b65eeb81f939b08b05adbaedce',
    'public/brand/solar-badminton-logo.svg': 'd7ae3842e498f2ac6a9279aed460f03165aaa9a1b4740a6a046787479b7d1594',
    'public/mizuno-fortius-11-power.jpg': '15fdfa7c89124404eed26f083cb6fa7eb069a72c449bc770a74134084737a625',
  };
  for (const [file, hash] of Object.entries(hashes)) {
    assert.equal(digest(readFileSync(new URL('../' + file, import.meta.url))), hash, file);
  }
  for (const file of ['preview-server.mjs', 'preview-server.d.mts', 'preview-guard.js', 'preview-guard.css', 'tests/warm-preview.test.ts']) {
    assert.equal(existsSync(new URL('../' + file, import.meta.url)), false, file);
  }
  const sourceFiles = readdirSync(new URL('../src/', import.meta.url), { recursive: true }).filter((file) => /\.(tsx?|css)$/.test(String(file)));
  for (const file of sourceFiles) assert.doesNotMatch(read('src/' + file), /preview-guard|preview-server|preview-external|本機設計預覽|設計預覽不會進入正式填表|connect-src 'none'|form-action 'none'/);
});

test('all eleven active generated artworks use warm assets while original official images remain intact', () => {
  const visuals = read('src/components/campaign-visuals.tsx');
  assert.ok(visuals.includes("'icons/' + name + '-warm-v1.webp'"));
  assert.match(visuals, /width=\{640\} height=\{640\} alt="" aria-hidden="true" loading="lazy"/);
  for (const [folder, names] of [['prizes', ['bag', 'towel', 'socks', 'jersey']], ['icons', ['draw', 'priority', 'discount', 'bonus', 'community']]] as const) {
    for (const name of names) {
      const bytes = readFileSync(new URL('../public/' + folder + '/' + name + '-warm-v1.webp', import.meta.url));
      assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
      assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');
    }
  }
  assert.ok(visuals.includes("'marketing/' + name + '-illustration-warm-v1.webp'"));
  for (const name of ['registration', 'court-support']) {
    const bytes = readFileSync(new URL('../public/marketing/' + name + '-illustration-warm-v1.webp', import.meta.url));
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');
  }
  const activeComponents = read('src/App.tsx') + visuals + read('src/components/warm-campaign-hero.tsx');
  assert.doesNotMatch(activeComponents, /pixel-home-|illustration-v[12]\.webp|icons\/[^']*-v1\.webp/);
  const css = read('src/index.css');
  assert.match(css, /\.invitation-layout > \.campaign-icon \{[^}]*width: min\(100%, 17rem\);[^}]*object-fit: contain/);
  assert.match(css, /\.invitation-layout \{ grid-template-columns: minmax\(0, 20rem\) minmax\(0, 1fr\)/);
  assert.doesNotMatch(css, /arcade|data-concept|pixel-picture/);
});
