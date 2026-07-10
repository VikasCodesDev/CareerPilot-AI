"use client";

import { useMemo } from "react";

import type { Roadmap } from "@/features/roadmap/types";

export function useRoadmap(roadmap: Roadmap | null) {
  return useMemo(() => {
    const tasks = roadmap?.tasks ?? [];

    return {
      roadmap,
      hasRoadmap: Boolean(roadmap),
      activeTasks: tasks.filter((task) => task.status === "in-progress"),
      completedTasks: tasks.filter((task) => task.status === "completed"),
      todaysTasks: tasks.filter((task) => task.week === roadmap?.progress.currentWeek).slice(0, 4),
      currentWeekGoal: roadmap?.weeklyGoals.find(
        (goal) => goal.week === roadmap.progress.currentWeek
      ),
    };
  }, [roadmap]);
}
