"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { memo } from "react";

import type { ATSSuggestion } from "@/features/ats/types";

type SuggestionCardProps = {
  suggestion: ATSSuggestion;
};

const iconMap = {
  critical: AlertTriangle,
  warning: Info,
  improvement: CheckCircle2,
} satisfies Record<ATSSuggestion["severity"], typeof AlertTriangle>;

function SuggestionCardComponent({ suggestion }: SuggestionCardProps) {
  const Icon = iconMap[suggestion.severity];

  return (
    <article className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="flex gap-3">
        <Icon className="mt-0.5 size-4 text-primary" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-semibold">{suggestion.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{suggestion.description}</p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {suggestion.actionItems.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export const SuggestionCard = memo(SuggestionCardComponent);
