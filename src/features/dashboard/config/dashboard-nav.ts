import {
  BarChart3,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Map,
  MessageSquare,
  Settings,
  Target,
  User,
} from "lucide-react";

import type {
  DashboardNavItem,
  DashboardSectionId,
  QuickAction,
} from "@/types/dashboard";

export const DASHBOARD_BASE_PATH = "/dashboard";

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Your career command center",
  },
  {
    id: "resume-score",
    label: "Resume Score",
    href: "/dashboard/resume-score",
    icon: FileText,
    description: "ATS readiness and resume insights",
    badge: "New",
  },
  {
    id: "resume-analysis",
    label: "ATS Analysis",
    href: "/dashboard/resume-analysis",
    icon: FileText,
    description: "Detailed ATS score, keywords, and reports",
  },
  {
    id: "career-roadmap",
    label: "Career Roadmap",
    href: "/dashboard/career-roadmap",
    icon: Map,
    description: "Personalized growth milestones",
  },
  {
    id: "skill-gap",
    label: "Skill Gap",
    href: "/dashboard/skill-gap",
    icon: Target,
    description: "Identify and close skill gaps",
  },
  {
    id: "interview-practice",
    label: "Interview Practice",
    href: "/dashboard/interview-practice",
    icon: MessageSquare,
    description: "Mock interviews and feedback",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
    description: "Portfolio-ready project tracking",
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    description: "Progress metrics and trends",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    href: "/dashboard/ai-assistant",
    icon: Bot,
    description: "Autonomous career guidance",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/dashboard/portfolio",
    icon: Briefcase,
    description: "Showcase your professional work",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Workspace preferences",
  },
];

export const DASHBOARD_SECTION_LABELS: Record<DashboardSectionId, string> =
  Object.fromEntries(
    DASHBOARD_NAV_ITEMS.map((item) => [item.id, item.label])
  ) as Record<DashboardSectionId, string>;

export const DASHBOARD_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "analyze-resume",
    title: "Analyze Resume",
    description: "Get an instant ATS score and improvement tips",
    icon: FileText,
    href: "/dashboard/resume-analysis",
    accent: "primary",
  },
  {
    id: "start-interview",
    title: "Practice Interview",
    description: "Run a practice session with AI feedback",
    icon: MessageSquare,
    href: "/dashboard/interview-practice",
    accent: "secondary",
  },
  {
    id: "view-roadmap",
    title: "View Roadmap",
    description: "See your next career milestones",
    icon: Map,
    href: "/dashboard/career-roadmap",
    accent: "accent",
  },
  {
    id: "ask-ai",
    title: "Ask AI Assistant",
    description: "Get guidance on your next career move",
    icon: Bot,
    href: "/dashboard/ai-assistant",
    accent: "success",
  },
];

export const DEFAULT_DASHBOARD_USER = {
  name: "Alex Rivera",
  email: "alex.rivera@email.com",
  role: "Product Designer",
  initials: "AR",
  avatarUrl: undefined as string | undefined,
};

export const COMMAND_PALETTE_ITEMS = DASHBOARD_NAV_ITEMS.map((item) => ({
  id: item.id,
  label: item.label,
  href: item.href,
  icon: item.icon,
  group: "Navigation",
}));

export const COMMAND_PALETTE_ACTIONS = [
  {
    id: "profile",
    label: "View Profile",
    icon: User,
    group: "Account",
  },
  {
    id: "settings",
    label: "Open Settings",
    icon: Settings,
    group: "Account",
  },
];
