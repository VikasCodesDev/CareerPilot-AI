"use client";

import { PanelLeftClose, PanelLeftOpen, Zap } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV_ITEMS } from "@/features/dashboard/config/dashboard-nav";
import { SidebarNavItem } from "@/features/dashboard/components/navigation/sidebar-nav-item";
import { sidebarVariants, dashboardTransition } from "@/features/dashboard/lib/motion";
import { cn } from "@/lib/utils";

type DashboardSidebarProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onNavigate?: () => void;
  className?: string;
};

function DashboardSidebarComponent({
  collapsed,
  onToggleCollapsed,
  onNavigate,
  className,
}: DashboardSidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={dashboardTransition}
      className={cn(
        "hidden h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl lg:flex",
        className
      )}
      aria-label="Dashboard sidebar"
    >
      <div className="flex h-16 items-center justify-between gap-2 border-b border-sidebar-border px-4">
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center gap-2.5 no-underline"
          aria-label="CareerPilot dashboard home"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
            <Zap className="size-4 text-primary-foreground" aria-hidden="true" />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight">CareerPilot</p>
              <p className="truncate text-[0.65rem] text-muted-foreground">Workspace</p>
            </div>
          ) : null}
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="shrink-0"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      <nav className="scrollbar-subtle flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1" role="list">
          {DASHBOARD_NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <SidebarNavItem
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed ? (
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold">Pro Workspace</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Unlock advanced AI agents and analytics.
            </p>
            <Button size="sm" className="mt-3 w-full">
              Upgrade
            </Button>
          </div>
        </div>
      ) : null}
    </motion.aside>
  );
}

export const DashboardSidebar = memo(DashboardSidebarComponent);
