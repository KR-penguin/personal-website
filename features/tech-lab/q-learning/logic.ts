// Pure Q-learning + FrozenLake-style grid logic. No React/DOM imports so this
// stays unit-testable in isolation and reusable from both the training hook
// and any future non-browser context (e.g. a script re-verifying convergence).

export type CellType = "S" | "F" | "H" | "G";

// S = start, F = frozen/safe, H = hole (episode fails), G = goal (episode succeeds).
export const GRID_ROWS: readonly CellType[][] = [
  ["S", "F", "F", "F"],
  ["F", "H", "F", "H"],
  ["F", "F", "F", "H"],
  ["H", "F", "F", "G"],
];

export const GRID_SIZE = GRID_ROWS.length;

// Flat lookup where index === row * GRID_SIZE + col, matching state indices below.
export const CELL_TYPES: readonly CellType[] = GRID_ROWS.flat();
export const NUM_STATES = CELL_TYPES.length;

export const START_STATE = CELL_TYPES.indexOf("S");
export const GOAL_STATE = CELL_TYPES.indexOf("G");

export type Action = "up" | "down" | "left" | "right";
export const ACTIONS: readonly Action[] = ["up", "down", "left", "right"];
export const NUM_ACTIONS = ACTIONS.length;

const ACTION_DELTAS: Record<Action, readonly [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

export interface QLearningConfig {
  alpha: number;
  gamma: number;
  maxStepsPerEpisode: number;
  epsilonStart: number;
  epsilonDecay: number;
  epsilonFloor: number;
}

export const Q_LEARNING_CONFIG: QLearningConfig = {
  alpha: 0.1,
  gamma: 0.9,
  maxStepsPerEpisode: 100,
  epsilonStart: 1.0,
  epsilonDecay: 0.99,
  epsilonFloor: 0.01,
};

// One row per state, one column per action (same order as ACTIONS).
export type QTable = number[][];

export function toState(row: number, col: number): number {
  return row * GRID_SIZE + col;
}

export function toRowCol(state: number): [number, number] {
  return [Math.floor(state / GRID_SIZE), state % GRID_SIZE];
}

export function cellAt(state: number): CellType {
  return CELL_TYPES[state];
}

export function createQTable(): QTable {
  return CELL_TYPES.map(() => new Array(NUM_ACTIONS).fill(0));
}

export function cloneQTable(qTable: QTable): QTable {
  return qTable.map((row) => [...row]);
}

export function maxQValue(qTable: QTable, state: number): number {
  return Math.max(...qTable[state]);
}

export function computeMaxQPerState(qTable: QTable): number[] {
  return qTable.map((_, state) => maxQValue(qTable, state));
}

// Ties are broken uniformly at random rather than always picking the lowest
// index. This matters a lot early in training: with an all-zero Q-table
// every action ties, and a fixed tie-break (e.g. always "up") would make
// "greedy" collapse onto one wall-bumping action and stall exploration once
// epsilon decays — a classic sparse-reward FrozenLake trap. Random tie-break
// keeps early "greedy" picks effectively uniform, matching plain exploration.
export function argmaxAction(
  qTable: QTable,
  state: number,
  random: () => number = Math.random
): Action {
  const values = qTable[state];
  const bestValue = Math.max(...values);
  const bestIndices: number[] = [];
  for (let i = 0; i < values.length; i++) {
    if (values[i] === bestValue) bestIndices.push(i);
  }
  const pick = bestIndices[Math.floor(random() * bestIndices.length)];
  return ACTIONS[pick];
}

export function epsilonGreedyAction(
  qTable: QTable,
  state: number,
  epsilon: number,
  random: () => number = Math.random
): Action {
  if (random() < epsilon) {
    const index = Math.floor(random() * ACTIONS.length);
    return ACTIONS[index];
  }
  return argmaxAction(qTable, state, random);
}

export interface StepResult {
  nextState: number;
  reward: number;
  done: boolean;
}

// Moving into a wall keeps the agent in place. Stepping into H ends the
// episode with reward 0; stepping into G ends it with reward 1.
export function step(state: number, action: Action): StepResult {
  const [row, col] = toRowCol(state);
  const [dRow, dCol] = ACTION_DELTAS[action];
  let nextRow = row + dRow;
  let nextCol = col + dCol;

  if (nextRow < 0 || nextRow >= GRID_SIZE || nextCol < 0 || nextCol >= GRID_SIZE) {
    nextRow = row;
    nextCol = col;
  }

  const nextState = toState(nextRow, nextCol);
  const cell = cellAt(nextState);

  if (cell === "H") return { nextState, reward: 0, done: true };
  if (cell === "G") return { nextState, reward: 1, done: true };
  return { nextState, reward: 0, done: false };
}

export function updateQTable(
  qTable: QTable,
  state: number,
  action: Action,
  reward: number,
  nextState: number,
  done: boolean,
  config: QLearningConfig = Q_LEARNING_CONFIG
): void {
  const actionIndex = ACTIONS.indexOf(action);
  const currentQ = qTable[state][actionIndex];
  const futureQ = done ? 0 : maxQValue(qTable, nextState);
  qTable[state][actionIndex] = currentQ + config.alpha * (reward + config.gamma * futureQ - currentQ);
}

export function decayEpsilon(
  epsilon: number,
  config: QLearningConfig = Q_LEARNING_CONFIG
): number {
  return Math.max(config.epsilonFloor, epsilon * config.epsilonDecay);
}

export interface EpisodeResult {
  steps: number;
  reachedGoal: boolean;
}

// Mutates qTable in place (applying the update rule after every step) and
// returns how the episode ended.
export function runEpisode(
  qTable: QTable,
  epsilon: number,
  config: QLearningConfig = Q_LEARNING_CONFIG,
  random: () => number = Math.random
): EpisodeResult {
  let state = START_STATE;

  for (let i = 0; i < config.maxStepsPerEpisode; i++) {
    const action = epsilonGreedyAction(qTable, state, epsilon, random);
    const { nextState, reward, done } = step(state, action);
    updateQTable(qTable, state, action, reward, nextState, done, config);
    state = nextState;

    if (done) {
      return { steps: i + 1, reachedGoal: reward > 0 };
    }
  }

  return { steps: config.maxStepsPerEpisode, reachedGoal: false };
}

// Runs `episodeCount` episodes back to back, decaying epsilon after each one.
// Returns the resulting epsilon so callers can resume training later.
export function trainEpisodes(
  qTable: QTable,
  episodeCount: number,
  epsilon: number,
  config: QLearningConfig = Q_LEARNING_CONFIG,
  random: () => number = Math.random
): number {
  let currentEpsilon = epsilon;
  for (let i = 0; i < episodeCount; i++) {
    runEpisode(qTable, currentEpsilon, config, random);
    currentEpsilon = decayEpsilon(currentEpsilon, config);
  }
  return currentEpsilon;
}

export interface GreedyPathResult {
  states: number[];
  reachedGoal: boolean;
}

// Walks the greedy (argmax) policy from START_STATE, capped at
// maxStepsPerEpisode so a still-untrained/degenerate table can't loop forever.
export function computeGreedyPath(
  qTable: QTable,
  config: QLearningConfig = Q_LEARNING_CONFIG,
  random: () => number = Math.random
): GreedyPathResult {
  const states = [START_STATE];
  let state = START_STATE;

  if (cellAt(state) === "G") return { states, reachedGoal: true };

  for (let i = 0; i < config.maxStepsPerEpisode; i++) {
    const action = argmaxAction(qTable, state, random);
    const { nextState, reward, done } = step(state, action);
    states.push(nextState);
    state = nextState;

    if (done) {
      return { states, reachedGoal: reward > 0 };
    }
  }

  return { states, reachedGoal: false };
}
