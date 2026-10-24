/* Pure catalog operations shared by the browser and Node checks. */
(function (root) {
  'use strict';
  const filterKeys = ['stage', 'modality', 'supervision', 'category', 'verification', 'access'];
  function filter(datasets, state) {
    const words = (state.q || '').toLowerCase().trim().split(/\s+/).filter(Boolean);
    return datasets.filter(d => {
      if (state.stage && !d.stages.includes(state.stage)) return false;
      if (state.modality && !d.modalities.includes(state.modality)) return false;
      if (state.supervision && d.supervision !== state.supervision) return false;
      if (state.category && d.category !== state.category) return false;
      if (state.verification && d.verification.status !== state.verification) return false;
      if (state.access && d.access !== state.access) return false;
      const haystack = [d.name, d.category, d.annotation, d.notes, d.year, d.size, d.supervision, ...d.modalities, ...d.stages, ...d.caveats].join(' ').toLowerCase();
      return words.every(w => haystack.includes(w));
    }).sort((a, b) => {
      if (state.sort === 'newest') {
        const delta = (parseInt(b.year.match(/\d{4}/)?.[0]) || 0) - (parseInt(a.year.match(/\d{4}/)?.[0]) || 0);
        if (delta) return delta;
      }
      if (state.sort === 'evidence') {
        const delta = Number(b.verification.status === 'documented') - Number(a.verification.status === 'documented');
        if (delta) return delta;
      }
      return a.name.localeCompare(b.name);
    });
  }
  function decode(search, catalog) {
    const p = new URLSearchParams(search), state = { q: p.get('q') || '', sort: p.get('sort') || 'name' };
    if (!['name', 'newest', 'evidence'].includes(state.sort)) state.sort = 'name';
    const options = {
      stage: Object.keys(catalog.stage_labels), modality: [...new Set(catalog.datasets.flatMap(d => d.modalities))],
      supervision: Object.keys(catalog.supervision_labels), category: [...new Set(catalog.datasets.map(d => d.category))],
      verification: ['pending', 'documented'], access: ['unknown', 'open', 'gated', 'source-dependent', 'unavailable']
    };
    for (const key of filterKeys) state[key] = options[key].includes(p.get(key)) ? p.get(key) : '';
    return state;
  }
  function encode(state) {
    const p = new URLSearchParams();
    for (const key of ['q', ...filterKeys, 'sort']) if (state[key] && !(key === 'sort' && state[key] === 'name')) p.set(key, state[key]);
    return p.toString();
  }
  const api = { filter, decode, encode, filterKeys };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CatalogCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
