import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  });

  it("copies the text to the clipboard and shows the copied label", async () => {
    render(
      <CopyButton text="kkwonsc@gmail.com" copyLabel="Copy email" copiedLabel="Copied!" className="" />
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("kkwonsc@gmail.com");
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument());
  });

  it("keeps the copy label when the clipboard is unavailable", async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    render(<CopyButton text="hello" copyLabel="Copy" copiedLabel="Copied!" className="" />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello"));
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("falls back to selecting and legacy-copying the target when the clipboard is refused", async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    const execCommand = vi.fn().mockReturnValue(true);
    Object.assign(document, { execCommand });
    render(
      <>
        <pre id="target">hello world</pre>
        <CopyButton text="hello world" copyLabel="Copy" copiedLabel="Copied!" className="" fallbackTargetId="target" />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument());
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(window.getSelection()?.toString()).toBe("hello world");
  });
});
