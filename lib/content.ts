import type { AppLocale } from "@/i18n/routing";
import type { LocalizedContent } from "@/types/content";

export function pickLocale<T>(content: LocalizedContent<T>, locale: AppLocale): T {
  return content[locale];
}
