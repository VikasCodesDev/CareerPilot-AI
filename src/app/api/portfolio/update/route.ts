import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { portfolioUpdateSchema } from "@/features/portfolio/schemas";
import { PortfolioSEOService, PortfolioVersionService } from "@/features/portfolio/services";
import type {
  PortfolioProject,
  PortfolioSection,
  PortfolioSkill,
} from "@/features/portfolio/types";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, generateId, withErrorHandler } from "@/lib/utils/api";

export const PUT = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = portfolioUpdateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid portfolio update request.", 400);
  }

  const { portfolioId, sections, projects, skills, ...updates } = parsed.data;

  await connectToDatabase();
  const current = await portfolioFeatureRepository.findById(portfolioId, session.user.id);
  if (!current) return apiError("Portfolio not found.", 404);

  const normalizedSections: PortfolioSection[] | undefined = sections?.map((section) => ({
    ...section,
    id: section.id ?? generateId("portfolio-section"),
  }));
  const normalizedProjects: PortfolioProject[] | undefined = projects?.map((project) => ({
    ...project,
    id: project.id ?? generateId("portfolio-project"),
  }));
  const normalizedSkills: PortfolioSkill[] | undefined = skills?.map((skill) => ({
    ...skill,
    id: skill.id ?? generateId("portfolio-skill"),
  }));
  const draft = {
    ...current,
    ...updates,
    sections: normalizedSections ?? current.sections,
    projects: normalizedProjects ?? current.projects,
    skills: normalizedSkills ?? current.skills,
  };
  const seo = updates.seo ?? PortfolioSEOService.generate(draft);
  const versions = PortfolioVersionService.createVersion(current);

  const portfolio = await portfolioFeatureRepository.updatePortfolio(
    portfolioId,
    session.user.id,
    {
      ...updates,
      sections: normalizedSections,
      projects: normalizedProjects,
      skills: normalizedSkills,
      seo,
      versions,
    }
  );

  return apiSuccess({ portfolio }, "Portfolio updated successfully.");
});
