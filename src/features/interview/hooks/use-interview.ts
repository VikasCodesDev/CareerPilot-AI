"use client";

import { useMemo } from "react";

import type { InterviewSession } from "@/features/interview/types";
import { calculateInterviewProgress, getCurrentQuestion } from "@/features/interview/utils/progress-calculator";

export function useInterview(session: InterviewSession | null) {
  return useMemo(
    () => ({
      session,
      hasSession: Boolean(session),
      currentQuestion: getCurrentQuestion(session),
      progress: calculateInterviewProgress(session),
      answeredCount: session?.answers.length ?? 0,
      totalQuestions: session?.questions.length ?? 0,
      isCompleted: session?.status === "completed",
    }),
    [session]
  );
}
