import assert from 'node:assert/strict';
import test from 'node:test';
import { FIRST_DRAW_CLOSES_AT, getMarketingContent } from '../src/lib/marketing-content.ts';
import { getRegistrationState, REGISTRATION_CLOSES_AT, REGISTRATION_CONFIG } from '../src/lib/registration-config.ts';

test('first-draw invitation includes the entire final Taipei day but not January 1', () => {
  assert.equal(FIRST_DRAW_CLOSES_AT, Date.parse('2026-12-31T16:00:00Z'));
  for (const now of [Date.parse('2026-10-14T12:00:00+08:00'), FIRST_DRAW_CLOSES_AT - 1]) {
    const content = getMarketingContent(now, 'open');
    assert.equal(content.phase, 'first-draw');
    assert.equal(content.firstDrawOpen, true);
    assert.match(content.qualification, /含當日，台北時間/);
    assert.match(content.qualification, /四項同意並成功送出取得回條/);
  }
});

test('after the first-draw deadline support stays open without a fresh raffle invitation', () => {
  for (const now of [FIRST_DRAW_CLOSES_AT, Date.parse('2027-01-10T12:00:00+08:00'), REGISTRATION_CLOSES_AT - 1]) {
    const state = getRegistrationState(REGISTRATION_CONFIG, now);
    const content = getMarketingContent(now, state.status);
    assert.equal(state.status, 'open');
    assert.equal(content.phase, 'court-support');
    assert.equal(content.firstDrawOpen, false);
    assert.equal(content.canRegister, true);
    assert.match(content.qualification, /首波抽獎資格已截止，新登記不列入首波名單/);
    assert.doesNotMatch(content.subtitle + content.actionLabel + content.drawLabel, /先抽獎|30 份|有機會把 MIZUNO/);
  }
});

test('the 2028 marketing state follows the existing collection shutdown', () => {
  const state = getRegistrationState(REGISTRATION_CONFIG, REGISTRATION_CLOSES_AT);
  const content = getMarketingContent(REGISTRATION_CLOSES_AT, state.status);
  assert.equal(state.formUrl, null);
  assert.equal(content.phase, 'ended');
  assert.equal(content.canRegister, false);
  assert.equal(content.actionLabel, '登記已截止');
});

test('a paused gate or invalid client clock never produces an open marketing invitation', () => {
  const paused = getMarketingContent(Date.parse('2026-10-14T12:00:00+08:00'), 'preparing');
  assert.equal(paused.canRegister, false);
  assert.equal(paused.phase, 'unavailable');
  assert.match(paused.qualification, /目前暫停收件/);
  assert.doesNotMatch(paused.qualification, /資格已截止/);
  for (const now of [NaN, Infinity, -Infinity]) {
    const content = getMarketingContent(now, 'open');
    assert.equal(content.phase, 'unavailable');
    assert.equal(content.firstDrawOpen, false);
    assert.equal(content.canRegister, false);
  }
});
