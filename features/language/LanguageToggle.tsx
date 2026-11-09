import Link from "next/link";
import { routing, type AppLocale } from "@/i18n/routing";

interface LanguageToggleProps {
  locale: AppLocale;
  label: string;
}

// Display order in the design is KO first, independent of routing's default.
const ORDER: AppLocale[] = ["ko", "en"];

// Locales are separate static routes (/ko/, /en/), so switching language is a
// link to the other route rather than client-side state.
export function LanguageToggle({ locale, label }: LanguageToggleProps) {
  const locales = ORDER.filter((code) => routing.locales.includes(code));

  return (
    <nav
      aria-label={label}
      className="fixed top-3 right-3 z-60 flex border-2 border-ink bg-ground"
    >
      {locales.map((code, index) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}/`}
            hrefLang={code}
            lang={code}
            aria-current={active ? "page" : undefined}
            className={`px-2.5 py-1.5 text-xs font-extrabold tracking-[.08em] transition-colors ${
              index > 0 ? "border-l-2 border-ink" : ""
            } ${active ? "bg-ink text-ground" : "text-ink hover:text-accent"}`}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
