import type { ATSScoreCategory, ATSSectionKey } from "@/features/ats/types";

export const ATS_SECTION_LABELS: Record<ATSSectionKey, string> = {
  summary: "Professional Summary",
  skills: "Skills",
  education: "Education",
  projects: "Projects",
  experience: "Experience",
  certifications: "Certifications",
  languages: "Languages",
  links: "Professional Links",
};

export const ATS_SCORE_LABELS: Record<ATSScoreCategory, string> = {
  resume: "Resume",
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  formatting: "Formatting",
  keywords: "Keywords",
  projects: "Projects",
  achievements: "Achievements",
  certifications: "Certifications",
};

export const ATS_SCORE_WEIGHTS: Record<ATSScoreCategory, number> = {
  resume: 0.12,
  skills: 0.16,
  experience: 0.14,
  education: 0.08,
  formatting: 0.12,
  keywords: 0.16,
  projects: 0.1,
  achievements: 0.08,
  certifications: 0.04,
};

export const DEFAULT_REQUIRED_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "REST API",
  "Git",
  "Testing",
  "Responsive Design",
];

export const ATS_ACTION_VERBS = [
  "achieved",
  "built",
  "created",
  "delivered",
  "designed",
  "developed",
  "implemented",
  "improved",
  "increased",
  "launched",
  "led",
  "optimized",
  "reduced",
  "shipped",
];

export const ATS_TECH_KEYWORDS = [
  "accessibility",
  "api",
  "aws",
  "css",
  "docker",
  "express",
  "figma",
  "firebase",
  "git",
  "graphql",
  "html",
  "java",
  "javascript",
  "jest",
  "mongodb",
  "mongoose",
  "next.js",
  "node.js",
  "postgresql",
  "python",
  "react",
  "redux",
  "rest api",
  "tailwind",
  "testing",
  "typescript",
  "vercel",
  "zod",
];
