import { interviewFeatureRepository } from "@/features/interview/repository";
import type { InterviewHistoryItem } from "@/features/interview/types";
import { connectToDatabase } from "@/lib/db";

function toHistoryItem(session: Awaited<ReturnType<typeof interviewFeatureRepository.getLatestSession>>): InterviewHistoryItem {
  if (!session) {
    throw new Error("Cannot map an empty interview session.");
  }

  return {
    id: session.id,
    targetRole: session.targetRole,
    difficulty: session.difficulty,
    interviewType: session.interviewType,
    score: session.score.overallScore,
    status: session.status,
    completedQuestions: session.answers.length,
    totalQuestions: session.questions.length,
    updatedAt: session.updatedAt,
  };
}

export class InterviewHistoryService {
  static async getLatest(userId: string) {
    await connectToDatabase();
    return interviewFeatureRepository.getLatestSession(userId);
  }

  static async listHistory(userId: string, options: { page: number; limit: number }) {
    await connectToDatabase();
    const result = await interviewFeatureRepository.listHistory(userId, options);

    return {
      ...result,
      data: result.data.map((session) => toHistoryItem(session)),
    };
  }

  static async deleteSession(sessionId: string, userId: string): Promise<boolean> {
    await connectToDatabase();
    return interviewFeatureRepository.deleteSession(sessionId, userId);
  }
}
