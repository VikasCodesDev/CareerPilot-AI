import type { PortfolioTheme } from "@/features/portfolio/types";

export function mapThemeToClass(theme: PortfolioTheme): string {
  const map: Record<PortfolioTheme, string> = {
    "Modern Dark": "from-zinc-950 to-slate-900",
    Glassmorphism: "from-violet-950/70 to-blue-950/70",
    Minimal: "from-zinc-950 to-zinc-900",
    Professional: "from-slate-950 to-zinc-900",
    Startup: "from-indigo-950 to-cyan-950",
    Developer: "from-neutral-950 to-emerald-950",
    Cyber: "from-black to-green-950",
    Gradient: "from-violet-950 to-blue-950",
    Corporate: "from-slate-950 to-blue-950",
  };

  return map[theme];
}
