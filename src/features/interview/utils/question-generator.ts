import {
  QUESTION_CATEGORIES,
  ROLE_CONCEPT_MAP,
} from "@/features/interview/constants";
import { interviewConfig } from "@/features/interview/config";
import type {
  InterviewQuestion,
  InterviewSessionInput,
} from "@/features/interview/types";
import { generateId } from "@/lib/utils/api";

function getRoleConcepts(targetRole: string, resumeSkills: readonly string[]): string[] {
  const normalizedRole = targetRole.toLowerCase();
  const roleKey = Object.keys(ROLE_CONCEPT_MAP).find((key) => normalizedRole.includes(key));
  const roleConcepts = ROLE_CONCEPT_MAP[roleKey ?? "default"];
  return [...new Set([...resumeSkills.slice(0, 4), ...roleConcepts])].slice(0, 6);
}

export function generateInterviewQuestions(input: InterviewSessionInput): InterviewQuestion[] {
  const concepts = getRoleConcepts(input.targetRole, input.resumeSkills);
  const prompts = [
    `Introduce yourself for a ${input.targetRole} interview and connect your background to ${input.careerGoal}.`,
    `Walk through a project where you used ${concepts[0] ?? "your core skills"} end to end.`,
    `Explain ${concepts[1] ?? "a technical concept"} as if you were mentoring a junior teammate.`,
    `Describe a time you received difficult feedback and how you acted on it.`,
    `How would you debug a production issue related to ${concepts[2] ?? "your target role"}?`,
    `Give an example of communicating tradeoffs to a non-technical stakeholder.`,
    `Tell me about a moment where you led without formal authority.`,
    `Which resume achievement best proves you are ready for ${input.targetRole}?`,
    `What is one strength you bring to ${input.targetRole}, and what evidence supports it?`,
    `What weakness are you actively improving before your next interview?`,
    `Where do you want your career to be after this role, and why?`,
  ];

  return prompts.slice(0, interviewConfig.defaultQuestionCount).map((prompt, index) => ({
    id: generateId(`question-${index + 1}`),
    prompt,
    category: QUESTION_CATEGORIES[index % QUESTION_CATEGORIES.length],
    expectedSignals: [
      input.targetRole,
      concepts[index % concepts.length] ?? "communication",
      input.careerGoal,
    ],
    difficulty: input.difficulty,
    interviewType: input.interviewType,
    order: index + 1,
  }));
}
