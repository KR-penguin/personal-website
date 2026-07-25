import { describe, expect, it } from "vitest";
import { selectActiveSectionId } from "./useActiveSection";

describe("selectActiveSectionId", () => {
  it("picks the most-visible intersecting section", () => {
    const result = selectActiveSectionId(
      [
        { id: "hero", isIntersecting: true, intersectionRatio: 0.2 },
        { id: "founder-story", isIntersecting: true, intersectionRatio: 0.8 },
      ],
      null
    );

    expect(result).toBe("founder-story");
  });

  it("falls back to the previously active section when nothing currently intersects", () => {
    const result = selectActiveSectionId(
      [
        { id: "hero", isIntersecting: false, intersectionRatio: 0 },
        { id: "founder-story", isIntersecting: false, intersectionRatio: 0 },
      ],
      "hero"
    );

    expect(result).toBe("hero");
  });

  it("returns null when nothing intersects and there is no previously active section", () => {
    const result = selectActiveSectionId(
      [{ id: "hero", isIntersecting: false, intersectionRatio: 0 }],
      null
    );

    expect(result).toBeNull();
  });

  it("ignores non-intersecting entries when another section is intersecting", () => {
    const result = selectActiveSectionId(
      [
        { id: "hero", isIntersecting: false, intersectionRatio: 0 },
        { id: "contact", isIntersecting: true, intersectionRatio: 0.5 },
      ],
      "hero"
    );

    expect(result).toBe("contact");
  });
});
