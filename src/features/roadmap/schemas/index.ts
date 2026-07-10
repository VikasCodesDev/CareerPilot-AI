import { z } from "zod";

import {
  ROADMAP_PHASES,
  ROADMAP_TASK_TYPES,
  SUPPORTED_ROADMAP_ROLES,
} from "@/features/roadmap/constants";

const supportedRoleSchema = z.enum(SUPPORTED_ROADMAP_ROLES);
const roadmapPhaseSchema = z.enum(ROADMAP_PHASES);
const experienceSchema = z.enum(["beginner", "intermediate", "advanced"]);
const statusSchema = z.enum(["pending", "in-progress", "completed"]);

export const roadmapCreateSchema = z.object({
  careerGoal: z.string().min(3).max(160),
  currentSkills: z.array(z.string().min(1)).max(40).default([]),
  targetRole: supportedRoleSchema,
  experienceLevel: experienceSchema,
  learningHoursPerWeek: z.coerce.number().int().min(2).max(40).default(8),
  timelineWeeks: z.coerce.number().int().min(4).max(52).default(24),
});

export const roadmapUpdateSchema = z.object({
  roadmapId: z.string().min(1),
  careerGoal: z.string().min(3).max(160).optional(),
  status: z.enum(["draft", "active", "completed", "archived"]).optional(),
  currentPhase: roadmapPhaseSchema.optional(),
});

export const roadmapDeleteSchema = z.object({
  roadmapId: z.string().min(1),
});

export const roadmapProgressSchema = z.object({
  roadmapId: z.string().min(1),
  taskId: z.string().min(1).optional(),
  milestoneId: z.string().min(1).optional(),
  status: statusSchema,
});

export const roadmapRecommendationSchema = z.object({
  roadmapId: z.string().min(1).optional(),
  targetRole: supportedRoleSchema.optional(),
  currentSkills: z.array(z.string().min(1)).max(40).optional(),
});

export const roadmapTaskTypeSchema = z.enum(ROADMAP_TASK_TYPES);
