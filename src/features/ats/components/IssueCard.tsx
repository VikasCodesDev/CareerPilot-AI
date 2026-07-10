"use client";

import { memo } from "react";

type IssueCardProps = {
  title: string;
  items: string[];
  tone: "critical" | "warning" | "success";
};

const toneClasses: Record<IssueCardProps["tone"], string> = {
  critical: "border-destructive/30 bg-destructive/10",
  warning: "border-warning/30 bg-warning/10",
  success: "border-success/30 bg-success/10",
};

function IssueCardComponent({ title, items, tone }: IssueCardProps) {
  return (
    <article className={`rounded-xl border p-4 ${toneClasses[tone]}`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.length > 0 ? items.map((item) => <li key={item}>- {item}</li>) : <li>None</li>}
      </ul>
    </article>
  );
}

export const IssueCard = memo(IssueCardComponent);
