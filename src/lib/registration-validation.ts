export type RegistrationFields = {
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
  lineId: string;
  nickname: string;
  referrer: string;
  accountStatus: string;
};

export type RegistrationErrors = Partial<Record<keyof RegistrationFields, string>>;

const ACCOUNT_STATUSES = new Set(['yes', 'no', 'unsure']);
const TAIWAN_ID_LETTER_CODES: Record<string, number> = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34,
  J: 18, K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25,
  S: 26, T: 27, U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33,
};

const UNSAFE_TEXT = /[\p{Cc}\p{Cf}\uFFFD]/u;
const EXCESSIVE_REPEAT = /(.)\1{5,}/u;
const PERSON_NAME = /^[\p{L}\p{M} .\-'’・]+$/u;
const DISPLAY_NAME = /^[\p{L}\p{M}\p{N} ._\-'’・]+$/u;
const LINE_ID = /^[A-Za-z0-9._-]{4,20}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function normalizeText(value: unknown) {
  return String(value ?? '').normalize('NFC').trim();
}

export function normalizeRegistrationFields(values: Partial<Record<keyof RegistrationFields, unknown>>): RegistrationFields {
  return {
    fullName: normalizeText(values.fullName),
    nationalId: String(values.nationalId ?? '').normalize('NFKC').trim().toUpperCase(),
    phone: String(values.phone ?? '').normalize('NFKC').replace(/[^0-9]/g, ''),
    email: String(values.email ?? '').normalize('NFKC').trim(),
    lineId: String(values.lineId ?? '').normalize('NFKC').trim(),
    nickname: normalizeText(values.nickname),
    referrer: normalizeText(values.referrer),
    accountStatus: String(values.accountStatus ?? '').trim(),
  };
}

export function isValidTaiwanNationalId(value: string) {
  if (!/^[A-Z][0-9]{9}$/.test(value)) return false;

  const letterCode = TAIWAN_ID_LETTER_CODES[value[0]];
  if (!letterCode) return false;

  const digits = value.slice(1).split('').map(Number);
  const total = Math.floor(letterCode / 10) + (letterCode % 10) * 9
    + digits.slice(0, 8).reduce((sum, digit, index) => sum + digit * (8 - index), 0)
    + digits[8];

  return total % 10 === 0;
}

export function validateRegistrationFields(rawValues: Partial<Record<keyof RegistrationFields, unknown>>): RegistrationErrors {
  const values = normalizeRegistrationFields(rawValues);
  const errors: RegistrationErrors = {};

  if (!values.fullName) {
    errors.fullName = '請填寫身分證件上的本名。';
  } else if (values.fullName.length < 2 || values.fullName.length > 50 || !PERSON_NAME.test(values.fullName) || UNSAFE_TEXT.test(values.fullName) || EXCESSIVE_REPEAT.test(values.fullName)) {
    errors.fullName = '請輸入 2–50 個中英文字，勿使用數字、特殊符號或重複亂碼。';
  } else if ((values.fullName.match(/\p{L}/gu) ?? []).length < 2) {
    errors.fullName = '本名至少需要 2 個文字。';
  }

  if (!values.nationalId) {
    errors.nationalId = '請填寫身分證字號。';
  } else if (!isValidTaiwanNationalId(values.nationalId)) {
    errors.nationalId = '身分證字號格式或檢查碼不正確，請重新確認。';
  }

  if (!values.phone) {
    errors.phone = '請填寫手機號碼。';
  } else if (!/^09[0-9]{8}$/.test(values.phone)) {
    errors.phone = '請輸入有效的臺灣手機號碼，例如 0912-345-678。';
  }

  if (!values.email) {
    errors.email = '請填寫 Email。';
  } else if (values.email.length > 254 || !EMAIL.test(values.email) || values.email.includes('..') || UNSAFE_TEXT.test(values.email)) {
    errors.email = '請輸入有效的 Email，例如 name@example.com。';
  }

  if (!values.lineId) {
    errors.lineId = '請填寫 LINE ID。';
  } else if (!LINE_ID.test(values.lineId)) {
    errors.lineId = 'LINE ID 須為 4–20 位英文字母、數字、句點、連字號或底線。';
  }

  if (!values.nickname) {
    errors.nickname = '請填寫暱稱。';
  } else if (values.nickname.length > 30 || !DISPLAY_NAME.test(values.nickname) || UNSAFE_TEXT.test(values.nickname) || EXCESSIVE_REPEAT.test(values.nickname)) {
    errors.nickname = '暱稱限 30 字內的中英文字、數字及一般標點，請勿輸入亂碼。';
  }

  if (values.referrer && (values.referrer.length > 30 || !DISPLAY_NAME.test(values.referrer) || UNSAFE_TEXT.test(values.referrer) || EXCESSIVE_REPEAT.test(values.referrer))) {
    errors.referrer = '推薦人暱稱或推薦碼限 30 字內，請勿輸入聯絡資料、特殊符號或亂碼。';
  }

  if (!ACCOUNT_STATUSES.has(values.accountStatus)) {
    errors.accountStatus = '請選擇是否曾註冊相關場館帳號。';
  }

  return errors;
}
