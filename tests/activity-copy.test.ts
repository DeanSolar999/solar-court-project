import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  FIRST_DRAW_DATE_TEXT,
  FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT,
  REGISTRATION_CLOSES_AT,
  REGISTRATION_DEADLINE_TEXT,
} from '../src/lib/registration-config.ts';

const page = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const entry = readFileSync(new URL('../src/components/registration-form.tsx', import.meta.url), 'utf8');
const marketing = readFileSync(new URL('../src/lib/marketing-content.ts', import.meta.url), 'utf8');
const metadata = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('keeps the first-draw cutoff, draw day and venue-registration deadline distinct', () => {
  assert.equal(FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT, '2026 年 12 月 31 日（台北時間）');
  assert.equal(FIRST_DRAW_DATE_TEXT, '2027 年 1 月 10 日');
  assert.equal(REGISTRATION_DEADLINE_TEXT, '2027 年 12 月 31 日 23:59:59（台北時間）');
  assert.equal(REGISTRATION_CLOSES_AT, Date.parse('2028-01-01T00:00:00+08:00'));
  for (const [caption, constant] of [
    ['首波抽獎資格截止', 'FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT'],
    ['首波抽獎日', 'FIRST_DRAW_DATE_TEXT'],
    ['場地協助登記截止', 'REGISTRATION_DEADLINE_TEXT'],
  ]) {
    assert.match(page, new RegExp(`${caption}</dt><dd[^>]*>\\{${constant}\\}`));
  }
});

test('does not imply later venue registrations qualify for the first drawing', () => {
  assert.ok(page.includes('資格截止後仍可協助場地登記，但不列入首波抽獎名單'));
  assert.ok(marketing.includes('首波抽獎資格已截止，新登記不列入首波名單'));
  assert.ok(!page.includes('完成資料授權就能參加'));
  assert.ok(!page.includes('各獎品價值及抽獎日期，將於正式開放前公告'));
});

test('retains approved winner and payment rules without inventing a claim start date', () => {
  assert.ok(page.includes('每人一次抽獎資格，最多一獎；以隨機方式抽出得獎者。'));
  assert.ok(page.includes('以 Email、LINE 通知得獎者；依得獎通知於 14 日內回覆、30 日內領取，逾期遞補。'));
  assert.ok(page.includes('場地登記完成並核對後，於 30 日內匯款。'));
  assert.doesNotMatch(page, /回覆後\s*30\s*日/);
});

test('sharing descriptions retain dates without an evergreen claim that raffle entry is open', () => {
  for (const name of ['description', 'og:description', 'twitter:description']) {
    const tag = metadata.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]+)"`));
    assert.ok(tag, name);
    for (const text of ['2026/12/31（含當日，台北時間）', '2027/01/10', '場地協助登記至 2027/12/31', '登記狀態請見網站']) {
      assert.ok(tag[1].includes(text), `${name}: ${text}`);
    }
  }
  assert.doesNotMatch(metadata, /正式登記開放中|就能先抽獎|就能參加首波抽獎/);
  assert.match(entry, /將前往 Google 託管表單/);
});
