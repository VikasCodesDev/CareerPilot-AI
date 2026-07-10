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
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition-colors",
        isActive
          ? "bg-primary/12 text-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      {isActive ? (
        <motion.span
          layoutId="sidebar-active-indicator"
          className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : null}
      <Icon
        className={cn(
          "size-[1.125rem] shrink-0",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}
        aria-hidden="true"
      />
      {!collapsed ? (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge ? (
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[0.625rem] font-semibold text-primary">
              {item.badge}
            </span>
          ) : null}
        </>
      ) : null}
    </Link>
  );
}

export const SidebarNavItem = memo(SidebarNavItemComponent);
