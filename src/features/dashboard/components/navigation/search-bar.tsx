"use client";

import { Search } from "lucide-react";
import { memo } from "react";

import { cn } from "@/lib/utils";

type SearchBarProps = {
  onFocus?: () => void;
  className?: string;
  placeholder?: string;
};

function SearchBarComponent({
  onFocus,
  className,
  placeholder = "Search workspace…",
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <label htmlFor="dashboard-search" className="sr-only">
        Search dashboard
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="dashboard-search"
        type="search"
        readOnly
        onFocus={onFocus}
        placeholder={placeholder}
        className="workspace-input focus-ring h-10 w-full cursor-pointer pr-14 pl-10"
        aria-label="Search dashboard"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 items-center gap-0.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground sm:inline-flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent);
