import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { ANNOUNCEMENT } from "@/features/landing/config/landing-content";

export function AnnouncementBanner() {
  return (
    <div
      className="relative z-40 border-b border-white/[0.04] bg-zinc-950/60 backdrop-blur-xl"
      role="region"
      aria-label="Announcement"
    >
      {/* Gradient shimmer bar at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />

      <div className="container-page flex items-center justify-center gap-3 py-2.5 text-sm">
        <Sparkles className="size-3.5 text-primary shrink-0" aria-hidden="true" />
        <span className="rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
          {ANNOUNCEMENT.label}
        </span>
        <span className="text-zinc-400 hidden sm:block">{ANNOUNCEMENT.message}</span>
        <Link
          href={ANNOUNCEMENT.href}
          className="inline-flex items-center gap-1 font-semibold text-primary no-underline hover:text-white transition-colors text-xs"
        >
          {ANNOUNCEMENT.linkText}
          <ArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
