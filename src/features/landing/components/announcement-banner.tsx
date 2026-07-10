import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ANNOUNCEMENT } from "@/features/landing/config/landing-content";

export function AnnouncementBanner() {
  return (
    <div
      className="relative z-40 border-b border-border bg-surface/80 backdrop-blur-sm"
      role="region"
      aria-label="Announcement"
    >
      <div className="container-page flex items-center justify-center gap-2 py-2.5 text-sm">
        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
          {ANNOUNCEMENT.label}
        </span>
        <span className="text-muted-foreground">{ANNOUNCEMENT.message}</span>
        <Link
          href={ANNOUNCEMENT.href}
          className="inline-flex items-center gap-1 font-medium text-primary no-underline hover:text-primary/80"
        >
          {ANNOUNCEMENT.linkText}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
