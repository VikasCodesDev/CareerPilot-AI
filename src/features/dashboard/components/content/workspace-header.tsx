"use client";

import { type ReactNode, memo } from "react";

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
    <header className={cn("space-y-4", className)}>
      {breadcrumbs.length > 0 ? <Breadcrumb items={breadcrumbs} /> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}

export const WorkspaceHeader = memo(WorkspaceHeaderComponent);
