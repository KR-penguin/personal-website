// The site is deployed to two hosts from the same commit:
// - GitHub Pages serves it at https://kr-penguin.github.io/personal-website/,
//   a project (not user/org root) page, so every route and asset needs the
//   "/personal-website" prefix. The Pages workflow sets NEXT_PUBLIC_BASE_PATH.
// - Vercel (and `next dev`) serve it at the domain root: no prefix.
// next.config.ts reads this for `basePath`; NEXT_PUBLIC_* is inlined into the
// client bundles at build time, so server and client agree. It lives here
// rather than only in next.config.ts because next/image does not apply
// `basePath` to `src` — public/ assets have to be prefixed by hand.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
