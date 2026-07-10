import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { AIAssistantDashboard } from "@/features/ai";
import { AgentMemoryService } from "@/services";

export default async function AiAssistantPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <AIAssistantDashboard latestWorkflow={null} memoriesCount={0} authenticated={false} />;
  }

  const memories = await AgentMemoryService.getAllMemoryByUser(session.user.id);

  return (
    <AIAssistantDashboard
      latestWorkflow={null}
      memoriesCount={memories.length}
      authenticated
    />
  );
}
