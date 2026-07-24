"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";
import {
  Q_LEARNING_CONFIG,
  START_STATE,
  computeGreedyPath,
  computeMaxQPerState,
  createQTable,
  decayEpsilon,
  runEpisode,
  type QTable,
} from "./logic";

const TOTAL_TRAINING_EPISODES = 500;
const EPISODES_PER_FRAME = 5;
const PLAY_STEP_DELAY_MS = 400;

export interface UseQLearningLabResult {
  maxQValues: number[];
  agentState: number;
  epsilon: number;
  episodesCompleted: number;
  totalTrainingEpisodes: number;
  isTraining: boolean;
  isPlaying: boolean;
  greedyPath: number[] | null;
  reducedMotion: boolean;
  train: () => void;
  playGreedy: () => void;
  reset: () => void;
}

export function useQLearningLab(): UseQLearningLabResult {
  const reducedMotion = useEffectiveReducedMotion();

  const qTableRef = useRef<QTable>(createQTable());
  const epsilonRef = useRef(Q_LEARNING_CONFIG.epsilonStart);
  const episodesCompletedRef = useRef(0);
  const frameIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Seeded independently of the refs above (rather than reading `.current`
  // during render) since a freshly created Q-table's max-Q values are always
  // zero and epsilon always starts at Q_LEARNING_CONFIG.epsilonStart — the
  // exact values the refs themselves were just initialized to.
  const [maxQValues, setMaxQValues] = useState<number[]>(() =>
    computeMaxQPerState(createQTable())
  );
  const [agentState, setAgentState] = useState(START_STATE);
  const [epsilon, setEpsilon] = useState(Q_LEARNING_CONFIG.epsilonStart);
  const [episodesCompleted, setEpisodesCompleted] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [greedyPath, setGreedyPath] = useState<number[] | null>(null);

  const clearScheduledWork = useCallback(() => {
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  useEffect(() => clearScheduledWork, [clearScheduledWork]);

  const train = useCallback(() => {
    if (isTraining || isPlaying) return;
    clearScheduledWork();
    setGreedyPath(null);
    setIsTraining(true);

    if (reducedMotion) {
      for (let i = 0; i < TOTAL_TRAINING_EPISODES; i++) {
        runEpisode(qTableRef.current, epsilonRef.current, Q_LEARNING_CONFIG);
        epsilonRef.current = decayEpsilon(epsilonRef.current, Q_LEARNING_CONFIG);
      }
      episodesCompletedRef.current = TOTAL_TRAINING_EPISODES;
      setMaxQValues(computeMaxQPerState(qTableRef.current));
      setEpsilon(epsilonRef.current);
      setEpisodesCompleted(episodesCompletedRef.current);
      setIsTraining(false);
      return;
    }

    const runFrame = () => {
      const remaining = TOTAL_TRAINING_EPISODES - episodesCompletedRef.current;
      const batchSize = Math.min(EPISODES_PER_FRAME, remaining);

      for (let i = 0; i < batchSize; i++) {
        runEpisode(qTableRef.current, epsilonRef.current, Q_LEARNING_CONFIG);
        epsilonRef.current = decayEpsilon(epsilonRef.current, Q_LEARNING_CONFIG);
      }
      episodesCompletedRef.current += batchSize;

      setMaxQValues(computeMaxQPerState(qTableRef.current));
      setEpsilon(epsilonRef.current);
      setEpisodesCompleted(episodesCompletedRef.current);

      if (episodesCompletedRef.current < TOTAL_TRAINING_EPISODES) {
        frameIdRef.current = requestAnimationFrame(runFrame);
      } else {
        frameIdRef.current = null;
        setIsTraining(false);
      }
    };

    frameIdRef.current = requestAnimationFrame(runFrame);
  }, [clearScheduledWork, isTraining, isPlaying, reducedMotion]);

  const playGreedy = useCallback(() => {
    if (isTraining || isPlaying) return;
    clearScheduledWork();

    const { states } = computeGreedyPath(qTableRef.current, Q_LEARNING_CONFIG);
    setGreedyPath(states);

    if (reducedMotion) {
      setAgentState(states[states.length - 1]);
      return;
    }

    setIsPlaying(true);
    setAgentState(states[0]);
    let stepIndex = 0;

    const stepThrough = () => {
      stepIndex += 1;
      if (stepIndex >= states.length) {
        timeoutIdRef.current = null;
        setIsPlaying(false);
        return;
      }
      setAgentState(states[stepIndex]);
      timeoutIdRef.current = setTimeout(stepThrough, PLAY_STEP_DELAY_MS);
    };

    timeoutIdRef.current = setTimeout(stepThrough, PLAY_STEP_DELAY_MS);
  }, [clearScheduledWork, isTraining, isPlaying, reducedMotion]);

  const reset = useCallback(() => {
    clearScheduledWork();
    qTableRef.current = createQTable();
    epsilonRef.current = Q_LEARNING_CONFIG.epsilonStart;
    episodesCompletedRef.current = 0;

    setMaxQValues(computeMaxQPerState(qTableRef.current));
    setEpsilon(epsilonRef.current);
    setEpisodesCompleted(0);
    setAgentState(START_STATE);
    setGreedyPath(null);
    setIsTraining(false);
    setIsPlaying(false);
  }, [clearScheduledWork]);

  return {
    maxQValues,
    agentState,
    epsilon,
    episodesCompleted,
    totalTrainingEpisodes: TOTAL_TRAINING_EPISODES,
    isTraining,
    isPlaying,
    greedyPath,
    reducedMotion,
    train,
    playGreedy,
    reset,
  };
}
