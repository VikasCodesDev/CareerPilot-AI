import { connectToDatabase } from "@/lib/db";
import {
  hashPassword,
  verifyPassword,
  generateRandomToken,
  hashToken,
  verifyToken,
} from "@/lib/crypto";
import type { InterviewSessionDocument } from "@/models/InterviewSession";
import type { PortfolioDocument } from "@/models/Portfolio";
import type { RoadmapDocument } from "@/models/Roadmap";
import type { UserDocument } from "@/models/User";
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

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  careerGoal?: string;
}

// ---------------------------------------------------------------------------
// Auth Service
// ---------------------------------------------------------------------------
export class AuthService {
  /** Lookup a user by their email address */
  static async getUserByEmail(email: string): Promise<IUser | null> {
    await connectToDatabase();
    const doc = await userRepository.findByEmail(email);
    if (!doc) return null;
    return this.toPublicUser(doc);
  }

  /** Lookup a user by their MongoDB _id */
  static async getUserById(id: string): Promise<IUser | null> {
    await connectToDatabase();
    const doc = await userRepository.findById(id);
    if (!doc) return null;
    return this.toPublicUser(doc);
  }

  static async authenticateUser(
    email: string,
    password: string,
  ): Promise<IUser | null> {
    await connectToDatabase();
    const existing = await userRepository.findByEmail(email);
    if (!existing || !existing.passwordHash) return null;
    const validPassword = verifyPassword(password, existing.passwordHash);
    if (!validPassword) return null;
    return this.toPublicUser(existing);
  }

  static async registerUser(input: RegisterUserInput): Promise<IUser> {
    await connectToDatabase();
    const normalizedEmail = input.email.toLowerCase();
    const existing = await userRepository.findByEmail(normalizedEmail);
    if (existing) {
      throw new Error("A user with this email already exists.");
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const verificationTokenHash = hashToken(verificationCode);
    const verificationExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    const passwordHash = hashPassword(input.password);

    const created = await userRepository.create({
      name: input.name,
      email: normalizedEmail,
      passwordHash,
      role: "user",
      emailVerified: false,
      verificationTokenHash,
      verificationExpires,
      metadata: {
        completedOnboarding: false,
        careerGoal: input.careerGoal || "",
        skills: [],
      },
    } as Partial<UserDocument>);

    // Log the verification code in development for manual testing
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `Email verification code for ${normalizedEmail}: ${verificationCode}`,
      );
    }

    return this.toPublicUser(created);
  }

  static async verifyEmailCode(email: string, code: string): Promise<boolean> {
    await connectToDatabase();
    const existing = await userRepository.findByEmail(email.toLowerCase());
    if (
      !existing ||
      !existing.verificationTokenHash ||
      !existing.verificationExpires
    ) {
      return false;
    }

    if (existing.emailVerified) {
      return true;
    }

    if (existing.verificationExpires < new Date()) {
      return false;
    }

    const validCode = verifyToken(code, existing.verificationTokenHash);
    if (!validCode) {
      return false;
    }

    await userRepository.updateById(existing._id.toString(), {
      emailVerified: true,
      verificationTokenHash: null,
      verificationExpires: null,
    } as Partial<UserDocument>);
    return true;
  }

  static async sendPasswordResetLink(email: string): Promise<void> {
    await connectToDatabase();
    const existing = await userRepository.findByEmail(email.toLowerCase());
    if (!existing) {
      throw new Error("No account matches this email address.");
    }

    const resetToken = generateRandomToken(40);
    const resetHash = hashToken(resetToken);
    const resetExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await userRepository.updateById(existing._id.toString(), {
      passwordResetTokenHash: resetHash,
      passwordResetExpires: resetExpiry,
    } as Partial<UserDocument>);

    if (process.env.NODE_ENV !== "production") {
      console.info(`Password reset token for ${email}: ${resetToken}`);
    }
  }

  static async updateOnboarding(
    userId: string,
    metadata: Partial<{
      completedOnboarding: boolean;
      careerGoal: string;
      targetRole: string;
      skills: string[];
    }>,
  ): Promise<IUser> {
    await connectToDatabase();
    const existing = await userRepository.findById(userId);
    if (!existing) {
      throw new Error("User not found.");
    }

    const updated = await userRepository.updateById(userId, {
      metadata: {
        ...existing.metadata,
        ...metadata,
      },
    } as Partial<UserDocument>);

    if (!updated) {
      throw new Error("Failed to update onboarding metadata.");
    }

    return this.toPublicUser(updated);
  }

  static async upsertOAuthUser(
    data: Pick<IUser, "name" | "email" | "image" | "role" | "metadata">,
  ): Promise<IUser> {
    await connectToDatabase();
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      const updated = await userRepository.updateById(existing._id.toString(), {
        name: data.name,
        image: data.image,
        role: data.role,
        metadata: data.metadata,
        emailVerified: true,
      } as Partial<UserDocument>);

      if (!updated) {
        throw new Error("Failed to update OAuth user.");
      }
      return this.toPublicUser(updated);
    }
    const created = await userRepository.create({
      ...data,
      email: data.email.toLowerCase(),
      emailVerified: true,
      passwordHash: null,
    } as Partial<UserDocument>);
    return this.toPublicUser(created);
  }

  private static toPublicUser(doc: UserDocument): IUser {
    return {
      _id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      image: doc.image,
      role: doc.role,
      metadata: doc.metadata || {
        completedOnboarding: false,
        careerGoal: "",
        targetRole: "",
        skills: [],
      },
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
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
    data: Omit<IResume, "_id" | "userId" | "createdAt" | "updatedAt"> & {
      originalName?: string;
      fileType?: string;
    },
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
    data: Omit<IRoadmap, "_id" | "userId" | "createdAt" | "updatedAt">,
  ): Promise<IRoadmap> {
    await connectToDatabase();
    const existing = await roadmapRepository.findByUserId(userId);
    if (existing) {
      const updated = await roadmapRepository.updateById(
        existing._id.toString(),
        data as unknown as Partial<RoadmapDocument>,
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
    data: Omit<IPortfolio, "_id" | "userId" | "createdAt" | "updatedAt">,
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
    difficulty: "beginner" | "intermediate" | "advanced",
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
    data: Pick<INotification, "title" | "message" | "type" | "link">,
  ): Promise<INotification> {
    await connectToDatabase();
    const doc = await notificationRepository.create({
      ...data,
      userId,
      read: false,
    });
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
  static async getMemoryBySession(
    sessionId: string,
  ): Promise<IAgentMemory | null> {
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
    chatHistory: IAgentMemory["chatHistory"],
  ): Promise<IAgentMemory> {
    await connectToDatabase();
    const existing = await agentMemoryRepository.findBySessionId(sessionId);
    if (existing) {
      const updated = await agentMemoryRepository.updateById(
        existing._id.toString(),
        {
          contextSummary,
          chatHistory,
          lastInteractionTime: new Date(),
        },
      );
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
