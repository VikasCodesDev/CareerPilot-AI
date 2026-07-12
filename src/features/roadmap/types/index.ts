export type SupportedRoadmapRole =
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "AI Engineer"
  | "Machine Learning Engineer"
  | "Data Scientist"
  | "Data Analyst"
  | "DevOps Engineer"
  | "Cloud Engineer"
  | "Cyber Security Engineer"
  | "Android Developer"
  | "Game Developer"
  | "UI UX Designer";

export type RoadmapPhase =
  | "Foundation"
  | "Intermediate"
  | "Projects"
  | "Advanced"
  | "Interview Preparation"
  | "Portfolio"
  | "Job Applications";

export type RoadmapTaskType =
  | "Video"
  | "Reading"
  | "Practice"
  | "Quiz"
  | "Assignment"
  | "Mini Project"
  | "Major Project"
  | "Mock Interview"
  | "Revision";

export type RoadmapStatus = "draft" | "active" | "completed" | "archived";

export type RoadmapItemStatus = "pending" | "in-progress" | "completed";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type RoadmapLevel = "starter" | "growth" | "job-ready";

export interface CareerGoal {
  title: string;
  targetRole: SupportedRoadmapRole;
  timelineWeeks: number;
  learningHoursPerWeek: number;
}

export interface SkillNode {
  id: string;
  label: string;
  category: string;
  phase: RoadmapPhase;
  completed: boolean;
  dependencies: string[];
}

export interface RoadmapResource {
  id: string;
  title: string;
  type: "Video" | "Reading" | "Practice" | "Project" | "Documentation";
  phase: RoadmapPhase;
  description: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  type: RoadmapTaskType;
  phase: RoadmapPhase;
  week: number;
  estimatedHours: number;
  status: RoadmapItemStatus;
  skillTags: string[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  phase: RoadmapPhase;
  week: number;
  status: RoadmapItemStatus;
  taskIds: string[];
}

export interface WeeklyGoal {
  week: number;
  title: string;
  focus: string;
  taskIds: string[];
  targetHours: number;
  completedHours: number;
}

export interface MonthlyGoal {
  month: number;
  title: string;
  focus: string;
  milestoneIds: string[];
  completionTarget: number;
}

export interface RoadmapDeadline {
  id: string;
  title: string;
  week: number;
  phase: RoadmapPhase;
  dueDate: string;
}

export interface RoadmapProgress {
  completionPercentage: number;
  completedTasks: number;
  totalTasks: number;
  completedMilestones: number;
  totalMilestones: number;
  learningHoursCompleted: number;
  learningHoursPlanned: number;
  currentWeek: number;
}

export interface Roadmap {
  id: string;
  userId: string;
  careerGoal: string;
  currentSkills: string[];
  targetRole: SupportedRoadmapRole;
  experienceLevel: ExperienceLevel;
  roadmapLevel: RoadmapLevel;
  estimatedDuration: number;
  currentPhase: RoadmapPhase;
  progress: RoadmapProgress;
  completion: number;
  milestones: RoadmapMilestone[];
  tasks: RoadmapTask[];
  resources: RoadmapResource[];
  deadlines: RoadmapDeadline[];
  weeklyGoals: WeeklyGoal[];
  monthlyGoals: MonthlyGoal[];
  skillGraph: SkillNode[];
  learningHoursPerWeek: number;
  status: RoadmapStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapGenerationInput {
  userId: string;
  careerGoal: string;
  currentSkills: string[];
  targetRole: SupportedRoadmapRole;
  experienceLevel: ExperienceLevel;
  learningHoursPerWeek: number;
  timelineWeeks: number;
}

export interface RoadmapProgressUpdate {
  taskId?: string;
  milestoneId?: string;
  status: RoadmapItemStatus;
}
