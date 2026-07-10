import { History } from "lucide-react";

import type { PortfolioVersion } from "@/features/portfolio/types";

type PortfolioVersionHistoryProps = {
  versions: PortfolioVersion[];
};

export function PortfolioVersionHistory({ versions }: PortfolioVersionHistoryProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <History className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Version History</h2>
      </div>
      <div className="mt-5 space-y-3">
        {versions.length > 0 ? (
          versions.map((version) => (
            <article key={version.id} className="rounded-2xl border border-border bg-muted/20 p-4">
              <h3 className="text-sm font-semibold">{version.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{version.snapshotSummary}</p>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No saved versions yet.</p>
        )}
      </div>
    </section>
  );
}
