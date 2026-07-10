import type { Roadmap } from "@/features/roadmap/types";

type CurrentPhaseProps = {
  roadmap: Roadmap | null;
};

export function CurrentPhase({ roadmap }: CurrentPhaseProps) {
  const phaseTasks = roadmap?.tasks.filter((task) => task.phase === roadmap.currentPhase) ?? [];

  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold">Current Phase</h2>
      <p className="mt-2 text-3xl font-semibold">{roadmap?.currentPhase ?? "Not started"}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {phaseTasks.length} tasks mapped to this phase.
      </p>
    </section>
  );
}
