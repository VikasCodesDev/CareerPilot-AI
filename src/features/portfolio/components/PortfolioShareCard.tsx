import { Share2 } from "lucide-react";

import type { Portfolio } from "@/features/portfolio/types";

type PortfolioShareCardProps = {
  portfolio: Portfolio | null;
};

export function PortfolioShareCard({ portfolio }: PortfolioShareCardProps) {
  const sharePath = portfolio ? `/portfolio/${portfolio.slug}` : "Not available";

  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Share2 className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Share</h2>
      </div>
      <p className="mt-4 rounded-2xl border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
        {sharePath}
      </p>
    </section>
  );
}
