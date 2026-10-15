import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const fixture = JSON.parse(read('tests/fixtures/activity-copy-5b5d1fd.json')) as { baseline: string; fragments: string[] };

test('approved canonical, collection gate, marketing dates and registration summary remain byte-identical', () => {
  const hashes = {
    'src/lib/consent.ts': 'a6d630f85697f1151c5886a9bf82221946f18fa4b9f50e1dff85a36645bfb900',
    'src/lib/registration-config.ts': '5a995e7ed675883bff0d4535633fc0d35ef213fa8fbdeb96eb2d3da93e03ede8',
    'src/lib/marketing-content.ts': '3162ba071156843c0f9c2a53caf3dd198e32f76d9b9e840f4242857abf590eb9',
    'src/components/registration-form.tsx': '43cde948db65aedc805fccda0e4971ea6a5aeee6b69eab56ed88035a4e23121a',
  };
  for (const [file, hash] of Object.entries(hashes)) assert.equal(createHash('sha256').update(read(file)).digest('hex'), hash, file);
});

test('all baseline inline activity conditions and complete rules/specification blocks are moved without rewriting', () => {
  assert.equal(fixture.baseline, '5b5d1fdd0b440134f4aac66f6d2669d7d35189f4');
  assert.ok(fixture.fragments.length >= 25);
  const published = read('src/App.tsx') + read('src/pages/activity-details.tsx') + read('src/components/campaign-visuals.tsx');
  // Decorative Lucide icons may move; all surrounding text and expressions must remain exact.
  const withoutDecorativeIcons = (source: string) => source.replace(/<(?:Gift|Users|HeartHandshake)\s[^>]*\/>/g, '');
  for (const fragment of fixture.fragments) assert.ok(withoutDecorativeIcons(published).includes(withoutDecorativeIcons(fragment)), 'Protected baseline text missing: ' + fragment);
});
