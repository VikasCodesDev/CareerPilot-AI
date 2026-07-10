import { z } from "zod";

export const atsAnalyzeRequestSchema = z
  .object({
    resumeId: z.string().min(1).optional(),
    resumeText: z.string().min(40, "Resume text must be at least 40 characters.").optional(),
    requiredSkills: z.array(z.string().min(1)).max(40).optional(),
    targetRole: z.string().min(2).max(120).optional(),
    save: z.boolean().optional(),
  })
  .refine((value) => Boolean(value.resumeId || value.resumeText), {
    message: "Provide either resumeId or resumeText.",
    path: ["resumeId"],
  });

export const atsHistoryQuerySchema = z.object({
  resumeId: z.string().min(1).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export const atsAnalysisIdQuerySchema = z.object({
  analysisId: z.string().min(1),
});

export const atsScoreRequestSchema = z.object({
  resumeText: z.string().min(40, "Resume text must be at least 40 characters."),
  requiredSkills: z.array(z.string().min(1)).max(40).optional(),
  targetRole: z.string().min(2).max(120).optional(),
});
