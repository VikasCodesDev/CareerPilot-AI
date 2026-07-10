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
      className={cn("relative", className)}
      aria-label={`Notifications${count > 0 ? `, ${count} unread` : ""}`}
    >
      <Bell className="size-4" aria-hidden="true" />
      {count > 0 ? (
        <span
          className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[0.625rem] font-semibold text-primary-foreground"
          aria-hidden="true"
        >
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Button>
  );
}

export const NotificationButton = memo(NotificationButtonComponent);
