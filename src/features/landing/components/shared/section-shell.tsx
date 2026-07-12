import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = Readonly<{
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "muted" | "aurora";
}>;

export function SectionShell({
  id,
  children,
  className,
  containerClassName,
  variant = "default",
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative py-20 md:py-28",
        variant === "muted" && "bg-zinc-950/40",
        variant === "aurora" && "aurora-bg",
        className
      )}
    >
      {/* Subtle section separator line at top for muted sections */}
      {variant === "muted" && (
        <div
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
