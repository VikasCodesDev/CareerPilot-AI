import { Flag } from "lucide-react";

import type { RoadmapMilestone } from "@/features/roadmap/types";

type MilestoneCardProps = {
  milestone: RoadmapMilestone;
};

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card/60 p-4">
      <div className="flex items-start gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Flag className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Week {milestone.week}</p>
          <h3 className="mt-1 text-sm font-semibold">{milestone.title}</h3>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{milestone.description}</p>
          <span className="mt-3 inline-flex rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
            {milestone.status}
          </span>
        </div>
      </div>
    </article>
  );
}
