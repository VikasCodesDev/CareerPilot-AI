import type { InterviewSession } from "@/features/interview/types";

export function calculateInterviewProgress(session: InterviewSession | null): number {
  if (!session || session.questions.length === 0) return 0;
  return Math.round((session.answers.length / session.questions.length) * 100);
}

export function getCurrentQuestion(session: InterviewSession | null) {
  if (!session) return null;
  return session.questions[session.currentQuestion] ?? session.questions.at(-1) ?? null;
}
