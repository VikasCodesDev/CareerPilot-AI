import type { InterviewReport, InterviewSession } from "@/features/interview/types";
import { calculateInterviewProgress } from "@/features/interview/utils/progress-calculator";
import { InterviewRecommendationService } from "./interview-recommendation.service";

export class InterviewReportService {
  static createReport(session: InterviewSession): InterviewReport {
    const completionRate = calculateInterviewProgress(session);
    const readinessLabel =
      session.score.overallScore >= 85
        ? "Interview Ready"
        : session.score.overallScore >= 70
          ? "Close to Ready"
          : "Practice Recommended";

    return {
      session,
      recommendations: InterviewRecommendationService.generate(session),
      completionRate,
      readinessLabel,
    };
  }
}
