import type {
  InterviewDifficulty,
  InterviewQuestionCategory,
  InterviewType,
} from "@/features/interview/types";

export const INTERVIEW_TYPES = [
  "HR",
  "Technical",
  "Behavioral",
  "Coding",
  "System Design",
  "Resume Based",
  "Mixed",
] as const satisfies readonly InterviewType[];

export const INTERVIEW_DIFFICULTIES = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const satisfies readonly InterviewDifficulty[];

export const QUESTION_CATEGORIES = [
  "Introduction",
  "Projects",
  "Technical Concepts",
  "Behavioral",
  "Problem Solving",
  "Communication",
  "Leadership",
  "Resume Discussion",
  "Strengths",
  "Weaknesses",
  "Career Goals",
] as const satisfies readonly InterviewQuestionCategory[];

export const ROLE_CONCEPT_MAP: Record<string, string[]> = {
  frontend: ["React", "accessibility", "state management", "performance", "component design"],
  backend: ["APIs", "databases", "authentication", "caching", "system reliability"],
  fullstack: ["frontend architecture", "API design", "database modeling", "deployment", "testing"],
  ai: ["model evaluation", "prompt design", "RAG", "data quality", "responsible AI"],
  machine: ["feature engineering", "model training", "evaluation metrics", "pipelines", "experiments"],
  data: ["SQL", "dashboards", "statistics", "data cleaning", "business insights"],
  devops: ["CI/CD", "containers", "observability", "cloud infrastructure", "incident response"],
  cloud: ["networking", "IAM", "serverless", "cost optimization", "resilience"],
  security: ["threat modeling", "OWASP", "incident response", "identity", "risk assessment"],
  android: ["Kotlin", "Android lifecycle", "offline storage", "performance", "testing"],
  game: ["game loops", "physics", "rendering", "optimization", "player experience"],
  design: ["user research", "wireframes", "design systems", "prototyping", "usability testing"],
  default: ["communication", "projects", "problem solving", "collaboration", "learning mindset"],
};

export const FILLER_WORDS = ["um", "uh", "like", "basically", "actually", "literally"];
