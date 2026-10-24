(function () {
  'use strict';
  const catalog = window.DATA_CATALOG;
  const core = window.CatalogCore;
  const $ = id => document.getElementById(id);
  if (!catalog || !core) { $('result-count').textContent = 'Catalog could not load. Please reload or browse the repository README.'; return; }
  const stages = catalog.stage_labels;
  const shortStages = { pretraining: 'Pretraining', sft: 'SFT', preference: 'Preference', rl: 'RL', 'task-adaptation': 'Adaptation', evaluation: 'Evaluation' };
  const accessLabels = { unknown: 'Not verified', open: 'Open release', gated: 'Application / gated', 'source-dependent': 'Retrieve source media', unavailable: 'Unavailable' };
  let state = core.decode(location.search, catalog), visible = [], selected = new Set(), lastFocus = null;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const link = (url, text) => /^https?:\/\//i.test(url || '') ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)} ↗</a>` : esc(text);
  const tags = d => d.modalities.map(m => `<span class="tag">${esc(m)}</span>`).join('');
  const status = d => `<span class="status ${d.verification.status}">${d.verification.status === 'documented' ? 'Documentation reviewed' : 'Needs verification'}</span>`;
  function options(id, values, labels = {}) {
    for (const value of values) { const o = document.createElement('option'); o.value = value; o.textContent = labels[value] || value; $(id).append(o); }
  }
  options('modality', [...new Set(catalog.datasets.flatMap(d => d.modalities))].sort());
  options('supervision', Object.keys(catalog.supervision_labels), catalog.supervision_labels);
  options('category', [...new Set(catalog.datasets.map(d => d.category))].sort());
  $('total-count').textContent = catalog.datasets.length;
  $('modality-count').textContent = new Set(catalog.datasets.flatMap(d => d.modalities)).size.toString().padStart(2, '0');
  $('documented-count').textContent = catalog.datasets.filter(d => d.verification.status === 'documented').length.toString().padStart(2, '0');
  $('updated').textContent = `Catalog updated ${catalog.updated_at}.`;
  const counts = Object.fromEntries(Object.keys(stages).map(s => [s, catalog.datasets.filter(d => d.stages.includes(s)).length]));
  $('stage-tabs').innerHTML = [['', 'All datasets'], ...Object.entries(shortStages)].map(([s, label]) => `<button class="stage-tab" data-stage="${s}" type="button" aria-pressed="false">${label}<span>${s ? counts[s] : catalog.datasets.length}</span></button>`).join('');
  const max = Math.max(...Object.values(counts));
  $('stage-chart').innerHTML = Object.entries(counts).map(([s, n]) => `<div class="chart-row"><span>${shortStages[s]}</span><span>${n}</span><i><b style="width:${n / max * 100}%"></b></i></div>`).join('');
  function syncControls() {
    $('search').value = state.q;
    $('sort').value = state.sort;
    for (const key of core.filterKeys.filter(k => k !== 'stage')) $(key).value = state[key];
    for (const button of document.querySelectorAll('[data-stage]')) button.setAttribute('aria-pressed', String(button.dataset.stage === state.stage));
  }
  function syncURL() {
    const query = core.encode(state);
    try { history.replaceState(null, '', location.pathname + (query ? '?' + query : '') + location.hash); } catch (_) { /* file:// viewers may forbid history updates */ }
  }
  function render() {
    syncControls(); visible = core.filter(catalog.datasets, state);
    $('result-count').textContent = `${visible.length} of ${catalog.datasets.length} records`;
    $('export').disabled = visible.length === 0;
    $('empty').hidden = visible.length !== 0;
    $('dataset-grid').innerHTML = visible.map(d => `<article class="dataset-card"><div class="card-top"><span class="record-type">${esc(d.category)}</span><label class="select-label"><input type="checkbox" data-select="${d.id}" ${selected.has(d.id) ? 'checked' : ''} aria-label="Compare ${esc(d.name)}">Compare</label></div><h3><button type="button" data-detail="${d.id}">${esc(d.name)}</button></h3><p class="card-description">${esc(d.annotation)}</p><div class="tags">${tags(d)}${d.stages.map(s => `<span class="tag stage">${shortStages[s]}</span>`).join('')}</div><p class="card-size">${esc(d.size)} · ${esc(d.year)}</p><div class="card-bottom">${status(d)}<button class="detail-button" data-detail="${d.id}" type="button">View details ↗</button></div></article>`).join('');
    syncURL();
  }
  function reset() { state = core.decode('', catalog); render(); }
  function toast(message) { $('toast').textContent = message; $('toast').hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => $('toast').hidden = true, 3500); }
  function showDialog(id) { lastFocus = document.activeElement; $(id).showModal(); }
  function detail(id) {
    const d = catalog.datasets.find(d => d.id === id); if (!d) return;
    const license = d.license.label + (d.license.reported ? `; legacy claim (unverified): ${d.license.reported}` : '');
    $('detail-content').innerHTML = `<h2>${esc(d.name)}</h2><div class="tags">${tags(d)}</div><p>${esc(d.notes)}</p><dl><dt>Candidate stages</dt><dd>${d.stages.map(s => esc(stages[s])).join(', ')}</dd><dt>Annotation</dt><dd>${esc(d.annotation)}</dd><dt>Size / release</dt><dd>${esc(d.size)} · ${esc(d.year)}</dd><dt>Supervision</dt><dd>${esc(catalog.supervision_labels[d.supervision])}</dd><dt>Access</dt><dd>${esc(accessLabels[d.access])}</dd><dt>Release terms</dt><dd>${esc(license)}</dd><dt>Format</dt><dd>${esc(d.format.join(', ') || 'Not verified')}</dd><dt>Languages</dt><dd>${esc(d.languages.join(', ') || 'Not verified')}</dd></dl><p>${d.url ? link(d.url, 'Open source page') : 'Official dataset link still needed.'}${d.paper ? ' · ' + link(d.paper, 'Paper') : ''}</p><h3>Evidence & limits</h3><p>${status(d)}${d.verification.checked_at ? ' · ' + esc(d.verification.checked_at) : ''}<br>${esc(d.verification.scope)}</p><ul>${d.caveats.map(c => `<li>${esc(c)}</li>`).join('')}</ul><h3>Sources</h3><ul>${d.sources.map(s => `<li>${link(s.url, new URL(s.url).hostname)} — ${esc(s.scope)}</li>`).join('')}</ul><h3>Use the catalog record</h3><p>This is metadata, not a dataset download or training recipe. Pin the source release and inspect its split and media format.</p><button class="small-button" type="button" id="export-record">Export this record ↓</button>`;
    $('export-record').onclick = () => download([d], d.id + '.json');
    showDialog('detail-dialog');
  }
  function selectionBar() {
    $('compare-bar').hidden = selected.size === 0;
    $('selected-count').textContent = `${selected.size} dataset${selected.size === 1 ? '' : 's'} selected`;
    $('compare').disabled = selected.size < 2;
  }
  function comparison() {
    const ds = catalog.datasets.filter(d => selected.has(d.id));
    const rows = [ ['Stage', d => d.stages.map(s => stages[s]).join(', ')], ['Modalities', d => d.modalities.join(', ')], ['Size / release', d => d.size + ' · ' + d.year], ['Supervision', d => catalog.supervision_labels[d.supervision]], ['Access', d => accessLabels[d.access]], ['Release terms', d => d.license.label], ['Legacy license claim', d => d.license.reported || 'Not recorded'], ['Evidence', d => d.verification.status === 'documented' ? 'Documentation reviewed' : 'Needs verification'], ['Annotation', d => d.annotation], ['Caveats', d => d.caveats.join(' ')] ];
    $('compare-content').innerHTML = `<h2>Compare your shortlist.</h2><p>Records may share source media. These fields do not establish independent data volume or training quality.</p><div class="compare-scroll"><table><caption class="sr-only">Selected dataset comparison</caption><thead><tr><th scope="col">Attribute</th>${ds.map(d => `<th scope="col">${d.url ? link(d.url, d.name) : esc(d.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(([label, fn]) => `<tr><th scope="row">${label}</th>${ds.map(d => `<td>${esc(fn(d))}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p><button class="small-button" type="button" id="export-selection">Export shortlist ↓</button></p>`;
    $('export-selection').onclick = () => download(ds, 'multimodal-shortlist.json'); showDialog('compare-dialog');
  }
  function download(records, filename) {
    const blob = new Blob([JSON.stringify({ schema_version: catalog.schema_version, catalog_updated_at: catalog.updated_at, datasets: records }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  $('search').addEventListener('input', e => { state.q = e.target.value; render(); });
  $('sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
  for (const key of core.filterKeys.filter(k => k !== 'stage')) $(key).addEventListener('change', e => { state[key] = e.target.value; render(); });
  $('stage-tabs').addEventListener('click', e => { const b = e.target.closest('[data-stage]'); if (b) { state.stage = b.dataset.stage; render(); } });
  $('dataset-grid').addEventListener('click', e => { const b = e.target.closest('[data-detail]'); if (b) detail(b.dataset.detail); });
  $('dataset-grid').addEventListener('change', e => { const id = e.target.dataset.select; if (!id) return; if (e.target.checked && selected.size >= 4) { e.target.checked = false; toast('Compare up to four datasets at a time.'); return; } if (e.target.checked) selected.add(id); else selected.delete(id); selectionBar(); });
  $('reset').onclick = reset; $('empty-reset').onclick = reset;
  $('clear-selection').onclick = () => { selected.clear(); selectionBar(); render(); };
  $('compare').onclick = comparison;
  $('export').onclick = () => download(visible, 'multimodal-datasets.json');
  $('share').onclick = async () => {
    if (location.protocol === 'file:') { toast('Share links work after serving the site over HTTP or GitHub Pages.'); return; }
    try { await navigator.clipboard.writeText(location.href); toast('Filter link copied.'); } catch (_) { toast('Copy the current address from your browser to share these filters.'); }
  };
  for (const d of document.querySelectorAll('dialog')) {
    d.querySelector('.close-dialog').onclick = () => d.close();
    d.addEventListener('click', e => { if (e.target === d) { const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); } });
    d.addEventListener('close', () => { if (lastFocus && document.contains(lastFocus)) lastFocus.focus(); });
  }
  document.addEventListener('keydown', e => { if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')) { e.preventDefault(); $('search').focus(); } });
  window.addEventListener('popstate', () => { state = core.decode(location.search, catalog); render(); });
  render();
})();
