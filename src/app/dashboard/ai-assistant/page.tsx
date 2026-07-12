import { getServerSession } from "next-auth";

import { AIAssistantDashboard } from "@/features/ai";
import type { AIWorkflowResponse } from "@/features/ai/types";
import { authOptions } from "@/features/auth/config/auth.config";
import { AgentMemoryService } from "@/services";
import type { IAgentMemory } from "@/types/backend";

function parseWorkflow(memory: IAgentMemory): AIWorkflowResponse | null {
  const assistantMessage = [...memory.chatHistory]
    .reverse()
    .find((message) => message.role === "assistant");

  if (!assistantMessage) return null;

  try {
    const parsed = JSON.parse(assistantMessage.content) as AIWorkflowResponse;
    return Array.isArray(parsed.executionTimeline) ? parsed : null;
  } catch {
    return null;
  }
}

export default async function AiAssistantPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <AIAssistantDashboard latestWorkflow={null} memoriesCount={0} authenticated={false} />;
  }

  const memories = await AgentMemoryService.getAllMemoryByUser(session.user.id);
  const latestWorkflow =
    [...memories]
      .sort(
        (a, b) =>
          new Date(b.lastInteractionTime).getTime() -
          new Date(a.lastInteractionTime).getTime(),
      )
      .map(parseWorkflow)
      .find((workflow): workflow is AIWorkflowResponse => workflow !== null) ?? null;

  return (
    <AIAssistantDashboard
      latestWorkflow={latestWorkflow}
      memoriesCount={memories.length}
      authenticated
    />
  );
}
