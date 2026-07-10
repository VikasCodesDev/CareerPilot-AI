export type PortfolioSectionType =
  | "Hero"
  | "About"
  | "Skills"
  | "Projects"
  | "Experience"
  | "Education"
  | "Certifications"
  | "Achievements"
  | "Resume Download"
  | "Contact"
  | "Social Links"
  | "Testimonials"
  | "Career Timeline"
  | "GitHub Stats Placeholder"
  | "Coding Profiles"
  | "Blogs"
  | "Volunteer Work"
  | "Languages"
  | "Awards";

export type PortfolioTheme =
  | "Modern Dark"
  | "Glassmorphism"
  | "Minimal"
  | "Professional"
  | "Startup"
  | "Developer"
  | "Cyber"
  | "Gradient"
  | "Corporate";

export type PortfolioVisibility = "private" | "unlisted" | "public";

export type PortfolioPublishStatus = "draft" | "published" | "unpublished" | "archived";

export interface PortfolioSection {
  id: string;
  type: PortfolioSectionType;
  title: string;
  content: string;
  order: number;
  enabled: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  order: number;
}

export interface PortfolioSkill {
  id: string;
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  order: number;
}

export interface PortfolioExperience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  summary: string;
  achievements: string[];
}

export interface PortfolioEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear?: string;
  endYear?: string;
}

export interface PortfolioCertification {
  id: string;
  name: string;
  issuer: string;
  issuedAt?: string;
  credentialUrl?: string;
}

export interface PortfolioAchievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface PortfolioAnalytics {
  views: number;
  uniqueVisitors: number;
  contactClicks: number;
  resumeDownloads: number;
  lastViewedAt?: string;
}

export interface PortfolioSEO {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  score: number;
}

export interface PortfolioSettings {
  contactEmail?: string;
  location?: string;
  resumeUrl?: string;
  socialLinks: {
    label: string;
    url: string;
  }[];
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  theme: PortfolioTheme;
  description: string;
  recommendedFor: string[];
  sectionTypes: PortfolioSectionType[];
}

export interface PortfolioVersion {
  id: string;
  label: string;
  createdAt: string;
  snapshotSummary: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  slug: string;
  theme: PortfolioTheme;
  themeName: string;
  visibility: PortfolioVisibility;
  sections: PortfolioSection[];
  projects: PortfolioProject[];
  skills: PortfolioSkill[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  certifications: PortfolioCertification[];
  achievements: PortfolioAchievement[];
  analytics: PortfolioAnalytics;
  seo: PortfolioSEO;
  settings: PortfolioSettings;
  versions: PortfolioVersion[];
  publishStatus: PortfolioPublishStatus;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioBuilderInput {
  userId: string;
  title: string;
  slug?: string;
  targetRole?: string;
  summary?: string;
  skills?: string[];
  projects?: (Omit<PortfolioProject, "id"> & { id?: string })[];
  resumeUrl?: string;
}
