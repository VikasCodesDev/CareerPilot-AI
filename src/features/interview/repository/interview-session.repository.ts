import { InterviewSession, InterviewSessionDocument } from "@/models/InterviewSession";
import type { InterviewSession as InterviewSessionEntity } from "@/features/interview/types";

function toIsoString(date: Date | string | undefined): string | undefined {
  return date ? new Date(date).toISOString() : undefined;
}

function toInterviewSession(doc: InterviewSessionDocument): InterviewSessionEntity {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    targetRole: doc.targetRole,
    difficulty: doc.difficulty,
    interviewType: doc.interviewType,
    currentQuestion: doc.currentQuestion,
    questions: doc.questions,
    answers: doc.answers,
    feedback: doc.feedback,
    score: doc.score,
    strengths: doc.strengths,
    weaknesses: doc.weaknesses,
    suggestions: doc.suggestions,
    duration: doc.duration,
    status: doc.status,
    startedAt: doc.startedAt.toISOString(),
    completedAt: toIsoString(doc.completedAt),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export class InterviewFeatureRepository {
  async createSession(
    session: Omit<InterviewSessionEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<InterviewSessionEntity> {
    const created = await InterviewSession.create(session);
    return toInterviewSession(created);
  }

  async getSession(sessionId: string, userId: string): Promise<InterviewSessionEntity | null> {
    const session = await InterviewSession.findOne({ _id: sessionId, userId }).exec();
    return session ? toInterviewSession(session) : null;
  }

  async getLatestSession(userId: string): Promise<InterviewSessionEntity | null> {
    const session = await InterviewSession.findOne({ userId, status: { $ne: "archived" } })
      .sort({ updatedAt: -1 })
      .exec();
    return session ? toInterviewSession(session) : null;
  }

  async updateSession(
    sessionId: string,
    userId: string,
    data: Partial<Omit<InterviewSessionEntity, "id" | "userId" | "createdAt" | "updatedAt">>
  ): Promise<InterviewSessionEntity | null> {
    const updated = await InterviewSession.findOneAndUpdate(
      { _id: sessionId, userId },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();

    return updated ? toInterviewSession(updated) : null;
  }

  async completeSession(
    sessionId: string,
    userId: string,
    data: Pick<
      InterviewSessionEntity,
      "score" | "strengths" | "weaknesses" | "suggestions" | "status" | "completedAt"
    >
  ): Promise<InterviewSessionEntity | null> {
    return this.updateSession(sessionId, userId, data);
  }

  async deleteSession(sessionId: string, userId: string): Promise<boolean> {
    const result = await InterviewSession.deleteOne({ _id: sessionId, userId }).exec();
    return result.deletedCount === 1;
  }

  async listHistory(userId: string, options: { page: number; limit: number }) {
    const skip = (options.page - 1) * options.limit;
    const [data, total] = await Promise.all([
      InterviewSession.find({ userId }).sort({ updatedAt: -1 }).skip(skip).limit(options.limit).exec(),
      InterviewSession.countDocuments({ userId }).exec(),
    ]);
    const totalPages = Math.ceil(total / options.limit);

    return {
      data: data.map(toInterviewSession),
      total,
      page: options.page,
      limit: options.limit,
      totalPages,
      hasNextPage: options.page < totalPages,
      hasPrevPage: options.page > 1,
    };
  }
}

export const interviewFeatureRepository = new InterviewFeatureRepository();
