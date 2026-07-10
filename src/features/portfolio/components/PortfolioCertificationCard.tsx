import { ShieldCheck } from "lucide-react";

import type { PortfolioCertification } from "@/features/portfolio/types";

type PortfolioCertificationCardProps = {
  certification: PortfolioCertification;
};

export function PortfolioCertificationCard({ certification }: PortfolioCertificationCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold">{certification.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{certification.issuer}</p>
    </article>
  );
}
