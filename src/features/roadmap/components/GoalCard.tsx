import { Target } from "lucide-react";

type GoalCardProps = {
  label: string;
  title: string;
  meta: string;
};

export function GoalCard({ label, title, meta }: GoalCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card/60 p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-primary">
        <Target className="size-4" aria-hidden="true" />
        {label}
      </div>
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
    </article>
  );
}
