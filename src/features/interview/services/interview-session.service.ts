import { interviewFeatureRepository } from "@/features/interview/repository";
import type {
  InterviewAnswerInput,
  InterviewSession,
  InterviewSessionInput,
} from "@/features/interview/types";
import { connectToDatabase } from "@/lib/db";
import { averageScores } from "@/features/interview/utils/score-calculator";
import { AnswerEvaluationService } from "./answer-evaluation.service";
import { InterviewRecommendationService } from "./interview-recommendation.service";
import { InterviewScoreService } from "./interview-score.service";
import { QuestionService } from "./question.service";

const emptyScore = averageScores([]);

function summarizeSession(session: InterviewSession): Pick<
  InterviewSession,
  "score" | "strengths" | "weaknesses" | "suggestions"
> {
  const score = InterviewScoreService.calculateSessionScore(session.feedback);
  const strengths = [...new Set(session.feedback.flatMap((item) => item.strengths))].slice(0, 6);
  const weaknesses = [...new Set(session.feedback.flatMap((item) => item.weaknesses))].slice(0, 6);
  const suggestions = InterviewRecommendationService.generate({ ...session, score }).slice(0, 6);

  return { score, strengths, weaknesses, suggestions };
}

export class InterviewSessionService {
  static async createSession(input: InterviewSessionInput): Promise<InterviewSession> {
    const questions = QuestionService.generateQuestions(input);

    await connectToDatabase();
    return interviewFeatureRepository.createSession({
      userId: input.userId,
      targetRole: input.targetRole,
      difficulty: input.difficulty,
      interviewType: input.interviewType,
      currentQuestion: 0,
      questions,
      answers: [],
      feedback: [],
      score: emptyScore,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      duration: input.duration,
      status: "active",
      startedAt: new Date().toISOString(),
    });
  }

  static async getSession(sessionId: string, userId: string): Promise<InterviewSession | null> {
    await connectToDatabase();
    return interviewFeatureRepository.getSession(sessionId, userId);
  }

  static async submitAnswer(
    userId: string,
    input: InterviewAnswerInput
  ): Promise<InterviewSession | null> {
    await connectToDatabase();
    const session = await interviewFeatureRepository.getSession(input.sessionId, userId);
    if (!session) return null;

    const question = session.questions.find((item) => item.id === input.questionId);
    if (!question) return null;

    const evaluated = AnswerEvaluationService.evaluate(question, input);
    const answers = [...session.answers.filter((item) => item.questionId !== question.id), evaluated.answer];
    const feedback = [
      ...session.feedback.filter((item) => item.questionId !== question.id),
      evaluated.feedback,
    ];
    const currentQuestion = Math.min(
      session.questions.length - 1,
      Math.max(session.currentQuestion + 1, answers.length)
    );
    const draft = { ...session, answers, feedback, currentQuestion };
    const summary = summarizeSession(draft);
    const completed = answers.length >= session.questions.length;

    return interviewFeatureRepository.updateSession(input.sessionId, userId, {
      answers,
      feedback,
      currentQuestion,
      ...summary,
      status: completed ? "completed" : session.status,
      completedAt: completed ? new Date().toISOString() : session.completedAt,
    });
  }

  static async completeSession(sessionId: string, userId: string): Promise<InterviewSession | null> {
    await connectToDatabase();
    const session = await interviewFeatureRepository.getSession(sessionId, userId);
    if (!session) return null;

    const summary = summarizeSession(session);
    return interviewFeatureRepository.completeSession(sessionId, userId, {
      ...summary,
      status: "completed",
      completedAt: new Date().toISOString(),
    });
  }
}
