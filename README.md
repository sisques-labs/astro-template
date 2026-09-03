# astro-template

Minimal Astro starter template to speed up new project setup. Comes pre-wired with the tooling used across Sisques Labs projects: linting, formatting, git hooks, tests, Docker and CI/CD.

## 🚀 Project Structure

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

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where React/Vue/Svelte/Preact components go. React and Tailwind CSS are already configured.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                            |
| :------------------ | :------------------------------------------------ |
| `pnpm install`       | Installs dependencies                             |
| `pnpm dev`           | Starts local dev server at `localhost:4321`       |
| `pnpm build`         | Type-checks and builds the production site to `./dist/` |
| `pnpm preview`       | Preview your build locally, before deploying      |
| `pnpm format`        | Formats the codebase with Prettier                |
| `pnpm lint`          | Lints and auto-fixes with ESLint                  |
| `pnpm test`          | Runs the test suite with Vitest                   |
| `pnpm test:watch`    | Runs tests in watch mode                          |
| `pnpm test:cov`      | Runs tests with coverage                          |
| `pnpm astro ...`     | Run CLI commands like `astro add`, `astro check`  |

## ✅ Quality & Git hooks

- **ESLint + Prettier** enforce linting and formatting (`eslint.config.mjs`, `.prettierrc`).
- **Husky + lint-staged** run formatting/linting on staged files before each commit, and build + run affected tests before each push.
- **Vitest** is configured with `passWithNoTests` so the template stays green until real tests are added.

## 🐳 Docker

The app builds to a static site served by nginx (`Dockerfile`, `docker/nginx.conf`):

```bash
docker build -t astro-template .
docker run -p 8080:8080 astro-template
```

Then open http://localhost:8080. See `docker/README.md` for details.

## ⚙️ CI/CD

GitHub Actions workflows live in `.github/workflows` and reuse shared workflows from [`sisques-labs/workflows`](https://github.com/sisques-labs/workflows):

- **CI** (`ci.yml`) — lint, test and build on every PR.
- **Docker Build** (`docker.yml`) — smoke-builds the Docker image on every PR.
- **CodeQL** (`codeql.yml`) — security analysis on push/PR to `develop`/`staging`/`main` and weekly on a schedule.
- **PR Labeler** (`pr-labeler.yml`) — auto-labels PRs based on changed files (`labeler.yml`).
- **Release Train** (`release-train.yml`) — versions releases from conventional commits, generates the changelog (`cliff.toml`) and publishes the Docker image to Docker Hub/GHCR on push to `develop`/`staging`/`main`.

Dependency updates are managed by [Renovate](https://docs.renovatebot.com/) (`renovate.json`).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
