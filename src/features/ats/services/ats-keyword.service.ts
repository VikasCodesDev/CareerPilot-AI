import { ATS_TECH_KEYWORDS } from "@/features/ats/constants";
import type { ATSKeywordResult } from "@/features/ats/types";
import {
  includesKeyword,
  normalizeKeyword,
  uniqueNormalized,
} from "@/features/ats/utils/text";

function toDisplayKeyword(keyword: string): string {
  const specialCases: Record<string, string> = {
    api: "API",
    css: "CSS",
    html: "HTML",
    javascript: "JavaScript",
    "next.js": "Next.js",
    "node.js": "Node.js",
    "rest api": "REST API",
    typescript: "TypeScript",
  };

  return specialCases[keyword] ?? keyword.replace(/\b\w/g, (char) => char.toUpperCase());
}

export class ATSKeywordService {
  static extractResumeKeywords(resumeText: string): string[] {
    return ATS_TECH_KEYWORDS.filter((keyword) => includesKeyword(resumeText, keyword)).map(
      toDisplayKeyword
    );
  }

  static compareKeywords(
    resumeText: string,
    requiredSkills: readonly string[]
  ): ATSKeywordResult {
    const normalizedRequired = uniqueNormalized(requiredSkills);
    const resumeKeywords = uniqueNormalized(this.extractResumeKeywords(resumeText));
    const matched = normalizedRequired.filter((keyword) => includesKeyword(resumeText, keyword));
    const missing = normalizedRequired.filter((keyword) => !matched.includes(keyword));
    const extra = resumeKeywords.filter((keyword) => !normalizedRequired.includes(keyword));

    return {
      matched: matched.map(toDisplayKeyword),
      missing: missing.map(toDisplayKeyword),
      recommended: missing.slice(0, 8).map(toDisplayKeyword),
      extra: extra.map(toDisplayKeyword),
      resumeKeywords: resumeKeywords.map(toDisplayKeyword),
      requiredSkills: normalizedRequired.map(toDisplayKeyword),
      matchRate: normalizedRequired.length > 0 ? matched.length / normalizedRequired.length : 0,
    };
  }

  static hasProfessionalLink(resumeText: string): boolean {
    const normalized = normalizeKeyword(resumeText);
    return normalized.includes("github") || normalized.includes("linkedin") || normalized.includes("https");
  }
}
