import type { LucideIcon } from "lucide-react";

export type NavLink = Readonly<{
  id: string;
  label: string;
  href: string;
}>;

export type FeatureItem = Readonly<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export type ProblemItem = Readonly<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export type WorkflowStep = Readonly<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export type ArchitectureNode = Readonly<{
  id: string;
  title: string;
  description: string;
  layer: "interface" | "intelligence" | "data";
}>;

export type TimelineStep = Readonly<{
  id: string;
  step: number;
  title: string;
  description: string;
}>;

export type JourneyPhase = Readonly<{
  id: string;
  title: string;
  description: string;
  status: "complete" | "active" | "upcoming";
}>;

export type AgentCard = Readonly<{
  id: string;
  name: string;
  role: string;
  description: string;
  capabilities: readonly string[];
  icon: LucideIcon;
  accent: string;
}>;

export type TechStackItem = Readonly<{
  id: string;
  name: string;
  category: string;
}>;

export type RoadmapItem = Readonly<{
  id: string;
  quarter: string;
  title: string;
  description: string;
  status: "shipped" | "in-progress" | "planned";
}>;

export type Testimonial = Readonly<{
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}>;

export type FaqItem = Readonly<{
  id: string;
  question: string;
  answer: string;
}>;

export type FooterLinkGroup = Readonly<{
  id: string;
  title: string;
  links: readonly NavLink[];
}>;

export type TrustedByLogo = Readonly<{
  id: string;
  name: string;
}>;
