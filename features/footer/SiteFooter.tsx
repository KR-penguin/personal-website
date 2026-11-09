import { getTranslations } from "next-intl/server";
import { Marquee } from "@/components/motion/Marquee";
import { FOOTER_BITS } from "@/content/marquee";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tSite = await getTranslations("site");

  return (
    <footer className="border-t-2 border-ink">
      <Marquee
        text={FOOTER_BITS}
        speed={22}
        className="border-b-2 border-rule"
        trackClassName="text-muted"
      />
      <div className="flex justify-between gap-4 px-6 py-4 text-xs font-semibold text-muted">
        <span>© {tSite("title")}</span>
        <a href="#hero" className="transition-colors hover:text-accent">
          {t("backToTop")}
        </a>
      </div>
    </footer>
  );
}
