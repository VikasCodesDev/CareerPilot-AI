import type { InterviewQuestion, InterviewSessionInput } from "@/features/interview/types";
import { generateInterviewQuestions } from "@/features/interview/utils/question-generator";

export class QuestionService {
  static generateQuestions(input: InterviewSessionInput): InterviewQuestion[] {
    return generateInterviewQuestions(input);
  }

  static getCurrentQuestion(questions: readonly InterviewQuestion[], currentQuestion: number) {
    return questions[currentQuestion] ?? questions.at(-1) ?? null;
  }
}
