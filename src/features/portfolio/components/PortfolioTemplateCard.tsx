import { LayoutTemplate } from "lucide-react";

import type { PortfolioTemplate } from "@/features/portfolio/types";

type PortfolioTemplateCardProps = {
  template: PortfolioTemplate;
};

export function PortfolioTemplateCard({ template }: PortfolioTemplateCardProps) {
  return (
    <article className="workspace-card p-4 transition-colors hover:border-primary/20">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <LayoutTemplate className="size-4" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{template.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
          <p className="mt-3 text-xs font-medium text-primary">{template.theme}</p>
        </div>
      </div>
    </article>
  );
}
