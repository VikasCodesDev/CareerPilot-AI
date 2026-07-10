import { FILLER_WORDS } from "@/features/interview/constants";
import { interviewConfig } from "@/features/interview/config";
import type { InterviewQuestion, InterviewScore } from "@/features/interview/types";
import { countWords, formatAnswer } from "@/features/interview/utils/answer-formatter";

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function calculateAnswerScore(
  question: InterviewQuestion,
  answerContent: string
): InterviewScore {
  const answer = formatAnswer(answerContent).toLowerCase();
  const wordCount = countWords(answerContent);
  const matchedSignals = question.expectedSignals.filter((signal) =>
    answer.includes(signal.toLowerCase())
  ).length;
  const fillerCount = FILLER_WORDS.filter((word) => answer.includes(` ${word} `)).length;
  const hasProjectContext = /project|built|implemented|designed|launched/.test(answer);
  const hasQuantification = /\d|percent|%|users|hours|weeks|reduced|increased/.test(answer);

  const communicationScore = clampScore(
    45 + Math.min(30, wordCount / 2) + (fillerCount === 0 ? 15 : -fillerCount * 6)
  );
  const technicalScore = clampScore(45 + matchedSignals * 10 + (hasProjectContext ? 10 : 0));
  const confidenceScore = clampScore(
    50 + (wordCount >= interviewConfig.minAnswerWords ? 15 : -10) + (hasQuantification ? 10 : 0)
  );
  const behaviorScore = clampScore(
    52 + (/team|stakeholder|feedback|mentor|collaborat/.test(answer) ? 18 : 0)
  );
  const problemSolvingScore = clampScore(
    48 + (/tradeoff|debug|root cause|approach|measure|iterate/.test(answer) ? 20 : 0)
  );
  const overallScore = clampScore(
    (communicationScore + technicalScore + confidenceScore + behaviorScore + problemSolvingScore) /
      5
  );

  return {
    communicationScore,
    technicalScore,
    confidenceScore,
    behaviorScore,
    problemSolvingScore,
    overallScore,
  };
}

export function averageScores(scores: readonly InterviewScore[]): InterviewScore {
  if (scores.length === 0) {
    return {
      communicationScore: 0,
      technicalScore: 0,
      confidenceScore: 0,
      behaviorScore: 0,
      problemSolvingScore: 0,
      overallScore: 0,
    };
  }

  const totals = scores.reduce(
    (acc, score) => ({
      communicationScore: acc.communicationScore + score.communicationScore,
      technicalScore: acc.technicalScore + score.technicalScore,
      confidenceScore: acc.confidenceScore + score.confidenceScore,
      behaviorScore: acc.behaviorScore + score.behaviorScore,
      problemSolvingScore: acc.problemSolvingScore + score.problemSolvingScore,
      overallScore: acc.overallScore + score.overallScore,
    }),
    {
      communicationScore: 0,
      technicalScore: 0,
      confidenceScore: 0,
      behaviorScore: 0,
      problemSolvingScore: 0,
      overallScore: 0,
    }
  );

  return {
    communicationScore: clampScore(totals.communicationScore / scores.length),
    technicalScore: clampScore(totals.technicalScore / scores.length),
    confidenceScore: clampScore(totals.confidenceScore / scores.length),
    behaviorScore: clampScore(totals.behaviorScore / scores.length),
    problemSolvingScore: clampScore(totals.problemSolvingScore / scores.length),
    overallScore: clampScore(totals.overallScore / scores.length),
  };
}
