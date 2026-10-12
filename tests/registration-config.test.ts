import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getRegistrationState,
  isAllowedRegistrationUrl,
  REGISTRATION_CLOSES_AT,
  REGISTRATION_CONFIG,
  REGISTRATION_PREPARING_TEXT,
  type RegistrationConfig,
} from '../src/lib/registration-config.ts';

// Nonexistent example URL, used only as a syntax fixture. Never fetched.
const exampleUrl = 'https://script.google.com/macros/s/EXAMPLE_only-not-a-deployment/exec';
const ready: RegistrationConfig = {
  open: true,
  formUrl: exampleUrl,
  formUrlVerified: true,
  rulesFinalized: true,
  startsAt: '2027-01-15T09:00:00+08:00',
};
const duringCollection = Date.parse('2027-06-01T12:00:00+08:00');

test('the prepared release is closed without a URL or an invented start date', () => {
  assert.equal(REGISTRATION_CONFIG.open, false);
  assert.equal(REGISTRATION_CONFIG.formUrl, '');
  assert.equal(REGISTRATION_CONFIG.formUrlVerified, false);
  assert.equal(REGISTRATION_CONFIG.rulesFinalized, false);
  assert.equal(REGISTRATION_CONFIG.startsAt, null);
  assert.deepEqual(getRegistrationState(REGISTRATION_CONFIG, duringCollection), {
    status: 'preparing', formUrl: null, message: REGISTRATION_PREPARING_TEXT,
  });
});

test('each release requirement independently keeps the registration link closed', () => {
  for (const change of [
    { open: false }, { formUrl: '' }, { formUrlVerified: false }, { rulesFinalized: false },
    { startsAt: null }, { startsAt: 'not-a-date' }, { startsAt: '2027-01-15T09:00:00' },
    { startsAt: '2028-01-01T00:00:00+08:00' },
  ]) {
    const result = getRegistrationState({ ...ready, ...change }, duringCollection);
    assert.equal(result.status, 'preparing');
    assert.equal(result.formUrl, null);
  }
});

test('requires the announced start time and allows navigation only after all checks pass', () => {
  const start = Date.parse(ready.startsAt!);
  assert.equal(getRegistrationState(ready, start - 1).formUrl, null);
  assert.equal(getRegistrationState(ready, start).formUrl, exampleUrl);
  assert.equal(getRegistrationState(ready, duringCollection).status, 'open');
});

test('closes at Taipei midnight after the final second of 2027', () => {
  assert.equal(REGISTRATION_CLOSES_AT, Date.parse('2027-12-31T16:00:00Z'));
  assert.equal(getRegistrationState(ready, Date.parse('2027-12-31T23:59:59+08:00')).status, 'open');
  assert.equal(getRegistrationState(ready, REGISTRATION_CLOSES_AT - 1).status, 'open');
  assert.equal(getRegistrationState(ready, REGISTRATION_CLOSES_AT).status, 'closed');
  assert.equal(getRegistrationState(ready, REGISTRATION_CLOSES_AT).formUrl, null);
});

test('rejects spoofed domains, non-production paths, query data, fragments and URL whitespace', () => {
  assert.equal(isAllowedRegistrationUrl(exampleUrl), true);
  for (const url of [
    '', 'http://script.google.com/macros/s/example/exec',
    'https://script.google.com.evil.invalid/macros/s/example/exec',
    'https://evil.invalid@script.google.com/macros/s/example/exec',
    'https://script.google.com:443/macros/s/example/exec',
    'https://script.google.com/macros/s/example/dev',
    'https://script.google.com/macros/s/example/exec/',
    'https://script.google.com/macros/s//exec',
    'https://script.google.com/macros/s/example%2Fother/exec',
    `${exampleUrl}?email=example`, `${exampleUrl}?`, `${exampleUrl}#registration`,
    `${exampleUrl}\n`, ` ${exampleUrl}`, `${exampleUrl} `,
    'javascript:alert(1)', '/api/register',
  ]) {
    assert.equal(isAllowedRegistrationUrl(url), false, url);
    assert.equal(getRegistrationState({ ...ready, formUrl: url }, duringCollection).formUrl, null);
  }
});

test('an invalid clock fails closed', () => {
  for (const now of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.equal(getRegistrationState(ready, now).formUrl, null);
  }
});
