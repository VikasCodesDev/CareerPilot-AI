"use client";

import { memo } from "react";

import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

function SkeletonBlock({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-muted/60",
        className
      )}
      aria-hidden="true"
    />
  );
}

function WidgetSkeletonComponent({ className }: SkeletonProps) {
  return (
    <div
      className={cn("surface-card overflow-hidden", className)}
      role="status"
      aria-label="Loading widget"
    >
      <div className="border-b border-border px-5 py-4">
        <SkeletonBlock className="h-4 w-1/3" />
        <SkeletonBlock className="mt-2 h-3 w-1/2" />
      </div>
      <div className="space-y-3 p-5">
        <SkeletonBlock className="h-24 w-full" />
        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-4/5" />
      </div>
    </div>
  );
}

function DashboardGridSkeletonComponent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <WidgetSkeleton key={index} />
      ))}
    </div>
  );
}

function SidebarSkeletonComponent() {
  return (
    <div className="space-y-2 px-3" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonBlock key={index} className="h-10 w-full rounded-xl" />
      ))}
    </div>
  );
}

function HeaderSkeletonComponent() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <SkeletonBlock className="h-8 w-48" />
      <SkeletonBlock className="h-4 w-72" />
    </div>
  );
}

export const WidgetSkeleton = memo(WidgetSkeletonComponent);
export const DashboardGridSkeleton = memo(DashboardGridSkeletonComponent);
export const SidebarSkeleton = memo(SidebarSkeletonComponent);
export const HeaderSkeleton = memo(HeaderSkeletonComponent);
