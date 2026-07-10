"use client";

import { motion } from "framer-motion";

import { AnswerEditor } from "@/features/interview/components/AnswerEditor";
import { DifficultySelector } from "@/features/interview/components/DifficultySelector";
import { EmptyState } from "@/features/interview/components/EmptyState";
import { FeedbackCard } from "@/features/interview/components/FeedbackCard";
import { HistoryCard } from "@/features/interview/components/HistoryCard";
import { InterviewHero } from "@/features/interview/components/InterviewHero";
import { InterviewSidebar } from "@/features/interview/components/InterviewSidebar";
import { InterviewTypeSelector } from "@/features/interview/components/InterviewTypeSelector";
import { QuestionCard } from "@/features/interview/components/QuestionCard";
import { RecommendationCard } from "@/features/interview/components/RecommendationCard";
import { ScoreCard } from "@/features/interview/components/ScoreCard";
import { SessionSummary } from "@/features/interview/components/SessionSummary";
import { useInterview } from "@/features/interview/hooks";
import type { InterviewHistoryItem, InterviewSession } from "@/features/interview/types";

type InterviewDashboardProps = {
  session: InterviewSession | null;
  history: InterviewHistoryItem[];
  recommendations: string[];
  authenticated: boolean;
};

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export function InterviewDashboard({
  session,
  history,
  recommendations,
  authenticated,
}: InterviewDashboardProps) {
  const { currentQuestion, progress } = useInterview(session);
  const latestFeedback = session?.feedback.at(-1) ?? null;

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <motion.div {...fadeIn}>
        <InterviewHero session={session} progress={progress} />
      </motion.div>

      {!authenticated ? (
        <EmptyState
          title="Sign in to practice interviews."
          description="Interview sessions are saved to your account so your feedback and history stay persistent."
        />
      ) : null}

      {authenticated && !session ? (
        <EmptyState
          title="No interview session yet."
          description="Use the interview start API to generate a deterministic session for your target role."
        />
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <ScoreCard label="Communication" value={session?.score.communicationScore ?? 0} />
        <ScoreCard label="Technical" value={session?.score.technicalScore ?? 0} />
        <ScoreCard label="Confidence" value={session?.score.confidenceScore ?? 0} />
        <ScoreCard label="Behavior" value={session?.score.behaviorScore ?? 0} />
        <ScoreCard label="Problem Solving" value={session?.score.problemSolvingScore ?? 0} />
        <ScoreCard label="Overall" value={session?.score.overallScore ?? 0} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <main className="space-y-6">
          <section className="surface-card space-y-4 p-6">
            <h2 className="text-xl font-semibold">Session Profile</h2>
            <DifficultySelector value={session?.difficulty ?? null} />
            <InterviewTypeSelector value={session?.interviewType ?? null} />
          </section>
          <QuestionCard question={currentQuestion} />
          <AnswerEditor disabled={!authenticated || !session || session.status === "completed"} />
          <FeedbackCard feedback={latestFeedback} />
          <SessionSummary session={session} />
          <section className="surface-card p-6">
            <h2 className="text-xl font-semibold">Recommendations</h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {recommendations.map((recommendation) => (
                <RecommendationCard key={recommendation} recommendation={recommendation} />
              ))}
            </div>
          </section>
          <section className="surface-card p-6">
            <h2 className="text-xl font-semibold">Interview History</h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {history.length > 0 ? (
                history.map((item) => <HistoryCard key={item.id} item={item} />)
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                  No previous interview sessions found.
                </p>
              )}
            </div>
          </section>
        </main>
        <InterviewSidebar session={session} />
      </div>
    </div>
  );
}
