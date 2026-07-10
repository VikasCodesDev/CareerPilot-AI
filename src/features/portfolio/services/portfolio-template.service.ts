import { DEFAULT_PORTFOLIO_SECTIONS } from "@/features/portfolio/constants";
import type { PortfolioTemplate } from "@/features/portfolio/types";

export class PortfolioTemplateService {
  static listTemplates(): PortfolioTemplate[] {
    return [
      {
        id: "developer-dark",
        name: "Developer Dark",
        theme: "Developer",
        description: "Project-led portfolio for engineers and builders.",
        recommendedFor: ["Frontend Developer", "Full Stack Developer", "Backend Developer"],
        sectionTypes: DEFAULT_PORTFOLIO_SECTIONS,
      },
      {
        id: "professional-brand",
        name: "Professional Brand",
        theme: "Professional",
        description: "Clean personal branding for corporate and consulting roles.",
        recommendedFor: ["Data Analyst", "Product Analyst", "Cloud Engineer"],
        sectionTypes: DEFAULT_PORTFOLIO_SECTIONS,
      },
      {
        id: "cyber-signal",
        name: "Cyber Signal",
        theme: "Cyber",
        description: "High-signal security portfolio with achievements and certifications.",
        recommendedFor: ["Cyber Security Engineer", "DevOps Engineer"],
        sectionTypes: DEFAULT_PORTFOLIO_SECTIONS,
      },
    ];
  }
}
