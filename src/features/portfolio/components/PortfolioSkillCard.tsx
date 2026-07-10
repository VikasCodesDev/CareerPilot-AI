import { BadgeCheck } from "lucide-react";

import type { PortfolioSkill } from "@/features/portfolio/types";

type PortfolioSkillCardProps = {
  skill: PortfolioSkill;
};

export function PortfolioSkillCard({ skill }: PortfolioSkillCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold">{skill.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {skill.category} - {skill.level}
      </p>
    </article>
  );
}
