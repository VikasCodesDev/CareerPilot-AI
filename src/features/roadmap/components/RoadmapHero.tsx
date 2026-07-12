import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { WorkspaceHero } from "@/features/dashboard/components/shared/workspace-hero";
import { ProgressCircle } from "@/features/roadmap/components/ProgressCircle";
import type { Roadmap } from "@/features/roadmap/types";

type RoadmapHeroProps = {
  roadmap: Roadmap | null;
  authenticated: boolean;
};

export function RoadmapHero({ roadmap, authenticated }: RoadmapHeroProps) {
  return (
    <WorkspaceHero
      eyebrow="Deterministic career roadmap engine"
      eyebrowIcon={Sparkles}
      title={roadmap?.careerGoal ?? "Career Roadmap"}
      description={
        roadmap
          ? `${roadmap.targetRole} plan across ${roadmap.estimatedDuration} weeks, ${roadmap.learningHoursPerWeek} focused hours per week.`
          : authenticated
            ? "Generate a roadmap through the API to unlock milestones, weekly tasks, skill graph, and progress tracking."
            : "Sign in to create and track a role-specific learning roadmap."
      }
      badges={[
        `Target: ${roadmap?.targetRole ?? "Not selected"}`,
        `Phase: ${roadmap?.currentPhase ?? "Pending"}`,
        `Level: ${roadmap?.roadmapLevel ?? "starter"}`,
      ]}
      aside={
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col">
          <div className="workspace-card rounded-2xl p-4">
            <ProgressCircle value={roadmap?.completion ?? 0} />
          </div>
          <Link href="/dashboard/resume" className={buttonVariants({ variant: "outline" })}>
            Prepare resume
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      }
    />
  );
}
