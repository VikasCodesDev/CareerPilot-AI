import { ExternalLink } from "lucide-react";

import type { Portfolio } from "@/features/portfolio/types";
import { mapThemeToClass } from "@/features/portfolio/utils/theme-mapper";

type PortfolioPreviewProps = {
  portfolio: Portfolio | null;
};

export function PortfolioPreview({ portfolio }: PortfolioPreviewProps) {
  const themeClass = portfolio ? mapThemeToClass(portfolio.theme) : "from-zinc-950 to-slate-900";
  const hero = portfolio?.sections.find((section) => section.type === "Hero");
  const about = portfolio?.sections.find((section) => section.type === "About");

  return (
    <section className="surface-card overflow-hidden p-0">
      <div className={`bg-gradient-to-br ${themeClass} p-6 sm:p-8`}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-widest text-white/60">Portfolio Preview</p>
          <ExternalLink className="size-4 text-white/60" aria-hidden="true" />
        </div>
        <h2 className="mt-8 text-3xl font-semibold text-white">
          {hero?.content ?? portfolio?.title ?? "Your Portfolio"}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          {about?.content ?? "Create a portfolio to preview your personal brand."}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {(portfolio?.skills ?? []).slice(0, 6).map((skill) => (
            <span key={skill.id} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
