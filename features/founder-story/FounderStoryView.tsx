import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { founderStoryContent } from "@/content/founderStory";
import { pickLocale } from "@/lib/content";
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

        <ol className="flex flex-col gap-6 border-l border-cosmos-accent/30 pl-6">
          {content.timeline.map((entry, index) => (
            <li key={`${entry.year}-${index}`} className="flex flex-col gap-1">
              <span className="font-display text-sm font-semibold text-cosmos-accent-secondary">
                {entry.year}
              </span>
              <span className="text-base text-cosmos-text">{entry.text}</span>
            </li>
          ))}
        </ol>

        <p className="rounded-xl border border-white/10 bg-cosmos-surface p-5 text-sm text-cosmos-text-muted">
          {content.processNote}
        </p>
      </div>
    </section>
  );
}
