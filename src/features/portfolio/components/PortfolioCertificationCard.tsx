import { ShieldCheck } from "lucide-react";

import type { PortfolioCertification } from "@/features/portfolio/types";

type PortfolioCertificationCardProps = {
  certification: PortfolioCertification;
};

export function PortfolioCertificationCard({ certification }: PortfolioCertificationCardProps) {
  return (
    <article className="workspace-card p-4 transition-colors hover:border-primary/20">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <ShieldCheck className="size-4" aria-hidden="true" />
      </div>
      <h3 className="mt-3 text-sm font-semibold">{certification.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{certification.issuer}</p>
    </article>
  );
}
