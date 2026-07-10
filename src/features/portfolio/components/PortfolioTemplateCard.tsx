import { LayoutTemplate } from "lucide-react";

import type { PortfolioTemplate } from "@/features/portfolio/types";

type PortfolioTemplateCardProps = {
  template: PortfolioTemplate;
};

export function PortfolioTemplateCard({ template }: PortfolioTemplateCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4 transition hover:border-primary/40">
      <div className="flex items-start gap-3">
        <LayoutTemplate className="mt-0.5 size-5 text-primary" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-semibold">{template.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
          <p className="mt-3 text-xs text-primary">{template.theme}</p>
        </div>
      </div>
    </article>
  );
}
