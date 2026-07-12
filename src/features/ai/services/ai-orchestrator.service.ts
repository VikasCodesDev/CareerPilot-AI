import { AI_AGENT_KEYWORDS, AI_AGENT_ORDER } from "@/features/ai/constants";
import type {
  AIAgentName,
  AIExecutionStep,
  AIProviderName,
  AIWorkflowRequest,
  AIWorkflowResponse,
} from "@/features/ai/types";
import { generateId } from "@/lib/utils/api";
import { AIProviderService } from "./ai-provider.service";

function selectAgents(request: AIWorkflowRequest): AIAgentName[] {
  const text = `${request.goal} ${request.request}`.toLowerCase();
  const selected = AI_AGENT_ORDER.filter((agent) =>
    AI_AGENT_KEYWORDS[agent].some((keyword) => text.includes(keyword))
  );

  return selected.length > 0
    ? selected
    : ["Goal Analyzer", "Skill Gap Agent", "Roadmap Agent", "Planner Agent", "Analytics Agent"];
}

function createAgentStep(agent: AIAgentName, request: AIWorkflowRequest, provider: AIProviderName, executionTimeMs: number): AIExecutionStep {
  const role = request.goal;
  const recommendations: Record<AIAgentName, string[]> = {
    "Goal Analyzer": [`Clarify success criteria for ${role}.`, "Convert the goal into weekly milestones."],
    "Resume Agent": ["Review ATS score and strengthen weak sections.", "Add quantified project outcomes."],
    "Skill Gap Agent": ["Prioritize missing role skills by interview value.", "Practice one core skill daily."],
    "Roadmap Agent": ["Follow the active roadmap and review progress weekly.", "Keep projects aligned with the target role."],
    "Planner Agent": ["Reserve focused learning blocks on weekdays.", "Use one revision day each week."],
    "Portfolio Agent": ["Publish strongest projects first.", "Keep portfolio copy aligned with resume keywords."],
    "Interview Agent": ["Practice STAR answers and technical tradeoffs.", "Review feedback after each answer."],
    "Analytics Agent": ["Track career score, roadmap completion, and interview readiness.", "Use weak areas to choose next tasks."],
    "Opportunity Agent": ["Apply to internships matching current skills.", "Add hackathons and open-source work to the pipeline."],
  };

  return {
    id: generateId("ai-step"),
    agent,
    status: "success",
    summary: `${agent} processed the goal using ${provider} execution.`,
    recommendations: recommendations[agent],
    warnings: agent === "Opportunity Agent" ? ["Opportunities are guidance, not guaranteed outcomes."] : [],
    provider,
    executionTimeMs,
  };
}

export class AIOrchestratorService {
  static async execute(request: AIWorkflowRequest): Promise<AIWorkflowResponse> {
    const providerResult = await AIProviderService.execute(request);
    const selectedAgents = selectAgents(request);
    const executionTimeline = selectedAgents.map((agent) =>
      createAgentStep(agent, request, providerResult.provider, providerResult.executionTimeMs)
    );
    const recommendations = [...new Set(executionTimeline.flatMap((step) => step.recommendations))];
    const warnings = [...new Set(executionTimeline.flatMap((step) => step.warnings))];

    return {
      status: providerResult.status,
      provider: providerResult.provider,
      summary:
        providerResult.content ||
        `CareerPilot planned ${selectedAgents.length} steps for ${request.goal}.`,
      recommendations,
      roadmap: [
        "Analyze current resume and skills.",
        "Close the highest-impact skill gaps.",
        "Build proof projects and update portfolio.",
        "Practice interviews and apply consistently.",
      ],
      planner: [
        "Today: complete one focused career task.",
        "This week: finish one roadmap milestone.",
        "This month: publish one measurable project improvement.",
      ],
      warnings,
      nextAction: recommendations[0] ?? "Continue with the active roadmap.",
      selectedAgents,
      executionTimeline,
      memorySummary: `Goal: ${request.goal}. Agents: ${selectedAgents.join(", ")}.`,
    };
  }
}
