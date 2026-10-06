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
