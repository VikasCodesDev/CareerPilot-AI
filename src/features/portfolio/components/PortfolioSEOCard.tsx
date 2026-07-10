import { SearchCheck } from "lucide-react";

import type { PortfolioSEO } from "@/features/portfolio/types";

type PortfolioSEOCardProps = {
  seo: PortfolioSEO | null;
};

export function PortfolioSEOCard({ seo }: PortfolioSEOCardProps) {
  const score = seo?.score ?? 0;

  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <SearchCheck className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">SEO</h2>
      </div>
      <p className="mt-5 text-4xl font-semibold">{score}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {seo?.description ?? "Create a portfolio to generate deterministic metadata."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(seo?.keywords ?? []).slice(0, 6).map((keyword) => (
          <span key={keyword} className="rounded-full border border-border bg-muted/20 px-3 py-1 text-xs">
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}
