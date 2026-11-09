import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

// next/font/google needs Next's build-time font loader, unavailable under vitest.
vi.mock("next/font/google", () => ({
  Archivo: () => ({ variable: "--font-archivo" }),
}));

import GlobalNotFound, { metadata } from "./global-not-found.build";
import { BASE_PATH } from "@/lib/basePath";

// A full <html> document can't be mounted into RTL's container <div>, so this
// renders it to markup and parses that instead.
function renderDocument(): Document {
  return new DOMParser().parseFromString(
    `<!DOCTYPE html>${renderToStaticMarkup(<GlobalNotFound />)}`,
    "text/html"
  );
}

describe("GlobalNotFound", () => {
  it("is a complete document with a lang attribute and the site font", () => {
    const doc = renderDocument();

    expect(doc.documentElement.lang).toBe("en");
    expect(doc.documentElement.className).toBe("--font-archivo");
    expect(doc.querySelector("h1")?.textContent).toBe("Not found");
  });

  it("links back to both locale home pages under the deploy base path", () => {
    const links = Array.from(renderDocument().querySelectorAll("a"));

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      `${BASE_PATH}/ko/`,
      `${BASE_PATH}/en/`,
    ]);
    expect(links.map((link) => link.getAttribute("lang"))).toEqual(["ko", "en"]);
  });

  it("has its own page title", () => {
    expect(metadata.title).toBe("404 — Page not found");
  });
});
