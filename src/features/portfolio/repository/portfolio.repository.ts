import { Portfolio, PortfolioDocument } from "@/models/Portfolio";
import type {
  Portfolio as PortfolioEntity,
  PortfolioAnalytics,
  PortfolioTemplate,
  PortfolioTheme,
} from "@/features/portfolio/types";
import { PortfolioTemplateService } from "@/features/portfolio/services/portfolio-template.service";

function toIsoString(date: Date | string | undefined): string | undefined {
  return date ? new Date(date).toISOString() : undefined;
}

export function toPortfolio(doc: PortfolioDocument): PortfolioEntity {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    title: doc.title,
    slug: doc.slug,
    theme: doc.theme,
    themeName: doc.themeName,
    visibility: doc.visibility,
    sections: doc.sections,
    projects: doc.projects,
    skills: doc.skills,
    experience: doc.experience,
    education: doc.education,
    certifications: doc.certifications,
    achievements: doc.achievements,
    analytics: doc.analytics,
    seo: doc.seo,
    settings: doc.settings,
    versions: doc.versions,
    publishStatus: doc.publishStatus,
    published: doc.published,
    publishedAt: toIsoString(doc.publishedAt),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export class PortfolioFeatureRepository {
  async createPortfolio(
    portfolio: Omit<PortfolioEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<PortfolioEntity> {
    const created = await Portfolio.create(portfolio);
    return toPortfolio(created);
  }

  async updatePortfolio(
    portfolioId: string,
    userId: string,
    data: Partial<Omit<PortfolioEntity, "id" | "userId" | "createdAt" | "updatedAt">>
  ): Promise<PortfolioEntity | null> {
    const updated = await Portfolio.findOneAndUpdate(
      { _id: portfolioId, userId },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();

    return updated ? toPortfolio(updated) : null;
  }

  async deletePortfolio(portfolioId: string, userId: string): Promise<boolean> {
    const result = await Portfolio.deleteOne({ _id: portfolioId, userId }).exec();
    return result.deletedCount === 1;
  }

  async publishPortfolio(portfolioId: string, userId: string): Promise<PortfolioEntity | null> {
    return this.updatePortfolio(portfolioId, userId, {
      published: true,
      publishStatus: "published",
      visibility: "public",
      publishedAt: new Date().toISOString(),
    });
  }

  async unpublishPortfolio(portfolioId: string, userId: string): Promise<PortfolioEntity | null> {
    return this.updatePortfolio(portfolioId, userId, {
      published: false,
      publishStatus: "unpublished",
      visibility: "private",
    });
  }

  async duplicatePortfolio(portfolioId: string, userId: string, slug: string): Promise<PortfolioEntity | null> {
    const portfolio = await this.findById(portfolioId, userId);
    if (!portfolio) return null;

    const duplicated = await this.createPortfolio({
      ...portfolio,
      userId,
      title: `${portfolio.title} Copy`,
      slug,
      published: false,
      publishStatus: "draft",
      visibility: "private",
      publishedAt: undefined,
    });

    return duplicated;
  }

  async findById(portfolioId: string, userId: string): Promise<PortfolioEntity | null> {
    const portfolio = await Portfolio.findOne({ _id: portfolioId, userId }).exec();
    return portfolio ? toPortfolio(portfolio) : null;
  }

  async findByUser(userId: string): Promise<PortfolioEntity | null> {
    const portfolio = await Portfolio.findOne({ userId }).sort({ updatedAt: -1 }).exec();
    return portfolio ? toPortfolio(portfolio) : null;
  }

  async findPublicPortfolio(slug: string): Promise<PortfolioEntity | null> {
    const portfolio = await Portfolio.findOne({
      slug,
      published: true,
      visibility: "public",
    }).exec();
    return portfolio ? toPortfolio(portfolio) : null;
  }

  listTemplates(): PortfolioTemplate[] {
    return PortfolioTemplateService.listTemplates();
  }

  async saveTheme(portfolioId: string, userId: string, theme: PortfolioTheme) {
    return this.updatePortfolio(portfolioId, userId, { theme, themeName: theme });
  }

  async saveAnalytics(portfolioId: string, userId: string, analytics: PortfolioAnalytics) {
    return this.updatePortfolio(portfolioId, userId, { analytics });
  }
}

export const portfolioFeatureRepository = new PortfolioFeatureRepository();
