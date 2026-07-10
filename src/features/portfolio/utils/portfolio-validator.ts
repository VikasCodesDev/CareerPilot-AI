import type { Portfolio } from "@/features/portfolio/types";

export function getPortfolioCompletion(portfolio: Portfolio | null): number {
  if (!portfolio) return 0;

  const checks = [
    portfolio.title.length > 0,
    portfolio.slug.length > 0,
    portfolio.sections.some((section) => section.type === "Hero" && section.enabled),
    portfolio.sections.some((section) => section.type === "About" && section.enabled),
    portfolio.skills.length > 0,
    portfolio.projects.length > 0,
    portfolio.settings.contactEmail !== undefined,
    portfolio.seo.score >= 60,
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
