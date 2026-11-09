import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ko from "@/messages/ko.json";
import { mockMatchMedia } from "@/test/matchMedia";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) =>
    (ko as Record<string, Record<string, string>>)[namespace][key],
}));

import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders the copyright line and a back-to-top link to the hero", async () => {
    mockMatchMedia(true);
    render(await SiteFooter());

    expect(screen.getByRole("contentinfo")).toHaveTextContent(`© ${ko.site.title}`);
    expect(screen.getByRole("link", { name: ko.footer.backToTop })).toHaveAttribute("href", "#hero");
  });
});
