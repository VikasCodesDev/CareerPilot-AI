import { ROADMAP_PHASES } from "@/features/roadmap/constants";
import type { RoadmapPhase } from "@/features/roadmap/types";
import { cn } from "@/lib/utils";

type RoadmapFiltersProps = {
  activePhase: RoadmapPhase | null;
};

export function RoadmapFilters({ activePhase }: RoadmapFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Roadmap phases">
      {ROADMAP_PHASES.map((phase) => (
        <span
          key={phase}
          className={cn(
            "rounded-full border px-3 py-1 text-xs",
            activePhase === phase
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border bg-muted/20 text-muted-foreground"
          )}
        >
          {phase}
        </span>
      ))}
    </div>
  );
}
