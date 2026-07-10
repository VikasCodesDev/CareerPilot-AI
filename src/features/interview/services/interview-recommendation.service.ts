import type { InterviewSession } from "@/features/interview/types";

export class InterviewRecommendationService {
  static generate(session: InterviewSession | null): string[] {
    if (!session) {
      return [
        "Start a mixed interview session to establish a baseline.",
        "Add resume skills to generate more role-specific questions.",
      ];
    }

    const recommendations = [
      session.score.communicationScore < 75 ? "Practice concise STAR-format answers." : "",
      session.score.technicalScore < 75 ? "Add implementation details and tradeoffs to technical answers." : "",
      session.score.confidenceScore < 75 ? "Use measurable outcomes to strengthen confidence." : "",
      session.score.problemSolvingScore < 75 ? "Explain the debugging path before giving the final answer." : "",
    ].filter(Boolean);

    return recommendations.length
      ? recommendations
      : ["Move to advanced mock interviews and resume-based follow-up questions."];
  }
}
