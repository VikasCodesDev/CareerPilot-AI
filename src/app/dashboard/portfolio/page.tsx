import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { PortfolioDashboard } from "@/features/portfolio";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { PortfolioTemplateService } from "@/features/portfolio/services";
import { connectToDatabase } from "@/lib/db";

export default async function PortfolioPage() {
  const session = await getServerSession(authOptions);
  const templates = PortfolioTemplateService.listTemplates();

  if (!session?.user?.id) {
    return <PortfolioDashboard portfolio={null} templates={templates} authenticated={false} />;
  }

  await connectToDatabase();
  const portfolio = await portfolioFeatureRepository.findByUser(session.user.id);

  return <PortfolioDashboard portfolio={portfolio} templates={templates} authenticated />;
}
