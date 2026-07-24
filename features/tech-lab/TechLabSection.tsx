import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { techLabIntroContent } from "@/content/techLab/intro";
import { FastInverseSqrtLab } from "./fast-inverse-sqrt/FastInverseSqrtLab";
import { QLearningLab } from "./q-learning/QLearningLab";
import { CnnMechanicsLab } from "./cnn-mechanics/CnnMechanicsLab";

interface TechLabSectionProps {
  locale: AppLocale;
}

export async function TechLabSection({ locale }: TechLabSectionProps) {
  const t = await getTranslations("techLab");
  const { intro } = pickLocale(techLabIntroContent, locale);

  return (
    <section id="tech-lab" className="w-full bg-cosmos-background px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <header className="flex flex-col gap-4">
          <h2 className="font-display text-3xl font-semibold text-cosmos-text sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-lg text-cosmos-text-muted">{intro}</p>
        </header>

        <div className="flex flex-col gap-8">
          <FastInverseSqrtLab locale={locale} />
          <QLearningLab locale={locale} />
          <CnnMechanicsLab locale={locale} />
        </div>
      </div>
    </section>
  );
}
