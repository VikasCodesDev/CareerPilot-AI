import { connectToDatabase } from "@/lib/db";
import type { InterviewSessionDocument } from "@/models/InterviewSession";
import type { PortfolioDocument } from "@/models/Portfolio";
import type { RoadmapDocument } from "@/models/Roadmap";
import {
  userRepository,
  resumeRepository,
  roadmapRepository,
  interviewSessionRepository,
  portfolioRepository,
  projectRepository,
  analyticsRepository,
  notificationRepository,
  agentMemoryRepository,
} from "@/repositories";
import type {
  IUser,
  IResume,
  IRoadmap,
  IInterviewSession,
  IPortfolio,
  IProject,
  IAnalytics,
  INotification,
  IAgentMemory,
} from "@/types/backend";

// ---------------------------------------------------------------------------
// Auth Service
// ---------------------------------------------------------------------------
export class AuthService {
  /** Lookup a user by their email address */
  static async getUserByEmail(email: string): Promise<IUser | null> {
    await connectToDatabase();
    const doc = await userRepository.findByEmail(email);
    return doc as unknown as IUser | null;
  }

  /** Lookup a user by their MongoDB _id */
  static async getUserById(id: string): Promise<IUser | null> {
    await connectToDatabase();
    const doc = await userRepository.findById(id);
    return doc as unknown as IUser | null;
  }

  /** Upsert a user record (OAuth sign-in flows) */
  static async upsertOAuthUser(
    data: Pick<IUser, "name" | "email" | "image" | "role" | "metadata">
  ): Promise<IUser> {
    await connectToDatabase();
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      const updated = await userRepository.updateById(existing._id.toString(), data);
      return updated as unknown as IUser;
    }
    const created = await userRepository.create(data);
    return created as unknown as IUser;
  }
}

// ---------------------------------------------------------------------------
// Resume Service (delegated to ResumeStorageService for backward compatibility)
// ---------------------------------------------------------------------------
import { ResumeStorageService } from "./resume/resume-storage.service";

export class ResumeService {
  /** Retrieve all resumes belonging to a user */
  static async getResumesByUser(userId: string): Promise<IResume[]> {
    const docs = await ResumeStorageService.listUserResumes(userId);
    return docs as unknown as IResume[];
  }

  /** Retrieve a single resume by id */
  static async getResumeById(id: string): Promise<IResume | null> {
    await connectToDatabase();
    const doc = await resumeRepository.findById(id);
    return doc as unknown as IResume | null;
  }

  /** Create a resume record */
  static async createResume(
    userId: string,
    data: Omit<IResume, "_id" | "userId" | "createdAt" | "updatedAt"> & { originalName?: string; fileType?: string }
  ): Promise<IResume> {
    const doc = await ResumeStorageService.createResume(userId, {
      fileName: data.fileName,
      originalName: data.originalName || data.fileName,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize,
      fileType: data.fileType || "application/pdf",
    });
    return doc as unknown as IResume;
  }

  /** Delete a resume by id */
  static async deleteResume(id: string): Promise<boolean> {
    await connectToDatabase();
    return resumeRepository.deleteById(id);
  }
}

export * from "./resume/resume-validation.service";
export * from "./resume/resume-upload.service";
export * from "./resume/resume-storage.service";
export * from "./resume/resume-version.service";
export * from "./resume/resume-preview.service";

// ---------------------------------------------------------------------------
// Roadmap Service
// ---------------------------------------------------------------------------
export class RoadmapService {
  /** Retrieve the roadmap for a user */
  static async getRoadmapByUser(userId: string): Promise<IRoadmap | null> {
    await connectToDatabase();
    const doc = await roadmapRepository.findByUserId(userId);
    return doc as unknown as IRoadmap | null;
  }

  /** Create or replace a roadmap through the legacy service facade */
  static async upsertRoadmap(
    userId: string,
    data: Omit<IRoadmap, "_id" | "userId" | "createdAt" | "updatedAt">
  ): Promise<IRoadmap> {
    await connectToDatabase();
    const existing = await roadmapRepository.findByUserId(userId);
    if (existing) {
      const updated = await roadmapRepository.updateById(
        existing._id.toString(),
        data as unknown as Partial<RoadmapDocument>
      );
      return updated as unknown as IRoadmap;
    }
    const created = await roadmapRepository.create({
      ...data,
      userId,
    } as unknown as Partial<RoadmapDocument>);
    return created as unknown as IRoadmap;
  }

  /** Legacy compatibility hook for milestone updates */
  static async updateMilestoneStatus(): Promise<void> {
    return Promise.resolve();
  }
}

// ---------------------------------------------------------------------------
// Analytics Service
// ---------------------------------------------------------------------------
export class AnalyticsService {
  /** Retrieve analytics record for a user */
  static async getAnalyticsByUser(userId: string): Promise<IAnalytics | null> {
    await connectToDatabase();
    const doc = await analyticsRepository.findByUserId(userId);
    return doc as unknown as IAnalytics | null;
  }

  /** Initialize an empty analytics record for a new user */
  static async initAnalytics(userId: string): Promise<IAnalytics> {
    await connectToDatabase();
    const existing = await analyticsRepository.findByUserId(userId);
    if (existing) return existing as unknown as IAnalytics;
    const doc = await analyticsRepository.create({
      userId,
      careerScore: 0,
      xpPoints: 0,
      streakDays: 0,
      lastActiveDate: new Date(),
      weeklyHoursStudied: [
        { day: "Mon", hours: 0 },
        { day: "Tue", hours: 0 },
        { day: "Wed", hours: 0 },
        { day: "Thu", hours: 0 },
        { day: "Fri", hours: 0 },
        { day: "Sat", hours: 0 },
        { day: "Sun", hours: 0 },
      ],
      roadmapCompletionRate: 0,
    });
    return doc as unknown as IAnalytics;
  }

  /** Legacy compatibility hook for XP events */
  static async awardXp(): Promise<void> {
    return Promise.resolve();
  }
}

// ---------------------------------------------------------------------------
// Portfolio Service
// ---------------------------------------------------------------------------
export class PortfolioService {
  /** Retrieve portfolio for a user */
  static async getPortfolioByUser(userId: string): Promise<IPortfolio | null> {
    await connectToDatabase();
    const doc = await portfolioRepository.findByUserId(userId);
    return doc as unknown as IPortfolio | null;
  }

  /** Retrieve published portfolio by slug (public route) */
  static async getPortfolioBySlug(slug: string): Promise<IPortfolio | null> {
    await connectToDatabase();
    const doc = await portfolioRepository.findBySlug(slug);
    return doc as unknown as IPortfolio | null;
  }

  /** Create a portfolio for a user */
  static async createPortfolio(
    userId: string,
    data: Omit<IPortfolio, "_id" | "userId" | "createdAt" | "updatedAt">
  ): Promise<IPortfolio> {
    await connectToDatabase();
    const doc = await portfolioRepository.create({
      ...data,
      userId,
    } as unknown as Partial<PortfolioDocument>);
    return doc as unknown as IPortfolio;
  }
}

// ---------------------------------------------------------------------------
// Interview Service
// ---------------------------------------------------------------------------
export class InterviewService {
  /** Retrieve all sessions for a user */
  static async getSessionsByUser(userId: string): Promise<IInterviewSession[]> {
    await connectToDatabase();
    const docs = await interviewSessionRepository.findSessionsByUserId(userId);
    return docs as unknown as IInterviewSession[];
  }

  /** Start a new interview session */
  static async startSession(
    userId: string,
    targetRole: string,
    difficulty: "beginner" | "intermediate" | "advanced"
  ): Promise<IInterviewSession> {
    await connectToDatabase();
    const difficultyMap = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    } as const;
    const doc = await interviewSessionRepository.create({
      userId,
      targetRole,
      difficulty: difficultyMap[difficulty],
      status: "active",
      messages: [],
    } as unknown as Partial<InterviewSessionDocument>);
    return doc as unknown as IInterviewSession;
  }

  /** Legacy compatibility hook for session completion */
  static async completeSession(): Promise<void> {
    return Promise.resolve();
  }
}

// ---------------------------------------------------------------------------
// Notification Service
// ---------------------------------------------------------------------------
export class NotificationService {
  /** Retrieve all unread notifications for a user */
  static async getUnread(userId: string): Promise<INotification[]> {
    await connectToDatabase();
    const docs = await notificationRepository.findUnreadByUserId(userId);
    return docs as unknown as INotification[];
  }

  /** Create and dispatch a notification */
  static async send(
    userId: string,
    data: Pick<INotification, "title" | "message" | "type" | "link">
  ): Promise<INotification> {
    await connectToDatabase();
    const doc = await notificationRepository.create({ ...data, userId, read: false });
    return doc as unknown as INotification;
  }

  /** Mark all notifications as read */
  static async markAllRead(userId: string): Promise<void> {
    await connectToDatabase();
    await notificationRepository.markAllReadByUserId(userId);
  }
}

// ---------------------------------------------------------------------------
// Agent Memory Service
// ---------------------------------------------------------------------------
export class AgentMemoryService {
  /** Retrieve memory for a session */
  static async getMemoryBySession(sessionId: string): Promise<IAgentMemory | null> {
    await connectToDatabase();
    const doc = await agentMemoryRepository.findBySessionId(sessionId);
    return doc as unknown as IAgentMemory | null;
  }

  /** Retrieve all memory records for a user */
  static async getAllMemoryByUser(userId: string): Promise<IAgentMemory[]> {
    await connectToDatabase();
    const docs = await agentMemoryRepository.findByUserId(userId);
    return docs as unknown as IAgentMemory[];
  }

  /** Upsert agent memory for a session */
  static async upsertMemory(
    userId: string,
    sessionId: string,
    contextSummary: string,
    chatHistory: IAgentMemory["chatHistory"]
  ): Promise<IAgentMemory> {
    await connectToDatabase();
    const existing = await agentMemoryRepository.findBySessionId(sessionId);
    if (existing) {
      const updated = await agentMemoryRepository.updateById(existing._id.toString(), {
        contextSummary,
        chatHistory,
        lastInteractionTime: new Date(),
      });
      return updated as unknown as IAgentMemory;
    }
    const doc = await agentMemoryRepository.create({
      userId,
      sessionId,
      contextSummary,
      chatHistory,
      lastInteractionTime: new Date(),
    });
    return doc as unknown as IAgentMemory;
  }

  /** Retrieve all projects for a user */
  static async getProjectsByUser(userId: string): Promise<IProject[]> {
    await connectToDatabase();
    const docs = await projectRepository.findAllByUserId(userId);
    return docs as unknown as IProject[];
  }
}
