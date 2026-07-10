import { GraduationCap } from "lucide-react";

import type { PortfolioEducation } from "@/features/portfolio/types";

type PortfolioEducationCardProps = {
  education: PortfolioEducation;
};

export function PortfolioEducationCard({ education }: PortfolioEducationCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <GraduationCap className="size-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold">{education.degree}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {education.institution} - {education.field}
      </p>
    </article>
  );
}
