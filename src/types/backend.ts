import { UserRole, ProfileMetadata } from "@/features/auth/types";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
  metadata: ProfileMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResume {
  _id: string;
  userId: string; // Reference to User
  fileName: string;
  fileUrl: string;
  fileSize: number;
  atsScore?: number;
  skillsDetected: string[];
  feedback?: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
  rawText?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoadmapMilestone {
  id: string;
  title: string;
  description: string;
  timeline: string; // e.g. "Week 1-2"
  status: "pending" | "in-progress" | "completed";
  resources?: { name: string; url: string; type: string }[];
}

export interface IRoadmap {
  _id: string;
  userId: string; // Reference to User
  careerGoal: string;
  targetRole: string;
  estimatedMonths: number;
  skillsToAcquire: string[];
  milestones: IRoadmapMilestone[];
  progress: number; // 0 to 100
  createdAt: Date;
  updatedAt: Date;
}

export interface IInterviewMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
  feedback?: {
    clarityScore: number;
    contentScore: number;
    grammarErrors: string[];
    suggestions: string;
  };
}

export interface IInterviewSession {
  _id: string;
  userId: string; // Reference to User
  targetRole: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "active" | "completed";
  messages: IInterviewMessage[];
  overallFeedback?: {
    contentRating: number;
    communicationRating: number;
    overallScore: number;
    generalComments: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IPortfolioSection {
  id: string;
  title: string;
  type: "text" | "projects" | "skills" | "timeline";
  content: string; // JSON string or markdown
}

export interface IPortfolio {
  _id: string;
  userId: string; // Reference to User
  slug: string; // URL slug e.g. "vikas-dev"
  themeName: string; // UI theme selected
  sections: IPortfolioSection[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id: string;
  userId: string; // Reference to User
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  techStack: string[];
  featuresList: string[];
  estimatedHours: number;
  githubUrl?: string;
  demoUrl?: string;
  roadmapId?: string; // Optional linkage to Roadmap
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnalytics {
  _id: string;
  userId: string; // Reference to User
  careerScore: number;
  xpPoints: number;
  streakDays: number;
  lastActiveDate: Date;
  weeklyHoursStudied: { day: string; hours: number }[]; // Array of 7 days
  roadmapCompletionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification {
  _id: string;
  userId: string; // Reference to User
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAgentMemory {
  _id: string;
  userId: string; // Reference to User
  sessionId: string;
  contextSummary: string; // AI summarized goals/state
  chatHistory: { role: string; content: string; timestamp: Date }[];
  lastInteractionTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
