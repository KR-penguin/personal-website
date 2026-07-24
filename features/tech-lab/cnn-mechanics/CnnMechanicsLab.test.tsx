import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { CnnMechanicsLab } from "./CnnMechanicsLab";
import { cnnMechanicsContent } from "@/content/techLab/cnnMechanics";

function paintCanvasCenter(canvas: HTMLElement) {
  vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({
    left: 0,
    top: 0,
    width: 320,
    height: 320,
    right: 320,
    bottom: 320,
    x: 0,
    y: 0,
    toJSON() {
      return {};
    },
  } as DOMRect);

  fireEvent.pointerDown(canvas, { clientX: 160, clientY: 160, pointerId: 1 });
  fireEvent.pointerUp(canvas, { clientX: 160, clientY: 160, pointerId: 1 });
}

describe("CnnMechanicsLab", () => {
  it("renders the drawable canvas, kernel/stride/padding/pool controls, and all four stage maps", () => {
    mockMatchMedia(false);
    render(<CnnMechanicsLab locale="en" />);

    const { labels } = cnnMechanicsContent.en;

    expect(screen.getByText(labels.title)).toBeInTheDocument();
    expect(screen.getByLabelText(labels.canvasLabel)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: labels.clearButton })).toBeInTheDocument();

    for (const kernelName of Object.values(labels.kernelNames)) {
      expect(screen.getByRole("button", { name: kernelName })).toBeInTheDocument();
    }

    expect(screen.getByTestId("cnn-stage-input")).toBeInTheDocument();
    expect(screen.getByTestId("cnn-stage-conv")).toBeInTheDocument();
    expect(screen.getByTestId("cnn-stage-relu")).toBeInTheDocument();
    expect(screen.getByTestId("cnn-stage-pooled")).toBeInTheDocument();
  });

  it("changes the rendered conv-stage output when a different kernel is selected", () => {
    mockMatchMedia(false);
    render(<CnnMechanicsLab locale="en" />);

    const { labels } = cnnMechanicsContent.en;
    const canvas = screen.getByLabelText(labels.canvasLabel);
    paintCanvasCenter(canvas);

    const convStage = screen.getByTestId("cnn-stage-conv");
    const initialSignature = convStage.getAttribute("data-signature");

    const otherKernelButton = screen.getByRole("button", { name: labels.kernelNames.horizontalEdge });
    fireEvent.click(otherKernelButton);

    expect(convStage.getAttribute("data-signature")).not.toBe(initialSignature);
  });

  it("is keyboard-operable: the canvas is focusable and Enter paints the cell under the virtual cursor", () => {
    mockMatchMedia(false);
    render(<CnnMechanicsLab locale="en" />);

    const { labels } = cnnMechanicsContent.en;
    const canvas = screen.getByLabelText(labels.canvasLabel);

    expect(canvas).toHaveAttribute("tabIndex", "0");
    expect(canvas).toHaveAttribute("aria-describedby");
    const describedById = canvas.getAttribute("aria-describedby");
    expect(document.getElementById(describedById!)).toHaveTextContent(
      labels.canvasKeyboardInstructions
    );

    const inputStage = screen.getByTestId("cnn-stage-input");
    const initialSignature = inputStage.getAttribute("data-signature");

    canvas.focus();
    fireEvent.keyDown(canvas, { key: "ArrowRight" });
    fireEvent.keyDown(canvas, { key: "Enter" });

    expect(inputStage.getAttribute("data-signature")).not.toBe(initialSignature);
  });

  it("moves the keyboard cursor with arrow keys and paints with Space too", () => {
    mockMatchMedia(false);
    render(<CnnMechanicsLab locale="en" />);

    const { labels } = cnnMechanicsContent.en;
    const canvas = screen.getByLabelText(labels.canvasLabel);
    const inputStage = screen.getByTestId("cnn-stage-input");
    const initialSignature = inputStage.getAttribute("data-signature");

    canvas.focus();
    fireEvent.keyDown(canvas, { key: "ArrowDown" });
    fireEvent.keyDown(canvas, { key: "ArrowLeft" });
    fireEvent.keyDown(canvas, { key: " " });

    expect(inputStage.getAttribute("data-signature")).not.toBe(initialSignature);
  });
});
