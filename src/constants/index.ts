export const COLLECTIONS = {
  USERS: "users",
  RESUMES: "resumes",
  ROADMAPS: "roadmaps",
  INTERVIEW_SESSIONS: "interview_sessions",
  PORTFOLIOS: "portfolios",
  PROJECTS: "projects",
  ANALYTICS: "analytics",
  NOTIFICATIONS: "notifications",
  AGENT_MEMORIES: "agent_memories",
} as const;

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  MENTOR: "mentor",
} as const;

export const PERMISSIONS = {
  READ_PROFILE: "read:profile",
  WRITE_PROFILE: "write:profile",
  READ_ROADMAP: "read:roadmap",
  WRITE_ROADMAP: "write:roadmap",
  ANALYZE_RESUME: "analyze:resume",
  CONDUCT_INTERVIEW: "conduct:interview",
  MANAGE_USERS: "manage:users",
} as const;

export const API_ENDPOINTS = {
  RESUME: "/api/resume",
  ROADMAP: "/api/roadmap",
  INTERVIEW: "/api/interview",
  PORTFOLIO: "/api/portfolio",
  ANALYTICS: "/api/analytics",
  NOTIFICATIONS: "/api/notifications",
  AGENT: "/api/agent",
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You are not authorized to perform this action.",
  AUTHENTICATION_REQUIRED: "You must be signed in to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  BAD_REQUEST: "The request payload or parameter was invalid.",
  SERVER_ERROR: "An unexpected internal server error occurred.",
  DATABASE_ERROR: "Failed to process database operation.",
} as const;
