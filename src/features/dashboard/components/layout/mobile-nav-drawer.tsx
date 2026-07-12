"use client";

import { X, Zap } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV_ITEMS } from "@/features/dashboard/config/dashboard-nav";
import { SidebarNavItem } from "@/features/dashboard/components/navigation/sidebar-nav-item";
import {
  drawerVariants,
  overlayVariants,
  dashboardTransition,
} from "@/features/dashboard/lib/motion";

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function MobileNavDrawerComponent({ open, onClose }: MobileNavDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={dashboardTransition}
            className="fixed inset-0 z-[var(--z-overlay)] bg-black/60 backdrop-blur-sm lg:hidden"
            aria-label="Close navigation menu"
            onClick={onClose}
          />
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={dashboardTransition}
            className="workspace-sidebar-glow fixed inset-y-0 left-0 z-[calc(var(--z-overlay)+1)] flex w-[min(100%,18rem)] flex-col border-r border-white/[0.06] bg-zinc-950/95 shadow-2xl backdrop-blur-2xl lg:hidden"
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-bold no-underline"
                onClick={onClose}
              >
                <span className="flex size-8 items-center justify-center rounded-xl gradient-primary">
                  <Zap className="size-4 text-primary-foreground" aria-hidden="true" />
                </span>
                CareerPilot
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <X className="size-5" aria-hidden="true" />
              </Button>
            </div>
            <nav className="scrollbar-subtle flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1" role="list">
                {DASHBOARD_NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <SidebarNavItem item={item} onNavigate={onClose} />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export const MobileNavDrawer = memo(MobileNavDrawerComponent);
