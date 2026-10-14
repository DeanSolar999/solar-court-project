import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const entry = readFileSync(new URL('../src/components/registration-form.tsx', import.meta.url), 'utf8');
const sticky = readFileSync(new URL('../src/components/mobile-registration-cta.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

test('six sections preserve legacy destinations while leading with the invitation and rewards', () => {
  assert.deepEqual([...page.matchAll(/^      <section id="([^"]+)"/gm)].map((match) => match[1]), ['top', 'prizes', 'benefits', 'how', 'venues', 'register']);
  for (const id of ['privacy', 'withdrawal', 'draw-rules-heading']) assert.ok(page.includes('id="' + id + '"'));
  assert.match(page, /item.id === 'supplemental-authorization' \? 'supplemental-notice' : undefined/);
  assert.match(page, /一起幫曜日，<span>多爭取一面球場/);
  assert.ok(page.indexOf('className="hero-benefits"') < page.indexOf('id="hero-action"'));
  assert.ok(page.indexOf('className="grand-prize"') < page.indexOf('id="draw-rules-heading"'));
  assert.match(page, /node instanceof HTMLDetailsElement\) node.open = true/);
  const prizesSection = page.slice(page.indexOf('<section id="prizes"'), page.indexOf('<section id="benefits"'));
  assert.match(prizesSection, /marketing\.phase === 'unavailable' \? '目前暫停收件；獎品與參加資格請見完整活動辦法。' : '首波抽獎資格已截止/);
});

test('the actual form link follows the visible identity, shared-account and withdrawal information', () => {
  assert.doesNotMatch(page, /<RegistrationLink\b/);
  assert.match(page, /href="#register" className="marketing-button"/);
  assert.match(page, /先看資料怎麼用/);
  const summary = entry.slice(entry.indexOf('className="reading-summary"'), entry.indexOf('{children}'));
  for (const text of ['身分證字號及聯絡資料', '本次抽獎與通知', '公告 13 個場館', '帳號代辦與場地申請', '若尚未註冊', '僅在場館規則允許時', '球團指定管理人員', '共同使用你名義下的帳號', '同意當日起至 2027/12/31', '提前申請終止', '新增場館或學校', '取得你明確同意後', '本頁不收個資', '正式表單不收密碼或驗證碼']) assert.ok(summary.includes(text), text);
  assert.equal((summary.match(/<p(?:\s|>)/g) ?? []).length, 3, 'two short purpose paragraphs plus one data hint');
  assert.ok(entry.indexOf('{children}') < entry.indexOf('<RegistrationLink'));
  assert.match(page, /想終止授權或有疑問/);
  assert.match(page, /<AuthorizationContactLinks/);
  assert.equal((page + entry).match(/Google 託管表單/g)?.length, 1);
  assert.doesNotMatch(page + entry, /<input\b|<form\b|<Checkbox\b|<RadioGroup\b/);
});

test('registration has one complete notice disclosure before contact and the final external link', () => {
  const registration = page.slice(page.indexOf('<section id="register"'), page.indexOf('<footer'));
  assert.equal((registration.match(/<details\b/g) ?? []).length, 1);
  assert.equal((registration.match(/<summary\b/g) ?? []).length, 1);
  assert.match(registration, /<summary id="privacy">閱讀完整個資與授權說明<\/summary>/);
  assert.match(registration, /告知與同意版本：\{CONSENT_VERSION\}/);
  assert.match(registration, /PRIVACY_NOTICE_ITEMS.map/);
  assert.match(registration, /item.paragraphs.map/);
  assert.match(registration, /item.sourceLinks.map/);
  assert.match(registration, /id=\{'privacy-' \+ item.id\}/);
  assert.match(registration, /<h3 id=\{item.id === 'supplemental-authorization' \? 'supplemental-notice' : undefined\}>\{item.title\}/);
  assert.match(registration, /<div id="withdrawal" className="withdrawal-contact"><p>/);
  assert.ok(registration.indexOf('<details') < registration.indexOf('<AuthorizationContactLinks'));
  assert.ok(registration.indexOf('<AuthorizationContactLinks') < registration.indexOf('</RegistrationEntry>'));
  assert.ok(entry.indexOf('{children}') < entry.indexOf('<RegistrationLink'));
  assert.match(registration, /既有場館會員或租約不會自動取消/);
  assert.doesNotMatch(entry + registration, /consent-preview|CONSENT_ITEMS.map|四項同意內容與正式填寫流程/);
});

test('only the final open entry uses the shorter label and paused or closed labels stay gated', () => {
  assert.match(entry, /state.status === 'open' \? '開始填寫資料' : actionLabel/);
  assert.match(entry, /<RegistrationLink state=\{state\}/);
  assert.match(entry, /state.status !== 'open' && <p role="status"/);
  assert.doesNotMatch(page + sticky, /開始填寫資料/);
  assert.match(page, /<MobileRegistrationCta[^>]+label=\{marketing.actionLabel\}/);
});

test('concept illustrations use distinct local assets and readable HTML remains outside images', () => {
  for (const name of ['community', 'registration', 'court-support']) {
    assert.ok(page.includes('name="' + name + '"'));
    const asset = readFileSync(new URL('../public/marketing/' + name + '-illustration-v2.webp', import.meta.url));
    assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP');
  }
  assert.match(page, /AI 概念插畫，非實際球友或場地/);
  assert.match(page, /width=\{1024\} height=\{1024\} loading=\{priority \? 'eager' : 'lazy'\}/);
  assert.ok(page.includes("src={import.meta.env.BASE_URL + 'marketing/'"));
  assert.ok(page.includes("name + '-illustration-v2.webp'"));
  assert.ok(!page.includes("name + '-illustration-v1.webp'"));
  for (const description of ['四名虛構成年男性球友', '戴眼鏡的虛構斯文成年男性', '留鬍鬚的虛構肉壯中年男性']) assert.ok(page.includes(description), description);
  for (const condition of ['NT$2,000', 'NT$500', '每中籤一次', '每中籤一面固定場地', '於 30 日內匯款', '優先不保證錄取']) assert.ok(page.includes(condition), condition);
});

test('sticky CTA waits for the hero to pass and avoids the final section, keyboard and focused content', () => {
  assert.match(sticky, /IntersectionObserver/);
  assert.match(sticky, /!item.isIntersecting && item.boundingClientRect.bottom <= 72/);
  assert.match(sticky, /!enabled \|\| !heroPassed \|\| entryVisible \|\| focusObstructed/);
  assert.match(sticky, /visualViewport/);
  assert.match(sticky, /focusAtBottom/);
  assert.match(sticky, /heroObserver.disconnect\(\)/);
  assert.match(css, /env\(safe-area-inset-bottom, 0px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /min-height: 3rem/);
  assert.doesNotMatch(css, /body \{ padding-bottom: 78px/);
});
