"use client";

import { memo } from "react";

import { Badge } from "@/components/ui/badge";

type IssueCardProps = {
  title: string;
  items: string[];
  tone: "critical" | "warning" | "success";
};

const toneClasses: Record<IssueCardProps["tone"], string> = {
  critical: "border-destructive/25 bg-destructive/[0.06]",
  warning: "border-warning/25 bg-warning/[0.06]",
  success: "border-success/25 bg-success/[0.06]",
};

const badgeVariant = {
  critical: "destructive",
  warning: "warning",
  success: "success",
} as const;

function IssueCardComponent({ title, items, tone }: IssueCardProps) {
  return (
    <article className={`workspace-card rounded-2xl p-4 ${toneClasses[tone]}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Badge variant={badgeVariant[tone]}>{items.length}</Badge>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item} className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
              {item}
            </li>
          ))
        ) : (
          <li className="text-xs">None</li>
        )}
      </ul>
    </article>
  );
}

export const IssueCard = memo(IssueCardComponent);
