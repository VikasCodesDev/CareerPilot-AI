"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { DUMMY_USER } from "@/features/dashboard/config/dashboard-nav";
import { dropdownVariants, dashboardTransition } from "@/features/dashboard/lib/motion";
import { cn } from "@/lib/utils";

type UserProfileDropdownProps = {
  className?: string;
};

function UserProfileDropdownComponent({ className }: UserProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 pr-2 pl-1.5"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={toggle}
      >
        <span
          className="flex size-7 items-center justify-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground"
          aria-hidden="true"
        >
          {DUMMY_USER.initials}
        </span>
        <span className="hidden max-w-[7rem] truncate text-left sm:block">
          <span className="block text-sm leading-tight font-medium">
            {DUMMY_USER.name}
          </span>
          <span className="block text-xs text-muted-foreground">
            {DUMMY_USER.role}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            aria-label="User menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={dashboardTransition}
            className="absolute top-[calc(100%+0.5rem)] right-0 z-[var(--z-overlay)] w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
          >
            <div className="border-b border-border px-3 py-2.5">
              <p className="text-sm font-medium">{DUMMY_USER.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {DUMMY_USER.email}
              </p>
            </div>
            <div className="py-1">
              <Link
                href="/dashboard/settings"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground no-underline transition-colors hover:bg-muted"
                onClick={close}
              >
                <User className="size-4 text-muted-foreground" aria-hidden="true" />
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground no-underline transition-colors hover:bg-muted"
                onClick={close}
              >
                <Settings
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                Settings
              </Link>
            </div>
            <div className="border-t border-border py-1">
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={close}
              >
                <LogOut className="size-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export const UserProfileDropdown = memo(UserProfileDropdownComponent);
