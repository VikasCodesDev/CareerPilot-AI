import { Eye } from "lucide-react";

import type { Portfolio } from "@/features/portfolio/types";

type PortfolioVisibilityCardProps = {
  portfolio: Portfolio | null;
};

export function PortfolioVisibilityCard({ portfolio }: PortfolioVisibilityCardProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Eye className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Visibility</h2>
      </div>
      <p className="mt-5 text-3xl font-semibold capitalize">{portfolio?.visibility ?? "private"}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Public exposure remains dashboard-controlled until public portfolio routes are enabled.
      </p>
    </section>
  );
}
