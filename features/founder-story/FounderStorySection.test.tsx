import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";

const messages = { current: en as Record<string, Record<string, string>> };

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) => messages.current[namespace][key],
}));

import { FounderStorySection } from "./FounderStorySection";
import { founderStoryContent, workProjects } from "@/content/founderStory";
import { BASE_PATH } from "@/lib/basePath";

async function renderSection(locale: "en" | "ko") {
  messages.current = locale === "en" ? en : ko;
  return render(await FounderStorySection({ locale }));
}

describe("FounderStorySection", () => {
  it("renders the headline stats as a description list", async () => {
    await renderSection("en");

    const stats = screen.getByLabelText(en.founderStory.statsLabel);
    expect(stats.tagName).toBe("DL");
    for (const stat of founderStoryContent.en.stats) {
      expect(within(stats).getByText(stat.value)).toBeInTheDocument();
    }
    expect(within(stats).getByText("(02) Revenue")).toBeInTheDocument();
  });

  it("lists every work project in order with its index code", async () => {
    await renderSection("en");

    const titles = screen.getAllByRole("heading", { level: 4 });
    expect(titles).toHaveLength(workProjects.length);
    expect(titles[0]).toHaveTextContent("Learn Up! - AI RPG Learning");
    expect(titles[2]).toHaveTextContent("Skanmeskin (formerly Pickmeskin)");
    expect(screen.getByText("#w009-0009/09")).toBeInTheDocument();
  });

  it("prefixes project images with the deploy base path and localizes alt text", async () => {
    await renderSection("ko");

    const image = screen.getByAltText("Learn Up! 게임 플레이 화면");
    expect(image.getAttribute("src")).toBe(`${BASE_PATH}/images/work/learnup-gameplay.webp`);
  });

  it("renders external links, repo lists, demo credentials, and video embeds", async () => {
    await renderSection("en");

    expect(screen.getByRole("link", { name: "View on Google Play" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.nplus.learnup&hl=en"
    );
    expect(screen.getByRole("link", { name: /Q-learning/ })).toHaveAttribute(
      "href",
      "https://github.com/KR-penguin/Q-learning-without-pytorch"
    );
    expect(screen.getByText("DEMO2026!")).toHaveClass("select-all");
    expect(screen.getByTitle("Hacked introduction video")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/UYLskgJujEc"
    );
  });

  it("renders the process note in the active locale", async () => {
    await renderSection("ko");

    expect(screen.getByText(founderStoryContent.ko.processNote)).toBeInTheDocument();
    expect(screen.getByText("● 현재 진행중")).toBeInTheDocument();
  });
});
