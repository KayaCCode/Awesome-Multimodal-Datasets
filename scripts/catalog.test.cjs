const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const core = require('../docs/assets/core.js');
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/catalog.json'), 'utf8'));
const defaults = core.decode('', catalog);
test('search and independent filters intersect; preference data never leaks evaluation-only records', () => {
  const r = core.filter(catalog.datasets, {...defaults, stage: 'preference', modality: 'Image', verification: 'documented'});
  assert.ok(r.length >= 2);
  assert.ok(r.every(d => d.stages.includes('preference') && d.modalities.includes('Image') && d.verification.status === 'documented'));
  assert.equal(core.filter(catalog.datasets, {...defaults, stage:'preference', q:'Video-MME'}).length, 0);
  assert.equal(core.filter(catalog.datasets, {...defaults, q:'RLAIF feedback'})[0].id, 'rlaif-v');
});
test('shared URLs round-trip filters containing punctuation and reject invalid enum values', () => {
  const original = {...defaults, q: 'image & text / 中文', stage:'sft', category:'Preference & Reasoning', sort:'newest'};
  assert.deepEqual(core.decode(core.encode(original), catalog), original);
  const invalid = core.decode('stage=bogus&modality=html&sort=garbage', catalog);
  assert.equal(invalid.stage, ''); assert.equal(invalid.modality, ''); assert.equal(invalid.sort, 'name');
});
test('empty search returns all records, impossible search returns none, and reviewed sort is stable', () => {
  assert.equal(core.filter(catalog.datasets, defaults).length, catalog.datasets.length);
  assert.equal(core.filter(catalog.datasets, {...defaults,q:'no-such-dataset-594378'}).length, 0);
  const sorted = core.filter(catalog.datasets, {...defaults, sort:'evidence'});
  const firstPending = sorted.findIndex(d => d.verification.status === 'pending');
  assert.ok(firstPending > 0);
  assert.ok(sorted.slice(firstPending).every(d => d.verification.status === 'pending'));
});
