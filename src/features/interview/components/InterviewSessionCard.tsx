import { BadgeCheck, Clock3 } from "lucide-react";

import type { InterviewSession } from "@/features/interview/types";

type InterviewSessionCardProps = {
  session: InterviewSession | null;
};

export function InterviewSessionCard({ session }: InterviewSessionCardProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Session Summary</h2>
      </div>
      <div className="mt-5 grid gap-3 text-sm">
        <InfoRow label="Target Role" value={session?.targetRole ?? "Not selected"} />
        <InfoRow label="Difficulty" value={session?.difficulty ?? "Intermediate"} />
        <InfoRow label="Type" value={session?.interviewType ?? "Mixed"} />
        <InfoRow label="Duration" value={`${session?.duration ?? 0} min`} icon />
      </div>
    </section>
  );
}

function InfoRow({ label, value, icon = false }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/20 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="inline-flex items-center gap-1 font-medium">
        {icon ? <Clock3 className="size-3.5 text-primary" aria-hidden="true" /> : null}
        {value}
      </span>
    </div>
  );
}
