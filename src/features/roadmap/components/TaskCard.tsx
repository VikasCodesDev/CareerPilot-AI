import { CheckCircle2, Circle, Clock3 } from "lucide-react";

import type { RoadmapTask } from "@/features/roadmap/types";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: RoadmapTask;
};

export function TaskCard({ task }: TaskCardProps) {
  const completed = task.status === "completed";

  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4 transition hover:border-primary/40 hover:bg-muted/30">
      <div className="flex items-start gap-3">
        {completed ? (
          <CheckCircle2 className="mt-0.5 size-5 text-success" aria-hidden="true" />
        ) : (
          <Circle className="mt-0.5 size-5 text-muted-foreground" aria-hidden="true" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold">{task.title}</h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                completed
                  ? "bg-success/10 text-success"
                  : task.status === "in-progress"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {task.status}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{task.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>Week {task.week}</span>
            <span>{task.phase}</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {task.estimatedHours}h
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
