"use client";

import { useMemo } from "react";

import { ROADMAP_PHASES } from "@/features/roadmap/constants";
import type { Roadmap } from "@/features/roadmap/types";
import { calculatePhaseWeekRange } from "@/features/roadmap/utils/timeline";

export function useTimeline(roadmap: Roadmap | null) {
  return useMemo(() => {
    const duration = roadmap?.estimatedDuration ?? ROADMAP_PHASES.length;

    return ROADMAP_PHASES.map((phase) => ({
      phase,
      range: calculatePhaseWeekRange(phase, duration),
      active: roadmap?.currentPhase === phase,
      completed: roadmap
        ? roadmap.milestones.some(
            (milestone) => milestone.phase === phase && milestone.status === "completed"
          )
        : false,
    }));
  }, [roadmap]);
}
