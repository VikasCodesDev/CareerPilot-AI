import type { Roadmap } from "@/features/roadmap/types";

type TimelineProps = {
  roadmap: Roadmap | null;
};

export function Timeline({ roadmap }: TimelineProps) {
  const milestones = roadmap?.milestones ?? [];

  return (
    <section className="surface-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Learning Timeline</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Phase checkpoints mapped across the selected duration.
          </p>
        </div>
        <span className="text-sm text-muted-foreground">
          {roadmap?.estimatedDuration ?? 0} weeks
        </span>
      </div>
      <div className="mt-6 space-y-4">
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <div key={milestone.id} className="grid gap-3 sm:grid-cols-[120px_1fr]">
              <div className="text-xs font-medium text-muted-foreground">Week {milestone.week}</div>
              <div className="relative border-l border-border pl-5">
                <span className="absolute -left-1.5 top-1.5 size-3 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold">{milestone.phase}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{milestone.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            No roadmap timeline available yet.
          </p>
        )}
      </div>
    </section>
  );
}
