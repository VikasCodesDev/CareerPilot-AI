import type { AIAgentName } from "@/features/ai/types";

export const AI_AGENT_ORDER: AIAgentName[] = [
  "Goal Analyzer",
  "Resume Agent",
  "Skill Gap Agent",
  "Roadmap Agent",
  "Planner Agent",
  "Portfolio Agent",
  "Interview Agent",
  "Analytics Agent",
  "Opportunity Agent",
];

export const AI_AGENT_KEYWORDS: Record<AIAgentName, string[]> = {
  "Goal Analyzer": ["goal", "career", "internship", "job", "switch", "plan"],
  "Resume Agent": ["resume", "ats", "cv"],
  "Skill Gap Agent": ["skill", "gap", "missing", "learn"],
  "Roadmap Agent": ["roadmap", "timeline", "path", "milestone"],
  "Planner Agent": ["planner", "weekly", "daily", "schedule", "task"],
  "Portfolio Agent": ["portfolio", "brand", "projects", "github"],
  "Analytics Agent": ["analytics", "score", "progress", "health"],
  "Opportunity Agent": ["opportunity", "internship", "hackathon", "open source"],
  "Interview Agent": ["interview", "mock", "question", "feedback"],
};
