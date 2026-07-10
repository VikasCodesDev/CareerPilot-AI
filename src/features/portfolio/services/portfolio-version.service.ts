import { portfolioConfig } from "@/features/portfolio/config";
import type { Portfolio, PortfolioVersion } from "@/features/portfolio/types";
import { generateId } from "@/lib/utils/api";

export class PortfolioVersionService {
  static createVersion(portfolio: Portfolio, label = "Saved portfolio update"): PortfolioVersion[] {
    const version: PortfolioVersion = {
      id: generateId("portfolio-version"),
      label,
      createdAt: new Date().toISOString(),
      snapshotSummary: `${portfolio.sections.length} sections, ${portfolio.projects.length} projects, ${portfolio.skills.length} skills`,
    };

    return [version, ...portfolio.versions].slice(0, portfolioConfig.maxVersions);
  }
}
