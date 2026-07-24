import { getTranslations } from "next-intl/server";
import { Starfield } from "@/components/starfield/Starfield";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cosmos-background">
      <Starfield className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-cosmos-text sm:text-6xl">
          {t("site.title")}
        </h1>
        <p className="max-w-xl text-lg text-cosmos-text-muted sm:text-xl">
          {t("hero.tagline")}
        </p>
      </div>
    </section>
  );
}
