import {
  ATS_SCORE_WEIGHTS,
  DEFAULT_REQUIRED_SKILLS,
} from "@/features/ats/constants";

export const atsConfig = {
  defaultRequiredSkills: DEFAULT_REQUIRED_SKILLS,
  minResumeWords: 180,
  strongResumeWords: 520,
  maxRecommendedKeywords: 8,
  scoreWeights: ATS_SCORE_WEIGHTS,
} as const;
