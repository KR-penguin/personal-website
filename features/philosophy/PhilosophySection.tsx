import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { philosophyContent } from "@/content/philosophy";
import { pickLocale } from "@/lib/content";
import { PrincipleCard } from "./PrincipleCard";

interface PhilosophySectionProps {
  locale: AppLocale;
}

export async function PhilosophySection({ locale }: PhilosophySectionProps) {
  const t = await getTranslations("philosophy");
  const content = pickLocale(philosophyContent, locale);

  return (
    <section id="philosophy" className="w-full bg-cosmos-background px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-2 text-center">
          <h2 className="font-display text-3xl font-semibold text-cosmos-text sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-sm uppercase tracking-widest text-cosmos-accent-secondary">
            {t("subheading")}
          </p>
        </header>

        <p className="text-base text-cosmos-text-muted">{content.originStory}</p>
        <p className="text-base text-cosmos-text-muted">{content.worldview}</p>

        <div className="flex flex-col gap-6">
          {content.principles.map((principle) => (
            <PrincipleCard
              key={principle.id}
              title={principle.title}
              explanation={principle.explanation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
