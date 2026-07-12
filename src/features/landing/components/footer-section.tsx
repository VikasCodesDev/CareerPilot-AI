import {
  GitBranch as Github,
  Users as Linkedin,
  Send as Twitter,
} from "lucide-react";
import Link from "next/link";

import {
  FOOTER_CONTENT,
  FOOTER_LINK_GROUPS,
} from "@/features/landing/config/landing-content";

const SOCIAL_LINKS = [
  { id: "twitter", label: "Twitter", href: "#", icon: Twitter },
  { id: "github", label: "GitHub", href: "#", icon: Github },
  { id: "linkedin", label: "LinkedIn", href: "#", icon: Linkedin },
] as const;

export function FooterSection() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-zinc-950/80 backdrop-blur-xl overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />

      <div className="container-page relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline group"
              aria-label="CareerPilot AI home"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_22px_rgba(217,70,239,0.45)] transition-shadow">
                <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
                  <path d="M13 2L4.09 12.11a1 1 0 00.86 1.62L11 13l-2 9 8.91-10.11a1 1 0 00-.86-1.62L11 11l2-9z" fill="white" />
                </svg>
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-white">CareerPilot</span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-primary/70">.AI</span>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm text-zinc-500 leading-relaxed">
              {FOOTER_CONTENT.tagline} Built for the next generation of ambitious professionals.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="flex size-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-zinc-500 no-underline transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    aria-label={social.label}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link groups */}
          {FOOTER_LINK_GROUPS.map((group) => (
            <nav key={group.id} aria-label={group.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-5">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 text-xs text-zinc-600 sm:flex-row">
          <p>{FOOTER_CONTENT.copyright}</p>
          <p className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500/70 animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
