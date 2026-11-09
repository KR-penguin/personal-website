import type { AppLocale } from "@/i18n/routing";
import type { LocalizedContent, Text } from "@/types/content";

export function pickLocale<T>(content: LocalizedContent<T>, locale: AppLocale): T {
  return content[locale];
}

export function resolveText(text: Text, locale: AppLocale): string {
  return typeof text === "string" ? text : text[locale];
}

/** "WORK" -> "W O R K": the design's wide-spaced kicker lettering. */
export function spaceOut(word: string): string {
  return Array.from(word).join(" ");
}
