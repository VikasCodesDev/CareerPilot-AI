import { MongooseRepository } from "./mongoose.repository";
import { User, UserDocument } from "@/models/User";
import { Resume, ResumeDocument } from "@/models/Resume";
import { Roadmap, RoadmapDocument } from "@/models/Roadmap";
import { InterviewSession, InterviewSessionDocument } from "@/models/InterviewSession";
import { Portfolio, PortfolioDocument } from "@/models/Portfolio";
import { Project, ProjectDocument } from "@/models/Project";
import { Analytics, AnalyticsDocument } from "@/models/Analytics";
import { Notification, NotificationDocument } from "@/models/Notification";
import { AgentMemory, AgentMemoryDocument } from "@/models/AgentMemory";
import type { ResumeStatus } from "@/types/resume";

export class UserRepository extends MongooseRepository<UserDocument> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email: email.toLowerCase() });
  }
}

export class ResumeRepository extends MongooseRepository<ResumeDocument> {
  constructor() {
    super(Resume);
  }

  async findAllByUserId(userId: string): Promise<ResumeDocument[]> {
    return this.findMany({ userId, status: "active" as ResumeStatus });
  }

  async findByUser(userId: string, includeArchived = false): Promise<ResumeDocument[]> {
    const filter = includeArchived
      ? { userId }
      : { userId, status: "active" as ResumeStatus };
    return this.findMany(filter);
  }

  async latestVersion(userId: string): Promise<ResumeDocument | null> {
    const resumes = await this.findMany({ userId, status: "active" as ResumeStatus });
    if (!resumes || resumes.length === 0) return null;
    return resumes.reduce((latest, current) => {
      return (current.version || 1) > (latest.version || 1) ? current : latest;
    }, resumes[0]);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.updateById(id, { status: "archived" as ResumeStatus });
    return result !== null;
  }
}

export class RoadmapRepository extends MongooseRepository<RoadmapDocument> {
  constructor() {
    super(Roadmap);
  }

  async findByUserId(userId: string): Promise<RoadmapDocument | null> {
    return this.findOne({ userId });
  }
}

export class InterviewSessionRepository extends MongooseRepository<InterviewSessionDocument> {
  constructor() {
    super(InterviewSession);
  }

  async findSessionsByUserId(userId: string): Promise<InterviewSessionDocument[]> {
    return this.findMany({ userId });
  }

  async findActiveSession(userId: string): Promise<InterviewSessionDocument | null> {
    return this.findOne({ userId, status: "active" });
  }
}

export class PortfolioRepository extends MongooseRepository<PortfolioDocument> {
  constructor() {
    super(Portfolio);
  }

  async findByUserId(userId: string): Promise<PortfolioDocument | null> {
    return this.findOne({ userId });
  }

  async findBySlug(slug: string): Promise<PortfolioDocument | null> {
    return this.findOne({ slug });
  }
}

export class ProjectRepository extends MongooseRepository<ProjectDocument> {
  constructor() {
    super(Project);
  }

  async findAllByUserId(userId: string): Promise<ProjectDocument[]> {
    return this.findMany({ userId });
  }
}

export class AnalyticsRepository extends MongooseRepository<AnalyticsDocument> {
  constructor() {
    super(Analytics);
  }

  async findByUserId(userId: string): Promise<AnalyticsDocument | null> {
    return this.findOne({ userId });
  }
}

export class NotificationRepository extends MongooseRepository<NotificationDocument> {
  constructor() {
    super(Notification);
  }

  async findUnreadByUserId(userId: string): Promise<NotificationDocument[]> {
    return this.findMany({ userId, read: false });
  }

  async markAllReadByUserId(userId: string): Promise<void> {
    await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
  }
}

export class AgentMemoryRepository extends MongooseRepository<AgentMemoryDocument> {
  constructor() {
    super(AgentMemory);
  }

  async findBySessionId(sessionId: string): Promise<AgentMemoryDocument | null> {
    return this.findOne({ sessionId });
  }

  async findByUserId(userId: string): Promise<AgentMemoryDocument[]> {
    return this.findMany({ userId });
  }
}

// Singleton repository instances
export const userRepository = new UserRepository();
export const resumeRepository = new ResumeRepository();
export const roadmapRepository = new RoadmapRepository();
export const interviewSessionRepository = new InterviewSessionRepository();
export const portfolioRepository = new PortfolioRepository();
export const projectRepository = new ProjectRepository();
export const analyticsRepository = new AnalyticsRepository();
export const notificationRepository = new NotificationRepository();
export const agentMemoryRepository = new AgentMemoryRepository();
