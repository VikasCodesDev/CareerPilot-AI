import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import type { PortfolioTheme } from "@/features/portfolio/types";
import { mapThemeToClass } from "@/features/portfolio/utils/theme-mapper";
import { connectToDatabase } from "@/lib/db";

export class PortfolioThemeService {
  static getThemeClass(theme: PortfolioTheme): string {
    return mapThemeToClass(theme);
  }

  static async saveTheme(portfolioId: string, userId: string, theme: PortfolioTheme) {
    await connectToDatabase();
    return portfolioFeatureRepository.saveTheme(portfolioId, userId, theme);
  }
}
