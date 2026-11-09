// GitHub Pages serves this repo at https://kr-penguin.github.io/personal-website/,
// a project (not user/org root) page, so every route and asset needs this prefix.
// Lives here rather than only in next.config.ts because next/image does not
// apply `basePath` to `src` — public/ assets have to be prefixed by hand.
export const BASE_PATH = "/personal-website";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
