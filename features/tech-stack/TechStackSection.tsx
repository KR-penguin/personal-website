import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { techStackContent } from "@/content/techStack";
import { pickLocale } from "@/lib/content";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface TechStackSectionProps {
  locale: AppLocale;
}

export async function TechStackSection({ locale }: TechStackSectionProps) {
  const t = await getTranslations("techStack");
  const content = pickLocale(techStackContent, locale);

  return (
    <section id="tech-stack" className="w-full bg-cosmos-surface px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <h2 className="font-display text-3xl font-semibold text-cosmos-text sm:text-4xl">
          {t("heading")}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.categories.map((category, index) => (
            <ScrollReveal
              key={category.id}
              delay={index * 0.03}
              className="rounded-xl border border-white/10 bg-cosmos-background p-5"
            >
              <h3 className="font-display text-sm font-semibold text-cosmos-accent-secondary">
                {category.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-cosmos-text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl font-semibold text-cosmos-text">
            {t("achievementsHeading")}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {content.achievements.map((achievement, index) => (
              <ScrollReveal
                key={achievement.id}
                delay={index * 0.05}
                className="flex flex-col gap-2 rounded-2xl border-2 border-cosmos-accent/50 bg-cosmos-background p-6"
              >
                <span className="font-display text-base font-bold text-cosmos-accent">
                  {achievement.title}
                </span>
                <span className="text-sm text-cosmos-text-muted">{achievement.text}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ScrollReveal
            as="p"
            className="rounded-xl border border-white/10 bg-cosmos-background p-5 text-sm text-cosmos-text-muted"
          >
            {content.hobbyCallout}
          </ScrollReveal>
          <ScrollReveal
            as="p"
            className="rounded-xl border border-white/10 bg-cosmos-background p-5 text-sm text-cosmos-text-muted"
          >
            {content.mathCallout}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
