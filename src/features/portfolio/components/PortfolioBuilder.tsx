import { WandSparkles } from "lucide-react";

import type { Portfolio, PortfolioTemplate } from "@/features/portfolio/types";
import { PortfolioSectionEditor } from "./PortfolioSectionEditor";
import { PortfolioTemplateCard } from "./PortfolioTemplateCard";
import { PortfolioThemeSelector } from "./PortfolioThemeSelector";

type PortfolioBuilderProps = {
  portfolio: Portfolio | null;
  templates: PortfolioTemplate[];
};

export function PortfolioBuilder({ portfolio, templates }: PortfolioBuilderProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <WandSparkles className="size-5 text-primary" aria-hidden="true" />
        <div>
          <h2 className="text-xl font-semibold">Portfolio Builder</h2>
          <p className="text-sm text-muted-foreground">
            Deterministic structure today, ready for future AI writing extensions.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
        <PortfolioSectionEditor sections={portfolio?.sections ?? []} />
        <div className="space-y-4">
          <PortfolioThemeSelector value={portfolio?.theme ?? null} />
          <section className="space-y-3">
            {templates.slice(0, 3).map((template) => (
              <PortfolioTemplateCard key={template.id} template={template} />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}
