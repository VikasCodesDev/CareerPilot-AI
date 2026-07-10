import { Mic2, Sparkles } from "lucide-react";

import type { InterviewSession } from "@/features/interview/types";
import { ProgressBar } from "./ProgressBar";

type InterviewHeroProps = {
  session: InterviewSession | null;
  progress: number;
};

export function InterviewHero({ session, progress }: InterviewHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 -z-10 aurora-bg opacity-60" aria-hidden="true" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Deterministic interview preparation engine
          </div>
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
            {session ? `${session.targetRole} Interview Practice` : "Interview Practice"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {session
              ? `${session.interviewType} session at ${session.difficulty} difficulty with rule-based scoring and feedback.`
              : "Start a session through the interview API to generate role-specific questions, scoring, and practice feedback."}
          </p>
        </div>
        <div className="w-full rounded-2xl border border-border bg-background/50 p-4 lg:max-w-sm">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Mic2 className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">{session?.status ?? "No active session"}</p>
              <p className="text-xs text-muted-foreground">
                {session ? `${session.answers.length}/${session.questions.length} answered` : "0/0 answered"}
              </p>
            </div>
          </div>
          <ProgressBar className="mt-4" value={progress} label="Session completion" />
        </div>
      </div>
    </section>
  );
}
