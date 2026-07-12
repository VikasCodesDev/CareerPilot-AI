import { BriefcaseBusiness } from "lucide-react";

import type { PortfolioExperience } from "@/features/portfolio/types";

type PortfolioExperienceCardProps = {
  experience: PortfolioExperience;
};

export function PortfolioExperienceCard({ experience }: PortfolioExperienceCardProps) {
  return (
    <article className="workspace-card p-4 transition-colors hover:border-primary/20">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <BriefcaseBusiness className="size-4" aria-hidden="true" />
      </div>
      <h3 className="mt-3 text-sm font-semibold">{experience.role}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{experience.company}</p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{experience.summary}</p>
    </article>
  );
}
