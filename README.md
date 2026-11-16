# Sean Channie Quinn — Portfolio

Personal portfolio of Sean Channie Quinn (권승찬): founder story, tech stack, a
copy-for-your-AI self-introduction, and contact.

**Live site:** https://kr-penguin.github.io/personal-website/

Available in English (`/en/`) and Korean (`/ko/`). The root page sends visitors
to Korean when their browser language is Korean, and to English otherwise.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), exported as a fully static site (`output: "export"`)
- React 19, TypeScript, Tailwind CSS 4
- [next-intl](https://next-intl.dev) for the two locales
- Vitest + Testing Library for tests
- GitHub Pages for hosting, deployed by GitHub Actions

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000/personal-website/ in your browser.

The site is built with `basePath: "/personal-website"` (see `lib/basePath.ts`)
because GitHub Pages serves this repo under that path. Every page and asset
lives under `/personal-website/`, so `http://localhost:3000/` on its own shows
a 404.

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

Every push to `main` runs `.github/workflows/deploy.yml`, which installs
dependencies, runs the tests, builds the static site, and publishes `out/` to
GitHub Pages. A failing test stops the deploy.
