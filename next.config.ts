import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";
import { BASE_PATH } from "./lib/basePath";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default function config(phase: string): NextConfig {
  const isBuild = phase === PHASE_PRODUCTION_BUILD;

  return withNextIntl({
    output: "export",
    basePath: BASE_PATH,
    trailingSlash: true,
    images: { unoptimized: true },
    // The 404 page, app/global-not-found.build.tsx, exists for builds only.
    // Next 16.2.11's Turbopack dev server, once it has compiled a locale page
    // and then renders a global-not-found that has any CSS, rewrites that
    // page's client chunk in an endless loop (~1,300 writes/s). Each rewrite
    // leaks server heap (~8 MB/s) until `next dev` runs out of memory. The
    // ".build.tsx" extension hides the file from `next dev`, which serves
    // Next's built-in 404 instead.
    pageExtensions: isBuild ? ["build.tsx", "tsx", "ts", "jsx", "js"] : ["tsx", "ts", "jsx", "js"],
    experimental: {
      // Enables global-not-found: the documented 404 for apps with multiple
      // root layouts (app/(redirect)/ and app/[locale]/).
      globalNotFound: isBuild,
    },
  });
}
