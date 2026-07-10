import { RadioTower } from "lucide-react";

import type { Portfolio } from "@/features/portfolio/types";

type PortfolioPublishCardProps = {
  portfolio: Portfolio | null;
};

export function PortfolioPublishCard({ portfolio }: PortfolioPublishCardProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <RadioTower className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Publish Status</h2>
      </div>
      <p className="mt-5 text-3xl font-semibold capitalize">{portfolio?.publishStatus ?? "draft"}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {portfolio?.publishedAt ? `Published ${new Date(portfolio.publishedAt).toLocaleDateString()}` : "Not published yet."}
      </p>
    </section>
  );
}
