"use client";

import { type ReactNode, memo } from "react";

import { CommandPalette } from "@/features/dashboard/components/command-palette/command-palette";
import { DashboardSidebar } from "@/features/dashboard/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/features/dashboard/components/layout/dashboard-topbar";
import { MobileNavDrawer } from "@/features/dashboard/components/layout/mobile-nav-drawer";
import { useCommandPalette } from "@/features/dashboard/hooks/use-command-palette";
import { useMobileNav } from "@/features/dashboard/hooks/use-mobile-nav";
import { useSidebarState } from "@/features/dashboard/hooks/use-sidebar-state";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayoutComponent({ children }: DashboardLayoutProps) {
  const { collapsed, toggleCollapsed } = useSidebarState();
  const { open: mobileOpen, openNav, closeNav } = useMobileNav();
  const { open: paletteOpen, openPalette, closePalette } = useCommandPalette();

  return (
    <div className="workspace-shell flex min-h-screen">
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to dashboard content
      </a>

      <DashboardSidebar
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
      />

      <MobileNavDrawer open={mobileOpen} onClose={closeNav} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/[0.04] to-transparent"
          aria-hidden="true"
        />
        <DashboardTopbar
          onOpenMobileNav={openNav}
          onOpenCommandPalette={openPalette}
        />

        <main
          id="dashboard-main"
          className="scrollbar-subtle relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export const DashboardLayout = memo(DashboardLayoutComponent);
