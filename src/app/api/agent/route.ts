import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { aiWorkflowRequestSchema } from "@/features/ai/schemas";
import { AIOrchestratorService } from "@/features/ai/services";
import { apiError, apiSuccess, generateId, withErrorHandler } from "@/lib/utils/api";
import { AgentMemoryService } from "@/services";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const memories = await AgentMemoryService.getAllMemoryByUser(session.user.id);
  return apiSuccess({ memories }, "Agent memory retrieved successfully.");
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = aiWorkflowRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid AI workflow request.", 400);
  }

  const sessionId = parsed.data.sessionId ?? generateId("ai-session");
  const workflow = await AIOrchestratorService.execute({
    ...parsed.data,
    userId: session.user.id,
    sessionId,
  });

  await AgentMemoryService.upsertMemory(session.user.id, sessionId, workflow.memorySummary, [
    { role: "user", content: parsed.data.request, timestamp: new Date() },
    { role: "assistant", content: JSON.stringify(workflow), timestamp: new Date() },
  ]);

  return apiSuccess({ workflow }, "Agent workflow executed successfully.");
});
