"use client";

import { type ReactNode, memo } from "react";
import { motion } from "framer-motion";

import { cardHover, dashboardTransition } from "@/features/dashboard/lib/motion";
import { cn } from "@/lib/utils";

type WidgetContainerProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  span?: "default" | "wide" | "full";
};

function WidgetContainerComponent({
  title,
  description,
  action,
  children,
  className,
  span = "default",
}: WidgetContainerProps) {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      transition={dashboardTransition}
      className={cn(
        "surface-card flex flex-col overflow-hidden",
        span === "wide" && "md:col-span-2",
        span === "full" && "md:col-span-2 xl:col-span-3",
        className
      )}
    >
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </header>
      <div className="flex flex-1 flex-col p-5">{children}</div>
    </motion.article>
  );
}

export const WidgetContainer = memo(WidgetContainerComponent);
