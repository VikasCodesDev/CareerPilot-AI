"use client";

import { type ReactNode, memo } from "react";
import { motion } from "framer-motion";

import { Breadcrumb } from "@/features/dashboard/components/navigation/breadcrumb";
import type { DashboardBreadcrumbItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type WorkspaceHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: DashboardBreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
};

function WorkspaceHeaderComponent({
  title,
  description,
  breadcrumbs = [],
  actions,
  className,
}: WorkspaceHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn("space-y-4", className)}
    >
      {breadcrumbs.length > 0 ? <Breadcrumb items={breadcrumbs} /> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-glow sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </motion.header>
  );
}

export const WorkspaceHeader = memo(WorkspaceHeaderComponent);
