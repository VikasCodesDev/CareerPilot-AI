"use client";

import { Bell } from "lucide-react";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationButtonProps = {
  count?: number;
  className?: string;
};

function NotificationButtonComponent({
  count = 3,
  className,
}: NotificationButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative hover:bg-white/[0.05]", className)}
      aria-label={`Notifications${count > 0 ? `, ${count} unread` : ""}`}
    >
      <Bell className="size-4" aria-hidden="true" />
      {count > 0 ? (
        <span
          className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[0.625rem] font-semibold text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]"
          aria-hidden="true"
        >
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Button>
  );
}

export const NotificationButton = memo(NotificationButtonComponent);
