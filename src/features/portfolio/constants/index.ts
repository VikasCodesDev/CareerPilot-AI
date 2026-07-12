import type { PortfolioSectionType, PortfolioTheme } from "@/features/portfolio/types";

export const PORTFOLIO_SECTION_TYPES = [
  "Hero",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certifications",
  "Achievements",
  "Resume Download",
  "Contact",
  "Social Links",
  "Testimonials",
  "Career Timeline",
  "GitHub Stats",
  "Coding Profiles",
  "Blogs",
  "Volunteer Work",
  "Languages",
  "Awards",
] as const satisfies readonly PortfolioSectionType[];

export const PORTFOLIO_THEMES = [
  "Modern Dark",
  "Glassmorphism",
  "Minimal",
  "Professional",
  "Startup",
  "Developer",
  "Cyber",
  "Gradient",
  "Corporate",
] as const satisfies readonly PortfolioTheme[];

export const DEFAULT_PORTFOLIO_SECTIONS: PortfolioSectionType[] = [
  "Hero",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certifications",
  "Achievements",
  "Resume Download",
  "Contact",
  "Social Links",
];
