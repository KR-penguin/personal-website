import type { AppLocale } from "@/i18n/routing";
import { fileUrl } from "@/lib/site";

// The Open Graph / Twitter card image is a Route Handler at
// app/[locale]/og.png/route.tsx rather than the opengraph-image file
// convention: that convention exports an extensionless file, which GitHub
// Pages serves as application/octet-stream, and link-preview crawlers can
// reject an og:image that isn't served as an image type.
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function ogImageUrl(locale: AppLocale): string {
  return fileUrl(`${locale}/og.png`);
}
