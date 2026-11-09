import { describe, expect, it } from "vitest";
import { resolveText, spaceOut } from "./content";

describe("resolveText", () => {
  it("returns shared strings as-is and picks the locale from translated ones", () => {
    expect(resolveText("xAI", "ko")).toBe("xAI");
    expect(resolveText({ en: "Team", ko: "팀 이름" }, "ko")).toBe("팀 이름");
    expect(resolveText({ en: "Team", ko: "팀 이름" }, "en")).toBe("Team");
  });
});

describe("spaceOut", () => {
  it("puts a space between every character, including Hangul syllables", () => {
    expect(spaceOut("WORK")).toBe("W O R K");
    expect(spaceOut("성과")).toBe("성 과");
  });
});
