import { Trophy } from "lucide-react";

import type { PortfolioAchievement } from "@/features/portfolio/types";

type PortfolioAchievementCardProps = {
  achievement: PortfolioAchievement;
};

export function PortfolioAchievementCard({ achievement }: PortfolioAchievementCardProps) {
  return (
    <article className="workspace-card p-4 transition-colors hover:border-primary/20">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Trophy className="size-4" aria-hidden="true" />
      </div>
      <h3 className="mt-3 text-sm font-semibold">{achievement.title}</h3>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{achievement.description}</p>
    </article>
  );
}
