import { ATS_SECTION_LABELS } from "@/features/ats/constants";
import type {
  ATSSectionAnalysis,
  ATSSectionDetection,
  ATSSectionKey,
} from "@/features/ats/types";
import { normalizeText } from "@/features/ats/utils/text";

const SECTION_PATTERNS: Record<ATSSectionKey, RegExp[]> = {
  summary: [/summary/i, /profile/i, /objective/i, /about/i],
  skills: [/skills/i, /technical skills/i, /technologies/i, /tools/i],
  education: [/education/i, /degree/i, /university/i, /college/i],
  projects: [/projects/i, /portfolio/i, /capstone/i],
  experience: [/experience/i, /employment/i, /work history/i, /internship/i],
  certifications: [/certifications?/i, /certificates?/i, /credentials?/i],
  languages: [/languages?/i],
  links: [/github/i, /linkedin/i, /portfolio/i, /https?:\/\//i],
};

export function analyzeSections(resumeText: string): ATSSectionAnalysis {
  const normalized = normalizeText(resumeText);
  const detected: ATSSectionDetection[] = Object.entries(SECTION_PATTERNS).map(
    ([key, patterns]) => {
      const present = patterns.some((pattern) => pattern.test(resumeText));
      const keywordHints = patterns.filter((pattern) => pattern.test(normalized)).length;
      const confidence = present ? Math.min(100, 64 + keywordHints * 12) : 0;

      return {
        key: key as ATSSectionKey,
        label: ATS_SECTION_LABELS[key as ATSSectionKey],
        present,
        confidence,
      };
    }
  );

  return {
    detected,
    detectedSections: detected.filter((section) => section.present).map((section) => section.key),
    missingSections: detected.filter((section) => !section.present).map((section) => section.key),
  };
}
