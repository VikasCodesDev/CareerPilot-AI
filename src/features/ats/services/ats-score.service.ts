import { atsConfig } from "@/features/ats/config";
import { ATS_ACTION_VERBS, ATS_SCORE_LABELS } from "@/features/ats/constants";
import { ATSKeywordService } from "@/features/ats/services/ats-keyword.service";
import type {
  ATSAnalysisInput,
  ATSKeywordResult,
  ATSScoreBreakdown,
  ATSScoreCategory,
  ATSSectionAnalysis,
  ATSSectionScore,
} from "@/features/ats/types";
import { analyzeSections } from "@/features/ats/utils/section-detector";
import {
  clampScore,
  countWords,
  includesKeyword,
  normalizeText,
  ratioToScore,
} from "@/features/ats/utils/text";

type ScoreContext = {
  input: ATSAnalysisInput;
  keywordResults: ATSKeywordResult;
  sectionAnalysis: ATSSectionAnalysis;
  wordCount: number;
  normalizedText: string;
};

function buildSectionScore(
  category: ATSScoreCategory,
  score: number,
  passedChecks: string[],
  warnings: string[],
  criticalIssues: string[]
): ATSSectionScore {
  return {
    category,
    label: ATS_SCORE_LABELS[category],
    score: clampScore(score),
    weight: atsConfig.scoreWeights[category],
    passedChecks,
    warnings,
    criticalIssues,
  };
}

function hasQuantifiedAchievement(text: string): boolean {
  return /\b(\d+%|\d+x|\$\d+|\d+\+|\d+\s?(users|clients|projects|hours|days|weeks))\b/i.test(text);
}

function countActionVerbs(text: string): number {
  return ATS_ACTION_VERBS.filter((verb) => includesKeyword(text, verb)).length;
}

export class ATSScoreService {
  static analyze(input: ATSAnalysisInput): ATSScoreBreakdown & {
    keywordResults: ATSKeywordResult;
    sectionAnalysis: ATSSectionAnalysis;
  } {
    const keywordResults = ATSKeywordService.compareKeywords(
      input.resumeText,
      input.requiredSkills
    );
    const sectionAnalysis = analyzeSections(input.resumeText);
    const context: ScoreContext = {
      input,
      keywordResults,
      sectionAnalysis,
      wordCount: countWords(input.resumeText),
      normalizedText: normalizeText(input.resumeText),
    };

    const sectionScores = [
      this.scoreResume(context),
      this.scoreSkills(context),
      this.scoreExperience(context),
      this.scoreEducation(context),
      this.scoreFormatting(context),
      this.scoreKeywords(context),
      this.scoreProjects(context),
      this.scoreAchievements(context),
      this.scoreCertifications(context),
    ];

    const overallScore = clampScore(
      sectionScores.reduce((total, section) => total + section.score * section.weight, 0)
    );

    return {
      overallScore,
      sectionScores,
      suggestionsCount:
        sectionScores.reduce(
          (total, section) =>
            total + section.warnings.length + section.criticalIssues.length,
          0
        ),
      criticalIssues: sectionScores.flatMap((section) => section.criticalIssues),
      warnings: sectionScores.flatMap((section) => section.warnings),
      passedChecks: sectionScores.flatMap((section) => section.passedChecks),
      keywordResults,
      sectionAnalysis,
    };
  }

  private static scoreResume(context: ScoreContext): ATSSectionScore {
    const passed: string[] = [];
    const warnings: string[] = [];
    const critical: string[] = [];
    let score = 40;

    if (context.wordCount >= atsConfig.minResumeWords) {
      score += 25;
      passed.push("Resume has enough content for ATS parsing.");
    } else {
      critical.push("Resume text is too short for reliable ATS matching.");
    }

    if (context.wordCount >= atsConfig.strongResumeWords) {
      score += 15;
      passed.push("Resume has strong detail depth.");
    }

    if (ATSKeywordService.hasProfessionalLink(context.input.resumeText)) {
      score += 10;
      passed.push("Professional link detected.");
    } else {
      warnings.push("Add a GitHub, LinkedIn, or portfolio link.");
    }

    if (context.sectionAnalysis.detectedSections.length >= 5) {
      score += 10;
      passed.push("Core resume sections are present.");
    } else {
      warnings.push("Several standard resume sections are missing.");
    }

    return buildSectionScore("resume", score, passed, warnings, critical);
  }

  private static scoreSkills(context: ScoreContext): ATSSectionScore {
    const skillsPresent = context.sectionAnalysis.detectedSections.includes("skills");
    const detectedSkillCount = context.keywordResults.resumeKeywords.length;
    const passed: string[] = [];
    const warnings: string[] = [];
    const critical: string[] = [];
    let score = ratioToScore(detectedSkillCount, 10);

    if (skillsPresent) passed.push("Dedicated skills section detected.");
    else critical.push("Skills section is missing.");

    if (detectedSkillCount >= 8) passed.push("Strong technical keyword coverage.");
    else warnings.push("Add more role-specific technical skills.");

    if (skillsPresent) score += 20;

    return buildSectionScore("skills", score, passed, warnings, critical);
  }

  private static scoreExperience(context: ScoreContext): ATSSectionScore {
    const hasExperience = context.sectionAnalysis.detectedSections.includes("experience");
    const actionVerbCount = countActionVerbs(context.input.resumeText);
    const passed: string[] = [];
    const warnings: string[] = [];
    const critical: string[] = [];
    let score = hasExperience ? 45 : 20;

    if (hasExperience) passed.push("Experience section detected.");
    else warnings.push("Experience or internship section is missing.");

    if (actionVerbCount >= 5) {
      score += 35;
      passed.push("Action-oriented experience bullets detected.");
    } else {
      warnings.push("Use more action verbs to describe impact.");
      score += actionVerbCount * 6;
    }

    if (/\b(intern|developer|engineer|designer|manager|lead)\b/i.test(context.input.resumeText)) {
      score += 20;
      passed.push("Role titles are present.");
    }

    return buildSectionScore("experience", score, passed, warnings, critical);
  }

  private static scoreEducation(context: ScoreContext): ATSSectionScore {
    const hasEducation = context.sectionAnalysis.detectedSections.includes("education");
    const passed = hasEducation ? ["Education section detected."] : [];
    const warnings = hasEducation ? [] : ["Education section is missing."];
    const score = hasEducation ? 90 : 35;

    return buildSectionScore("education", score, passed, warnings, []);
  }

  private static scoreFormatting(context: ScoreContext): ATSSectionScore {
    const passed: string[] = [];
    const warnings: string[] = [];
    let score = 55;

    if (/[-•*]\s+\w/.test(context.input.resumeText)) {
      score += 15;
      passed.push("Bullet-like structure detected.");
    } else {
      warnings.push("Use concise bullets for ATS-friendly scanning.");
    }

    if (!/\t{2,}|\|{2,}/.test(context.input.resumeText)) {
      score += 15;
      passed.push("No table-heavy formatting detected.");
    } else {
      warnings.push("Avoid tables or multi-column formatting.");
    }

    if (/\S+@\S+\.\S+/.test(context.input.resumeText)) {
      score += 15;
      passed.push("Email contact detected.");
    } else {
      warnings.push("Add a professional email address.");
    }

    return buildSectionScore("formatting", score, passed, warnings, []);
  }

  private static scoreKeywords(context: ScoreContext): ATSSectionScore {
    const score = ratioToScore(
      context.keywordResults.matched.length,
      context.keywordResults.requiredSkills.length
    );
    const passed = context.keywordResults.matched.length
      ? [`Matched ${context.keywordResults.matched.length} required keywords.`]
      : [];
    const warnings = context.keywordResults.missing.length
      ? [`Missing ${context.keywordResults.missing.length} required keywords.`]
      : [];
    const critical =
      score < 35 ? ["Keyword alignment is too low for the target role."] : [];

    return buildSectionScore("keywords", score, passed, warnings, critical);
  }

  private static scoreProjects(context: ScoreContext): ATSSectionScore {
    const hasProjects = context.sectionAnalysis.detectedSections.includes("projects");
    const mentionsGithub = includesKeyword(context.input.resumeText, "github");
    const passed: string[] = [];
    const warnings: string[] = [];
    let score = hasProjects ? 60 : 20;

    if (hasProjects) passed.push("Projects section detected.");
    else warnings.push("Add resume-worthy projects.");

    if (mentionsGithub) {
      score += 25;
      passed.push("GitHub project evidence detected.");
    } else {
      warnings.push("Add GitHub links for projects.");
    }

    if (context.keywordResults.resumeKeywords.length >= 6) score += 15;

    return buildSectionScore("projects", score, passed, warnings, []);
  }

  private static scoreAchievements(context: ScoreContext): ATSSectionScore {
    const quantified = hasQuantifiedAchievement(context.input.resumeText);
    const actionVerbCount = countActionVerbs(context.input.resumeText);
    const passed: string[] = [];
    const warnings: string[] = [];
    let score = 35;

    if (quantified) {
      score += 40;
      passed.push("Quantified achievement detected.");
    } else {
      warnings.push("Quantify achievements with metrics.");
    }

    if (actionVerbCount >= 4) {
      score += 25;
      passed.push("Impact-oriented verbs detected.");
    }

    return buildSectionScore("achievements", score, passed, warnings, []);
  }

  private static scoreCertifications(context: ScoreContext): ATSSectionScore {
    const hasCertifications = context.sectionAnalysis.detectedSections.includes("certifications");
    const passed = hasCertifications ? ["Certification section detected."] : [];
    const warnings = hasCertifications ? [] : ["Add relevant certifications if available."];

    return buildSectionScore("certifications", hasCertifications ? 90 : 45, passed, warnings, []);
  }
}
