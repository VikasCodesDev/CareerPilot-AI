import {
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Compass,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  LineChart,
  MessageSquare,
  Mic,
  Network,
  Route,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import type {
  AgentCard,
  ArchitectureNode,
  FaqItem,
  FeatureItem,
  FooterLinkGroup,
  JourneyPhase,
  NavLink,
  ProblemItem,
  RoadmapItem,
  TechStackItem,
  Testimonial,
  TimelineStep,
  TrustedByLogo,
  WorkflowStep,
} from "@/types/landing";

export const ANNOUNCEMENT = {
  label: "New",
  message: "Autonomous AI career agents are now live in early access.",
  href: "#roadmap",
  linkText: "View roadmap",
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { id: "features", label: "Features", href: "#features" },
  { id: "workflow", label: "Workflow", href: "#workflow" },
  { id: "architecture", label: "Architecture", href: "#architecture" },
  { id: "agents", label: "AI Agents", href: "#agents" },
  { id: "roadmap", label: "Roadmap", href: "#roadmap" },
  { id: "faq", label: "FAQ", href: "#faq" },
] as const;

export const HERO_CONTENT = {
  badge: "Autonomous AI Career Platform",
  heading: "Navigate your career with intelligent precision",
  headingAccent: "intelligent precision",
  subheading:
    "CareerPilot AI orchestrates resume optimization, interview preparation, and personalized roadmaps through autonomous agents that work while you focus on what matters.",
  primaryCta: { label: "Start Free", href: "/login" },
  secondaryCta: { label: "See How It Works", href: "#how-it-works" },
} as const;

export const TRUSTED_BY_LOGOS: readonly TrustedByLogo[] = [
  { id: "vertex", name: "Vertex Labs" },
  { id: "nexus", name: "Nexus Systems" },
  { id: "orbit", name: "Orbit Dynamics" },
  { id: "pulse", name: "Pulse Analytics" },
  { id: "arc", name: "Arc Collective" },
  { id: "helix", name: "Helix Group" },
] as const;

export const PROBLEM_ITEMS: readonly ProblemItem[] = [
  {
    id: "fragmented",
    title: "Fragmented career tools",
    description:
      "Resume builders, job boards, and coaching platforms operate in silos — forcing you to stitch together a strategy manually.",
    icon: Layers,
  },
  {
    id: "generic",
    title: "Generic AI advice",
    description:
      "One-size-fits-all chatbots lack context about your skills, goals, and market dynamics. The guidance feels shallow and untrustworthy.",
    icon: MessageSquare,
  },
  {
    id: "stagnation",
    title: "Career stagnation",
    description:
      "Without a living roadmap and continuous feedback loop, professionals drift — missing opportunities aligned with their trajectory.",
    icon: TrendingUp,
  },
] as const;

export const WHY_ITEMS: readonly FeatureItem[] = [
  {
    id: "autonomous",
    title: "Autonomous by design",
    description:
      "Specialized AI agents collaborate across your career lifecycle — from skill assessment to offer negotiation.",
    icon: Bot,
  },
  {
    id: "contextual",
    title: "Deeply contextual",
    description:
      "Every recommendation is grounded in your profile, industry trends, and real-time labor market intelligence.",
    icon: Brain,
  },
  {
    id: "continuous",
    title: "Continuously adaptive",
    description:
      "Your career roadmap evolves as you grow — recalibrating milestones, skills, and opportunities automatically.",
    icon: Route,
  },
] as const;

export const FEATURE_ITEMS: readonly FeatureItem[] = [
  {
    id: "resume-ai",
    title: "AI Resume Engine",
    description:
      "ATS-optimized resumes tailored to each role with intelligent keyword mapping and impact quantification.",
    icon: FileText,
  },
  {
    id: "interview-coach",
    title: "Interview Coach",
    description:
      "Real-time mock interviews with adaptive follow-ups, sentiment analysis, and actionable feedback.",
    icon: Mic,
  },
  {
    id: "roadmap-planner",
    title: "Career Roadmap",
    description:
      "Dynamic multi-year plans with skill gaps, certifications, and milestone tracking built in.",
    icon: Compass,
  },
  {
    id: "job-matching",
    title: "Smart Job Matching",
    description:
      "Semantic role matching that goes beyond keywords — aligning culture, growth, and compensation fit.",
    icon: Search,
  },
  {
    id: "skill-analytics",
    title: "Skill Analytics",
    description:
      "Visualize your competency landscape against market demand with predictive gap analysis.",
    icon: BarChart3,
  },
  {
    id: "network-intel",
    title: "Network Intelligence",
    description:
      "Strategic connection recommendations and outreach templates powered by relationship graph analysis.",
    icon: Network,
  },
] as const;

export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    id: "ingest",
    title: "Profile Ingestion",
    description: "Upload resume, LinkedIn, or portfolio. Agents parse and build your career knowledge graph.",
    icon: FileText,
  },
  {
    id: "analyze",
    title: "Market Analysis",
    description: "Real-time labor market data fused with your profile to identify optimal career vectors.",
    icon: LineChart,
  },
  {
    id: "orchestrate",
    title: "Agent Orchestration",
    description: "Specialized agents collaborate — resume, interview, and roadmap agents work in parallel.",
    icon: Workflow,
  },
  {
    id: "deliver",
    title: "Deliver & Iterate",
    description: "Actionable outputs delivered continuously. Agents learn from your feedback and adapt.",
    icon: Sparkles,
  },
] as const;

export const ARCHITECTURE_NODES: readonly ArchitectureNode[] = [
  {
    id: "ui-layer",
    title: "Experience Layer",
    description: "Premium interface with real-time agent status, progress tracking, and interactive dashboards.",
    layer: "interface",
  },
  {
    id: "agent-layer",
    title: "Agent Orchestrator",
    description: "Multi-agent coordination with task delegation, context sharing, and autonomous decision-making.",
    layer: "intelligence",
  },
  {
    id: "llm-layer",
    title: "LLM Intelligence",
    description: "Gemini and Groq-powered reasoning with RAG-enhanced career domain knowledge.",
    layer: "intelligence",
  },
  {
    id: "data-layer",
    title: "Career Knowledge Graph",
    description: "MongoDB-backed profile store with skills ontology, market signals, and interaction history.",
    layer: "data",
  },
] as const;

export const TIMELINE_STEPS: readonly TimelineStep[] = [
  {
    id: "step-1",
    step: 1,
    title: "Create your profile",
    description: "Import your resume or build from scratch. CareerPilot maps your skills, experience, and aspirations.",
  },
  {
    id: "step-2",
    step: 2,
    title: "Define your goals",
    description: "Set target roles, industries, and timelines. Agents calibrate recommendations to your ambition level.",
  },
  {
    id: "step-3",
    step: 3,
    title: "Activate AI agents",
    description: "Resume, interview, and roadmap agents begin working autonomously — delivering outputs within minutes.",
  },
  {
    id: "step-4",
    step: 4,
    title: "Execute & evolve",
    description: "Apply insights, track progress, and let agents refine your strategy as markets and goals shift.",
  },
] as const;

export const JOURNEY_PHASES: readonly JourneyPhase[] = [
  {
    id: "discover",
    title: "Discover",
    description: "Uncover hidden strengths and market-aligned opportunities.",
    status: "complete",
  },
  {
    id: "prepare",
    title: "Prepare",
    description: "Optimize resume, portfolio, and interview readiness.",
    status: "active",
  },
  {
    id: "apply",
    title: "Apply",
    description: "Targeted applications with AI-crafted cover letters.",
    status: "upcoming",
  },
  {
    id: "advance",
    title: "Advance",
    description: "Negotiate offers and plan your next career move.",
    status: "upcoming",
  },
] as const;

export const AGENT_CARDS: readonly AgentCard[] = [
  {
    id: "resume-agent",
    name: "Resume Agent",
    role: "Document Intelligence",
    description:
      "Crafts ATS-optimized resumes with role-specific tailoring, impact metrics, and formatting precision.",
    capabilities: ["Keyword optimization", "Impact quantification", "Multi-format export"],
    icon: FileText,
    accent: "from-violet-600/20 to-violet-600/5",
  },
  {
    id: "interview-agent",
    name: "Interview Agent",
    role: "Conversation Intelligence",
    description:
      "Conducts adaptive mock interviews with real-time feedback on clarity, confidence, and content depth.",
    capabilities: ["Behavioral drills", "Technical Q&A", "Sentiment analysis"],
    icon: Mic,
    accent: "from-blue-600/20 to-blue-600/5",
  },
  {
    id: "roadmap-agent",
    name: "Roadmap Agent",
    role: "Strategic Planning",
    description:
      "Builds living career roadmaps with skill milestones, certification paths, and market-aware timelines.",
    capabilities: ["Gap analysis", "Milestone tracking", "Market calibration"],
    icon: Compass,
    accent: "from-cyan-600/20 to-cyan-600/5",
  },
] as const;

export const TECH_STACK_ITEMS: readonly TechStackItem[] = [
  { id: "nextjs", name: "Next.js", category: "Framework" },
  { id: "react", name: "React 19", category: "UI" },
  { id: "typescript", name: "TypeScript", category: "Language" },
  { id: "tailwind", name: "Tailwind CSS", category: "Styling" },
  { id: "framer", name: "Framer Motion", category: "Animation" },
  { id: "mongodb", name: "MongoDB", category: "Database" },
  { id: "gemini", name: "Google Gemini", category: "AI" },
  { id: "groq", name: "Groq", category: "AI" },
  { id: "nextauth", name: "NextAuth", category: "Auth" },
  { id: "shadcn", name: "shadcn/ui", category: "Components" },
] as const;

export const IBM_CONTENT = {
  badge: "IBM SkillsBuild Partner",
  title: "Powered by world-class career education",
  description:
    "CareerPilot AI integrates IBM SkillsBuild curriculum and credentials — connecting learners to industry-recognized pathways and enterprise-grade skill development.",
  highlights: [
    "Industry-recognized digital credentials",
    "Curated learning pathways by role",
    "Enterprise workforce alignment",
  ] as const,
} as const;

export const ROADMAP_ITEMS: readonly RoadmapItem[] = [
  {
    id: "r1",
    quarter: "Q1 2026",
    title: "Foundation & Landing",
    description: "Premium experience layer, design system, and theme infrastructure.",
    status: "shipped",
  },
  {
    id: "r2",
    quarter: "Q2 2026",
    title: "AI Agent Core",
    description: "Resume, interview, and roadmap agents with autonomous orchestration.",
    status: "in-progress",
  },
  {
    id: "r3",
    quarter: "Q3 2026",
    title: "Dashboard & Analytics",
    description: "Career progress dashboards, skill analytics, and market intelligence.",
    status: "planned",
  },
  {
    id: "r4",
    quarter: "Q4 2026",
    title: "Enterprise & API",
    description: "Team workspaces, API access, and IBM SkillsBuild deep integration.",
    status: "planned",
  },
] as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t1",
    quote:
      "CareerPilot transformed my job search. The resume agent alone got me 3x more callbacks — and the interview prep was eerily accurate.",
    author: "Sarah Chen",
    role: "Senior Product Designer",
    company: "Vertex Labs",
  },
  {
    id: "t2",
    quote:
      "The roadmap agent mapped a clear path from mid-level to staff engineer in 18 months. Every milestone felt achievable and market-aligned.",
    author: "Marcus Rivera",
    role: "Software Engineer",
    company: "Nexus Systems",
  },
  {
    id: "t3",
    quote:
      "Finally, an AI career tool that understands context. It doesn't just generate text — it thinks strategically about my entire trajectory.",
    author: "Priya Sharma",
    role: "Data Science Lead",
    company: "Pulse Analytics",
  },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "faq-1",
    question: "What makes CareerPilot AI different from ChatGPT for career advice?",
    answer:
      "CareerPilot uses specialized autonomous agents — each expert in resume optimization, interview coaching, or career planning. They share context, collaborate, and deliver structured outputs rather than generic chat responses.",
  },
  {
    id: "faq-2",
    question: "Is my data secure?",
    answer:
      "Yes. All profile data is encrypted at rest and in transit. We never sell your information. You maintain full control over what agents can access and can delete your data at any time.",
  },
  {
    id: "faq-3",
    question: "How does the IBM SkillsBuild integration work?",
    answer:
      "CareerPilot maps your skill gaps to IBM SkillsBuild courses and credentials. Completed pathways are reflected in your career roadmap and can be showcased to employers.",
  },
  {
    id: "faq-4",
    question: "When will the full platform launch?",
    answer:
      "The AI agent core launches in Q2 2026. Early access members will receive priority onboarding. Sign up via the hero CTA to join the waitlist.",
  },
  {
    id: "faq-5",
    question: "What does it cost?",
    answer:
      "CareerPilot will offer a free tier with core agent capabilities. Premium plans with advanced analytics, unlimited agent sessions, and IBM credential pathways will be announced at launch.",
  },
] as const;

export const FOOTER_LINK_GROUPS: readonly FooterLinkGroup[] = [
  {
    id: "product",
    title: "Product",
    links: [
      { id: "f-features", label: "Features", href: "#features" },
      { id: "f-agents", label: "AI Agents", href: "#agents" },
      { id: "f-roadmap", label: "Roadmap", href: "#roadmap" },
      { id: "f-faq", label: "FAQ", href: "#faq" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { id: "f-about", label: "About", href: "#why" },
      { id: "f-careers", label: "Careers", href: "#" },
      { id: "f-blog", label: "Blog", href: "#" },
      { id: "f-contact", label: "Contact", href: "#" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { id: "f-privacy", label: "Privacy", href: "#" },
      { id: "f-terms", label: "Terms", href: "#" },
      { id: "f-security", label: "Security", href: "#" },
    ],
  },
] as const;

export const FOOTER_CONTENT = {
  tagline: "Autonomous AI for ambitious careers.",
  copyright: `© ${new Date().getFullYear()} CareerPilot AI. All rights reserved.`,
} as const;

export const SECTION_CONTENT = {
  trustedBy: {
    eyebrow: "Trusted by professionals",
    title: "Built for teams that demand excellence",
  },
  problem: {
    eyebrow: "The challenge",
    title: "Career growth shouldn't feel like guesswork",
    description:
      "Most professionals lack a unified system for navigating their career. The tools exist — but the intelligence doesn't.",
  },
  why: {
    eyebrow: "Why CareerPilot AI",
    title: "Intelligence that works as hard as you do",
    description:
      "We built CareerPilot AI to be the career co-pilot that never sleeps — orchestrating every dimension of your professional growth.",
  },
  features: {
    eyebrow: "Capabilities",
    title: "Everything you need to accelerate",
    description:
      "A complete suite of AI-powered tools designed for the modern professional.",
  },
  workflow: {
    eyebrow: "Autonomous workflow",
    title: "Agents that orchestrate themselves",
    description:
      "From profile ingestion to continuous iteration — CareerPilot's agents handle the full lifecycle autonomously.",
  },
  architecture: {
    eyebrow: "Architecture",
    title: "Engineered for intelligence at scale",
    description:
      "A layered architecture that separates experience, intelligence, and data — enabling autonomous agent collaboration.",
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Four steps to career clarity",
    description: "Get started in minutes. Let agents handle the complexity.",
  },
  journey: {
    eyebrow: "Career journey",
    title: "Your path, mapped and managed",
    description:
      "From discovery to advancement — CareerPilot guides every phase of your professional evolution.",
  },
  agents: {
    eyebrow: "AI agents",
    title: "Meet your career intelligence team",
    description:
      "Three specialized agents, one unified mission — accelerate your career with precision.",
  },
  techStack: {
    eyebrow: "Technology",
    title: "Built on modern infrastructure",
    description: "Enterprise-grade stack powering autonomous career intelligence.",
  },
  ibm: {
    eyebrow: "Partnership",
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "Where we're headed",
    description: "Transparent progress on the platform we're building together.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Loved by early adopters",
    description: "Professionals who've experienced the CareerPilot difference.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    description: "Everything you need to know about CareerPilot AI.",
  },
} as const;
