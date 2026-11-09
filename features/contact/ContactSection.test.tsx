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
import { CONTACT_EMAIL, contactContent } from "@/content/contact";

describe("ContactSection", () => {
  it("renders the email address as its only mailto link, plus a copy button", async () => {
    mockMatchMedia(true);
    const ui = await ContactSection({ locale: "en" });
    render(ui);

    expect(screen.getByRole("heading", { level: 2, name: en.contact.heading })).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName(CONTACT_EMAIL);
    expect(links[0]).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
    expect(
      screen.getByRole("button", { name: contactContent.en.copyLabel })
    ).toBeInTheDocument();
  });
});
