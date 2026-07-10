import { Layers3 } from "lucide-react";

import type { PortfolioSection } from "@/features/portfolio/types";

type PortfolioSectionEditorProps = {
  sections: PortfolioSection[];
};

export function PortfolioSectionEditor({ sections }: PortfolioSectionEditorProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Layers3 className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Sections</h2>
      </div>
      <div className="mt-5 space-y-3">
        {sections.length > 0 ? (
          sections.map((section) => (
            <article key={section.id} className="rounded-2xl border border-border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold">{section.title}</h3>
                <span className="text-xs text-muted-foreground">{section.enabled ? "Enabled" : "Hidden"}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{section.content}</p>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No portfolio sections created yet.</p>
        )}
      </div>
    </section>
  );
}
