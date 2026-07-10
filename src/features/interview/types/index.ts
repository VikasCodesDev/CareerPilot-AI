export type InterviewType =
  | "HR"
  | "Technical"
  | "Behavioral"
  | "Coding"
  | "System Design"
  | "Resume Based"
  | "Mixed";

export type InterviewDifficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type InterviewQuestionCategory =
  | "Introduction"
  | "Projects"
  | "Technical Concepts"
  | "Behavioral"
  | "Problem Solving"
  | "Communication"
  | "Leadership"
  | "Resume Discussion"
  | "Strengths"
  | "Weaknesses"
  | "Career Goals";

export type InterviewSessionStatus = "active" | "completed" | "archived";

export interface InterviewQuestion {
  id: string;
  prompt: string;
  category: InterviewQuestionCategory;
  expectedSignals: string[];
  difficulty: InterviewDifficulty;
  interviewType: InterviewType;
  order: number;
}

export interface InterviewAnswer {
  id: string;
  questionId: string;
  content: string;
  formattedContent: string;
  wordCount: number;
  durationSeconds: number;
  submittedAt: string;
}

export interface InterviewScore {
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  behaviorScore: number;
  problemSolvingScore: number;
  overallScore: number;
}

export interface InterviewFeedback {
  id: string;
  questionId: string;
  answerId: string;
  scores: InterviewScore;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  summary: string;
  createdAt: string;
}

export interface InterviewSession {
  id: string;
  userId: string;
  targetRole: string;
  difficulty: InterviewDifficulty;
  interviewType: InterviewType;
  currentQuestion: number;
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  feedback: InterviewFeedback[];
  score: InterviewScore;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  duration: number;
  status: InterviewSessionStatus;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSessionInput {
  userId: string;
  targetRole: string;
  difficulty: InterviewDifficulty;
  interviewType: InterviewType;
  resumeSkills: string[];
  careerGoal: string;
  duration: number;
}

export interface InterviewAnswerInput {
  sessionId: string;
  questionId: string;
  content: string;
  durationSeconds: number;
}

export interface InterviewHistoryItem {
  id: string;
  targetRole: string;
  difficulty: InterviewDifficulty;
  interviewType: InterviewType;
  score: number;
  status: InterviewSessionStatus;
  completedQuestions: number;
  totalQuestions: number;
  updatedAt: string;
}

export interface InterviewReport {
  session: InterviewSession;
  recommendations: string[];
  completionRate: number;
  readinessLabel: string;
}
