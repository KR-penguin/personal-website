"use client";

import type { ReactNode } from "react";
import { SummaryModeProvider } from "@/hooks/useSummaryMode";

interface ProvidersProps {
  children: ReactNode;
}

// Client-only boundary for context providers -- React context is not
// supported directly inside Server Components (see layout.tsx, which renders
// this from an async server component).
export function Providers({ children }: ProvidersProps) {
  return <SummaryModeProvider>{children}</SummaryModeProvider>;
}
