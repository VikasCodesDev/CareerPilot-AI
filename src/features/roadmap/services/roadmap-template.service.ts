import { ROLE_SKILL_MAP } from "@/features/roadmap/constants";
import type { SupportedRoadmapRole } from "@/features/roadmap/types";

export class RoadmapTemplateService {
  static getSkillsForRole(role: SupportedRoadmapRole): string[] {
    return ROLE_SKILL_MAP[role];
  }

  static getMissingSkills(role: SupportedRoadmapRole, currentSkills: readonly string[]) {
    const normalized = new Set(currentSkills.map((skill) => skill.toLowerCase()));
    return this.getSkillsForRole(role).filter((skill) => !normalized.has(skill.toLowerCase()));
  }
}
