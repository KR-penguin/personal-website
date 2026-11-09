const KOREAN_PREFIX = "ko";

export const DEFAULT_LOCALE_PATH = "en/";
export const KOREAN_LOCALE_PATH = "ko/";

// GitHub Pages serves pure static files, so there is no server left to do
// Accept-Language-based redirection (that used to live in proxy.ts). This is
// the client-side replacement: default to English, switch to Korean only
// when the visitor's browser/OS language is Korean.
export function resolveLocalePath(languages: readonly string[]): string {
  const prefersKorean = languages.some(
    (lang) => lang.toLowerCase().split("-")[0] === KOREAN_PREFIX
  );
  return prefersKorean ? KOREAN_LOCALE_PATH : DEFAULT_LOCALE_PATH;
}
