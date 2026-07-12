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
        "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-5 py-2 text-sm font-semibold backdrop-blur-sm text-primary shadow-[0_0_20px_rgba(139,92,246,0.12)]",
        className
      )}
      role="status"
      aria-label={label}
    >
      <Sparkles className="size-3.5 text-primary animate-pulse" aria-hidden="true" />
      <span className="tracking-wide">{label}</span>
    </div>
  );
}
