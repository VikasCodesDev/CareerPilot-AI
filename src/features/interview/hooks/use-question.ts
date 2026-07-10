"use client";

import { useMemo } from "react";

import type { InterviewSession } from "@/features/interview/types";
import { getCurrentQuestion } from "@/features/interview/utils/progress-calculator";

export function useQuestion(session: InterviewSession | null) {
  return useMemo(() => {
    const currentQuestion = getCurrentQuestion(session);

    return {
      currentQuestion,
      questionIndex: session?.currentQuestion ?? 0,
      category: currentQuestion?.category ?? "Introduction",
      expectedSignals: currentQuestion?.expectedSignals ?? [],
    };
  }, [session]);
}
