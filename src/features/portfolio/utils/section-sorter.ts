import type { PortfolioSection } from "@/features/portfolio/types";

export function sortPortfolioSections(sections: readonly PortfolioSection[]): PortfolioSection[] {
  return [...sections].sort((a, b) => a.order - b.order);
}
