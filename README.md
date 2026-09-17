# astro-template

[![CI](https://github.com/sisques-labs/astro-template/actions/workflows/ci.yml/badge.svg)](https://github.com/sisques-labs/astro-template/actions/workflows/ci.yml)
[![CodeQL](https://github.com/sisques-labs/astro-template/actions/workflows/codeql.yml/badge.svg)](https://github.com/sisques-labs/astro-template/actions/workflows/codeql.yml)
[![Node](https://img.shields.io/badge/node-%3E%3D22.12.0-339933?logo=node.js&logoColor=white)](.nvmrc)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Template repository for new Astro projects at Sisques Labs. Astro, React and Tailwind CSS come pre-configured, along with the linting, testing, Docker and CI/CD setup used across the org, so a new project starts from a working baseline instead of a blank scaffold.

## Using this template

1. Click **Use this template** on GitHub (or `gh repo create <name> --template sisques-labs/astro-template`).
2. Update the project identity:
   - `package.json` — `name`, `description`, `repository.url`, `homepage`
   - `cliff.toml` — `[remote.github]` `repo`
   - `.github/workflows/docker.yml`, `trunk-ci-cd.yml`, `release.yml`, `image-cleanup.yml` — `image_name` / `ghcr_image_name`
   - `docker/README.md`
3. Delete `CHANGELOG.md` if present — `release.yml` generates it from the first release.
4. `pnpm install` and start building in `src/`.

## Project structure

```text
/
├── docker/
│   ├── nginx.conf
│   └── README.md
├── public/
├── src/
│   └── pages/
│       └── index.astro
├── Dockerfile
└── package.json
```

Import anything outside the current directory through the `@/` alias (mapped to `src/`) rather than a relative parent path — ESLint's `no-restricted-imports` enforces this:

```ts
import { greeting } from '@/lib/greeting'; // ✓
import { greeting } from '../lib/greeting'; // ✗
```

## Scripts

| Command          | Action                                           |
| ---------------- | ------------------------------------------------- |
| `pnpm dev`        | Start the dev server at `localhost:4321`          |
| `pnpm build`      | Type-check and build to `./dist/`                 |
| `pnpm preview`    | Preview the production build locally              |
| `pnpm lint`       | Lint and auto-fix with ESLint                      |
| `pnpm format`     | Format the codebase with Prettier                  |
| `pnpm test`       | Run the test suite with Vitest                     |
| `pnpm test:watch` | Run tests in watch mode                            |
| `pnpm test:cov`   | Run tests with coverage                            |
| `pnpm astro ...`  | Run any Astro CLI command, e.g. `astro check`      |

## Tooling

- **ESLint + Prettier** — linting and formatting, enforced via Husky/lint-staged on every commit.
- **Husky** — `pre-commit` runs lint-staged; `pre-push` runs the build and affected tests.
- **Vitest** — configured with `passWithNoTests` so the template stays green until real tests exist.
- **Renovate** — automated dependency updates (`renovate.json`, extends `sisques-labs/workflows`).

## Docker

Builds to a static site served by nginx (`Dockerfile`, `docker/nginx.conf`):

```bash
docker build -t astro-template .
docker run -p 8080:8080 astro-template
```

Open `http://localhost:8080`. See `docker/README.md` for details.

## CI/CD

Workflows in `.github/workflows` reuse shared pipelines from [`sisques-labs/workflows`](https://github.com/sisques-labs/workflows):

| Workflow              | Trigger                          | Purpose                                                                 |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| `ci.yml`              | Pull request                      | Lint, test, build                                                       |
| `docker.yml`          | Pull request                      | Smoke-build the Docker image                                            |
| `codeql.yml`          | Push to `main`, PR, weekly        | Security analysis                                                       |
| `pr-labeler.yml`      | Pull request                      | Auto-label PRs based on changed files                                   |
| `trunk-ci-cd.yml`     | Push to `main`                    | Build + publish commit-addressed image, deploy to `dev` then `pre`      |
| `release.yml`         | Manual (`workflow_dispatch`)      | Promote a validated digest to a versioned stable release, zero inputs   |
| `image-cleanup.yml`   | Weekly (+ manual)                 | Delete old ephemeral `:sha-*` tags on Docker Hub/GHCR                   |
