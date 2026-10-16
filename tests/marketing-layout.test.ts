import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getPageView } from '../src/lib/page-view.ts';

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const page = read('src/App.tsx');
const warm = read('src/components/warm-campaign-hero.tsx');
const details = read('src/pages/activity-details.tsx');
const entry = read('src/components/registration-form.tsx');
const sticky = read('src/components/mobile-registration-cta.tsx');
const visuals = read('src/components/campaign-visuals.tsx');
const css = read('src/index.css');

test('four marketing sections keep the long document outside the home branch', () => {
  assert.deepEqual([...page.matchAll(/^      <section id="([^"]+)"/gm)].map((match) => match[1]), ['top', 'prizes', 'benefits', 'register']);
  assert.match(page, /<WarmCampaignHero state=\{registrationState\}/);
  assert.match(warm, /<h1>讓我們有一個 可以一起打球的地方<\/h1>/);
  assert.ok(page.includes("pageView === 'details' ? <ActivityDetails"));
  assert.doesNotMatch(page, /PRIVACY_NOTICE_ITEMS.map|AUTHORIZED_VENUES.map|<details\b/);
  assert.match(details, /PRIVACY_NOTICE_ITEMS.map/);
  assert.match(details, /AUTHORIZED_VENUES.map/);
  assert.ok(page.includes("marketing.phase === 'unavailable' ? '目前暫停收件；獎品與參加資格請見完整活動辦法。'"));
});

test('warm hero preserves the existing headline and metadata while keeping the older artwork', () => {
  assert.equal((warm.match(/<h1>/g) ?? []).length, 1);
  assert.match(warm, /imageFailed \? ' warm-scene-fallback'/);
  assert.match(warm, /onError=\{\(\) => setImageFailed\(true\)\}/);
  assert.match(css, /\.warm-scene-fallback \.warm-introduction, \.warm-scene-fallback \.warm-link-label \{[^}]*clip-path: none/);
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

test('campaign tagline moves once into a compact branded header without changing registration or footer', () => {
  const header = page.match(/<header className="site-header">[\s\S]*?<\/header>/)?.[0] ?? '';
  const hero = page.match(/<section id="top"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((page.match(/2027 場地募集 · LGBTQ\+ 羽球社群/g) ?? []).length, 1);
  assert.match(header, /className="header-brand-group"><OfficialBrand homeHref=\{homeHref\}/);
  assert.match(header, /headerTagline.split\(' · '\)/);
  assert.match(header, /className="header-tagline-divider"> · <\/span>/);
  assert.doesNotMatch(hero, /2027 場地募集|headerTagline|className="eyebrow"/);
  assert.match(header, /<RegistrationLink state=\{registrationState\} className="header-action">\{registrationState.status === 'open' \? '參與計畫' : marketing.actionLabel\}/);
  assert.match(css, /\.header-brand-group \.official-brand img \{ width: 3rem; \}/);
  assert.match(css, /\.header-tagline > span \{ display: block; \}/);
  assert.match(css, /\.header-tagline-divider \{[^}]*clip-path: inset\(50%\)/);
  assert.match(css, /\.header-brand-group \{[^}]*flex: 1 1 10rem;[^}]*min-width: 0/);
  assert.match(css, /\.campaign-page \.header-action \{[^}]*max-width: 100%;[^}]*border-radius: \.7rem/);
  assert.match(css, /scroll-margin-top: 5.5rem/);
  assert.match(page, /<OfficialBrand homeHref=\{homeHref\} footer \/>/);
  assert.match(css, /\.official-brand-footer img \{ width: 6.25rem/);
});

test('three warm benefit hotspots retain labels and eligibility states with real destination cards', () => {
  const benefits = warm;
  assert.ok(benefits.includes("<strong>{marketing.firstDrawOpen ? '30 份' : '首波抽獎'}</strong>"));
  assert.ok(benefits.includes("<span>{marketing.firstDrawOpen ? '抽獎好禮' : marketing.phase === 'unavailable' ? '查看活動辦法' : '資格已截止'}</span>"));
  assert.match(benefits, /<strong>季繳優先<\/strong><span>登記資格<\/span>/);
  assert.match(benefits, /<strong>2027<\/strong><span>臨打優惠<\/span>/);
  for (const id of ['prizes', 'priority-benefit', 'discount-benefit']) {
    assert.ok(warm.includes('href="#' + id + '"'));
    assert.ok(page.includes('id="' + id + '"'));
  }
  assert.doesNotMatch(warm, /tabIndex|onClick/);
});

test('footer keeps the original contact and links together to the right of its logo', () => {
  const footer = page.match(/<footer className="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? '';
  assert.match(footer, /className="page-shell footer-inner"><OfficialBrand homeHref=\{homeHref\} footer \/><div className="footer-content">/);
  assert.match(footer, /className="footer-contact"><p>資料管理負責人：\{CONTACTS.managerName\}<\/p><a href=\{CONTACTS.managerPhoneHref\}>\{CONTACTS.managerPhone\}<\/a>/);
  assert.match(footer, /className="footer-links"><a href=\{detailsHref\('privacy'\)\}>個資告知<\/a><a href=\{detailsHref\('withdrawal'\)\}>終止授權<\/a><a href=\{homeHref\}>返回首頁<\/a>/);
  assert.equal((footer.match(/<OfficialBrand /g) ?? []).length, 1);
  assert.equal((footer.match(/<a href=/g) ?? []).length, 4);
  assert.match(css, /\.footer-inner \{[^}]*display: grid;[^}]*grid-template-columns: max-content minmax\(0, 1fr\)/);
  assert.match(css, /\.footer-content \{ min-width: 0;[^}]*font-size: \.875rem/);
  assert.match(css, /\.footer-contact, \.footer-links \{[^}]*flex-wrap: wrap/);
  assert.match(css, /\.footer-contact > a \{ white-space: nowrap/);
  assert.match(css, /\.footer-content a \{[^}]*min-height: 2.75rem/);
  assert.match(css, /\.official-brand-footer img \{ width: 4rem/);
  assert.match(css, /\.official-brand-footer img \{ width: 6.25rem/);
  assert.doesNotMatch(css, /\.site-footer > div \{[^}]*flex-wrap: wrap|\.site-footer > div \{[^}]*justify-content: space-between/);
});

test('every primary campaign CTA and sticky entry uses the original RegistrationLink gate', () => {
  assert.equal((page.match(/<RegistrationLink state=\{registrationState\}/g) ?? []).length, 2);
  assert.match(warm, /<RegistrationLink state=\{state\}/);
  assert.match(warm, /ref=\{heroActionRef\} className="warm-registration" id="hero-action"/);
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

test('campaign visuals retain the official logo and existing adult illustration assets', () => {
  for (const name of ['community', 'registration', 'court-support']) {
    if (name !== 'community') assert.ok(details.includes('name="' + name + '"'));
    const asset = readFileSync(new URL('../public/marketing/' + name + (name === 'community' ? '-illustration-v2.webp' : '-illustration-warm-v1.webp'), import.meta.url));
    assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP');
  }
  assert.match(visuals, /AI 概念插畫，非實際球友或場地/);
  assert.ok(visuals.includes("name + '-illustration-warm-v1.webp'"));
  assert.ok(visuals.includes("import.meta.env.BASE_URL + 'brand/solar-badminton-logo.svg'"));
  assert.match(visuals, /width=\{657\} height=\{683\}/);
  assert.match(css, /\.official-brand img \{[^}]*width: 3.75rem;[^}]*height: auto;[^}]*object-fit: contain/);
  assert.match(css, /\.official-brand-footer img \{ width: 6.25rem/);
  assert.doesNotMatch(page, /brand-mark|>曜<|<svg/);
  for (const name of ['draw', 'priority', 'discount', 'bonus', 'community']) {
    assert.ok(page.includes('<CampaignIcon name="' + name + '"'));
    const asset = readFileSync(new URL('../public/icons/' + name + '-warm-v1.webp', import.meta.url));
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
