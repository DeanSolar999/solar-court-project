import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createElement, createRef, type ComponentType, type RefObject } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { getRegistrationState, REGISTRATION_CONFIG, type RegistrationState } from '../src/lib/registration-config.ts';
import { getMarketingContent } from '../src/lib/marketing-content.ts';

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const css = read('src/index.css');
// Node's strip-types runner does not parse JSX. Compile only these two local components
// in memory, retaining their production RegistrationLink and state logic unchanged.
function componentUrl(path: string, dependencies: Record<string, string>) {
  let code = ts.transpileModule(read(path), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText.replaceAll('import.meta.env.BASE_URL', JSON.stringify('/solar-court-project/'));
  for (const [name, url] of Object.entries({ react: import.meta.resolve('react'), 'react/jsx-runtime': import.meta.resolve('react/jsx-runtime'), ...dependencies })) {
    code = code.replaceAll(JSON.stringify(name), JSON.stringify(url)).replaceAll("'" + name + "'", JSON.stringify(url));
  }
  return 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
}
const linkUrl = componentUrl('src/components/registration-link.tsx', {
  '@/lib/registration-config': new URL('../src/lib/registration-config.ts', import.meta.url).href,
});
const heroModule = await import(componentUrl('src/components/warm-campaign-hero.tsx', { '@/components/registration-link': linkUrl }));
const WarmHero = heroModule.WarmCampaignHero as ComponentType<{
  state: RegistrationState;
  marketing: ReturnType<typeof getMarketingContent>;
  heroActionRef: RefObject<HTMLDivElement | null>;
  detailsHref: string;
}>;
const detailsHref = '/solar-court-project/?view=details#details-top';
function render(now: number, state = getRegistrationState(undefined, now)) {
  return renderToStaticMarkup(createElement(WarmHero, {
    state, marketing: getMarketingContent(now, state.status), heroActionRef: createRef<HTMLDivElement>(), detailsHref,
  }));
}

test('warm hero renders one responsive image and five semantic targets in visual order', () => {
  const html = render(Date.parse('2026-10-15T12:00:00+08:00'));
  assert.equal((html.match(/<picture\b/g) ?? []).length, 1);
  assert.equal((html.match(/<img\b/g) ?? []).length, 1);
  assert.match(html, /<source media="\(min-width: 1024px\)"[^>]*warm-home-desktop-v1.webp[^>]*width="1536" height="1024"/);
  assert.match(html, /<img[^>]*warm-home-mobile-v1.webp[^>]*width="941" height="1672" alt="" loading="eager" fetchPriority="high"/);
  assert.match(html, /<h1>讓我們有一個 可以一起打球的地方<\/h1>/);
  assert.deepEqual([...html.matchAll(/<a href="([^"]+)"/g)].map((match) => match[1]), [
    '#prizes', '#priority-benefit', '#discount-benefit', REGISTRATION_CONFIG.formUrl, detailsHref,
  ]);
  assert.match(html, /<strong>30 份<\/strong><span>抽獎好禮<\/span>/);
  assert.match(html, /id="hero-action"><a[^>]*class="warm-registration-link"[^>]*><span class="warm-link-label">開始登記/);
  assert.doesNotMatch(html, /<button|warm-state-covered|solar-badminton\.tw/);
});

test('the first-draw cutoff opaquely replaces the original prize-card text while venue support stays open', () => {
  const html = render(Date.parse('2027-01-01T00:00:00+08:00'));
  assert.match(html, /class="warm-hotspot warm-prizes warm-state-covered"/);
  assert.match(html, /<strong>首波抽獎<\/strong><span>資格已截止<\/span>/);
  assert.ok(html.includes('href="' + REGISTRATION_CONFIG.formUrl + '"'));
  assert.doesNotMatch(html, /<strong>30 份|<button/);
});

test('paused, invalid and ended gates render disabled opaque buttons without any form URL', () => {
  const now = Date.parse('2026-10-15T12:00:00+08:00');
  for (const [time, state, action, prizeLabel] of [
    [now, getRegistrationState({ ...REGISTRATION_CONFIG, open: false }, now), '登記暫停中', '查看活動辦法'],
    [now, getRegistrationState({ ...REGISTRATION_CONFIG, formUrl: 'https://example.com/' }, now), '登記暫停中', '查看活動辦法'],
    [Number.NaN, getRegistrationState(undefined, Number.NaN), '登記暫停中', '查看活動辦法'],
    [Date.parse('2028-01-01T00:00:00+08:00'), getRegistrationState(undefined, Date.parse('2028-01-01T00:00:00+08:00')), '登記已截止', '資格已截止'],
  ] as const) {
    const html = render(time, state);
    assert.match(html, /<button type="button" disabled="" class="warm-registration-link"/);
    assert.ok(html.includes('<span class="warm-link-label">' + action + '</span></button>'));
    assert.match(html, /class="warm-hotspot warm-prizes warm-state-covered"/);
    assert.ok(html.includes('<span>' + prizeLabel + '</span>'));
    assert.doesNotMatch(html, /https:\/\/script\.google\.com|>開始登記<|>30 份</);
  }
  assert.match(css, /\.warm-state-covered, \.warm-registration-link:disabled \{[^}]*background: var\(--ink\);[^}]*opacity: 1/);
  assert.match(css, /\.warm-state-covered \.warm-link-label, \.warm-registration-link:disabled \.warm-link-label \{[^}]*clip-path: none/);
});

test('new hotspots stay separate and the visible details link follows the uncropped image', () => {
  assert.match(css, /\.warm-registration \{[^}]*top: 90\.84928230%;[^}]*min-height: 44px;[^}]*translateY\(-50%\)/);
  assert.match(css, /\.warm-details \{[^}]*min-height: 44px/);
  assert.match(css, /\.warm-details-row \{ display: flex/);
  assert.doesNotMatch(css, /\.warm-details(?:-row)? \{[^}]*position:\s*absolute/);
  for (const width of [320, 390, 768, 1024, 1280, 1536]) {
    const desktop = width >= 1024;
    const sceneWidth = desktop ? Math.min(width, 1536) : Math.min(width, 640);
    const height = sceneWidth * (desktop ? 1024 / 1536 : 1672 / 941);
    const center = height * (desktop ? 903 / 1024 : 1519 / 1672);
    const startHeight = Math.max(44, height * (desktop ? 84 / 1024 : 94 / 1672));
    const cardsBottom = height * (desktop ? 844 / 1024 : 1447 / 1672);
    const taglineTop = height * (desktop ? 965 / 1024 : 1594 / 1672);
    assert.ok(center - startHeight / 2 >= cardsBottom, 'Registration overlaps benefit cards at ' + width);
    assert.ok(center + startHeight / 2 <= taglineTop, 'Registration overlaps image tagline at ' + width);
    assert.ok(height > center + startHeight / 2, 'Details flow begins below registration at ' + width);
  }
  assert.doesNotMatch(css, /\.warm-picture[^{}]*\{[^}]*top:\s*-|\.warm-picture[^{}]*\{[^}]*object-fit:\s*cover/);
  assert.match(css, /\.warm-qualification \{ padding-block: \.75rem 1\.5rem/);
  assert.match(css, /\.warm-hotspot:focus-visible, \.warm-registration-link:focus-visible/);
  const html = render(Date.parse('2026-10-15T12:00:00+08:00'));
  assert.match(html, /<\/div><div class="warm-details-row"><a[^>]*class="text-link warm-details">閱讀活動說明<\/a>/);
});

test('both supplied lossless image assets retain their exact original dimensions', () => {
  for (const [name, expectedWidth, expectedHeight] of [['mobile', 941, 1672], ['desktop', 1536, 1024]] as const) {
    const asset = readFileSync(new URL('../public/marketing/warm-home-' + name + '-v1.webp', import.meta.url));
    assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP');
    const encoding = asset.subarray(12, 16).toString('ascii');
    assert.ok(encoding === 'VP8L' || encoding === 'VP8X');
    const bits = encoding === 'VP8L' ? asset.readUInt32LE(21) : 0;
    assert.equal(encoding === 'VP8L' ? (bits & 0x3fff) + 1 : asset.readUIntLE(24, 3) + 1, expectedWidth);
    assert.equal(encoding === 'VP8L' ? ((bits >>> 14) & 0x3fff) + 1 : asset.readUIntLE(27, 3) + 1, expectedHeight);
  }
});
