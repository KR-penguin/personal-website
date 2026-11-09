import type { Metadata } from "next";
import type { ReactNode } from "react";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";
import { seoContent } from "@/content/seo";
import { OG_IMAGE_SIZE, ogImageUrl } from "@/lib/ogImage";
import { getSiteUrl, languageAlternates } from "@/lib/site";

// "/" only redirects by browser language, and only in the browser. Link-
// preview crawlers don't run that JS and stop here, so this page carries its
// own social card (the English one) and both names in its title.
export function generateMetadata(): Metadata {
  const title = `${en.site.title} · ${ko.site.title}`;
  const description = seoContent.en.description;
  const image = { url: ogImageUrl("en"), ...OG_IMAGE_SIZE, alt: title, type: "image/png" };

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    openGraph: { title, description, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    alternates: { languages: languageAlternates() },
  };
}

// One of two root layouts (see Next's "multiple root layouts" route-group
// pattern). This one only serves the bare "/" route, which exists purely to
// redirect into a locale. Locale pages use app/[locale]/layout.tsx as their
// own root layout, so it can set <html lang> per locale. There must be no
// app/layout.tsx: it would wrap the locale layout and nest a second
// <html>/<body> inside the first.
export default function RedirectRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
