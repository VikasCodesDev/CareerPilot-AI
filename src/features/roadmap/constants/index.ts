import type { RoadmapPhase, RoadmapTaskType, SupportedRoadmapRole } from "@/features/roadmap/types";

export const SUPPORTED_ROADMAP_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cyber Security Engineer",
  "Android Developer",
  "Game Developer",
  "UI UX Designer",
] as const satisfies readonly SupportedRoadmapRole[];

export const ROADMAP_PHASES = [
  "Foundation",
  "Intermediate",
  "Projects",
  "Advanced",
  "Interview Preparation",
  "Portfolio",
  "Job Applications",
] as const satisfies readonly RoadmapPhase[];

export const ROADMAP_TASK_TYPES = [
  "Video",
  "Reading",
  "Practice",
  "Quiz",
  "Assignment",
  "Mini Project",
  "Major Project",
  "Mock Interview",
  "Revision",
] as const satisfies readonly RoadmapTaskType[];

export const ROLE_SKILL_MAP: Record<SupportedRoadmapRole, string[]> = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Accessibility", "Testing"],
  "Backend Developer": ["Node.js", "API Design", "Databases", "Authentication", "Caching", "Testing", "System Design"],
  "Full Stack Developer": ["HTML", "CSS", "TypeScript", "React", "Next.js", "Node.js", "MongoDB", "API Design", "Testing"],
  "AI Engineer": ["Python", "Machine Learning", "Prompting", "Vector Search", "APIs", "Evaluation", "Deployment"],
  "Machine Learning Engineer": ["Python", "Statistics", "ML Algorithms", "Feature Engineering", "MLOps", "Model Evaluation"],
  "Data Scientist": ["Python", "Statistics", "SQL", "Data Cleaning", "Visualization", "Machine Learning", "Storytelling"],
  "Data Analyst": ["SQL", "Excel", "Python", "Dashboards", "Data Cleaning", "Statistics", "Business Metrics"],
  "DevOps Engineer": ["Linux", "Git", "Docker", "CI/CD", "Cloud", "Monitoring", "Infrastructure as Code"],
  "Cloud Engineer": ["Linux", "Networking", "Cloud Services", "Security", "Docker", "IaC", "Monitoring"],
  "Cyber Security Engineer": ["Networking", "Linux", "Security Basics", "Threat Modeling", "OWASP", "SIEM", "Incident Response"],
  "Android Developer": ["Kotlin", "Android SDK", "Jetpack", "UI", "APIs", "Storage", "Testing"],
  "Game Developer": ["Game Design", "Unity", "C#", "Physics", "Level Design", "Optimization", "Publishing"],
  "UI UX Designer": ["User Research", "Wireframing", "Figma", "Design Systems", "Prototyping", "Accessibility", "Usability Testing"],
};

export const PHASE_TASK_TYPES: Record<RoadmapPhase, RoadmapTaskType[]> = {
  Foundation: ["Reading", "Video", "Practice", "Quiz"],
  Intermediate: ["Reading", "Practice", "Assignment", "Revision"],
  Projects: ["Mini Project", "Major Project", "Practice"],
  Advanced: ["Reading", "Assignment", "Practice", "Revision"],
  "Interview Preparation": ["Mock Interview", "Quiz", "Revision"],
  Portfolio: ["Assignment", "Mini Project", "Revision"],
  "Job Applications": ["Reading", "Assignment", "Revision"],
};
