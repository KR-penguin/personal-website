import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";

const messages = { current: en as Record<string, Record<string, string>> };

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) => messages.current[namespace][key],
}));

import { AiIntroSection } from "./AiIntroSection";
import { AI_INTRO_TEXT, aiIntroContent } from "@/content/aiIntro";

describe("AiIntroSection", () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  });

  it("shows the prompt heading and the full intro text", async () => {
    messages.current = en;
    render(await AiIntroSection({ locale: "en" }));

    expect(
      screen.getByRole("heading", { level: 2, name: "To introduce me to your AI, copy this!" })
    ).toBeInTheDocument();
    const panel = screen.getByLabelText(aiIntroContent.en.panelLabel, { selector: "pre" });
    expect(panel.textContent).toBe(AI_INTRO_TEXT);
    expect(panel).toHaveAttribute("tabindex", "0");
  });

  it("copies the whole intro text with the copy button", async () => {
    messages.current = ko;
    render(await AiIntroSection({ locale: "ko" }));

    fireEvent.click(screen.getByRole("button", { name: aiIntroContent.ko.copyLabel }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(AI_INTRO_TEXT);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: aiIntroContent.ko.copiedLabel })).toBeInTheDocument()
    );
  });

  it("keeps the intro text verbatim from the source document", () => {
    expect(AI_INTRO_TEXT.startsWith("**이건 AI에게 나에 대한 context를")).toBe(true);
    expect(AI_INTRO_TEXT).toContain("Sandcastle Protocol");
    expect(AI_INTRO_TEXT.endsWith("while playing the game.")).toBe(true);
    expect(AI_INTRO_TEXT).not.toContain("\r");
  });
});
