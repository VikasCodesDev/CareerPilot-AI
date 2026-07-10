import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type AiBadgeProps = Readonly<{
  label: string;
  className?: string;
}>;

export function AiBadge({ label, className }: AiBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm font-medium backdrop-blur-sm",
        className
      )}
      role="status"
      aria-label={label}
    >
      <Sparkles className="size-4 text-primary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
