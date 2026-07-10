import type {
  InterviewAnswer,
  InterviewFeedback,
  InterviewQuestion,
  InterviewScore,
} from "@/features/interview/types";
import { generateId } from "@/lib/utils/api";

export class FeedbackService {
  static generateFeedback(
    question: InterviewQuestion,
    answer: InterviewAnswer,
    scores: InterviewScore
  ): InterviewFeedback {
    const strengths = [
      answer.wordCount >= 35 ? "Answer has enough structure to evaluate clearly." : "",
      scores.technicalScore >= 70 ? "Shows relevant technical signal for the role." : "",
      scores.communicationScore >= 70 ? "Communication is clear and concise." : "",
    ].filter(Boolean);
    const weaknesses = [
      answer.wordCount < 35 ? "Answer is too short for a strong interview response." : "",
      scores.technicalScore < 65 ? "Technical depth needs more role-specific detail." : "",
      scores.confidenceScore < 65 ? "Confidence signal is limited by missing evidence." : "",
    ].filter(Boolean);
    const suggestions = [
      answer.wordCount < 60 ? "Expand answer with situation, action, result, and learning." : "",
      scores.technicalScore < 75 ? "Mention projects, tools, and implementation tradeoffs." : "",
      scores.confidenceScore < 75 ? "Quantify achievements with numbers or concrete outcomes." : "",
      scores.communicationScore < 75 ? "Avoid filler words and keep a sharper answer structure." : "",
    ].filter(Boolean);

    return {
      id: generateId("feedback"),
      questionId: question.id,
      answerId: answer.id,
      scores,
      strengths: strengths.length ? strengths : ["Answer is submitted and ready for review."],
      weaknesses: weaknesses.length ? weaknesses : ["No critical weakness detected."],
      suggestions: suggestions.length ? suggestions : ["Keep practicing with progressively harder prompts."],
      summary: `Deterministic evaluation for ${question.category}: ${scores.overallScore}/100 overall.`,
      createdAt: new Date().toISOString(),
    };
  }
}
