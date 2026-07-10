import { ProgressCircle } from "@/features/roadmap/components/ProgressCircle";
import type { Roadmap } from "@/features/roadmap/types";

type CompletionCardProps = {
  roadmap: Roadmap | null;
};

export function CompletionCard({ roadmap }: CompletionCardProps) {
  return (
    <section className="surface-card flex flex-col items-center p-6 text-center">
      <ProgressCircle value={roadmap?.completion ?? 0} size="sm" />
      <h2 className="mt-4 text-lg font-semibold">Resume Health Alignment</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Roadmap progress is ready to connect with resume, interview, and portfolio readiness.
      </p>
    </section>
  );
}
