export type AIAgentName =
  | "Goal Analyzer"
  | "Resume Agent"
  | "Skill Gap Agent"
  | "Roadmap Agent"
  | "Planner Agent"
  | "Portfolio Agent"
  | "Analytics Agent"
  | "Opportunity Agent"
  | "Interview Agent";

export type AIProviderName = "groq" | "gemini";

export type AIExecutionStatus = "success" | "failed";

export interface AIWorkflowRequest {
  userId: string;
  goal: string;
  request: string;
  context?: Record<string, string | number | boolean | string[]>;
  uploadedResume?: string;
  sessionId?: string;
}

export interface AIExecutionStep {
  id: string;
  agent: AIAgentName;
  status: AIExecutionStatus;
  summary: string;
  recommendations: string[];
  warnings: string[];
  provider: AIProviderName;
  executionTimeMs: number;
}

export interface AIWorkflowResponse {
  status: AIExecutionStatus;
  provider: AIProviderName;
  summary: string;
  recommendations: string[];
  roadmap: string[];
  planner: string[];
  warnings: string[];
  nextAction: string;
  selectedAgents: AIAgentName[];
  executionTimeline: AIExecutionStep[];
  memorySummary: string;
}

export interface AIProviderResult {
  provider: AIProviderName;
  status: AIExecutionStatus;
  content: string;
  executionTimeMs: number;
}
