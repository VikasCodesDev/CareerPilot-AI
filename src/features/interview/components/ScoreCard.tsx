import { Activity } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type ScoreCardProps = {
  label: string;
  value: number;
};

export function ScoreCard({ label, value }: ScoreCardProps) {
  return (
    <article className="workspace-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Activity className="size-4" aria-hidden="true" />
        </div>
        <span className="text-2xl font-bold tabular-nums text-gradient">{value}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{label}</p>
      <Progress value={value} className="mt-3" />
    </article>
  );
}
