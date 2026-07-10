"use client";

import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { NotificationButton } from "@/features/dashboard/components/navigation/notification-button";
import { SearchBar } from "@/features/dashboard/components/navigation/search-bar";
import { UserProfileDropdown } from "@/features/dashboard/components/navigation/user-profile-dropdown";
import { cn } from "@/lib/utils";

type DashboardTopbarProps = {
  onOpenMobileNav: () => void;
  onOpenCommandPalette: () => void;
  className?: string;
};

function DashboardTopbarComponent({
  onOpenMobileNav,
  onOpenCommandPalette,
  className,
}: DashboardTopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--z-sticky)] flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:gap-4 sm:px-6",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMobileNav}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" aria-hidden="true" />
      </Button>

      <Link
        href="/dashboard"
        className="flex items-center gap-2 no-underline lg:hidden"
        aria-label="CareerPilot dashboard"
      >
        <div className="flex size-8 items-center justify-center rounded-lg gradient-primary">
          <Zap className="size-4 text-primary-foreground" aria-hidden="true" />
        </div>
      </Link>

      <SearchBar
        onFocus={onOpenCommandPalette}
        className="hidden flex-1 sm:block"
      />

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden gap-2 sm:inline-flex"
          onClick={onOpenCommandPalette}
          aria-label="Open command palette"
        >
          <span className="text-muted-foreground">Command</span>
          <kbd className="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[0.65rem] font-medium">
            ⌘K
          </kbd>
        </Button>
        <NotificationButton />
        <UserProfileDropdown />
      </div>
    </header>
  );
}

export const DashboardTopbar = memo(DashboardTopbarComponent);
