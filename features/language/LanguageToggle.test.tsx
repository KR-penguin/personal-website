import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageToggle } from "./LanguageToggle";

describe("LanguageToggle", () => {
  it("links to both locale routes, Korean first, and marks the current one", () => {
    render(<LanguageToggle locale="en" label="Language" />);

    const nav = screen.getByRole("navigation", { name: "Language" });
    const links = screen.getAllByRole("link");
    expect(nav).toContainElement(links[0]);
    expect(links.map((link) => link.textContent)).toEqual(["KO", "EN"]);

    const [ko, en] = links;
    // The trailing slash depends on next.config's trailingSlash, absent under vitest.
    expect(ko.getAttribute("href")).toMatch(/^\/ko\/?$/);
    expect(ko).toHaveAttribute("hreflang", "ko");
    expect(ko).not.toHaveAttribute("aria-current");
    expect(en.getAttribute("href")).toMatch(/^\/en\/?$/);
    expect(en).toHaveAttribute("aria-current", "page");
  });
});
