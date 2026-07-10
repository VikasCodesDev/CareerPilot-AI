import type { LucideIcon } from "lucide-react";

export type DashboardSectionId =
  | "overview"
  | "resume-score"
  | "resume-analysis"
  | "career-roadmap"
  | "skill-gap"
  | "interview-practice"
  | "projects"
  | "analytics"
  | "ai-assistant"
  | "portfolio"
  | "settings";

export type DashboardNavItem = {
  id: DashboardSectionId;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
};

export type DashboardBreadcrumbItem = {
  label: string;
  href?: string;
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accent: "primary" | "secondary" | "accent" | "success";
};

export type DashboardWidget = {
  id: string;
  title: string;
  description: string;
  span?: "default" | "wide" | "full";
};
