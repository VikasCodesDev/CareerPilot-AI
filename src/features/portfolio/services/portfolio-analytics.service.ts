import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import type { PortfolioAnalytics } from "@/features/portfolio/types";
import { connectToDatabase } from "@/lib/db";

export class PortfolioAnalyticsService {
  static empty(): PortfolioAnalytics {
    return {
      views: 0,
      uniqueVisitors: 0,
      contactClicks: 0,
      resumeDownloads: 0,
    };
  }

  static async saveAnalytics(portfolioId: string, userId: string, analytics: PortfolioAnalytics) {
    await connectToDatabase();
    return portfolioFeatureRepository.saveAnalytics(portfolioId, userId, analytics);
  }
}
