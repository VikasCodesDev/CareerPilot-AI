"use client";

import { useMemo } from "react";

import type { InterviewHistoryItem } from "@/features/interview/types";

export function useInterviewHistory(history: InterviewHistoryItem[]) {
  return useMemo(
    () => ({
      history,
      latest: history[0] ?? null,
      completed: history.filter((item) => item.status === "completed"),
      active: history.filter((item) => item.status === "active"),
      averageScore:
        history.length > 0
          ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length)
          : 0,
    }),
    [history]
  );
}
