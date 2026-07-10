import { PanelRight } from "lucide-react";

import type { InterviewSession } from "@/features/interview/types";
import { InterviewSessionCard } from "./InterviewSessionCard";
import { TimerCard } from "./TimerCard";

type InterviewSidebarProps = {
  session: InterviewSession | null;
};

export function InterviewSidebar({ session }: InterviewSidebarProps) {
  return (
    <aside className="space-y-6">
      <section className="surface-card p-5">
        <div className="flex items-center gap-3">
          <PanelRight className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold">Practice Controls</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Session state is persisted through the interview API.
        </p>
      </section>
      <InterviewSessionCard session={session} />
      <TimerCard duration={session?.duration ?? 30} running={false} />
    </aside>
  );
}
