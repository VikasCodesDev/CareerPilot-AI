"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { Roadmap } from "@/features/roadmap/types";

type RoadmapContextValue = {
  roadmap: Roadmap | null;
  authenticated: boolean;
};

const RoadmapContext = createContext<RoadmapContextValue | null>(null);

export function RoadmapProvider({
  children,
  roadmap,
  authenticated,
}: RoadmapContextValue & { children: ReactNode }) {
  const value = useMemo(() => ({ roadmap, authenticated }), [authenticated, roadmap]);

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
}

export function useRoadmapContext() {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error("useRoadmapContext must be used within RoadmapProvider.");
  }

  return context;
}
