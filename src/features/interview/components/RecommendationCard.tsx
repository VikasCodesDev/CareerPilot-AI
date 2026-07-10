import { Lightbulb } from "lucide-react";

type RecommendationCardProps = {
  recommendation: string;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <div className="flex items-start gap-3">
        <Lightbulb className="mt-0.5 size-4 text-primary" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">{recommendation}</p>
      </div>
    </article>
  );
}
