export type RegistrationConfig = Readonly<{
  open: boolean;
  formUrl: string;
  formUrlVerified: boolean;
  publicNoticeApproved: boolean;
  startsAt: string | null;
}>;

// Keep collection paused while the website and Google deployment switch notice versions.
// Approval covers the disclosed notice; it does not invent still-unannounced prize or tax details.
// A public deployment URL is permitted here; never add a secret or participant data.
export const REGISTRATION_CONFIG: RegistrationConfig = Object.freeze({
  open: false,
  formUrl: 'https://script.google.com/macros/s/AKfycbwtRZZ7RtPE2Qz1FU_p7Qumj-9M7nyiK-LCySVVvoCevTiV_y3JqO6peOaPEVJbX3J_/exec',
  formUrlVerified: true,
  publicNoticeApproved: true,
  startsAt: '2026-10-12T23:07:34+08:00',
});

export const REGISTRATION_PREPARING_TEXT = '告知內容更新中，暫停收件，請稍後再試';
export const REGISTRATION_DEADLINE_TEXT = '2027 年 12 月 31 日 23:59:59（台北時間）';
export const FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT = '2026 年 12 月 31 日（台北時間）';
export const FIRST_DRAW_DATE_TEXT = '2027 年 1 月 10 日';
// Exclusive cutoff: the full final second of December 31 remains eligible.
export const REGISTRATION_CLOSES_AT = Date.parse('2028-01-01T00:00:00+08:00');

export function isAllowedRegistrationUrl(url: string): boolean {
  return url === url.trim() && /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url);
}

export type RegistrationState = Readonly<{
  status: 'preparing' | 'open' | 'closed';
  formUrl: string | null;
  message: string;
}>;

export function getRegistrationState(
  config: RegistrationConfig = REGISTRATION_CONFIG,
  now: number = Date.now(),
): RegistrationState {
  if (Number.isFinite(now) && now >= REGISTRATION_CLOSES_AT) {
    return { status: 'closed', formUrl: null, message: '登記期間已結束，停止收件' };
  }
  const startsAt = config.startsAt && /(?:Z|[+-]\d{2}:\d{2})$/.test(config.startsAt)
    ? Date.parse(config.startsAt) : Number.NaN;
  if (!Number.isFinite(now) || !Number.isFinite(startsAt) || startsAt >= REGISTRATION_CLOSES_AT || now < startsAt
    || !config.open || !config.formUrlVerified || !config.publicNoticeApproved || !isAllowedRegistrationUrl(config.formUrl)) {
    return { status: 'preparing', formUrl: null, message: REGISTRATION_PREPARING_TEXT };
  }
  return { status: 'open', formUrl: config.formUrl, message: '正式登記已開放，請前往 Google 託管表單' };
}
