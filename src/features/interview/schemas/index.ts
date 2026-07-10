import { z } from "zod";

import {
  INTERVIEW_DIFFICULTIES,
  INTERVIEW_TYPES,
} from "@/features/interview/constants";

const difficultySchema = z.enum(INTERVIEW_DIFFICULTIES);
const interviewTypeSchema = z.enum(INTERVIEW_TYPES);

export const interviewStartSchema = z.object({
  targetRole: z.string().min(2).max(80),
  difficulty: difficultySchema.default("Intermediate"),
  interviewType: interviewTypeSchema.default("Mixed"),
  resumeSkills: z.array(z.string().min(1)).max(30).default([]),
  careerGoal: z.string().min(2).max(160).default("Become job-ready"),
  duration: z.coerce.number().int().min(5).max(120).default(30),
});

export const interviewSessionQuerySchema = z.object({
  sessionId: z.string().min(1),
});

export const interviewAnswerSchema = z.object({
  sessionId: z.string().min(1),
  questionId: z.string().min(1),
  content: z.string().min(3).max(4000),
  durationSeconds: z.coerce.number().int().min(0).max(7200).default(0),
});

export const interviewHistoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
