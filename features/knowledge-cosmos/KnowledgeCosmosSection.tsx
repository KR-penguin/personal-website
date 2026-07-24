import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import type { AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { knowledgeCosmosContent } from "@/content/knowledgeCosmos";
import { ExpandableExperience } from "@/features/summary-mode/ExpandableExperience";
import { DemoLoadingFallback } from "@/components/DemoLoadingFallback";
import { ConceptList } from "./ConceptList";

// Code-split: the SVG constellation is heavy and, under Summary Mode's
// default-collapsed ExpandableExperience state, may never even mount.
const ConstellationGraph = dynamic(
  () => import("./ConstellationGraph").then((mod) => mod.ConstellationGraph),
  { loading: () => <DemoLoadingFallback /> }
);

interface KnowledgeCosmosSectionProps {
  locale: AppLocale;
}

export async function KnowledgeCosmosSection({ locale }: KnowledgeCosmosSectionProps) {
  const t = await getTranslations("knowledgeCosmos");
  const { intro, concepts } = pickLocale(knowledgeCosmosContent, locale);

  return (
    <section id="knowledge-cosmos" className="w-full bg-cosmos-surface px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <h2 className="font-display text-3xl font-semibold text-cosmos-text sm:text-4xl">
          {t("heading")}
        </h2>

        <ExpandableExperience
          title={t("heading")}
          caption={intro}
          expandLabel={t("expandConstellation")}
          collapseLabel={t("collapseConstellation")}
          collapsedContent={<ConceptList concepts={concepts} />}
        >
          <ConstellationGraph concepts={concepts} />
        </ExpandableExperience>
      </div>
    </section>
  );
}
