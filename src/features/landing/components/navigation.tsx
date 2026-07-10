"use client";

import { Menu, Moon, Sun, X, Zap } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/features/landing/config/landing-content";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mounted, resolvedTheme, toggleThemeMode } = useThemeMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "sticky top-0 z-[var(--z-sticky)] transition-all duration-300",
          scrolled ? "glass-subtle shadow-sm" : "bg-transparent"
        )}
      >
        <nav
          className="container-page flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 no-underline"
            aria-label="CareerPilot AI home"
          >
            <div className="flex size-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="size-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-lg font-bold tracking-tight">CareerPilot</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleThemeMode}
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
            ) : (
              <Button variant="ghost" size="icon" aria-hidden="true" tabIndex={-1}>
                <Sun className="size-4" />
              </Button>
            )}

            <Button className="hidden sm:inline-flex" render={<Link href="#features" />}>
              Get Started
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 top-16 z-[var(--z-overlay)] bg-background/95 backdrop-blur-lg md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container-page flex flex-col gap-1 py-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={closeMobile}
                    className="rounded-lg px-4 py-3 text-lg font-medium no-underline transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  className="mt-4 w-full"
                  size="lg"
                  render={<Link href="#features" onClick={closeMobile} />}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
