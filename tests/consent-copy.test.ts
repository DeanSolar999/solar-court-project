import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  ACCOUNT_CREATION_CONSENT_TEXT,
  ACCOUNT_USE_NOTICE,
  AUTHORIZED_VENUES,
  CONSENT_ITEMS,
  CONSENT_VERSION,
  CONTACTS,
  CROSS_VENUE_NOTICE_TEXT,
  FIRST_DRAW_QUALIFICATION_TEXT,
  PRIVACY_NOTICE_ITEMS,
  PRIVACY_POLICY_SOURCES,
  PRIVACY_RIGHTS,
  REVOCATION_NOTICE,
  SCOPE_CONSENT_TEXT,
  SUPPLEMENTAL_AUTHORIZATION_NOTICE,
  VENUE_NOTICE_TEXT,
} from '../src/lib/consent.ts';

const page = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
  + readFileSync(new URL('../src/pages/activity-details.tsx', import.meta.url), 'utf8');
const entry = readFileSync(new URL('../src/components/registration-form.tsx', import.meta.url), 'utf8');
const contactComponent = readFileSync(new URL('../src/components/authorization-contact-links.tsx', import.meta.url), 'utf8');

test('pins a new notice version and preserves four independent consent texts', () => {
  assert.equal(CONSENT_VERSION, '2027-v16-2026-10-13');
  assert.deepEqual(CONSENT_ITEMS.map(({ key }) => key), ['privacy', 'scope', 'account', 'rules']);
  assert.equal(new Set(CONSENT_ITEMS.map(({ text }) => text)).size, 4);
  for (const item of CONSENT_ITEMS) assert.ok(item.title && item.summary && item.text);
  assert.equal(createHash('sha256').update(JSON.stringify(CONSENT_ITEMS)).digest('hex'), 'e8a5554600ca0112e9afe25b1961094cc53e2f19cde4321c8fc207151a48c157', 'all four approved v16 consent titles, summaries and full texts remain unchanged');
});

test('keeps exactly thirteen venues and distinguishes operators from application procedure', () => {
  assert.equal(AUTHORIZED_VENUES.length, 13);
  assert.equal(new Set(AUTHORIZED_VENUES).size, 13);
  assert.ok(AUTHORIZED_VENUES.includes('新興國中'));
  assert.match(VENUE_NOTICE_TEXT, /2027 年度的實際營運單位，以官方公告為準/);
  assert.match(VENUE_NOTICE_TEXT, /申請流程則依各中心公告與營運單位規則/);
  assert.match(SCOPE_CONSENT_TEXT, /新增場館須另行取得我的同意/);
  assert.match(CROSS_VENUE_NOTICE_TEXT, /不代表你已授權/);
  assert.doesNotMatch(page, /最優申請人|營運交接中|舞動陽光/);
});

test('manual supplementary consent requires an explicit reply without reducing original eligibility', () => {
  const text = SUPPLEMENTAL_AUTHORIZATION_NOTICE.join('\n');
  for (const expected of ['Email', 'LINE 社群公告', '私訊提供文件', '另行明確同意', '未回覆或不同意者', '不影響原已取得的參加資格', '採人工辦理', '回覆時間及文件版本']) {
    assert.ok(text.includes(expected), expected);
  }
  assert.notEqual(CONTACTS.registrationSystemUrl, CONTACTS.communityUrl);
});

test('one submitted account consent discloses the default structure and retains scope and operator limits', () => {
  const text = ACCOUNT_USE_NOTICE.join('\n');
  for (const expected of ['以本人名義', '僅於該營運單位規則允許時', '指定管理人員', '2027 年 12 月 31 日', '提前申請終止', '主動勾選「帳號代辦與共同使用授權」並成功送出表單後', '預設密碼為「1qaz」接上本人身分證字號末四碼', '僅適用於本次代辦的新帳號', '不會擅自修改或重設本人既有帳號的密碼', '本表單不收集帳號密碼', '由本人操作', '不包含球團代簽契約或代作金錢承諾']) {
    assert.ok(text.includes(expected), expected);
  }
  assert.equal(ACCOUNT_CREATION_CONSENT_TEXT, '如本人尚未註冊相關運動中心帳號，我同意曜日羽球團使用本次提供的必要資料，以本人名義代為申請。我已知悉，代辦帳號的預設密碼為「1qaz」接上本人身分證字號末四碼。我同意由本人與球團指定管理人員，自同意日起至 2027 年 12 月 31 日止共同使用帳號，僅供已授權場館的抽籤申請及必要後續程序使用；實際辦理仍須遵守各場館規則。');
  const accountItem = CONSENT_ITEMS.find(({ key }) => key === 'account')!;
  assert.equal(accountItem.title, '帳號代辦與共同使用授權');
  assert.equal(accountItem.summary, '閱讀預設密碼與共同使用說明，勾選並送出後授權球團代辦。');
  assert.doesNotMatch(text + ACCOUNT_CREATION_CONSENT_TEXT, /須先透過私訊|取得本人另行明確確認|完成上述確認後|只以非公開方式|不蒐集或保存任何帳號密碼|已採用加密密碼管理器|安全密碼|1qaz\d{4}/);
});

test('revocation has two exact contacts and does not promise automatic cancellation at a third party', () => {
  assert.equal(CONTACTS.registrationSystemUrl, 'https://line.me/R/ti/p/@726oezrw');
  assert.equal(CONTACTS.lineId, 'nplus168');
  assert.equal(CONTACTS.responsiblePerson, '阿定');
  const text = REVOCATION_NOTICE.join('\n');
  for (const expected of ['身分與申請範圍核對', '停止尚未執行的代辦及後續使用', '留存處理紀錄並回覆', '不會因終止球團授權而自動取消']) assert.ok(text.includes(expected), expected);
  assert.match(contactComponent, /href=\{CONTACTS.registrationSystemUrl\}/);
  assert.match(contactComponent, /CONTACTS.lineId/);
});

test('complete privacy notice lists all five rights and attributes the providers regional processing scope', () => {
  assert.deepEqual(PRIVACY_RIGHTS, [
    '查詢或請求閱覽。', '請求製給複製本。', '請求補充或更正。',
    '請求停止蒐集、處理或利用。', '請求刪除。',
  ]);
  const rights = PRIVACY_NOTICE_ITEMS.find(({ id }) => id === 'privacy-rights')!;
  assert.ok(rights.paragraphs.join('').includes('不得預先拋棄或以約定限制'));
  for (const id of ['collector', 'purpose-and-data', 'period-and-region', 'recipients-and-methods', 'privacy-rights', 'optional-provision']) {
    assert.ok(PRIVACY_NOTICE_ITEMS.find((item) => item.id === id), id);
  }
  const regionItem = PRIVACY_NOTICE_ITEMS.find(({ id }) => id === 'period-and-region');
  assert.ok(regionItem && 'sourceLinks' in regionItem);
  const region = regionItem.paragraphs.join('');
  assert.match(region, /本活動未指定單一資料儲存國家/);
  assert.match(region, /不表示每筆資料均傳輸至所有地區/);
  assert.match(region, /日本、美國、韓國、加拿大/);
  assert.equal(PRIVACY_POLICY_SOURCES.length, 3);
  assert.deepEqual(regionItem.sourceLinks, PRIVACY_POLICY_SOURCES);
  assert.match(page, /item.sourceLinks.map/);
});

test('publication reuses the canonical notice and makes full text available without local data inputs', () => {
  assert.match(page, /PRIVACY_NOTICE_ITEMS.map/);
  assert.match(page, /item.paragraphs.map/);
  assert.match(page, /VENUE_NOTICE_TEXT/);
  assert.deepEqual(PRIVACY_NOTICE_ITEMS.find(({ id }) => id === 'revocation')!.paragraphs, [...REVOCATION_NOTICE]);
  assert.deepEqual(PRIVACY_NOTICE_ITEMS.find(({ id }) => id === 'supplemental-authorization')!.paragraphs, [...SUPPLEMENTAL_AUTHORIZATION_NOTICE]);
  assert.deepEqual(PRIVACY_NOTICE_ITEMS.find(({ id }) => id === 'account-use')!.paragraphs.slice(0, ACCOUNT_USE_NOTICE.length), [...ACCOUNT_USE_NOTICE]);
  assert.doesNotMatch(entry, /CONSENT_ITEMS.map|ACCOUNT_USE_NOTICE.map|SUPPLEMENTAL_AUTHORIZATION_NOTICE.map/);
  assert.match(page, /<summary id="privacy">閱讀完整個資與授權說明<\/summary>/);
  assert.match(page, /item.id === 'supplemental-authorization' \? 'supplemental-notice' : undefined/);
  assert.doesNotMatch(page + entry, /<input\b|<textarea\b|<form\b|<Checkbox\b|<RadioGroup\b/);
});

test('explains the full-document reading stage without treating scrolling as consent', () => {
  assert.equal(PRIVACY_NOTICE_ITEMS.length, 10);
  const platformNotice = PRIVACY_NOTICE_ITEMS.find(({ id }) => id === 'collection-platform')!.paragraphs.join('');
  assert.match(platformNotice, /填寫後，請閱讀完整告知文件並捲動至底部，再主動確認四項同意後送出/);
  assert.match(platformNotice, /捲動到文件底部不等於同意，也不能證明已理解內容/);
  assert.match(FIRST_DRAW_QUALIFICATION_TEXT, /取得收件回條/);
  assert.match(page, /FIRST_DRAW_QUALIFICATION_TEXT/);
});

test('first raffle qualification needs successful submission and not a prior court win', () => {
  assert.match(FIRST_DRAW_QUALIFICATION_TEXT, /截至 2026 年 12 月 31 日（含當日，台北時間）/);
  assert.match(FIRST_DRAW_QUALIFICATION_TEXT, /主動勾選四項/);
  assert.match(FIRST_DRAW_QUALIFICATION_TEXT, /成功送出表單、取得收件回條/);
  assert.match(FIRST_DRAW_QUALIFICATION_TEXT, /不需要先抽中場地/);
  assert.match(page, /這是後續場地協助，不是首波抽獎資格的前提/);
});
