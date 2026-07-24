import { describe, expect, it } from "vitest";
import {
  ACTIONS,
  CELL_TYPES,
  GOAL_STATE,
  START_STATE,
  Q_LEARNING_CONFIG,
  computeGreedyPath,
  createQTable,
  decayEpsilon,
  maxQValue,
  step,
  trainEpisodes,
} from "./logic";

describe("step", () => {
  it("keeps the agent in place when it would walk off the grid", () => {
    const result = step(START_STATE, "up");
    expect(result.nextState).toBe(START_STATE);
    expect(result.done).toBe(false);
    expect(result.reward).toBe(0);
  });

  it("ends the episode with reward 0 when stepping into a hole", () => {
    // state 1 = (0,1); moving down lands on (1,1) which is H.
    const result = step(1, "down");
    expect(CELL_TYPES[result.nextState]).toBe("H");
    expect(result.reward).toBe(0);
    expect(result.done).toBe(true);
  });

  it("ends the episode with reward 1 when stepping into the goal", () => {
    // state 14 = (3,2); moving right lands on (3,3) which is G.
    const result = step(14, "right");
    expect(result.nextState).toBe(GOAL_STATE);
    expect(result.reward).toBe(1);
    expect(result.done).toBe(true);
  });
});

describe("decayEpsilon", () => {
  it("multiplies by the decay rate but never drops below the floor", () => {
    expect(decayEpsilon(1.0)).toBeCloseTo(0.99);
    expect(decayEpsilon(0.001)).toBe(Q_LEARNING_CONFIG.epsilonFloor);
  });
});

describe("Q-learning training convergence (core correctness check)", () => {
  it("derives a greedy policy from S to G that never steps into a hole", () => {
    const qTable = createQTable();
    trainEpisodes(qTable, 1000, Q_LEARNING_CONFIG.epsilonStart);

    const { states, reachedGoal } = computeGreedyPath(qTable);

    expect(reachedGoal).toBe(true);
    expect(states[0]).toBe(START_STATE);
    expect(states[states.length - 1]).toBe(GOAL_STATE);

    for (const state of states) {
      expect(CELL_TYPES[state]).not.toBe("H");
    }
  });

  it("learns a non-zero value for at least one action out of the start state", () => {
    const qTable = createQTable();
    trainEpisodes(qTable, 1000, Q_LEARNING_CONFIG.epsilonStart);

    expect(maxQValue(qTable, START_STATE)).toBeGreaterThan(0);
  });

  it("gives every action a defined Q-value entry after training", () => {
    const qTable = createQTable();
    trainEpisodes(qTable, 200, Q_LEARNING_CONFIG.epsilonStart);

    for (const row of qTable) {
      expect(row.length).toBe(ACTIONS.length);
      for (const value of row) {
        expect(Number.isFinite(value)).toBe(true);
      }
    }
  });
});
