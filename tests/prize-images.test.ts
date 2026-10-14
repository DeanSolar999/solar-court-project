import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
const prizeData = page.match(/const prizes = \[([\s\S]*?)\n\];/)?.[1];
assert.ok(prizeData, 'the secondary prize catalogue exists');
const prizes = [...prizeData.matchAll(/\{([^}]+)\}/g)].map((match) => {
  const value = (key: string) => match[1].match(new RegExp(`${key}: '([^']+)'`))?.[1];
  return { count: Number(value('count')), name: value('name'), image: value('image'), alt: value('alt') };
});
const prizeCards = page.slice(page.indexOf('{prizes.map('), page.indexOf('id="prize-illustration-note"'));

test('keeps all four secondary prizes and the original thirty-prize total', () => {
  assert.deepEqual(prizes.map(({ name, count }) => ({ name, count })), [
    { name: '高級球袋', count: 3 }, { name: '運動毛巾', count: 6 },
    { name: '運動襪', count: 10 }, { name: '曜日球衣', count: 10 },
  ]);
  assert.equal(prizes.reduce((total, prize) => total + prize.count, 1), 30);
  assert.match(page, /頭獎 · 1 名 · 1 支/);
});

test('ships a distinct WebP illustration with descriptive non-product alt text for every card', () => {
  assert.deepEqual(prizes.map(({ image }) => image), [
    'prizes/bag-illustration-v1.webp', 'prizes/towel-illustration-v1.webp',
    'prizes/socks-illustration-v1.webp', 'prizes/jersey-illustration-v1.webp',
  ]);
  for (const prize of prizes) {
    assert.ok(prize.image && prize.alt && prize.name);
    assert.ok(prize.alt.includes(prize.name));
    assert.match(prize.alt, /AI 生成示意圖，非實際獎品/);
    const asset = readFileSync(new URL(`../public/${prize.image}`, import.meta.url));
    assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF', prize.image);
    assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP', prize.image);
    assert.ok(asset.length > 12, prize.image);
  }
});

test('reserves square image space, loads lazily and respects the GitHub Pages base path', () => {
  assert.ok(prizeCards.includes('src={import.meta.env.BASE_URL + prize.image}'));
  assert.match(prizeCards, /alt=\{prize.alt\}/);
  assert.match(prizeCards, /width=\{1024\} height=\{1024\}/);
  assert.match(prizeCards, /loading="lazy" decoding="async"/);
  assert.match(prizeCards, /className="prize-image"/);
  assert.match(styles, /\.prize-image \{[^}]*aspect-ratio: 1;[^}]*object-fit: contain/);
  assert.match(page, /className="prize-grid" aria-describedby="prize-illustration-note"/);
  assert.match(styles, /minmax\(min\(100%, 9\.75rem\), 1fr\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.prize-card:hover \{ transform: none; \}/);
});

test('labels each mockup and retains the real racket image without extra prize promises', () => {
  assert.match(prizeCards, /<figcaption[^>]*>AI 生成示意圖／非實際獎品<\/figcaption>/);
  assert.match(page, /實際款式、顏色、品牌與型號以後續公告為準/);
  assert.match(page, /各獎品價值、付款與扣繳資料仍待定案/);
  assert.ok(page.includes("src={import.meta.env.BASE_URL + 'mizuno-fortius-11-power.jpg'}"));
  assert.match(page, /圖片展示 QUICK 與 POWER 兩款；本次頭獎為 FORTIUS 11 POWER 一支/);
});
