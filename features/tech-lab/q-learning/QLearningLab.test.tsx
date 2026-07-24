import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { QLearningLab } from "./QLearningLab";
import { qLearningContent } from "@/content/techLab/qLearning";
import { NUM_STATES } from "./logic";

describe("QLearningLab", () => {
  it("renders the 4x4 grid of state cells", () => {
    mockMatchMedia(true);
    render(<QLearningLab locale="en" />);

    expect(screen.getByText(qLearningContent.en.labels.title)).toBeInTheDocument();

    for (let state = 0; state < NUM_STATES; state++) {
      expect(screen.getByTestId(`ql-cell-${state}`)).toBeInTheDocument();
    }
  });

  it("produces a non-zero max Q-value somewhere after Train is clicked (reduced motion runs synchronously)", () => {
    mockMatchMedia(true);
    render(<QLearningLab locale="en" />);

    const trainButton = screen.getByRole("button", {
      name: qLearningContent.en.labels.trainButton,
    });
    fireEvent.click(trainButton);

    const maxQValues = Array.from({ length: NUM_STATES }, (_, state) =>
      Number(screen.getByTestId(`ql-cell-${state}`).getAttribute("data-max-q"))
    );

    expect(maxQValues.some((value) => value > 0)).toBe(true);
  });

  it("only enables Play greedy once training has run at least one episode", () => {
    mockMatchMedia(true);
    render(<QLearningLab locale="en" />);

    const playButton = screen.getByRole("button", {
      name: qLearningContent.en.labels.playGreedyButton,
    });
    expect(playButton).toBeDisabled();

    const trainButton = screen.getByRole("button", {
      name: qLearningContent.en.labels.trainButton,
    });
    fireEvent.click(trainButton);

    expect(playButton).not.toBeDisabled();
  });
});
