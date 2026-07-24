import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { knowledgeCosmosContent } from "@/content/knowledgeCosmos";
import { ExpandableExperience } from "@/features/summary-mode/ExpandableExperience";
import { ConceptList } from "./ConceptList";
import { ConstellationGraph } from "./ConstellationGraph";

interface KnowledgeCosmosSectionProps {
  locale: AppLocale;
}

export async function KnowledgeCosmosSection({ locale }: KnowledgeCosmosSectionProps) {
  const t = await getTranslations("knowledgeCosmos");
  const { intro, concepts } = pickLocale(knowledgeCosmosContent, locale);

  return (
    <section id="knowledge-cosmos" className="w-full bg-cosmos-surface px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <ExpandableExperience
          title={t("heading")}
          caption={intro}
          expandLabel={t("expandConstellation")}
          collapseLabel={t("collapseConstellation")}
          collapsedContent={<ConceptList concepts={concepts} />}
        >
          <ConstellationGraph concepts={concepts} ariaLabel={t("heading")} />
        </ExpandableExperience>
      </div>
    </section>
  );
}
