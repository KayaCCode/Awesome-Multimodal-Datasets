# Awesome Multimodal Datasets

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


## Catalog

61 catalog records; 6 legacy entries held for clarification. COCO caption and annotation views are separate records, not independent media pools.

<!-- GENERATED CATALOG: edit data/catalog.json, then run python3 scripts/build_catalog.py -->

### Pretraining

| Dataset | Modalities | Size / release | Supervision | Evidence |
| --- | --- | --- | --- | --- |
| [MINT-1T](https://arxiv.org/abs/2406.11271) | Image, Text | 3.4B images, 1T tokens · 2024 | Not verified | Pending |
| [Bloom Library](https://huggingface.co/datasets/bigscience/bloom-library) | Image, Text | 1.6 M pages · 2023 | Not verified | Pending |
| [LAION-5B](https://laion.ai/blog/laion-5b) | Image, Text | 5.85 B pairs · 2022 | Weak supervision | Pending |
| [COYO-700M](https://github.com/kakaobrain/coyo-dataset) | Image, Text | 747 M pairs · 2022 | Weak supervision | Pending |
| [LAION-COCO](https://laion.ai/blog/laion-coco) | Image, Text | 600 M pairs · 2022 | Model-generated | Pending |
| [Microsoft COCO](https://cocodataset.org/#home) | Image, Text | 330 K imgs · 2014 | Not verified | Pending |
| [Microsoft COCO Captions](https://cocodataset.org/#download) | Image, Text | 330 K imgs · 2014 | Human annotation | Pending |
| [Flickr30k](https://shannon.cs.illinois.edu/DenotationGraph) | Image, Text | 31 K imgs · 2014 | Human annotation | Pending |
| [Panda-70M](https://snap-research.github.io/Panda-70M) | Video, Text | 70 M clips · 2024 | Model-generated | Pending |
| [OpenVid-1M](https://github.com/ali-vilab/OpenVid-1M) | Video, Text | 1 M clips · 2024 | Not verified | Pending |
| [WebVid-10M](https://m-bain.github.io/webvid-dataset) | Video, Text | 10 M clips · 2021 | Weak supervision | Pending |
| [YouTube-8M](https://research.google.com/youtube8m) | Video, Text | 8 M videos · 2016 | Not verified | Pending |
| [WavCaps](https://github.com/XinhaoMei/WavCaps) | Audio, Text | 400 k clips / 7600 hrs · 2023 | Model-generated | Pending |
| AudioCaps (link needed) | Audio, Text | 46 K clips · 2019 | Human annotation | Pending |
| [Clotho](https://zenodo.org/record/3490684) | Audio, Text | 4.9 K clips · 2020 | Human annotation | Pending |
| [LibriTTS](https://openslr.org/60) | Audio, Text | 585 hrs · 2019 | Not verified | Pending |
| [AISHELL-2](https://www.aishelltech.com/aishell_2) | Audio, Text | 1000 hrs · 2018 | Human annotation | Pending |
| [LJSpeech](https://keithito.com/LJ-Speech-Dataset) | Audio, Text | 13100 clips / 24 hrs · 2017 | Not verified | Pending |
| [InternVid](https://github.com/OpenGVLab/InternVid) | Video, Audio, Text | 234 M clips · 2023 | Weak supervision | Pending |
| [VGGSound](https://www.robots.ox.ac.uk/~vgg/data/vggsound/) | Video, Audio, Text | 200 K clips / 550 hrs · 2020 | Not verified | Pending |
| SoundingEarth (link needed) | Image, Audio, Text | 50 k image-audio pairs · 2023 | Not verified | Pending |
| [ShapeNet](https://shapenet.org) | 3D | 51 K models · 2015 | Not verified | Pending |
| [PathGen-1.6M](https://github.com/PathFoundation/PathGen-1.6M) | Image, Text | 1.6M pathology image-caption pairs · 2024 | Model-generated | Pending |
| [MMSci](https://github.com/Leezekun/MMSci) | Image, Text | 200 K Q-V · 2024 | Not verified | Pending |

### Supervised fine-tuning

| Dataset | Modalities | Size / release | Supervision | Evidence |
| --- | --- | --- | --- | --- |
| [LLaVA-Instruct-150K](https://huggingface.co/datasets/liuhaotian/LLaVA-Instruct-150K) | Image, Text | ~150 K instruction pairs · 2023 | Model-generated | Pending |
| [MIMIC-IT](https://github.com/EvolvingLMMs-Lab/Otter/tree/main/mimic-it) | Image, Video, Text | 2.8 M pairs · 2023 | Model-generated | Pending |
| [LAMM](https://opendatalab.com/LAMM/LAMM) | Image, Text, 3D | 186 K image pairs, 10 K point cloud pairs · 2023 | Not verified | Pending |
| [PathGen-1.6M](https://github.com/PathFoundation/PathGen-1.6M) | Image, Text | 1.6M pathology image-caption pairs · 2024 | Model-generated | Pending |
| [MMSci](https://github.com/Leezekun/MMSci) | Image, Text | 200 K Q-V · 2024 | Not verified | Pending |
| [R1-Onevision](https://huggingface.co/datasets/Fancy-MLLM/R1-Onevision) | Image, Text | 154,667 rows (current Hub card) · 2025 | Model-generated | Documented |

### Preference optimization

| Dataset | Modalities | Size / release | Supervision | Evidence |
| --- | --- | --- | --- | --- |
| [RLAIF-V](https://huggingface.co/datasets/openbmb/RLAIF-V-Dataset) | Image, Text | 83.1K preference records (current Hub viewer) · 2024 | Model-generated | Documented |
| [VLFeedback](https://huggingface.co/datasets/MMInstruction/VLFeedback) | Image, Text | 80.3K prompts (current Hub viewer) · 2023 | Model-generated | Documented |

### Reinforcement learning

| Dataset | Modalities | Size / release | Supervision | Evidence |
| --- | --- | --- | --- | --- |
| [Vision-R1-rl](https://huggingface.co/datasets/Osilly/Vision-R1-rl) | Image, Text | 11,312 rows across two splits (current Hub viewer) · 2025 | Not verified | Documented |

### Task / domain adaptation

| Dataset | Modalities | Size / release | Supervision | Evidence |
| --- | --- | --- | --- | --- |
| [SlideVQA](https://slidevqa.github.io) | Image, Text | 14.5 K QA pairs · 2024 | Not verified | Pending |
| [TVQA](https://tvqa.cs.unc.edu) | Video, Text | 152.5 K QA pairs · 2018 | Not verified | Pending |
| [SQA3D](https://sqa3d.github.io) | Text, 3D | 33.4 K questions · 2023 | Not verified | Pending |
| [MovieQA](http://movieqa.cs.toronto.edu) | Video, Audio, Text | 14.9 K (14,944) QA pairs · 2016 | Not verified | Pending |
| [MSR-VTT](https://www.microsoft.com/en-us/research/publication/msr-vtt-a-large-video-description-dataset-for-bridging-video-and-language) | Video, Text | 10 K clips / 200 K caps · 2016 | Human annotation | Pending |
| [MELD](https://affective-meld.github.io) | Video, Audio, Text | 13,708 utterances · 2019 | Not verified | Pending |
| [MuSe-CaR](https://sites.google.com/view/muse-2021/challenge/data) | Video, Audio, Text | 40 h 57 min · 2020 | Not verified | Pending |
| [IEMOCAP](https://sail.usc.edu/iemocap) | Video, Audio, Text | 12 hrs, 151 dialogs · 2008 | Not verified | Pending |
| [SEMAINE](https://semaine-db.eu) | Video, Audio, Text | 959 dialogs, 7.99 hrs · 2011 | Not verified | Pending |
| [Belfast Emotional](http://www.psych.qub.ac.uk/BINED) | Video, Audio | 750 clips (~327 min) · 2012 | Not verified | Pending |
| MMAD (Micro-Action) (link needed) | Video, Text | 6,528 videos, 19.8 k instances, 18.67 hrs · 2024 | Not verified | Pending |
| [SAMSEMO](https://www.isca-archive.org/interspeech_2024/bujnowski24_interspeech.html) | Video, Audio, Text | 23 K video scenes in 5 languages · 2024 | Not verified | Pending |
| [ViMACSA](https://arxiv.org/abs/2405.00543) | Image, Text | 4,876 text-image pairs · 2024 | Not verified | Pending |
| [MAGB](https://github.com/sktsherlock/MAGB) | Image, Text, Graph | 5 graphs, 1.3 M nodes, 10 M edges · 2024 | Not verified | Pending |
| [MMSum](https://github.com/j-min/MMSum) | Video, Audio, Text | 5,100 videos, 170 subcategories, 1,229.9 hrs · 2023 | Human annotation | Pending |
| [DurLAR](https://github.com/l1997i/DurLAR) | Image, LiDAR, Sensor | 145,911 frames · 2021 | Not verified | Pending |
| [CATER](https://arxiv.org/abs/1910.04744) | Video | 5.5 k clips, 15.3 hrs, 10 s/clip · 2020 | Not verified | Pending |
| [HowTo100M](https://arxiv.org/abs/1906.03327) | Video, Text | 136 M clips / 1.22 M videos · 2019 | Weak supervision | Pending |
| [MIMIC-CXR](https://physionet.org/content/mimic-cxr-jpg/2.0.0) | Image, Text | 377k chest X-ray images + 227k+ imaging studies + Structured metadata · 2019 | Not verified | Pending |
| [nuScenes](https://www.nuscenes.org) | LiDAR, Radar, Sensor | 1 K scenes; ~1.4M camera images, 390K LiDAR sweeps, 1.4M radar scans；40,000 keyframes with 1.1B labeled LiDAR points · 2019 | Not verified | Pending |
| [KITTI](http://www.cvlibs.net/datasets/kitti) | Image, LiDAR, Sensor | 6 hrs (25% publicly available) · 2012 | Not verified | Pending |
| [WayMoCo](http://arxiv.org/abs/2508.00589) | Image, Video, Text | 26 K seq · 2025 | Not verified | Pending |
| [BASEPROD](https://www.nature.com/articles/s41597-024-03881-1) | Image, Sensor, Depth, Thermal | 2.4 K synthetic frames · 2024 | Not verified | Pending |
| [DrivingDojo](https://drivingdojo.github.io/) | Video, Text, Sensor | 18.2K videos · 2024 | Not verified | Pending |
| [SpaceNet](https://spacenet.ai) | Image | 685,000+ building footprints; SpaceNet 6: 120+ sq km imagery, 48,000+ building labels; SpaceNet 7: 40,000+ km^2 imagery, 11M+ building footprints · Since 2016 | Not verified | Pending |
| [EuroSAT](https://github.com/phelber/eurosat) | Image | 27,000 images · 2019 | Not verified | Pending |
| [Multimodal ArXiv](https://aclanthology.org/2024.acl-long.775/) | Image, Text | 6.4 M images + 3.9 M captions · 2024 | Not verified | Pending |
| [CASTLE 2024](https://arxiv.org/abs/2503.17116) | Video, Audio, Sensor | 600+ hrs UHD video & multimodal data · 2024 | Not verified | Pending |

### Evaluation

| Dataset | Modalities | Size / release | Supervision | Evidence |
| --- | --- | --- | --- | --- |
| [Video-MME](https://github.com/MME-Benchmarks/Video-MME) | Video, Audio, Text | 900 videos; 2,700 QA pairs; 254 hours · 2024 | Human annotation | Pending |
| [SlideVQA](https://slidevqa.github.io) | Image, Text | 14.5 K QA pairs · 2024 | Not verified | Pending |
| [TVQA](https://tvqa.cs.unc.edu) | Video, Text | 152.5 K QA pairs · 2018 | Not verified | Pending |
| [SQA3D](https://sqa3d.github.io) | Text, 3D | 33.4 K questions · 2023 | Not verified | Pending |
| [MovieQA](http://movieqa.cs.toronto.edu) | Video, Audio, Text | 14.9 K (14,944) QA pairs · 2016 | Not verified | Pending |
| [MSR-VTT](https://www.microsoft.com/en-us/research/publication/msr-vtt-a-large-video-description-dataset-for-bridging-video-and-language) | Video, Text | 10 K clips / 200 K caps · 2016 | Human annotation | Pending |
| [MELD](https://affective-meld.github.io) | Video, Audio, Text | 13,708 utterances · 2019 | Not verified | Pending |
| [MuSe-CaR](https://sites.google.com/view/muse-2021/challenge/data) | Video, Audio, Text | 40 h 57 min · 2020 | Not verified | Pending |
| [IEMOCAP](https://sail.usc.edu/iemocap) | Video, Audio, Text | 12 hrs, 151 dialogs · 2008 | Not verified | Pending |
| [SEMAINE](https://semaine-db.eu) | Video, Audio, Text | 959 dialogs, 7.99 hrs · 2011 | Not verified | Pending |
| [Belfast Emotional](http://www.psych.qub.ac.uk/BINED) | Video, Audio | 750 clips (~327 min) · 2012 | Not verified | Pending |
| MMAD (Micro-Action) (link needed) | Video, Text | 6,528 videos, 19.8 k instances, 18.67 hrs · 2024 | Not verified | Pending |
| [SAMSEMO](https://www.isca-archive.org/interspeech_2024/bujnowski24_interspeech.html) | Video, Audio, Text | 23 K video scenes in 5 languages · 2024 | Not verified | Pending |
| [ViMACSA](https://arxiv.org/abs/2405.00543) | Image, Text | 4,876 text-image pairs · 2024 | Not verified | Pending |
| [MAGB](https://github.com/sktsherlock/MAGB) | Image, Text, Graph | 5 graphs, 1.3 M nodes, 10 M edges · 2024 | Not verified | Pending |
| [MMSum](https://github.com/j-min/MMSum) | Video, Audio, Text | 5,100 videos, 170 subcategories, 1,229.9 hrs · 2023 | Human annotation | Pending |
| [DurLAR](https://github.com/l1997i/DurLAR) | Image, LiDAR, Sensor | 145,911 frames · 2021 | Not verified | Pending |
| [CATER](https://arxiv.org/abs/1910.04744) | Video | 5.5 k clips, 15.3 hrs, 10 s/clip · 2020 | Not verified | Pending |
| [HowTo100M](https://arxiv.org/abs/1906.03327) | Video, Text | 136 M clips / 1.22 M videos · 2019 | Weak supervision | Pending |
| [MMAD(Industry)](https://github.com/jam-cc/MMAD) | Image, Text | 8,366 industrial images; 39,672 multiple-choice questions · 2024 | Not verified | Pending |
| [MMSci](https://github.com/Leezekun/MMSci) | Image, Text | 200 K Q-V · 2024 | Not verified | Pending |

## Pending clarification

These entries are preserved in the source catalog but excluded from the active explorer. See the [legacy snapshot](docs/LEGACY_README.md) for the original rows.

- **BiomedCLIP**: Model/project entry rather than a separately identified dataset release; retain as a related resource.
- **RSICap**: Link points to ShapeNet; dataset identity and modality description need verification.
- **InstructBLIP**: Model/project entry rather than a separately identified dataset release; retain as a related resource.
- **MAGB**: Duplicate MAGB row contains MELD emotion metadata; retain the graph dataset entry.
- **Medical**: Diabetic-eye description points to MIMIC-CXR; dataset identity is unresolved.
- **Polymathic AI**: Organization/project name with no dataset release identified.

## Maintain and preview

```sh
python3 scripts/build_catalog.py
python3 scripts/build_catalog.py --check
python3 -m http.server 8000 --directory docs
```

Open http://localhost:8000. The site also works by opening `docs/index.html` directly. No runtime API key, dependency installation or backend is required.

See [deployment instructions](docs/DEPLOYMENT.md), the [metadata guide](data/README.md).

## Related resources

- [BiomedCLIP](https://arxiv.org/abs/2303.00915): model/project; identify its data release separately.
- [InstructBLIP](https://github.com/salesforce/LAVIS/tree/main/projects/instructblip): model and training framework.
- [MultiBench](https://github.com/pliang279/MultiBench): multimodal benchmark toolkit.

## Attribution and license

The original list and its attribution are preserved in [LEGACY_README.md](docs/LEGACY_README.md). The starting taxonomy referenced [arXiv:2412.17759](https://arxiv.org/abs/2412.17759).

The original repository declares [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) for this compilation. Each listed dataset retains its own release and source conditions. Catalog inclusion grants no rights to underlying media.
