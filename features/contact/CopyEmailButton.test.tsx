import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyEmailButton } from "./CopyEmailButton";

describe("CopyEmailButton", () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  });

  it("copies the email to the clipboard and shows the copied label", async () => {
    render(<CopyEmailButton email="kkwonsc@gmail.com" copyLabel="Copy email" copiedLabel="Copied!" />);

    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("kkwonsc@gmail.com");
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument());
  });
});
