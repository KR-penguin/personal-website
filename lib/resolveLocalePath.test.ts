import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE_PATH, KOREAN_LOCALE_PATH, resolveLocalePath } from "./resolveLocalePath";

describe("resolveLocalePath", () => {
  it("resolves to Korean when the browser's preferred language is Korean", () => {
    expect(resolveLocalePath(["ko-KR", "en-US"])).toBe(KOREAN_LOCALE_PATH);
  });

  it("resolves to English for a non-Korean language", () => {
    expect(resolveLocalePath(["en-US"])).toBe(DEFAULT_LOCALE_PATH);
  });

  it("resolves to English when no languages are provided", () => {
    expect(resolveLocalePath([])).toBe(DEFAULT_LOCALE_PATH);
  });

  it("resolves to English for an unrelated language (e.g. French)", () => {
    expect(resolveLocalePath(["fr-FR", "fr"])).toBe(DEFAULT_LOCALE_PATH);
  });

  it("matches Korean by exact primary subtag, not a loose substring", () => {
    expect(resolveLocalePath(["ko"])).toBe(KOREAN_LOCALE_PATH);
    // Konkani ("kok") shares a "ko" prefix but is a different language.
    expect(resolveLocalePath(["kok-IN"])).toBe(DEFAULT_LOCALE_PATH);
  });
});
