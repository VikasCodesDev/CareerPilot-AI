import { z } from "zod";

export const aiWorkflowRequestSchema = z.object({
  goal: z.string().min(3).max(240),
  request: z.string().min(3).max(4000),
  context: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])).optional(),
  uploadedResume: z.string().max(20000).optional(),
  sessionId: z.string().min(1).optional(),
});
