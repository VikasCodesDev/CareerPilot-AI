import { Link2 } from "lucide-react";

import type { PortfolioSettings } from "@/features/portfolio/types";

type PortfolioSocialLinksProps = {
  settings: PortfolioSettings | null;
};

export function PortfolioSocialLinks({ settings }: PortfolioSocialLinksProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Link2 className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Social Links</h2>
      </div>
      <div className="mt-4 space-y-2">
        {(settings?.socialLinks ?? []).length > 0 ? (
          settings?.socialLinks.map((link) => (
            <p key={`${link.label}-${link.url}`} className="text-sm text-muted-foreground">
              {link.label}: {link.url}
            </p>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No social links added.</p>
        )}
      </div>
    </section>
  );
}
