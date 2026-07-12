"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { motion } from "framer-motion";

import type { DashboardNavItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type SidebarNavItemProps = {
  item: DashboardNavItem;
  collapsed?: boolean;
  onNavigate?: () => void;
};

function SidebarNavItemComponent({
  item,
  collapsed = false,
  onNavigate,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-primary/15 to-accent/5 text-white shadow-[0_0_24px_rgba(139,92,246,0.12)]"
          : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-100"
      )}
    >
      {isActive ? (
        <motion.span
          layoutId="sidebar-active-indicator"
          className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_8px_rgba(139,92,246,0.6)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : null}
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
          isActive
            ? "border-primary/25 bg-primary/10 text-primary shadow-[0_0_12px_rgba(139,92,246,0.2)]"
            : "border-transparent bg-white/[0.02] text-zinc-600 group-hover:border-white/[0.06] group-hover:text-zinc-300"
        )}
      >
        <Icon className="size-[1.05rem]" aria-hidden="true" />
      </span>
      {!collapsed ? (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge ? (
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[0.625rem] font-bold text-primary shadow-[0_0_10px_rgba(139,92,246,0.15)]">
              {item.badge}
            </span>
          ) : null}
        </>
      ) : null}
    </Link>
  );
}

export const SidebarNavItem = memo(SidebarNavItemComponent);
