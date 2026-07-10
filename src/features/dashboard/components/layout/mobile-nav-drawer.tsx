"use client";

import { X } from "lucide-react";
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
            className="fixed inset-0 z-[var(--z-overlay)] bg-background/70 backdrop-blur-sm lg:hidden"
            aria-label="Close navigation menu"
            onClick={onClose}
          />
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={dashboardTransition}
            className="fixed inset-y-0 left-0 z-[calc(var(--z-overlay)+1)] flex w-[min(100%,18rem)] flex-col border-r border-sidebar-border bg-sidebar shadow-xl lg:hidden"
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
              <Link
                href="/dashboard"
                className="text-sm font-bold no-underline"
                onClick={onClose}
              >
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
