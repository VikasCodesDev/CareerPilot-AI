import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ProgressCircle } from "@/features/roadmap/components/ProgressCircle";
import type { Roadmap } from "@/features/roadmap/types";

type RoadmapHeroProps = {
  roadmap: Roadmap | null;
  authenticated: boolean;
};

export function RoadmapHero({ roadmap, authenticated }: RoadmapHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 -z-10 aurora-bg opacity-60" aria-hidden="true" />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Deterministic career roadmap engine
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-normal sm:text-4xl">
            {roadmap?.careerGoal ?? "Career Roadmap"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {roadmap
              ? `${roadmap.targetRole} plan across ${roadmap.estimatedDuration} weeks, ${roadmap.learningHoursPerWeek} focused hours per week.`
              : authenticated
                ? "Generate a roadmap through the API to unlock milestones, weekly tasks, skill graph, and progress tracking."
                : "Sign in to create and track a role-specific learning roadmap."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-border bg-background/50 px-3 py-1">
              Target: {roadmap?.targetRole ?? "Not selected"}
            </span>
            <span className="rounded-full border border-border bg-background/50 px-3 py-1">
              Phase: {roadmap?.currentPhase ?? "Pending"}
            </span>
            <span className="rounded-full border border-border bg-background/50 px-3 py-1">
              Level: {roadmap?.roadmapLevel ?? "starter"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col">
          <ProgressCircle value={roadmap?.completion ?? 0} />
          <Link href="/dashboard/resume" className={buttonVariants({ variant: "outline" })}>
            Prepare resume
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
