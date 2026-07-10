import { BriefcaseBusiness } from "lucide-react";

import type { PortfolioExperience } from "@/features/portfolio/types";

type PortfolioExperienceCardProps = {
  experience: PortfolioExperience;
};

export function PortfolioExperienceCard({ experience }: PortfolioExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <BriefcaseBusiness className="size-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold">{experience.role}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{experience.company}</p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{experience.summary}</p>
    </article>
  );
}
