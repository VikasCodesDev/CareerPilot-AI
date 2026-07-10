"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { memo, useCallback, useEffect } from "react";

import {
  COMMAND_PALETTE_ACTIONS,
  COMMAND_PALETTE_ITEMS,
} from "@/features/dashboard/config/dashboard-nav";
import { dropdownVariants, dashboardTransition } from "@/features/dashboard/lib/motion";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

function CommandPaletteComponent({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const handleSelect = useCallback(
    (value: string) => {
      const navItem = COMMAND_PALETTE_ITEMS.find((item) => item.id === value);
      if (navItem) {
        router.push(navItem.href);
        onClose();
        return;
      }

      if (value === "settings") {
        router.push("/dashboard/settings");
        onClose();
      }
    },
    [router, onClose]
  );

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={dashboardTransition}
            className="fixed inset-0 z-[var(--z-modal)] bg-background/70 backdrop-blur-sm"
            aria-label="Close command palette"
            onClick={onClose}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={dashboardTransition}
            className="fixed top-[12%] left-1/2 z-[calc(var(--z-modal)+1)] w-[min(calc(100%-2rem),36rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <Command
              label="Command palette"
              className="flex flex-col"
              loop
            >
              <div className="flex items-center gap-2 border-b border-border px-4">
                <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <Command.Input
                  placeholder="Search sections, actions…"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-muted-foreground sm:inline">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-subtle">
                <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {COMMAND_PALETTE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Command.Item
                        key={item.id}
                        value={item.id}
                        keywords={[item.label]}
                        onSelect={handleSelect}
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm aria-selected:bg-muted"
                      >
                        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                        {item.label}
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group
                  heading="Account"
                  className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {COMMAND_PALETTE_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Command.Item
                        key={action.id}
                        value={action.id}
                        keywords={[action.label]}
                        onSelect={handleSelect}
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm aria-selected:bg-muted"
                      >
                        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                        {action.label}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export const CommandPalette = memo(CommandPaletteComponent);
