"use client";

import { PanelLeftClose, PanelLeftOpen, Sparkles, Zap } from "lucide-react";
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
        "workspace-sidebar-glow hidden h-full shrink-0 flex-col border-r border-white/[0.06] bg-zinc-950/85 backdrop-blur-2xl lg:flex",
        className
      )}
      aria-label="Dashboard sidebar"
    >
      <div className="relative flex h-16 items-center justify-between gap-2 border-b border-white/[0.06] px-4">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          aria-hidden="true"
        />
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center gap-2.5 no-underline"
          aria-label="CareerPilot dashboard home"
        >
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl gradient-primary shadow-[0_0_20px_rgba(139,92,246,0.35)]">
            <Zap className="size-4 text-primary-foreground" aria-hidden="true" />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight">CareerPilot</p>
              <p className="truncate text-[0.65rem] text-muted-foreground">AI Workspace</p>
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

      <nav className="scrollbar-subtle flex-1 overflow-y-auto px-3 py-5">
        {!collapsed ? (
          <p className="mb-3 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
            Workspace
          </p>
        ) : null}
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
        <div className="border-t border-white/[0.06] p-4">
          <div className="workspace-card relative overflow-hidden rounded-2xl p-4">
            <div
              className="pointer-events-none absolute -top-6 -right-6 size-24 rounded-full bg-primary/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-2">
              <Sparkles className="size-4 text-primary" aria-hidden="true" />
              <p className="text-xs font-semibold">Pro Workspace</p>
            </div>
            <p className="relative mt-1.5 text-xs leading-5 text-muted-foreground">
              Unlock advanced AI agents, analytics, and priority orchestration.
            </p>
            <Button size="sm" className="relative mt-3 w-full">
              Upgrade
            </Button>
          </div>
        </div>
      ) : null}
    </motion.aside>
  );
}

export const DashboardSidebar = memo(DashboardSidebarComponent);
