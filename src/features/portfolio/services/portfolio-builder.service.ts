import { DEFAULT_PORTFOLIO_SECTIONS } from "@/features/portfolio/constants";
import { portfolioConfig } from "@/features/portfolio/config";
import type {
  Portfolio,
  PortfolioBuilderInput,
  PortfolioProject,
  PortfolioSection,
  PortfolioSkill,
} from "@/features/portfolio/types";
import { generateId } from "@/lib/utils/api";
import { generateSeoMetadata } from "@/features/portfolio/utils/seo-metadata";
import { generatePortfolioSlug } from "@/features/portfolio/utils/slug";

export class PortfolioBuilderService {
  static build(input: PortfolioBuilderInput): Omit<Portfolio, "id" | "createdAt" | "updatedAt"> {
    const slug = input.slug ?? generatePortfolioSlug(input.title, input.userId);
    const skills = this.createSkills(input.skills ?? []);
    const projects = (input.projects ?? []).map((project, index) => ({
      ...project,
      id: project.id || generateId("portfolio-project"),
      order: project.order ?? index,
    }));
    const sections = this.createSections(input, skills, projects);

    return {
      userId: input.userId,
      title: input.title,
      slug,
      theme: portfolioConfig.defaultTheme,
      themeName: portfolioConfig.defaultTheme,
      visibility: portfolioConfig.defaultVisibility,
      sections,
      projects,
      skills,
      experience: [],
      education: [],
      certifications: [],
      achievements: [],
      analytics: {
        views: 0,
        uniqueVisitors: 0,
        contactClicks: 0,
        resumeDownloads: 0,
      },
      seo: generateSeoMetadata({
        title: input.title,
        slug,
        summary: input.summary,
        skills: input.skills,
      }),
      settings: {
        resumeUrl: input.resumeUrl,
        socialLinks: [],
      },
      versions: [],
      publishStatus: "draft",
      published: false,
    };
  }

  private static createSkills(skills: readonly string[]): PortfolioSkill[] {
    return skills.map((skill, index) => ({
      id: generateId("portfolio-skill"),
      name: skill,
      category: "Core",
      level: index < 3 ? "Advanced" : "Intermediate",
      order: index,
    }));
  }

  private static createSections(
    input: PortfolioBuilderInput,
    skills: readonly PortfolioSkill[],
    projects: readonly PortfolioProject[]
  ): PortfolioSection[] {
    return DEFAULT_PORTFOLIO_SECTIONS.map((type, index) => {
      const contentMap: Record<string, string> = {
        Hero: `${input.title}${input.targetRole ? ` - ${input.targetRole}` : ""}`,
        About: input.summary ?? `Professional portfolio for ${input.title}.`,
        Skills: skills.map((skill) => skill.name).join(", ") || "Skills will appear here after import.",
        Projects: projects.map((project) => project.title).join(", ") || "Projects will appear here after import.",
        "Resume Download": input.resumeUrl ?? "Resume download link can be connected from uploaded resumes.",
        Contact: "Add contact details in portfolio settings.",
        "Social Links": "Add GitHub, LinkedIn, and coding profiles in portfolio settings.",
      };

      return {
        id: generateId("portfolio-section"),
        type,
        title: type,
        content: contentMap[type] ?? `${type} section ready for portfolio content.`,
        order: index,
        enabled: true,
      };
    });
  }
}
