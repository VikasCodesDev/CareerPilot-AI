import { portfolioConfig } from "@/features/portfolio/config";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { connectToDatabase } from "@/lib/db";

export class PortfolioPublishService {
  static async publishPortfolio(portfolioId: string, userId: string) {
    await connectToDatabase();
    const portfolio = await portfolioFeatureRepository.findById(portfolioId, userId);
    if (!portfolio) return null;
    if (portfolio.seo.score < portfolioConfig.minSeoScoreForPublish) {
      return portfolioFeatureRepository.updatePortfolio(portfolioId, userId, {
        publishStatus: "draft",
      });
    }

    return portfolioFeatureRepository.publishPortfolio(portfolioId, userId);
  }

  static async unpublishPortfolio(portfolioId: string, userId: string) {
    await connectToDatabase();
    return portfolioFeatureRepository.unpublishPortfolio(portfolioId, userId);
  }
}
