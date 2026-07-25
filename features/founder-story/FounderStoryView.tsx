import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { founderStoryContent } from "@/content/founderStory";
import { pickLocale } from "@/lib/content";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StatCounter } from "./StatCounter";

interface FounderStoryViewProps {
  locale: AppLocale;
}

export async function FounderStoryView({ locale }: FounderStoryViewProps) {
  const t = await getTranslations("founderStory");
  const content = pickLocale(founderStoryContent, locale);

  return (
    <section id="founder-story" className="w-full bg-cosmos-background px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <header className="flex flex-col gap-4">
          <h2 className="font-display text-3xl font-semibold text-cosmos-text sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-lg text-cosmos-text-muted">{content.intro}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {content.stats.map((stat) => (
            <StatCounter
              key={stat.id}
              target={stat.target}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.highlights.map((highlight, index) => (
            <ScrollReveal
              key={highlight.id}
              delay={index * 0.05}
              className="rounded-xl border border-cosmos-accent/40 bg-cosmos-surface p-5 text-base font-medium text-cosmos-text"
            >
              {highlight.text}
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 0.03}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-cosmos-surface p-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-base font-semibold text-cosmos-text">
                  {project.title}
                </span>
                <span className="text-xs text-cosmos-text-muted">{project.period}</span>
              </div>
              <p className="text-sm text-cosmos-text-muted">{project.description}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-cosmos-accent-secondary transition-colors hover:text-cosmos-accent"
                >
                  {project.url.replace(/^https?:\/\//, "")}
                </a>
              )}
            </ScrollReveal>
          ))}
        </div>

        <p className="rounded-xl border border-white/10 bg-cosmos-surface p-5 text-sm text-cosmos-text-muted">
          {content.processNote}
        </p>
      </div>
    </section>
  );
}
