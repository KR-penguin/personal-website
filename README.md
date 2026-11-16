# Sean Channie Quinn — Portfolio

Personal portfolio of Sean Channie Quinn (권승찬): founder story, tech stack, a
copy-for-your-AI self-introduction, and contact.

**Live site:** https://kr-penguin.github.io/personal-website/
(also on Vercel: https://personal-website-nplus1.vercel.app/)

Available in English (`/en/`) and Korean (`/ko/`). The root page sends visitors
to Korean when their browser language is Korean, and to English otherwise.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), exported as a fully static site (`output: "export"`)
- React 19, TypeScript, Tailwind CSS 4
- [next-intl](https://next-intl.dev) for the two locales
- Vitest + Testing Library for tests
- Hosted on GitHub Pages (deployed by GitHub Actions) and Vercel

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Base path

GitHub Pages serves this repo under `/personal-website/`, while Vercel and
`next dev` serve it at the domain root. The prefix comes from the
`NEXT_PUBLIC_BASE_PATH` environment variable (see `lib/basePath.ts`): the
GitHub Pages workflow sets it to `/personal-website`, and everywhere else it is
unset, so the site builds for the root.

To preview the GitHub Pages build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/personal-website npm run build
```

In Git Bash on Windows, prefix that with `MSYS_NO_PATHCONV=1`; otherwise Git
Bash rewrites `/personal-website` into a Windows path and the build fails.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm test` | Run the test suite once |
| `npm run lint` | Lint with ESLint |
| `npm run build` | Build the static site into `out/` |

## Project layout

| Path | Contents |
| --- | --- |
| `app/` | Routes: `[locale]/` pages, the root language redirect, OG image, robots, sitemap |
| `features/` | Page sections (hero, founder story, tech stack, AI intro, contact, footer) |
| `components/` | Shared UI (copy button, marquee, typography) |
| `content/` | Site copy per locale. Edit these files to change text on the page |
| `messages/` | next-intl UI strings (`en.json`, `ko.json`) |
| `public/` | Images and other static files |

The AI self-introduction text lives in `content/aiIntroText.ts`.

## Deployment

Every push to `main` deploys to both hosts:

- **GitHub Pages:** `.github/workflows/deploy.yml` installs dependencies, runs
  the tests, builds the static site with the `/personal-website` base path, and
  publishes `out/`. A failing test stops this deploy.
- **Vercel:** the Vercel GitHub integration builds the same commit at the root.
  It does not run the tests.

Canonical, Open Graph and sitemap URLs point to the GitHub Pages site on both
hosts (`lib/site.ts`), so search engines index one copy.
