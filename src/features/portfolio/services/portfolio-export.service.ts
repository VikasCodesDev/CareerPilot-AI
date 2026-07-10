import type { Portfolio } from "@/features/portfolio/types";
import { portfolioToMarkdown } from "@/features/portfolio/utils/export-helper";
import { serializePortfolio } from "@/features/portfolio/utils/serializer";

export class PortfolioExportService {
  static toJson(portfolio: Portfolio): string {
    return serializePortfolio(portfolio);
  }

  static toMarkdown(portfolio: Portfolio): string {
    return portfolioToMarkdown(portfolio);
  }
}
