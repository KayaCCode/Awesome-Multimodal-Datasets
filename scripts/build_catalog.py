"""Validate the source catalog and generate README, browser data and count badges."""
import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
STAGES = {'pretraining', 'sft', 'preference', 'rl', 'task-adaptation', 'evaluation'}
SUPERVISION = {'human', 'measured', 'weak', 'model-generated', 'mixed', 'unknown'}
ACCESS = {'unknown', 'open', 'gated', 'source-dependent', 'unavailable'}
MODALITIES = {'Image', 'Text', 'Video', 'Audio', '3D', 'LiDAR', 'Radar', 'Sensor', 'Depth', 'Thermal', 'Graph'}


def valid_url(value):
    parsed = urlparse(value)
    return parsed.scheme in {'https', 'http'} and bool(parsed.netloc)


def validate(catalog):
    if catalog.get('schema_version') != 1:
        raise ValueError('Unsupported schema_version')
    ids = set()
    for d in catalog['datasets']:
        label = d.get('id', '<missing id>')
        def require(condition, message):
            if not condition:
                raise ValueError(f'{label}: {message}')
        require(bool(re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', label)), 'invalid id')
        require(label not in ids, 'duplicate id')
        ids.add(label)
        for key in ['name', 'year', 'category', 'size', 'annotation', 'notes']:
            require(isinstance(d.get(key), str) and bool(d[key]), f'missing {key}')
        require(d.get('url') is None or valid_url(d['url']), 'invalid url')
        for key, allowed in [('stages', STAGES), ('modalities', MODALITIES)]:
            values = d.get(key)
            require(isinstance(values, list) and bool(values) and set(values) <= allowed, f'invalid {key}')
            require(len(values) == len(set(values)), f'duplicate {key}')
        require(d.get('supervision') in SUPERVISION, 'invalid supervision')
        require(d.get('access') in ACCESS, 'invalid access')
        require(isinstance(d.get('license'), dict) and bool(d['license'].get('label')), 'missing license label')
        for key in ['format', 'languages', 'caveats']:
            require(isinstance(d.get(key), list), f'invalid {key}')
        verification = d.get('verification', {})
        require(verification.get('status') in {'pending', 'documented'}, 'invalid verification status')
        require(bool(verification.get('scope')), 'missing verification scope')
        if verification.get('status') == 'documented':
            require(bool(re.fullmatch(r'\d{4}-\d{2}-\d{2}', verification.get('checked_at') or '')), 'documented entry needs date')
        require(bool(d.get('sources')), 'source evidence required')
        for source in d['sources']:
            require(valid_url(source.get('url', '')) and bool(source.get('scope')), 'invalid source evidence')
    return catalog


def cell(value):
    return str(value).replace('|', '&#124;').replace('\n', ' ')


def render_readme(c):
    intro = '''# Awesome Multimodal Datasets

A practical catalog for multimodal pretraining, supervised fine-tuning, preference optimization, reinforcement learning and evaluation.

[Browse the website source](docs/index.html) · [Structured catalog](data/catalog.json) · [Contribute](CONTRIBUTING.md)

The GitHub Pages deployment workflow is included. Once enabled and deployed, the explorer will be available at **https://kayaccode.github.io/Awesome-Multimodal-Datasets/**.

## Choose data for your training stage

| Stage | What to look for |
| --- | --- |
| Pretraining | Aligned pairs, interleaved documents, media availability and source coverage |
| Supervised fine-tuning | Instructions, conversations, answer provenance and task coverage |
| Preference optimization | Candidate responses, chosen/rejected pairs or documented rating-to-pair conversion |
| Reinforcement learning | Problems, reference answers, executable verifiers or environments; data alone is insufficient |
| Task / domain adaptation | Source datasets needing a documented conversion into your model's training format |
| Evaluation | Use the prescribed split and protocol; keep evaluation examples out of training |

SFT, preference optimization and RL are all forms of post-training. Stage tags below are editorial candidate uses, not proof of training efficacy or permission to train on every split.

## Evidence and scope

- **Documented** means the cited dataset card/schema and author documentation were inspected. It does not mean media were downloaded, the dataset was trained on, or upstream rights were audited.
- **Pending** means metadata was inherited from the original list and still needs review. Published sizes and licenses may be outdated.
- Supervision distinguishes human labels, measurements, weak supervision, model-generated labels and unknown sources. A label is not automatically independent ground truth.
- The catalog includes source datasets that require adaptation; not every entry is a ready-to-train MLLM corpus.
- License fields distinguish currently inspected release terms from unverified legacy claims. Read source conditions for the selected version and its underlying media.

'''
    lines = [intro, '## Catalog\n', f"{len(c['datasets'])} catalog records; {len(c['pending_entries'])} legacy entries held for clarification. COCO caption and annotation views are separate records, not independent media pools.\n", '<!-- GENERATED CATALOG: edit data/catalog.json, then run python3 scripts/build_catalog.py -->\n']
    for stage, title in c['stage_labels'].items():
        lines += [f'### {title}\n', '| Dataset | Modalities | Size / release | Supervision | Evidence |', '| --- | --- | --- | --- | --- |']
        for d in c['datasets']:
            if stage not in d['stages']:
                continue
            name = f"[{cell(d['name'])}]({d['url']})" if d['url'] else cell(d['name']) + ' (link needed)'
            lines.append('| ' + ' | '.join([name, ', '.join(d['modalities']), cell(d['size']) + ' · ' + cell(d['year']), c['supervision_labels'][d['supervision']], d['verification']['status'].capitalize()]) + ' |')
        lines.append('')
    lines += ['## Pending clarification\n', 'These entries are preserved in the source catalog but excluded from the active explorer. See the [legacy snapshot](docs/LEGACY_README.md) for the original rows.\n']
    for d in c['pending_entries']:
        lines.append(f"- **{d['name']}**: {d['reason']}")
    lines += ['\n## Maintain and preview\n', '```sh\npython3 scripts/build_catalog.py\npython3 scripts/build_catalog.py --check\npython3 -m http.server 8000 --directory docs\n```\n', 'Open http://localhost:8000. The site also works by opening `docs/index.html` directly. No runtime API key, dependency installation or backend is required.\n', 'See [deployment instructions](docs/DEPLOYMENT.md), the [metadata guide](data/README.md).\n', '## Related resources\n', '- [BiomedCLIP](https://arxiv.org/abs/2303.00915): model/project; identify its data release separately.\n- [InstructBLIP](https://github.com/salesforce/LAVIS/tree/main/projects/instructblip): model and training framework.\n- [MultiBench](https://github.com/pliang279/MultiBench): multimodal benchmark toolkit.\n', '## Attribution and license\n', 'The original list and its attribution are preserved in [LEGACY_README.md](docs/LEGACY_README.md). The starting taxonomy referenced [arXiv:2412.17759](https://arxiv.org/abs/2412.17759).\n', 'The original repository declares [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) for this compilation. Each listed dataset retains its own release and source conditions. Catalog inclusion grants no rights to underlying media.\n']
    return '\n'.join(lines)


def outputs(c):
    badge = json.dumps({'schemaVersion': 1, 'label': 'Catalog records', 'message': str(len(c['datasets'])), 'color': 'blue'}, indent=2) + '\n'
    browser = '// Generated from data/catalog.json. Do not edit.\nwindow.DATA_CATALOG = ' + json.dumps(c, ensure_ascii=False).replace('<', '\\u003c') + ';\n'
    return {ROOT/'README.md': render_readme(c), ROOT/'docs/assets/catalog.js': browser,
            ROOT/'dataset_count.json': badge, ROOT/'scripts/dataset_count.json': badge}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Validate and fail on stale generated files without writing')
    args = parser.parse_args()
    try:
        catalog = validate(json.loads((ROOT/'data/catalog.json').read_text()))
        stale = []
        for path, content in outputs(catalog).items():
            if args.check:
                if not path.exists() or path.read_text() != content:
                    stale.append(str(path.relative_to(ROOT)))
            else:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(content)
        if stale:
            raise ValueError('Generated files are stale: ' + ', '.join(stale))
        print(f"Catalog valid: {len(catalog['datasets'])} records; generated files {'current' if args.check else 'updated'}.")
    except (ValueError, KeyError, TypeError) as exc:
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
