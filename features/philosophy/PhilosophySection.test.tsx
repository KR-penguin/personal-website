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

import { PhilosophySection } from "./PhilosophySection";
import { philosophyContent } from "@/content/philosophy";

describe("PhilosophySection", () => {
  it("renders all five Sandcastle Protocol principle titles", async () => {
    // Reduced motion so PrincipleCard renders plain markup, avoiding the
    // need to polyfill IntersectionObserver for this smoke test.
    mockMatchMedia(true);

    const ui = await PhilosophySection({ locale: "en" });
    render(ui);

    for (const principle of philosophyContent.en.principles) {
      expect(screen.getByText(principle.title)).toBeInTheDocument();
    }
  });
});
