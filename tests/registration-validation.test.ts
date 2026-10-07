import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isValidTaiwanNationalId,
  normalizeRegistrationFields,
  type RegistrationFields,
  validateRegistrationFields,
} from '../src/lib/registration-validation.ts';

// Synthetic fixtures only; these values do not represent a registration.
const example: RegistrationFields = {
  fullName: '測試球友',
  nationalId: 'A123456789',
  phone: '0912345678',
  email: 'preview@example.invalid',
  lineId: 'preview_test',
  nickname: '預覽球友',
  referrer: '',
  accountStatus: 'unsure',
};

test('reports every missing required field while allowing an empty referrer', () => {
  const errors = validateRegistrationFields({});
  assert.deepEqual(Object.keys(errors).sort(), [
    'accountStatus', 'email', 'fullName', 'lineId', 'nationalId', 'nickname', 'phone',
  ]);
});

test('normalizes pasted spaces, full-width digits, and telephone punctuation', () => {
  const input = {
    ...example,
    fullName: ' 測試球友 ',
    nationalId: ' ａ１２３４５６７８９ ',
    phone: '０９１２-３４５-６７８',
    email: ' preview@example.invalid ',
  };
  assert.deepEqual(normalizeRegistrationFields(input), example);
  assert.deepEqual(validateRegistrationFields(input), {});
});

test('rejects an invalid identity checksum and malformed identity values', () => {
  assert.equal(isValidTaiwanNationalId(example.nationalId), true);
  for (const nationalId of ['A123456788', 'A12345678', '1234567890', 'A12345678!']) {
    assert.equal(isValidTaiwanNationalId(nationalId), false);
    assert.ok(validateRegistrationFields({ ...example, nationalId }).nationalId);
  }
});

test('accepts citizen identity categories 1 and 2 while rejecting other checksum-valid categories', () => {
  for (const nationalId of ['A123456789', 'A223456781']) {
    assert.equal(isValidTaiwanNationalId(nationalId), true);
    assert.equal(validateRegistrationFields({ ...example, nationalId }).nationalId, undefined);
  }

  // Every fixture below has a valid checksum but is not a citizen ID category.
  for (const nationalId of [
    'A023456787', 'A323456783', 'A423456785', 'A523456787',
    'A623456789', 'A723456781', 'A823456783', 'A923456785',
  ]) {
    assert.equal(isValidTaiwanNationalId(nationalId), false);
    assert.ok(validateRegistrationFields({ ...example, nationalId }).nationalId);
  }

  assert.equal(validateRegistrationFields({ ...example, nationalId: ' ａ２２３４５６７８１ ' }).nationalId, undefined);
  assert.ok(validateRegistrationFields({ ...example, nationalId: ' ａ０２３４５６７８７ ' }).nationalId);
});

test('rejects email local-part dot errors and malformed domain labels', () => {
  for (const email of [
    'qa@-example.com', 'qa@example-.com', 'qa@sub.-example.com',
    'qa@sub-.example.com', 'qa@exam_ple.com', 'qa@sub_domain.example.com',
    '.qa@example.com', 'qa.@example.com', 'qa..test@example.com',
    'qa@example..com', 'qa@.example.com', 'qa@example.com.',
    'qa@localhost', 'qa@example.c', 'qa@', '@example.com',
    'qa@@example.com', 'qa test@example.com', 'qa@test example.com',
    'qa\u200B@example.com', 'qa@example\u0000.com', 'qa<test>@example.com',
  ]) {
    assert.ok(validateRegistrationFields({ ...example, email }).email, email);
  }
});

test('preserves ordinary plus-addressing, local punctuation, subdomains and normalization', () => {
  for (const email of [
    'qa+court@example.com', 'qa.test+court@sub.example.com',
    'qa_test@example-site.com', 'qa-test@a.example.com',
    "o'connor@example.com", 'QA.Test+Court@Sub.Example.COM',
    'qa@xn--example-test.com', 'ｑａ＋court＠example.com',
    '  qa+court@example.com  ',
  ]) {
    assert.equal(validateRegistrationFields({ ...example, email }).email, undefined, email);
  }
});

test('enforces local-part, domain-label and total email length boundaries', () => {
  const local64 = 'a'.repeat(64);
  const label63 = 'b'.repeat(63);
  const longestDomainForLocal64 = `${label63}.${label63}.${'c'.repeat(61)}`;
  const email254 = `${local64}@${longestDomainForLocal64}`;
  assert.equal(email254.length, 254);

  for (const email of [
    `${local64}@example.com`, `qa@${label63}.com`, email254,
  ]) {
    assert.equal(validateRegistrationFields({ ...example, email }).email, undefined);
  }
  for (const email of [
    `${local64}a@example.com`, `qa@${label63}b.com`, `${email254}c`,
  ]) {
    assert.ok(validateRegistrationFields({ ...example, email }).email);
  }
});

test('rejects malformed contact details and unsupported account status', () => {
  for (const [field, value] of [
    ['phone', '0212345678'],
    ['phone', '09123456789'],
    ['email', 'preview..test@example.invalid'],
    ['email', 'not-an-email'],
    ['lineId', 'a b'],
    ['accountStatus', 'unexpected'],
  ] as const) {
    assert.ok(validateRegistrationFields({ ...example, [field]: value })[field]);
  }
});

test('rejects invisible control characters, repeated junk, and contact data in referrer', () => {
  for (const [field, value] of [
    ['fullName', '測試\u200B球友'],
    ['fullName', '111111'],
    ['nickname', 'aaaaaa'],
    ['nickname', '測試\u0000'],
    ['referrer', 'person@example.invalid'],
  ] as const) {
    assert.ok(validateRegistrationFields({ ...example, [field]: value })[field]);
  }
});

test('accepts each disclosed account option without modifying the input', () => {
  for (const accountStatus of ['yes', 'no', 'unsure']) {
    const input = Object.freeze({ ...example, accountStatus });
    assert.deepEqual(validateRegistrationFields(input), {});
    assert.deepEqual(input, { ...example, accountStatus });
  }
});
