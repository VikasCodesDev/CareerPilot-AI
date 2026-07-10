"use client";

import { useMemo } from "react";

import type { Roadmap } from "@/features/roadmap/types";

export function useMilestones(roadmap: Roadmap | null) {
  return useMemo(() => {
    const milestones = roadmap?.milestones ?? [];

    return {
      milestones,
      completed: milestones.filter((milestone) => milestone.status === "completed"),
      upcoming: milestones.filter((milestone) => milestone.status !== "completed").slice(0, 3),
      current:
        milestones.find((milestone) => milestone.phase === roadmap?.currentPhase) ??
        milestones.find((milestone) => milestone.status !== "completed") ??
        null,
    };
  }, [roadmap]);
}
