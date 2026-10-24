# Catalog metadata

`catalog.json` is the source of truth. Run `python3 scripts/build_catalog.py` after editing it. This generates the README tables, browser catalog and both compatibility badge files. CI rejects stale outputs.

The migration is based on upstream revision `8afffe416585dc09b69ca33951a4e630d6fc9224`. The unchanged original README is archived in `docs/LEGACY_README.md`. Metadata migration is not independent source verification. Each inherited field should be checked before being used to make a training decision.

## Required record fields

| Field | Meaning |
| --- | --- |
| `id` | Stable, unique lowercase slug; do not change when the display name changes |
| `name`, `url`, `year` | Identified release and primary source; `url: null` explicitly means missing |
| `modalities` | Actual source modalities, not an assumed text conversion |
| `stages` | Candidate uses; specify trainable splits and conversion requirements in caveats |
| `category` | Topic or domain, separate from the stage |
| `size` | Human-readable size with unit and release context; do not add incompatible units |
| `annotation`, `supervision` | What supervision exists and where it came from |
| `access` | `unknown`, `open`, `gated`, `source-dependent`, or `unavailable` |
| `license.label` | Inspected release claim or `Unverified`; not a legal clearance |
| `license.reported` | Inherited license claim, explicitly unverified |
| `license.url` | Evidence page for release terms, when available |
| `format`, `languages` | Documented values; an empty array means not yet verified |
| `verification` | Evidence level, date, and precisely what was checked |
| `sources` | Source URL and supported scope for each claim |
| `caveats` | Split rules, source media requirements, limitations and adaptation needs |

## Stage vocabulary

- `pretraining`: pairs, interleaved material or other broad representation/alignment data.
- `sft`: supervised instruction or conversational fine-tuning.
- `preference`: pairwise preferences or ratings with a documented conversion policy.
- `rl`: reference answers, verifiers or environment interactions for reinforcement learning. A list of questions is not a ready-made reward function.
- `task-adaptation`: a source task/domain resource requiring explicit adaptation for an MLLM.
- `evaluation`: evaluation use under the original protocol; preserve held-out examples.

SFT, preference optimization and RL belong under post-training; the tags are not mutually exclusive. Training and evaluation tags never permit training on a held-out split.

## Evidence vocabulary

`pending` records inherit information awaiting review. `documented` records have the dataset card/schema and author documentation inspected, with a date and scope. Neither level implies that files were downloaded, all fields were independently audited, training benefits were demonstrated, or source content rights were cleared.

Partially corrected legacy records remain `pending`. Their sources identify the fields checked. `unknown` supervision is preferable to inventing provenance. Model-generated answers and measured signals must remain distinguishable.

`pending_entries` preserves ambiguous legacy rows outside the active explorer. Model projects are listed as related resources until their specific dataset releases can be identified. Records such as COCO and COCO Captions may refer to shared media; the record count is not the count of independent corpora.
