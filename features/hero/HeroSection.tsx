import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { Starfield } from "@/components/starfield/Starfield";
import { heroContent } from "@/content/hero";
import { pickLocale } from "@/lib/content";

interface HeroSectionProps {
  locale: AppLocale;
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations("site");
  const content = pickLocale(heroContent, locale);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cosmos-background"
    >
      <Starfield className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-cosmos-text sm:text-6xl">
          {t("title")}
        </h1>
        <p className="font-display text-lg font-medium text-cosmos-accent-secondary sm:text-xl">
          {content.roleLine}
        </p>
        <p className="max-w-xl text-lg text-cosmos-text-muted sm:text-xl">
          {content.tagline}
        </p>
      </div>
    </section>
  );
}
