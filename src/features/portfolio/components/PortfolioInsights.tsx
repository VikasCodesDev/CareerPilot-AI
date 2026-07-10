import { Sparkles } from "lucide-react";

type PortfolioInsightsProps = {
  completion: number;
  seoScore: number;
};

export function PortfolioInsights({ completion, seoScore }: PortfolioInsightsProps) {
  const insights = [
    completion < 80 ? "Add more profile sections to improve completion." : "Profile completion is strong.",
    seoScore < 70 ? "Improve SEO title, description, and keywords before publishing." : "SEO foundation is publish-ready.",
    "Future AI writing can plug into this deterministic content structure.",
  ];

  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Sparkles className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Insights</h2>
      </div>
      <div className="mt-5 space-y-3">
        {insights.map((insight) => (
          <p key={insight} className="rounded-2xl border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
            {insight}
          </p>
        ))}
      </div>
    </section>
  );
}
