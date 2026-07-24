import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { careerTimelineContent } from "@/content/careerTimeline";
import { pickLocale } from "@/lib/content";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface CareerTimelineViewProps {
  locale: AppLocale;
}

export async function CareerTimelineView({ locale }: CareerTimelineViewProps) {
  const t = await getTranslations("careerTimeline");
  const content = pickLocale(careerTimelineContent, locale);

  return (
    <section id="career-timeline" className="w-full bg-cosmos-surface px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <h2 className="font-display text-3xl font-semibold text-cosmos-text sm:text-4xl">
          {t("heading")}
        </h2>

        <ol className="flex flex-col gap-6 border-l border-cosmos-accent-secondary/30 pl-6">
          {content.milestones.map((milestone, index) => (
            <ScrollReveal
              key={`${milestone.year}-${index}`}
              as="li"
              delay={index * 0.05}
              className="flex flex-col gap-1"
            >
              <span className="font-display text-sm font-semibold text-cosmos-accent-secondary">
                {milestone.year}
              </span>
              <span className="text-base text-cosmos-text">{milestone.text}</span>
            </ScrollReveal>
          ))}
        </ol>

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {content.deepDiveTeasers.map((teaser, index) => (
            <ScrollReveal
              key={teaser.id}
              as="p"
              delay={index * 0.05}
              className="rounded-xl border border-cosmos-accent/30 bg-cosmos-background p-5 text-sm text-cosmos-text-muted"
            >
              {teaser.text}
            </ScrollReveal>
          ))}
        </div>

        {/* Deliberately styled as an "unexpected chapter" card per the content brief. */}
        <ScrollReveal
          as="p"
          className="rounded-xl border border-cosmos-accent-secondary/40 bg-cosmos-background p-5 text-sm italic text-cosmos-text-muted"
        >
          {content.notableMoment}
        </ScrollReveal>
      </div>
    </section>
  );
}
