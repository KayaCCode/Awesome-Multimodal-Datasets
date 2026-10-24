# Preview and GitHub Pages

## Local preview

From the repository root:

```sh
python3 scripts/build_catalog.py
python3 -m http.server 8000 --directory docs
```

Visit http://localhost:8000. Alternatively, open `docs/index.html` directly; data is loaded from a generated local script. Shareable filter links and clipboard support work best over HTTP/HTTPS.

## Publish on GitHub Pages

1. Merge the reviewed source changes into `main` in `KayaCCode/Awesome-Multimodal-Datasets`.
2. In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. Run **Actions → Deploy dataset explorer → Run workflow**, or push a site/catalog update to `main`.
4. After the deployment succeeds, use the URL returned by GitHub. The expected default project URL is https://kayaccode.github.io/Awesome-Multimodal-Datasets/.

The included workflow validates generated files, uploads `docs/` as a static artifact and deploys it. Assets are relative paths, so both the project subpath and a local server work. No private service credentials, API keys, third-party CDN or backend are needed.

The deployment has not been executed by merely preparing these files. GitHub Pages must be enabled in repository settings. Forks need to adjust the repository guard in `pages.yml` and update project links before deployment.

## Repository maintenance

The old badge workflow used a hard-coded push destination for a different repository and a personal token. It is replaced with read-only catalog checks. Counts are generated from records, not Markdown rows, and both existing badge file paths remain supported.

Public GitHub contribution links point to `main`, so newly added documentation links become available after these changes land.
