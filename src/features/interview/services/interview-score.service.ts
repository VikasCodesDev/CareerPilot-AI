import type { InterviewFeedback, InterviewScore } from "@/features/interview/types";
import { averageScores } from "@/features/interview/utils/score-calculator";

export class InterviewScoreService {
  static calculateSessionScore(feedback: readonly InterviewFeedback[]): InterviewScore {
    return averageScores(feedback.map((item) => item.scores));
  }
}
