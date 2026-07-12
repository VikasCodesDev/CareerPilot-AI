import { Mic2, Sparkles } from "lucide-react";

import { WorkspaceHero } from "@/features/dashboard/components/shared/workspace-hero";
import type { InterviewSession } from "@/features/interview/types";
import { ProgressBar } from "./ProgressBar";

type InterviewHeroProps = {
  session: InterviewSession | null;
  progress: number;
};

export function InterviewHero({ session, progress }: InterviewHeroProps) {
  return (
    <WorkspaceHero
      eyebrow="Deterministic interview preparation engine"
      eyebrowIcon={Sparkles}
      title={session ? `${session.targetRole} Interview Practice` : "Interview Practice"}
      description={
        session
          ? `${session.interviewType} session at ${session.difficulty} difficulty with rule-based scoring and feedback.`
          : "Start a session through the interview API to generate role-specific questions, scoring, and practice feedback."
      }
      badges={
        session
          ? [session.difficulty, session.interviewType, session.status]
          : ["Behavioral", "Technical", "System Design"]
      }
      aside={
        <div className="workspace-card w-full rounded-2xl p-4 lg:max-w-sm">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shadow-[0_0_16px_rgba(139,92,246,0.2)]">
              <Mic2 className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">{session?.status ?? "No active session"}</p>
              <p className="text-xs text-muted-foreground">
                {session
                  ? `${session.answers.length}/${session.questions.length} answered`
                  : "0/0 answered"}
              </p>
            </div>
          </div>
          <ProgressBar className="mt-4" value={progress} label="Session completion" />
        </div>
      }
    />
  );
}
