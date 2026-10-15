import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getPageView } from '../src/lib/page-view.ts';

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const page = read('src/App.tsx');
const details = read('src/pages/activity-details.tsx');
const entry = read('src/components/registration-form.tsx');
const sticky = read('src/components/mobile-registration-cta.tsx');
const visuals = read('src/components/campaign-visuals.tsx');
const css = read('src/index.css');

test('four marketing sections keep the long document outside the home branch', () => {
  assert.deepEqual([...page.matchAll(/^      <section id="([^"]+)"/gm)].map((match) => match[1]), ['top', 'prizes', 'benefits', 'register']);
  assert.ok(page.includes('<h1 className="hero-rainbow-headline" aria-label="讓我們有一個 可以一起打球的地方">'));
  assert.ok(page.includes("pageView === 'details' ? <ActivityDetails"));
  assert.doesNotMatch(page, /PRIVACY_NOTICE_ITEMS.map|AUTHORIZED_VENUES.map|<details\b/);
  assert.match(details, /PRIVACY_NOTICE_ITEMS.map/);
  assert.match(details, /AUTHORIZED_VENUES.map/);
  assert.ok(page.includes("marketing.phase === 'unavailable' ? '目前暫停收件；獎品與參加資格請見完整活動辦法。'"));
});

test('rainbow headline keeps one accessible heading and a readable failed-image fallback', () => {
  const headline = page.match(/<h1 className="hero-rainbow-headline"[\s\S]*?<\/h1>/)?.[0] ?? '';
  assert.match(headline, /aria-label="讓我們有一個 可以一起打球的地方"/);
  assert.match(headline, /headlineImageFailed \?/);
  assert.match(headline, /讓我們有一個<span>可以一起<\/span><span>打球的地方<\/span>/);
  assert.match(headline, /onError=\{\(\) => setHeadlineImageFailed\(true\)\}/);
  assert.match(headline, /alt="" aria-hidden="true" loading="eager" fetchPriority="high"/);
  assert.ok(headline.includes("import.meta.env.BASE_URL + 'marketing/hero-rainbow-headline-v1.webp'"));
  assert.match(headline, /width=\{1200\} height=\{800\}/);
  assert.doesNotMatch(headline, /sr-only/);
  assert.match(css, /\.hero-rainbow-headline > img \{[^}]*width: 100%;[^}]*height: auto;[^}]*object-fit: contain/);
  assert.match(css, /\.hero-rainbow-headline > img \{[^}]*aspect-ratio: 3 \/ 2/);
  const asset = readFileSync(new URL('../public/marketing/hero-rainbow-headline-v1.webp', import.meta.url));
  assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP');
  const encoding = asset.subarray(12, 16).toString('ascii');
  assert.ok(encoding === 'VP8L' || encoding === 'VP8X');
  const losslessBits = encoding === 'VP8L' ? asset.readUInt32LE(21) : 0;
  const width = encoding === 'VP8L' ? (losslessBits & 0x3fff) + 1 : asset.readUIntLE(24, 3) + 1;
  const height = encoding === 'VP8L' ? ((losslessBits >>> 14) & 0x3fff) + 1 : asset.readUIntLE(27, 3) + 1;
  assert.equal(width, 1200);
  assert.equal(height, 800);
  const metadata = read('index.html');
  assert.equal((metadata.match(/讓我們有一個 可以一起打球的地方｜Solar Badminton 2027 場地募集/g) ?? []).length, 3);
  assert.doesNotMatch(metadata, /讓我們，多一個一起打球的地方/);
});

test('every primary campaign CTA and sticky entry uses the original RegistrationLink gate', () => {
  assert.equal((page.match(/<RegistrationLink state=\{registrationState\}/g) ?? []).length, 3);
  assert.match(sticky, /<RegistrationLink state=\{state\}/);
  assert.doesNotMatch(page + sticky, /href="#register"|href="https:\/\/script.google.com/);
  assert.match(page, /getRegistrationState\(undefined, now\)/);
  assert.match(page, /getMarketingContent\(now, registrationState.status\)/);
  assert.match(page, /marketing.qualification/);
  assert.match(page, /registrationState.status === 'open' \? '開始填寫資料' : marketing.actionLabel/);
  assert.match(page, /enabled=\{marketing.canRegister\} state=\{registrationState\}/);
  assert.match(entry, /<RegistrationLink state=\{state\}/);
  assert.doesNotMatch(page + details + entry, /<input\b|<form\b|<Checkbox\b|<RadioGroup\b/);
});

test('query-based details and all legacy hashes remain reachable with a return to the home page', () => {
  assert.equal(getPageView('?view=details', ''), 'details');
  for (const hash of ['privacy', 'privacy-notice', 'withdrawal', 'supplemental-notice', 'venues', 'court-bonus', 'draw-rules-heading', 'how', 'racket-specifications', 'privacy-account-use']) {
    assert.equal(getPageView('', '#' + hash), 'details', hash);
  }
  for (const hash of ['', '#top', '#prizes', '#benefits', '#register', '#%E0%A4%A']) assert.equal(getPageView('', hash), 'home');
  assert.equal(getPageView('?view=anything', ''), 'home');
  assert.match(page, /url.searchParams.set\('view', 'details'\)/);
  assert.match(page, /node instanceof HTMLDetailsElement\) node.open = true/);
  assert.match(page, /addEventListener\('popstate'/);
  for (const id of ['privacy', 'withdrawal', 'venues', 'court-bonus', 'draw-rules-heading']) assert.ok(details.includes('id="' + id + '"'));
  assert.ok(details.includes("item.id === 'supplemental-authorization' ? 'supplemental-notice' : undefined"));
  assert.match(details, /href=\{import.meta.env.BASE_URL\}[^>]*>← 返回活動首頁/);
});

test('independent document retains the full ten notices, four exact consents, contacts and policy links', () => {
  assert.match(details, /PRIVACY_NOTICE_ITEMS.map/);
  assert.match(details, /item.paragraphs.map/);
  assert.match(details, /item.sourceLinks.map/);
  assert.match(details, /CONSENT_ITEMS.map/);
  assert.match(details, /<p>\{item.text\}<\/p>/);
  assert.match(details, /告知與同意版本：\{CONSENT_VERSION\}/);
  assert.match(details, /<AuthorizationContactLinks/);
  assert.match(details, /既有場館會員或租約不會自動取消/);
  assert.match(entry, /正式表單不收密碼或驗證碼/);
  assert.match(details, /id=\{'privacy-' \+ item.id\}/);
});

test('campaign visuals reuse the official logo and all three unchanged adult illustrations', () => {
  for (const name of ['community', 'registration', 'court-support']) {
    assert.ok((page + details).includes('name="' + name + '"'));
    const asset = readFileSync(new URL('../public/marketing/' + name + '-illustration-v2.webp', import.meta.url));
    assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP');
  }
  assert.match(visuals, /AI 概念插畫，非實際球友或場地/);
  assert.ok(visuals.includes("name + '-illustration-v2.webp'"));
  assert.ok(visuals.includes("import.meta.env.BASE_URL + 'brand/solar-badminton-logo.svg'"));
  assert.match(visuals, /width=\{657\} height=\{683\}/);
  assert.match(css, /\.official-brand img \{[^}]*width: 3.75rem;[^}]*height: auto;[^}]*object-fit: contain/);
  assert.match(css, /\.official-brand-footer img \{ width: 6.25rem/);
  assert.doesNotMatch(page, /brand-mark|>曜<|<svg/);
  for (const name of ['draw', 'priority', 'discount', 'bonus', 'community']) {
    assert.ok(page.includes('<CampaignIcon name="' + name + '"'));
    const asset = readFileSync(new URL('../public/icons/' + name + '-v1.webp', import.meta.url));
    assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP');
  }
  assert.match(visuals, /width=\{640\} height=\{640\} alt="" aria-hidden="true"/);
});

test('sticky CTA retains its hero observer, focus, keyboard, reduced motion and safe-area protections', () => {
  assert.match(sticky, /!item.isIntersecting && item.boundingClientRect.bottom <= 72/);
  assert.match(sticky, /!enabled \|\| !heroPassed \|\| entryVisible \|\| focusObstructed/);
  assert.match(sticky, /visualViewport/);
  assert.match(sticky, /focusAtBottom/);
  assert.match(sticky, /heroObserver.disconnect\(\)/);
  assert.match(css, /env\(safe-area-inset-bottom, 0px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /min-height: 3rem/);
});
