import { Mail } from "lucide-react";

import type { PortfolioSettings } from "@/features/portfolio/types";

type PortfolioContactCardProps = {
  settings: PortfolioSettings | null;
};

export function PortfolioContactCard({ settings }: PortfolioContactCardProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Mail className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Contact</h2>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{settings?.contactEmail ?? "No contact email added."}</p>
      <p className="mt-1 text-sm text-muted-foreground">{settings?.location ?? "No location added."}</p>
    </section>
  );
}
