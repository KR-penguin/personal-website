import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import en from "@/messages/en.json";
import { mockMatchMedia } from "@/test/matchMedia";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace?: string) => {
    const flat = en as Record<string, Record<string, string>>;
    return (key: string) => (namespace ? flat[namespace][key] : flat[key.split(".")[0]][key.split(".")[1]]);
  },
}));

import { ContactSection } from "./ContactSection";
import { CONTACT_EMAIL } from "@/content/contact";

describe("ContactSection", () => {
  it("renders an email link with the correct mailto href", async () => {
    mockMatchMedia(true);
    const ui = await ContactSection({ locale: "en" });
    render(ui);

    const link = screen.getByRole("link", { name: en.contact.emailButton });
    expect(link).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });
});
