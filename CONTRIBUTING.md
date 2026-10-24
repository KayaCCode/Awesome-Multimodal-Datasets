# Contributing

Add or correct records in `data/catalog.json`. Use the fields and vocabularies in [the metadata guide](data/README.md). Run:

```sh
python3 scripts/build_catalog.py
python3 scripts/build_catalog.py --check
node --test scripts/catalog.test.cjs
```

Include the updated generated README, browser data and badges in your PR. There is no dependency installation required for these checks (Python 3.9+ and Node 18+).

For each dataset, provide its actual release page, annotation source, candidate training stage, access conditions and evidence links. State whether the data includes media, URLs, derived features, predictions or only metadata. Keep unknown facts explicit. Do not transfer a code repository's license to its dataset or upstream media. Specify the release/split for any size claim.

Use `documented` only after inspecting the published card/schema and author documentation; record exactly what was checked and when. Download verification and training validation are not implied. Generated labels are welcome with clear provenance. Preserve evaluation splits, source attribution and upstream conditions.

Correct obvious errors rather than preserving them as facts. Move unresolved identities to `pending_entries` and explain why. Keep models, frameworks and organizations in related resources until a specific data release is identified.

The pending TCGA / HEST PR is reviewed separately; this migration does not accept or reject it.
