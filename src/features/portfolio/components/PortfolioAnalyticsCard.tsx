import { BarChart3 } from "lucide-react";

import type { PortfolioAnalytics } from "@/features/portfolio/types";

type PortfolioAnalyticsCardProps = {
  analytics: PortfolioAnalytics | null;
};

export function PortfolioAnalyticsCard({ analytics }: PortfolioAnalyticsCardProps) {
  const stats = [
    { label: "Views", value: analytics?.views ?? 0 },
    { label: "Visitors", value: analytics?.uniqueVisitors ?? 0 },
    { label: "Contact Clicks", value: analytics?.contactClicks ?? 0 },
    { label: "Resume Downloads", value: analytics?.resumeDownloads ?? 0 },
  ];

  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Analytics</h2>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-muted/20 p-4">
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
