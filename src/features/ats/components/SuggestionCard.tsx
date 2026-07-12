"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import type { ATSSuggestion } from "@/features/ats/types";

type SuggestionCardProps = {
  suggestion: ATSSuggestion;
};

const iconMap = {
  critical: AlertTriangle,
  warning: Info,
  improvement: CheckCircle2,
} satisfies Record<ATSSuggestion["severity"], typeof AlertTriangle>;

const badgeVariant = {
  critical: "destructive",
  warning: "warning",
  improvement: "success",
} as const;

function SuggestionCardComponent({ suggestion }: SuggestionCardProps) {
  const Icon = iconMap[suggestion.severity];

  return (
    <article className="workspace-card rounded-2xl p-4 transition-colors hover:border-primary/20">
      <div className="flex gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold">{suggestion.title}</h3>
            <Badge variant={badgeVariant[suggestion.severity]}>{suggestion.severity}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{suggestion.description}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {suggestion.actionItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-primary">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export const SuggestionCard = memo(SuggestionCardComponent);
