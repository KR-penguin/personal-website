import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { BASE_PATH } from "./lib/basePath";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Enables app/global-not-found.tsx, the documented 404 for apps with
    // multiple root layouts (app/(redirect)/ and app/[locale]/).
    globalNotFound: true,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
