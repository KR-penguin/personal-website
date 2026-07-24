import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { heroContent } from "@/content/hero";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Matches app/globals.css's cosmos.* design tokens.
const COSMOS_BACKGROUND = "#05060f";
const COSMOS_ACCENT = "#8b5cf6";
const COSMOS_ACCENT_SECONDARY = "#38bdf8";
const COSMOS_TEXT = "#f5f5fa";
const COSMOS_TEXT_MUTED = "#9ca3af";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
          backgroundColor: COSMOS_BACKGROUND,
          backgroundImage: `radial-gradient(circle at 18% 20%, ${COSMOS_ACCENT}3d, transparent 55%), radial-gradient(circle at 82% 78%, ${COSMOS_ACCENT_SECONDARY}33, transparent 55%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            color: COSMOS_ACCENT_SECONDARY,
            textTransform: "uppercase",
          }}
        >
          {roleLine}
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, color: COSMOS_TEXT }}>
          {t("title")}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: COSMOS_TEXT_MUTED, maxWidth: 920 }}>
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
