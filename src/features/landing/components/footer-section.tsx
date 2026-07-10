import {
  GitBranch as Github,
  Users as Linkedin,
  Send as Twitter,
  Zap,
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
    <footer className="border-t border-border bg-surface/50">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 no-underline"
              aria-label="CareerPilot AI home"
            >
              <div className="flex size-8 items-center justify-center rounded-lg gradient-primary">
                <Zap
                  className="size-4 text-primary-foreground"
                  aria-hidden="true"
                />
              </div>
              <span className="text-lg font-bold">CareerPilot</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {FOOTER_CONTENT.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground no-underline transition-colors hover:border-primary/30 hover:text-foreground"
                    aria-label={social.label}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <nav key={group.id} aria-label={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          {FOOTER_CONTENT.copyright}
        </div>
      </div>
    </footer>
  );
}
