"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

import type { DashboardBreadcrumbItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type BreadcrumbProps = {
  items: DashboardBreadcrumbItem[];
  className?: string;
};

function BreadcrumbComponent({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dashboard home"
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Dashboard</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight
                className="size-3.5 text-muted-foreground/60"
                aria-hidden="true"
              />
              {isLast || !item.href ? (
                <span
                  className="font-medium text-foreground"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="rounded-md px-1.5 py-0.5 text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const Breadcrumb = memo(BreadcrumbComponent);
