import type {
  InterviewAnswer,
  InterviewAnswerInput,
  InterviewQuestion,
} from "@/features/interview/types";
import { countWords, formatAnswer } from "@/features/interview/utils/answer-formatter";
import { calculateAnswerScore } from "@/features/interview/utils/score-calculator";
import { generateId } from "@/lib/utils/api";
import { FeedbackService } from "./feedback.service";

export class AnswerEvaluationService {
  static evaluate(question: InterviewQuestion, input: InterviewAnswerInput) {
    const formattedContent = formatAnswer(input.content);
    const answer: InterviewAnswer = {
      id: generateId("answer"),
      questionId: input.questionId,
      content: input.content,
      formattedContent,
      wordCount: countWords(input.content),
      durationSeconds: input.durationSeconds,
      submittedAt: new Date().toISOString(),
    };
    const scores = calculateAnswerScore(question, input.content);
    const feedback = FeedbackService.generateFeedback(question, answer, scores);

    return { answer, feedback };
  }
}
