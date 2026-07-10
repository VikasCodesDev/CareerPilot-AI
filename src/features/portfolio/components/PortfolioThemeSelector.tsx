import { Palette } from "lucide-react";

import { PORTFOLIO_THEMES } from "@/features/portfolio/constants";
import type { PortfolioTheme } from "@/features/portfolio/types";
import { cn } from "@/lib/utils";

type PortfolioThemeSelectorProps = {
  value: PortfolioTheme | null;
};

export function PortfolioThemeSelector({ value }: PortfolioThemeSelectorProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Palette className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Theme Selection</h2>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {PORTFOLIO_THEMES.map((theme) => (
          <span
            key={theme}
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              value === theme
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-muted/20 text-muted-foreground"
            )}
          >
            {theme}
          </span>
        ))}
      </div>
    </section>
  );
}
