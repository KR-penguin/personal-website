// @vitest-environment node
// ImageResponse renders with WASM and Web streams that jsdom doesn't provide.
import { describe, expect, it, vi } from "vitest";
import en from "@/messages/en.json";

vi.mock("next-intl/server", () => ({
  getTranslations: async ({ namespace }: { namespace: string }) => (key: string) =>
    (en as Record<string, Record<string, string>>)[namespace][key],
}));

import { GET, dynamic, generateStaticParams } from "./route";
import { ogImageUrl } from "@/lib/ogImage";

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

describe("og.png route", () => {
  it("is prerendered once per locale for the static export", () => {
    expect(dynamic).toBe("force-static");
    expect(generateStaticParams()).toEqual([{ locale: "en" }, { locale: "ko" }]);
  });

  // English only: Hangul makes next/og fetch a font from Google Fonts.
  it("responds with a 1200x630 PNG", async () => {
    const response = await GET(new Request("http://localhost/en/og.png"), {
      params: Promise.resolve({ locale: "en" }),
    });
    const bytes = new Uint8Array(await response.arrayBuffer());
    const header = new DataView(bytes.buffer);

    expect(response.headers.get("content-type")).toBe("image/png");
    expect(Array.from(bytes.slice(0, 8))).toEqual(PNG_SIGNATURE);
    // IHDR chunk: width and height are big-endian uint32s at bytes 16 and 20.
    expect([header.getUint32(16), header.getUint32(20)]).toEqual([1200, 630]);
  });

  it("lives at the path the page metadata points og:image at", () => {
    // This file sits in app/[locale]/og.png/, so it is served at /<locale>/og.png.
    expect(new URL(ogImageUrl("ko")).pathname.endsWith("/ko/og.png")).toBe(true);
  });
});
