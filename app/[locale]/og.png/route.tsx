import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { OG_IMAGE_SIZE } from "@/lib/ogImage";
import { heroContent } from "@/content/hero";

// Static export writes this Route Handler's response to out/<locale>/og.png,
// so GitHub Pages serves it as image/png (see lib/ogImage.ts for why this is
// not the opengraph-image file convention). Referenced from the locale
// layout's generateMetadata.
export const dynamic = "force-static";

// Hex equivalents of app/globals.css's design tokens.
const GROUND = "#050100";
const ACCENT = "#ff563c";
const INK = "#f3f2f2";
const MUTED = "#bab6b6";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const appLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: appLocale, namespace: "site" });
  const { roleLine, tagline } = pickLocale(heroContent, appLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: "80px 96px",
          backgroundColor: GROUND,
          borderTop: `16px solid ${ACCENT}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            color: ACCENT,
            textTransform: "uppercase",
          }}
        >
          {roleLine}
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, color: INK }}>
          {t("title")}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: MUTED, maxWidth: 920 }}>
          {tagline}
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}
