import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(["user", "admin", "mentor"]).default("user"),
  metadata: z.object({
    completedOnboarding: z.boolean().default(false),
    careerGoal: z.string().optional(),
    targetRole: z.string().optional(),
    experienceLevel: z.enum(["entry", "mid", "senior"]).optional(),
    skills: z.array(z.string()).default([]),
    resumeUrl: z.string().url().optional().or(z.literal("")),
  }),
});

export const resumeValidationSchema = z.object({
  fileName: z.string().min(1),
  fileUrl: z.string().url(),
  fileSize: z.number().positive(),
  atsScore: z.number().min(0).max(100).optional(),
  skillsDetected: z.array(z.string()).default([]),
  feedback: z
    .object({
      strengths: z.array(z.string()).default([]),
      weaknesses: z.array(z.string()).default([]),
      improvements: z.array(z.string()).default([]),
    })
    .optional(),
  rawText: z.string().optional(),
});

export const roadmapMilestoneValidationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  timeline: z.string().min(1),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  resources: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.string(),
      })
    )
    .optional(),
});

export const roadmapValidationSchema = z.object({
  careerGoal: z.string().min(3),
  targetRole: z.string().min(2),
  estimatedMonths: z.number().int().positive(),
  skillsToAcquire: z.array(z.string()).default([]),
  milestones: z.array(roadmapMilestoneValidationSchema).default([]),
  progress: z.number().min(0).max(100).default(0),
});

export const interviewSessionValidationSchema = z.object({
  targetRole: z.string().min(2),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate"),
  status: z.enum(["active", "completed"]).default("active"),
});

export const portfolioSectionValidationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["text", "projects", "skills", "timeline"]),
  content: z.string().min(1), // Should be serialized JSON or markdown content
});

export const portfolioValidationSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  themeName: z.string().min(1).default("default"),
  sections: z.array(portfolioSectionValidationSchema).default([]),
  published: z.boolean().default(false),
});

export const analyticsValidationSchema = z.object({
  careerScore: z.number().min(0).max(100).default(0),
  xpPoints: z.number().nonnegative().default(0),
  streakDays: z.number().nonnegative().default(0),
  lastActiveDate: z.date().optional(),
  weeklyHoursStudied: z
    .array(
      z.object({
        day: z.string(),
        hours: z.number().nonnegative(),
      })
    )
    .length(7),
  roadmapCompletionRate: z.number().min(0).max(100).default(0),
});
