"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "summaryMode";

export interface SummaryModeContextValue {
  summaryMode: boolean;
  setSummaryMode: (value: boolean) => void;
}

// Falls back to immersive mode (false) with a no-op setter when rendered
// without a provider ancestor, so components reading this hook stay safe to
// render/test in isolation. Production always mounts SummaryModeProvider via
// app/providers.tsx, so this fallback is never hit outside tests.
const defaultContextValue: SummaryModeContextValue = {
  summaryMode: false,
  setSummaryMode: () => {},
};

const SummaryModeContext = createContext<SummaryModeContextValue>(defaultContextValue);

function readStoredSummaryMode(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

interface SummaryModeStore {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => boolean;
  getServerSnapshot: () => boolean;
  setValue: (value: boolean) => void;
}

// A tiny external store read through useSyncExternalStore, so the persisted
// value can be hydrated the first time a subscriber attaches (React calls
// subscribe from a passive effect internally) without this file ever calling
// setState directly inside a useEffect body. Default snapshot is false both
// on the server and before hydration, matching SSR output.
function createSummaryModeStore(): SummaryModeStore {
  let value = false;
  let hydrated = false;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener) {
      if (!hydrated) {
        hydrated = true;
        const stored = readStoredSummaryMode();
        if (stored !== value) {
          value = stored;
          listener();
        }
      }
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => value,
    getServerSnapshot: () => false,
    setValue(nextValue) {
      value = nextValue;
      try {
        window.localStorage.setItem(STORAGE_KEY, String(nextValue));
      } catch {
        // Ignore write failures (e.g. private browsing) -- in-memory value still updates.
      }
      listeners.forEach((listener) => listener());
    },
  };
}

interface SummaryModeProviderProps {
  children: ReactNode;
}

export function SummaryModeProvider({ children }: SummaryModeProviderProps) {
  // One store per Provider mount (not a module-level singleton) so separate
  // provider instances -- e.g. across tests -- never leak state into each other.
  const store = useMemo(() => createSummaryModeStore(), []);

  const summaryMode = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
  const setSummaryMode = useCallback((value: boolean) => store.setValue(value), [store]);

  return (
    <SummaryModeContext.Provider value={{ summaryMode, setSummaryMode }}>
      {children}
    </SummaryModeContext.Provider>
  );
}

export function useSummaryMode(): SummaryModeContextValue {
  return useContext(SummaryModeContext);
}
