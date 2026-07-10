"use client";

import { useMemo } from "react";

import type { Roadmap } from "@/features/roadmap/types";

export function useProgress(roadmap: Roadmap | null) {
  return useMemo(() => {
    const progress = roadmap?.progress;

    return {
      completion: roadmap?.completion ?? 0,
      taskRatio: progress ? `${progress.completedTasks}/${progress.totalTasks}` : "0/0",
      milestoneRatio: progress
        ? `${progress.completedMilestones}/${progress.totalMilestones}`
        : "0/0",
      learningHoursRatio: progress
        ? `${progress.learningHoursCompleted}/${progress.learningHoursPlanned}`
        : "0/0",
      currentWeek: progress?.currentWeek ?? 1,
    };
  }, [roadmap]);
}
