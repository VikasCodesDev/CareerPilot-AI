import type {
  ATSKeywordResult,
  ATSScoreBreakdown,
  ATSSuggestion,
} from "@/features/ats/types";

function createSuggestion(
  category: ATSSuggestion["category"],
  severity: ATSSuggestion["severity"],
  title: string,
  description: string,
  actionItems: string[]
): ATSSuggestion {
  return {
    id: `${category}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    category,
    severity,
    title,
    description,
    actionItems,
  };
}

export class ATSImprovementService {
  static generateSuggestions(
    breakdown: ATSScoreBreakdown,
    keywordResults: ATSKeywordResult
  ): ATSSuggestion[] {
    const suggestions: ATSSuggestion[] = [];
    const scores = new Map(
      breakdown.sectionScores.map((section) => [section.category, section.score])
    );

    if ((scores.get("resume") ?? 0) < 70) {
      suggestions.push(
        createSuggestion(
          "resume",
          "critical",
          "Strengthen resume structure",
          "The resume needs stronger core sections and contact evidence for reliable ATS parsing.",
          ["Add Summary, Skills, Experience, Projects, Education, and Links sections."]
        )
      );
    }

    if ((scores.get("projects") ?? 0) < 70) {
      suggestions.push(
        createSuggestion(
          "projects",
          "warning",
          "Add project proof",
          "Projects help early-career resumes demonstrate applied skills.",
          ["Add 2-3 projects with tech stack, outcome, GitHub link, and deployment link."]
        )
      );
    }

    if ((scores.get("achievements") ?? 0) < 70) {
      suggestions.push(
        createSuggestion(
          "achievements",
          "warning",
          "Quantify achievements",
          "ATS and recruiters both reward measurable outcomes.",
          ["Rewrite bullets with numbers, percentages, users, time saved, or performance gains."]
        )
      );
    }

    if ((scores.get("keywords") ?? 0) < 75 && keywordResults.missing.length > 0) {
      suggestions.push(
        createSuggestion(
          "keywords",
          "critical",
          "Add missing target keywords",
          "Your resume does not include enough required skills for the selected target role.",
          [`Prioritize: ${keywordResults.recommended.join(", ")}.`]
        )
      );
    }

    if ((scores.get("formatting") ?? 0) < 75) {
      suggestions.push(
        createSuggestion(
          "formatting",
          "improvement",
          "Improve ATS formatting",
          "Formatting signals suggest the resume may be harder for ATS systems to parse.",
          ["Use single-column layout, simple bullets, standard headings, and plain text links."]
        )
      );
    }

    if ((scores.get("skills") ?? 0) < 75) {
      suggestions.push(
        createSuggestion(
          "skills",
          "warning",
          "Expand skills section",
          "The skills section should mirror target-role language without keyword stuffing.",
          ["Group skills by category such as Languages, Frameworks, Tools, and Databases."]
        )
      );
    }

    return suggestions;
  }
}
