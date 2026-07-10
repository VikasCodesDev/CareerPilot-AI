import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import type { PortfolioVisibility } from "@/features/portfolio/types";
import { connectToDatabase } from "@/lib/db";

export class PortfolioVisibilityService {
  static async saveVisibility(portfolioId: string, userId: string, visibility: PortfolioVisibility) {
    await connectToDatabase();
    return portfolioFeatureRepository.updatePortfolio(portfolioId, userId, { visibility });
  }
}
