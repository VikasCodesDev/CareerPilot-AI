import { Trophy } from "lucide-react";

import type { PortfolioAchievement } from "@/features/portfolio/types";

type PortfolioAchievementCardProps = {
  achievement: PortfolioAchievement;
};

export function PortfolioAchievementCard({ achievement }: PortfolioAchievementCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <Trophy className="size-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold">{achievement.title}</h3>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{achievement.description}</p>
    </article>
  );
}
