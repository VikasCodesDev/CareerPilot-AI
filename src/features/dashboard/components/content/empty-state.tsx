"use client";

import { type LucideIcon } from "lucide-react";
import { type ReactNode, memo } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

function EmptyStateComponent({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center",
        className
      )}
      role="status"
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted/60">
        <Icon className="size-7 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export const EmptyState = memo(EmptyStateComponent);

export function EmptyStateAction({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button variant="outline" onClick={onClick}>
      {label}
    </Button>
  );
}
