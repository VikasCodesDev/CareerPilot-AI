import { Activity } from "lucide-react";

type ScoreCardProps = {
  label: string;
  value: number;
};

export function ScoreCard({ label, value }: ScoreCardProps) {
  return (
    <article className="surface-card p-5">
      <div className="flex items-center justify-between gap-3">
        <Activity className="size-5 text-primary" aria-hidden="true" />
        <span className="text-2xl font-semibold">{value}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </article>
  );
}
