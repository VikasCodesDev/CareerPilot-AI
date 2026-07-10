import type { Portfolio, PortfolioSEO } from "@/features/portfolio/types";
import { generateSeoMetadata } from "@/features/portfolio/utils/seo-metadata";

export class PortfolioSEOService {
  static generate(portfolio: Pick<Portfolio, "title" | "slug" | "skills" | "sections">): PortfolioSEO {
    const about = portfolio.sections.find((section) => section.type === "About")?.content;

    return generateSeoMetadata({
      title: portfolio.title,
      slug: portfolio.slug,
      summary: about,
      skills: portfolio.skills.map((skill) => skill.name),
    });
  }
}
